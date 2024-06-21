import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ['none'],
    }),
  ],
  callbacks: {
    async session({session, user}) {
      session.user = {...session.user, id: user.id};
      return session;
    },
  },
  secret: process.env.SECRET as string,
});

export { handler as GET, handler as POST };
