import NextAuth, { DefaultSession, Session } from "next-auth"
import Google from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import  {connectToDatabase}  from "@/lib/db"
import User from "@/lib/modals/users"


declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

 
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession["user"];
    
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  
  providers: [Google],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach role from token to session
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      // If user is available (only on first login), attach role
      if (user) {
        await connectToDatabase(true); // Make sure DB is connected
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.role = dbUser.role;
          token.id=dbUser._id
        } else {
          token.role = "user"; // Default fallback
        }
      }
      return token;
    },
  },
})