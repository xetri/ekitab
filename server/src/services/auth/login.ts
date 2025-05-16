import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@/config";
import db from "@services/db";
import { User, Session } from "@/modals";
import { LoginPayload } from "@type/Auth";
import { genSessionId } from "@utils/id";

export default async function login(payload: LoginPayload, res: any) {
    const userRepo = db.getRepository(User);
    const sessionRepo = db.getRepository(Session);

    const { email, password } = payload;

    const user = await userRepo.findOne({
        where: [
            { email: email },
        ],
        select: {
            uid: true,
            email: true,
            name: true,
            passwordHash: true,
        }
    });

    if (!user) {
        res.status(404).send({
            message: "User not found"
        });
        return;
    }

    console.log(user)

    const verifyPassword = bcrypt.compareSync(password, user.passwordHash);
    console.log(verifyPassword)

    console.log(password, user.passwordHash)

    if (!verifyPassword) {
        res.status(401).send({
            message: "Invalid password"
        });
        return;
    }
    
    const sessionId = genSessionId();
    const sessionKey = jwt.sign({
        id: user.uid,
        sid: sessionId,
        email: user.email,
        name: user.name,
    }, config.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });

    const session = new Session();
    session.uid = sessionId;
    session.key = sessionKey;
    session.user = user;
    session.expAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
    sessionRepo.save(session);

    res.cookie("session", sessionKey, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(200).send({
        message: "Login success",
        data: {
            id: user.uid,
            email: user.email,
            name: user.name,
        }
    });
}