import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/prisma.js";
import { safeUser } from "../dto/safeUserDto.js";


export const protectRoute = async (req, res, next) => {

    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                message: "Unauthorized - No access token provided"
            });
        }

        const token = header.split(" ")[1];

        const decodedData = verifyToken(token);

        if (!decodedData) {
            return res.status(401).json({
                message: "Unauthorized - Invalid access Token"
            });
        }

        //fetch user from DB
        const user = await prisma.user.findUnique({
            where: {
                id: decodedData.id
            },
            select: safeUser
        })
        // add user to req
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in auth middleware: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}