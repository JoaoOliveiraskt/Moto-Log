"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "./login-modal";
import { cn } from "@/lib/utils";
import Loader from "./ui/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import Icon from "@/components/icons/icon-component";

interface Props extends React.ComponentProps<typeof Button> {
  storeId: string;
  storeName: string | null;
  className?: string;
  followingClassName?: string;
}

interface FollowResponse {
  message: string;
}

interface FollowStatusResponse {
  isFollowing: boolean;
}

const checkFollowStatus = async (
  userId: string | undefined,
  storeId: string
): Promise<boolean> => {
  if (!userId) return false;

  const response = await fetch(
    `/api/follows/check?userId=${userId}&storeId=${storeId}`
  );
  const data: FollowStatusResponse = await response.json();
  return data.isFollowing;
};

const followStore = async ({
  userId,
  storeId,
}: {
  userId: string;
  storeId: string;
}): Promise<FollowResponse> => {
  const response = await fetch(`/api/follows/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, storeId }),
  });
  return response.json();
};

const unfollowStore = async ({
  userId,
  storeId,
}: {
  userId: string;
  storeId: string;
}): Promise<FollowResponse> => {
  const response = await fetch(`/api/follows/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, storeId }),
  });
  return response.json();
};

export default function FollowButton({
  storeId,
  storeName,
  className,
  followingClassName,
}: Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: isFollowing, isLoading: isCheckingStatus } = useQuery({
    queryKey: ["followStatus", storeId, user?.id],
    queryFn: () => checkFollowStatus(user?.id, storeId),
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  });

  const { mutateAsync: toggleFollow, isPending: isToggling } = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      if (isFollowing) {
        return unfollowStore({ userId: user.id, storeId });
      } else {
        return followStore({ userId: user.id, storeId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followStatus", storeId, user?.id],
      });
      toast({
        duration: 3000,
        // @ts-ignore
        title: (
          <div className="flex items-center gap-x-2">
            <Icon.confirmed color="green" size={20} />
            <div>
              {isFollowing ? (
                <span className="font-normal text-muted-foreground">
                  Você deixou de seguir{" "}
                  <strong className="font-bold text-foreground">
                    {" "}
                    {storeName}
                  </strong>
                </span>
              ) : (
                <span className="font-normal text-muted-foreground">
                  Você começou a seguir{" "}
                  <strong className="font-bold text-foreground">
                    {" "}
                    {storeName}
                  </strong>
                </span>
              )}
            </div>
          </div>
        ),
      });

      setIsDialogOpen(false);
    },
  });

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!isFollowing) {
      await toggleFollow();
    }
  };

  const handleUnfollowConfirm = async () => {
    if (isFollowing) {
      await toggleFollow();
    }
  };

  const loading = isCheckingStatus || isToggling;

  if (!isFollowing) {
    return (
      <>
        <Button
          size="rounded"
          className={cn("px-8 w-32", className)}
          onClick={handleFollowClick}
        >
          {loading ? <Loader size={20} /> : "Seguir"}
        </Button>

        <LoginModal
          open={isLoginModalOpen}
          onOpenChange={setIsLoginModalOpen}
          description="Você precisa estar logado para seguir uma loja."
        />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="rounded"
            variant="secondary"
            className={cn("px-8 w-32", followingClassName)}
          >
            <p>Seguindo</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="p-4 bg-secondary"
          >
            Deixar de seguir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="lg:w-80">
          <AlertDialogTitle>Deixar de seguir {storeName} ?</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none">
              Cancelar
            </AlertDialogCancel>
            <Button
              variant="ghost"
              size="rounded"
              onClick={handleUnfollowConfirm}
              className="w-36 text-sky-600 hover:text-sky-600 hover:bg-sky-600/10"
            >
              {loading ? <Loader size={20} /> : "Deixar de seguir"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
