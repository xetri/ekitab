import express from "express";
import auth from "@routes/api/auth";
import upload from "@routes/api/upload";

const app = express();

app.use(auth);
app.use("/upload", upload);

export default app.router;