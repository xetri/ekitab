import jwt from "jsonwebtoken";
import config from "@/config";
import db from "@services/db";
import { User } from "@/services/db/modals";
import { genUserId, genSessionId } from "@utils/id";
import { hashPassword } from "@/utils/hash";
import { SignUpData } from "@utils/validation/auth";

export default async function register(data: SignUpData, res: any) {
    let { email, name, password } = data;
    email = email.trim();
    name = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    password = password.trim();

    const userRepo = db.getRepository(User);

    const existingUser = await userRepo.findOne({
        where: [
            { email: email },
        ]
    });
    
    if (existingUser) {
        res.status(409).send({
            message: "Account already exists"
        });
        return null;
    }

    const user = userRepo.create({
        id: genUserId(),
        email,
        name,
        passwordHash: hashPassword(password)
    });

    await userRepo.insert(user);

    const sessionId = genSessionId();
    const sessionKey = jwt.sign({
            id: user.id,
            sid: sessionId,
            email: user.email,
            name: user.name,
        },
        config.JWT_SECRET_KEY, {
            expiresIn: "30d",
        }
    );

    res.cookie(config.SESSION_COOKIE_KEY, sessionKey, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).send({
        message: "Account created successfully",
        session: sessionKey,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    });
}