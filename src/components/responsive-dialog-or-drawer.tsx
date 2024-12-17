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
import MotoLogLogo from "./icons/moto-log-logo";

interface ResponsiveDialogOrDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
}

export function ResponsiveDialogOrDrawer({
  isOpen,
  onOpenChange,
  children,
  title,
}: ResponsiveDialogOrDrawerProps) {
  const isMobile = useIsMobile();

  const Container = isMobile ? Drawer : Dialog;
  const Content = isMobile ? DrawerContent : DialogContent;
  const Header = isMobile ? DrawerHeader : DialogHeader;
  const Title = isMobile ? DrawerTitle : DialogTitle;
  const Footer = isMobile ? DrawerFooter : DialogFooter;

  return (
    <Container open={isOpen} onOpenChange={onOpenChange} >
      <Content className="h-full max-h-[70%] lg:min-w-[30%] pb-16 pt-0 pr-0 pl-0">
        <Header className="flex flex-row items-center gap-x-4 pl-6">
          <Title>{title}</Title>
        </Header>
        {children}
      </Content>
    </Container>
  );
}
