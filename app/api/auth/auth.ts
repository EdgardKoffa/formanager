import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { drizzleDb } from "@/app/db"; // ton instance Drizzle
import { users, roles } from "@/app/db/schemas";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email",placeholder:"" },
        password: { label: "Mot de passe", type: "password",placeholder:"" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await drizzleDb.query.users.findFirst({
          where: eq(users.email, credentials.email as any),
        });
          /* .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1); */

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password as any, user.passwordHash);
        if (!isValid) return null;

        // Récupérer le rôle
        const role = await drizzleDb.query.roles.findFirst({
          where: eq(roles.id, user.roleId!),
        });
         
        return {
          id: user.id,
          email: user.email,
          role: role?.name || "etudiant",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {handlers,auth,signIn,signOut} = NextAuth(authOptions);

