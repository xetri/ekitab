import express from "express";
import config from "@/config";
import login from "@services/auth/login";
import register from "@services/auth/signup";
import resetPassword from "@services/auth/reset-password";
import verify from "@services/auth/verify";
import db from "@/services/db";
import { User } from "@db/modals";
import { forgotPasswordSchema, loginSchema, signupSchema } from "@ekitab/shared/validation/auth";

const app = express();

app.post("/signup", async (req, res) => {
    const { success, error, data } = signupSchema.safeParse(req.body);
    if (!success) {
        res.status(400).send({
            message: error.errors[0].message
        });
        return;
    }

    await register(data, res);
});

app.post("/login", async (req, res) => {
    const { success, error, data } = loginSchema.safeParse(req.body);
    if (!success) {
        res.status(400).send({
            message: error.errors[0].message
        });
        return;
    }

    await login(data, res);
});

app.post("/reset-password", async (req, res) => {
    const { success, error, data } = forgotPasswordSchema.safeParse(req.body);
    if (!success) {
        res.status(400).send({
            message: error.errors[0].message
        });
        return;
    }

    await resetPassword(data, res);
});

app.delete("/logout", async (req, res) => {
    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY]
    if (!sessionToken) {
        res.status(404).send({
            message: "Session not found"
        });
        return;
    }

    const { error, data } = verify(sessionToken);
    if (!error) {
        res.send({
            error,
            data
        });
        return;
    }
    
    res.cookie(config.SESSION_COOKIE_KEY, "");
    res.status(400).send({
        error,
        data
    })
});

app.get("/me", async (req, res) => {
    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY]
    if (!sessionToken) {
        res.status(404).send({
            message: "Session not found"
        });
        return;
    }

    
    const { error, data } = verify(sessionToken);
    if (!error) {
        const users = db.getRepository(User);
        
        const user = await users.findOneBy({ id: data.id });
        if (!user) {
            res.status(404).send({
                message: "User not found"
            });
            res.cookie(config.SESSION_COOKIE_KEY, "");
            
            return;
        }

        res.send({
            error,
            data
        });
        return;
    }
    
    res.cookie(config.SESSION_COOKIE_KEY, "");
    res.status(400).send({
        error,
        data
    })
});

export default app;