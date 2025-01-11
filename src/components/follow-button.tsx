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
import Icon from "./icons/icon-component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  storeId: string;
  className?: string;
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

export default function FollowButton({ storeId, className }: Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

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
    },
  });

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    await toggleFollow();
  };

  const loading = isCheckingStatus || isToggling;

  if (!isFollowing) {
    return (
      <>
        <Button
          size="rounded"
          className={cn("font-semibold px-8 w-32", className)}
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
            className={cn("font-semibold px-8 w-32", className)}
          >
            {loading ? (
              <Loader size={20} />
            ) : (
              <div className="flex items-center gap-x-2">
                <p>Seguindo</p>
                <Icon.chevronDown size={16} />
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleFollowClick}
            className="p-4 bg-secondary"
          >
            {loading ? <Loader size={20} /> : "Deixar de seguir"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
