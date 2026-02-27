import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"
import { safeUser } from "../dto/safeUserDto.js";



export const registerService = async (user) => {
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    //set encrypted password
    user.password = hashedPass;

    //save to db
    const newUser = await prisma.user.create({
        data: user
    })

    return newUser;

}

export const loginService = async (institutionId, password) => {

    const response = {};

    //check if user exists
    const user = await prisma.user.findUnique({
        where: {
            institutionId: institutionId
        },
    });

    if (!user) {
        response.status = 400;
        response.message = "User not found";
        return response;
    }

    //compare password
    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
        response.status = 400;
        response.message = "Invalid Credentials";
        return response;
    }

    //add user to response
    response.user = user;

    return response;


}