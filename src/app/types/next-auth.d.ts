import "next-auth";
import { Loja, Role } from "prisma/generated/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    stores?: Loja[];
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      stores?: Loja[];
    } & DefaultSession["user"];
  }
}
