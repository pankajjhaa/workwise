"use server";

import * as z from "zod";

import {getUserByEmail} from "../data/user";
// import {sendPasswordResetEmail} from "@/lib/mail";
// import {generatePasswordResetToken} from "@/lib/token";
import {resetSchema} from "@workwise/prisma/zod/auth";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid email!"};
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email);


    if (!existingUser) {
        return {error: "User is not registered with us!"};
    }
    //
    // const passwordResetToken = await generatePasswordResetToken(email);
    // await sendPasswordResetEmail(
    //     passwordResetToken.email,
    //     passwordResetToken.token,
    // );

    return {success: "Reset email sent!"};
}
