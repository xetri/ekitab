import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { uploadFile } from "@services/cloud";
import { genBookId } from "@utils/id";
import config from "@/config";
import db from "@services/db";
import { Book } from "@/services/db/modals";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'book', maxCount: 1 }])

//@ts-ignore
router.post("/book" , uploadMiddleware , async (req, res) => {
    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
    if (!sessionToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const user = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        //@ts-ignore
        const coverFile = req.files['cover'] ? req.files['cover'][0] : null;
        //@ts-ignore
        const pdfFile = req.files['book'] ? req.files['book'][0] : null;

        const id = genBookId();
        const upRes = await uploadFile(config.MINIO_BUCKET, id + "_book.pdf", pdfFile.buffer);
        const coverRes = await uploadFile(config.MINIO_BUCKET, id + "_cover.jpg", coverFile.buffer);

        if (!upRes || !coverRes) {
            return res.status(500).json({ error: "Failed to upload files." });
        }

        const bookRepo = db.getRepository(Book);
        const book = bookRepo.create({
            id,
            title: req.body.title || "Untitled",
            author: req.body.author || "N/A",
            description: req.body.description || "",
            sellerId: user.id,
            sellerName: user.name,
            categories: req.body.categories ? req.body.categories.split(",").map((cat: string) => cat.trim()) : [],
        });
        
        const response = await bookRepo.save(book);
        if (!response) {
            return res.status(500).json({ error: "Failed to save book data." });
        }

        return res.status(200).json({ book: book, message: "Files uploaded successfully." });
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({ error: "An error occurred while uploading files." });
    }
});

export default router;