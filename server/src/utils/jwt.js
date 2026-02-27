import jwt from "jsonwebtoken";
import "dotenv/config";


export const generateToken = (id, res) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    return token;
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}