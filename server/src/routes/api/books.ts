import express from "express";
import jwt from "jsonwebtoken";
import db from "@services/db";
import { Book, Order, Review, User } from "@db/modals";
import { genReviewId, genOrderId } from "@/utils/id";
import config from "@/config";

const router = express.Router();

// @ts-ignore
router.get("/", async (req, res) => {
    const booksRepo = db.getRepository(Book);

    try {
        const books = await booksRepo.find();
        res.json(books)
    } catch(e) {
        return res.status(500).json( { message: e.message } );
    }
});

// @ts-ignore
router.get("/publisher/:id", async (req, res) => {
    const id = req.params.id;
    const userRepo = db.getRepository(User);
    const booksRepo = db.getRepository(Book);

    try {
        const pub = await userRepo.findOne({ 
            where: {
                id,
            }, select: {
                name: true
            }
        });

        const books = await booksRepo.find({
            where: {
                sellerId: id,
            }
        });

        res.json({
            publisherName: pub.name,
            books
        });
    } catch(e) {
        return res.status(500).json( { message: e.message } );
    }
});

// @ts-ignore
router.get("/order", async (req, res) => {
    const ordersRepo = db.getRepository(Order);

    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
    if (!sessionToken) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    try {
       jwt.verify(sessionToken, config.JWT_SECRET_KEY);
       const user = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

       const orders = await ordersRepo.find({
            where: {
                buyerId: user.uid,
            },
            select: {
                id: true,
                bookId: true,
            }
       });

       console.log(orders)

       res.json(orders);
    } catch(e) {
        return res.status(500).json( { message: e.message } );
    }

})

// @ts-ignore
router.get("/order/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const booksRepo = db.getRepository(Book);
    const ordersRepo = db.getRepository(Order);

    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
    if (!sessionToken) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    try {
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const user = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

        const book = await booksRepo.findOne({
            where: {
                id: bookId
            }
        });

        if (!book) {
            return res.status(404).json({
                message: "No books found to order",
            });
        }

        const order = {
            id: genOrderId(),
            buyerId: user.id,
            bookId: book.id,
            amount: book.price,
        }

        await ordersRepo.save(order);

        res.json({ message: "Successfully ordered!" });
    } catch(e) {
        return res.status(500).json( { message: e.message } );
    }
});

// @ts-ignore
router.post("/review", async (req, res) => {
    const { id: bookId, rating, comment } = req.body;
    const booksRepo = db.getRepository(Book);
    const reviewsRepo = db.getRepository(Review);
    
    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
    if (!sessionToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const reviewer = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

        const book = await booksRepo.findOne({
            where: { id: bookId },
            select: {
                id: true
            }
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const newReview : Review = {
            id: genReviewId(),
            user: reviewer.id,
            name: reviewer.name,
            rating,
            comment,
            bookId: book.id
        } as Review;

        await reviewsRepo.save(newReview);

        res.json({ message: "Review added successfully" });
    } catch(e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// @ts-ignore
router.delete("/review/:id", async (req, res) => {
    const { id } = req.params;
    const reviewsRepo = db.getRepository(Review);
    
    const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
    if (!sessionToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const deleter = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

        const review = await reviewsRepo.findOne({
            where: { id },
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (deleter.id != review.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await reviewsRepo.remove(review);

        res.json({ message: "Review removed successfully" });
    } catch(e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// @ts-ignore
router.get("/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const booksRepo = db.getRepository(Book);
    const reviewsRepo = db.getRepository(Review);

    try {
        const book = await booksRepo.findOne({
            where: { id: bookId },
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const reviews = await reviewsRepo.find({
            where: {
                bookId: book.id
            }
        });
        
        res.json({
            book,
            reviews
        });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
});

// @ts-ignore
router.delete("/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const booksRepo = db.getRepository(Book);

    try {
        const sessionToken = req.cookies[config.SESSION_COOKIE_KEY];
        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const user = jwt.decode(sessionToken, config.JWT_SECRET_KEY);

        const book = await booksRepo.findOne({
            where: { id: bookId },
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (user.id != book.sellerId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await booksRepo.remove(book);
        res.json({ message: "Book deleted successfully" });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
});

export default router;