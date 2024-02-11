import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter";

import prisma from "@workwise/prisma";
import authConfig from "./auth.config";
import {getUserById} from "./data/user";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
    },
    events: {
        async linkAccount({user}) {
            await prisma.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email!;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    ...authConfig,
});
