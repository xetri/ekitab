import jwt from "jsonwebtoken";
import config from "@/config";
import db from "@services/db";
import { User } from "@/services/db/modals";
import { genUserId, genSessionId } from "@utils/id";
import { hashPassword } from "@/utils/hash";
import { SignUpData } from "@ekitab/shared/validation/auth";
import path from "path";

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

    const user = new User();
    user.id = genUserId();
    user.email = email;
    user.name = name;
    user.passwordHash = hashPassword(password);

    const newUser = userRepo.create(user);
    userRepo.save(newUser);

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
        data: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        }
    });
}