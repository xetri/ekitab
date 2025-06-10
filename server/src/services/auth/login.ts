import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@/config";
import db from "@services/db";
import { User } from "@/services/db/modals";
import { genSessionId } from "@utils/id";
import { LoginData } from "@ekitab/shared/validation/auth";

export default async function login(data: LoginData, res: any) {
    let { email, password } = data;
    email = email.trim();
    password = password.trim();

    const userRepo = db.getRepository(User);
    
    const user = await userRepo.findOne({
        where: [
            { email: email },
        ],
        select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
        }
    });

    if (!user) {
        res.status(404).send({
            message: "Account not found"
        });
        return;
    }

    const verifyPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!verifyPassword) {
        res.status(401).send({
            message: "Invalid password"
        });
        return;
    }
    
    const sessionId = genSessionId();
    const sessionKey = jwt.sign({
        id: user.id,
        sid: sessionId,
        email: user.email,
        name: user.name,
    }, config.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });

    res.cookie(config.SESSION_COOKIE_KEY, sessionKey, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).send({
        message: "Login success",
        session: sessionKey,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    });
}