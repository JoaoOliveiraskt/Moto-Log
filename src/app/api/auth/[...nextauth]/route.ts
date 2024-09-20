import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["none"],
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const userRecord = await db.user.findUnique({
        where: { id: user.id },
        select: { id: true, role: true },
      });
      session.user = { ...session.user, id: user.id, role: userRecord?.role || "CLIENT"}; // Adiciona a role ao session.user
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
