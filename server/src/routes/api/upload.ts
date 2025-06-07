import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = upload.fields([{ name: 'coverFile', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }])

router.post("/book" , uploadMiddleware , async (req, res) => {

    

});

export default router;