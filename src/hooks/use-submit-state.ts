import { useState } from "react";

export function useSubmitState() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const setSuccess = (success: boolean) => setIsSuccessful(success);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return {
    isLoading,
    isSuccessful,
    isDialogOpen,
    startLoading,
    stopLoading,
    setSuccess,
    openDialog,
    closeDialog,
  };
}
