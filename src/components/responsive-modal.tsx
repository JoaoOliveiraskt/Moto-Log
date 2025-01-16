import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import useIsMobile from "@/hooks/use-is-mobile";

const ResponsiveContext = React.createContext<{
  isMobile: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
} | null>(null);

const useResponsiveContext = () => {
  const context = React.useContext(ResponsiveContext);
  if (!context) {
    throw new Error(
      "Componentes Responsive devem ser usados dentro de ResponsiveModal"
    );
  }
  return context;
};

interface ResponsiveModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export function ResponsiveModal({
  isOpen,
  onOpenChange,
  children,
}: ResponsiveModalProps) {
  const isMobile = useIsMobile();
  const Container = isMobile ? Drawer : Dialog;

  return (
    <ResponsiveContext.Provider value={{ isMobile, isOpen, onOpenChange }}>
      <Container open={isOpen} onOpenChange={onOpenChange}>
        {children}
      </Container>
    </ResponsiveContext.Provider>
  );
}

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveModalContent({
  children,
  className = "",
}: BaseProps) {
  const { isMobile } = useResponsiveContext();
  const Content = isMobile ? DrawerContent : DialogContent;

  return <Content className={`${className}`}>{children}</Content>;
}

export function ResponsiveModalHeader({ children, className = "" }: BaseProps) {
  const { isMobile } = useResponsiveContext();
  const Header = isMobile ? DrawerHeader : DialogHeader;

  return (
    <Header className={`${className}`}>
      {children}
    </Header>
  );
}

export function ResponsiveModalTitle({ children, className = "" }: BaseProps) {
  const { isMobile } = useResponsiveContext();
  const Title = isMobile ? DrawerTitle : DialogTitle;

  return <Title className={className}>{children}</Title>;
}

export function ResponsiveModalFooter({ children, className = "" }: BaseProps) {
  const { isMobile } = useResponsiveContext();
  const Footer = isMobile ? DrawerFooter : DialogFooter;

  return <Footer className={className}>{children}</Footer>;
}
