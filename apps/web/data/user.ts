import prisma from "@workwise/prisma";
import {UserType} from "@workwise/types/user";


export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findFirst({
            where: {email: email}
        }) as UserType;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({where: {id}});
    } catch {
        return null;
    }
};
