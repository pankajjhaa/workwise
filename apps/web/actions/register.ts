"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@workwise/prisma";
import {getUserByEmail} from "../data/user";
import {registerSchema} from "@workwise/prisma/zod/auth";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return {error: "Invalid data!"};
    }

    const {email, password} = validatedFields?.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "Email already in use!"};
    }

    await prisma.user.create({
        data: {
            name: values.name,
            email,
            password: hashedPassword,
        },
    });

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(
    //     verificationToken.email,
    //     verificationToken.token,
    // );

    return {error: "Confirmation email sent!"};
};
