import express from "express";
import { LoginPayload, RegisterPayload } from "@/type/Auth";
import register from "@/services/auth/register";
import login from "@/services/auth/login";

const app = express();

app.post("/register", async (req, res) => {
    const { success, error, data } = RegisterPayload.safeParse(req.body);

    if (!success) {
        res.status(400).send({
            message: error.message
        });
        return;
    }

    await register(data, res);
});

app.post("/login", async (req, res) => {
    const { success, error, data } = LoginPayload.safeParse(req.body);

    if (!success) {
        res.status(400).send({
            message: error.message
        });
        return;
    }

    await login(data, res);
});

export default app;