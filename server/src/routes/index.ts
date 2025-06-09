import express from "express";
import auth from "@routes/api/auth";
import upload from "@routes/api/upload";
import books from "@routes/api/books";

const app = express();

app.use(auth);
app.use("/upload", upload);
app.use("/books", books);

export default app.router;