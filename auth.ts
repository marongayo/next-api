import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/modals/users";

// ✅ Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}

// ✅ Extend Session
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // ✅ JWT callback runs on sign-in and whenever a session is checked
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDatabase(true);
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString(); // store as string for session
          token.role = dbUser.role;
        } else {
          token.role = "user";
        }
      }

      return token;
    },

    // ✅ Session callback adds custom fields to session.user
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }

      if (token?.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
