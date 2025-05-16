import express from "express";
import auth from "@routes/api/auth";

const app = express();

app.use(auth);

export default app.router;