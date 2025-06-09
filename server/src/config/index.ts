import dotenv from "dotenv";
import process from "process";

dotenv.config();

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 8000,
    CLIENT_URL: process.env.CLIENT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SESSION_COOKIE_KEY: "session",
    minio: {
        endPoint: process.env.MINIO_ENDPOINT || "localhost",
        port: parseInt(process.env.MINIO_PORT || "9000", 10),
        url: process.env.MINIO_URL || "http://localhost:9000",
        useSSL: process.env.MINIO_USE_SSL === "true",
        accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
        secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    },
    MINIO_BUCKET: process.env.MINIO_BUCKET || "ekitab",
}

export default config;