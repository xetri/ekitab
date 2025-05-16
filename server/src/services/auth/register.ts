import jwt from "jsonwebtoken";
import config from "@/config";
import db from "@services/db";
import { User, Session } from "@/modals";
import { RegisterPayload } from "@type/Auth";
import { genUserId, genSessionId } from "@utils/id";
import { hashPassword } from "@/utils/hash";

export default async function register(payload: RegisterPayload, res: any) {
    const userRepo = db.getRepository(User);
    const sessionRepo = db.getRepository(Session);

    const { email, name, password } = payload;
    
    const existingUser = await userRepo.findOne({
        where: [
            { email: email },
        ]
    });
    
    if (existingUser) {
        res.status(409).send({
            message: "User already exists"
        });
        return null;
    }

    const user = new User();
    user.uid = genUserId();
    user.email = email;
    user.name = name;
    user.passwordHash = hashPassword(password);

    const newUser = userRepo.create(user);
    userRepo.save(newUser);

    const sessionId = genSessionId();
    const sessionKey = jwt.sign({
            id: user.uid,
            sid: sessionId,
            email: user.email,
            name: user.name,
        },
        config.JWT_SECRET_KEY, {
            expiresIn: "30d",
        }
    );

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

    res.status(201).send({
        message: "User created successfully",
        data: {
            uid: newUser.uid,
            email: newUser.email,
            name: newUser.name,
        }
    });
}