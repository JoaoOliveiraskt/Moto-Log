'use client';

import { useSession } from "next-auth/react";

const useIsLojista = () => {
  const { data: session } = useSession();
  return session?.user.role === "LOJISTA";
};

export default useIsLojista;