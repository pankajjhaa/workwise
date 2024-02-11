import bcrypt from "bcryptjs";
import type {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@workwise/prisma";
import {User} from "@prisma/client";
import {loginSchema} from "@workwise/prisma/zod/auth";
export default {
    providers: [
        Credentials({
            //ToDo Make authorize function titghtly typed
            async authorize(credentials): Promise<any> {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user = await prisma.user.findFirst({where: {email: email}})
                    // const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig
