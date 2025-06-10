import { createServer } from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Seed from "@/seed";

import config from "@/config";
import * as cloud from "@services/cloud"
import db from "@services/db";
import api from "@/routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", config.CLIENT_URL],
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", api);

server.listen(config.PORT, async () => {
    //Initializing and connecting the database
    try {
        try { 
            await cloud.setup();
        } catch(e) {}
        await db.initialize();
    } catch(e) {
        console.log("Database: Connection failed", e.message);
        return;
    }

    console.log("Database: Connected");
    console.log(`Server: http://localhost:${config.PORT}`);
});