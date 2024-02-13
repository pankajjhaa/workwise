"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import {getUserByEmail} from "../data/user";
import {signIn} from "../auth";
import {loginSchema} from "@workwise/prisma/zod/auth";
import {DEFAULT_LOGIN_REDIRECT} from "../routes";

export const login = async (
    values: z.infer<typeof loginSchema>,
    callbackUrl?: string | null,
) => {

    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Email does not exist!" };
    }
    console.log("existingUser", existingUser)

    // if (!existingUser.emailVerifiedAt) {
    //     const verificationToken = await generateVerificationToken(
    //         existingUser.email,
    //     );
    //
    //     await sendVerificationEmail(
    //         verificationToken.email,
    //         verificationToken.token,
    //     );
    //
    //     return { success: "Confirmation email sent!" };
    // }


    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
        return { success: "Login success" }
    } catch (error) {
        if (error instanceof AuthError) {
          console.log("error", error)
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
};
