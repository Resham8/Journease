declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/register",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          console.log("User doesn't exist");
          return null;
        }

        const isValid = await compare(
          credentials?.password || "",
          user.password
        );
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
