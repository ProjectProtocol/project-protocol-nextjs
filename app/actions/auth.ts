import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiSession } from "@/src/api";

// https://authjs.dev/getting-started/typescript#module-augmentation
declare module "next-auth" {
  interface Session {
    user: {
      isConfirmed: boolean;
      confirmationSentAt?: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

interface ICredentials {
  email: string;
  password: string;
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // logic to verify if user exists
          const res = await ApiSession.create(
            credentials.email as string,
            credentials.password as string
          );

          const authHeader = res.headers["authorization"];
          let user = res.data?.user;

          if (!user) {
            throw new Error("User not found.");
          }

          user.accessToken = authHeader;
          // return user object with the their profile data
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          isConfirmed: token.isConfirmed,
          confirmationSentAt: token.confirmationSentAt,
          accessToken: token.accessToken,
        },
      };
    },
  },
});
