import dotenv from "dotenv";
import process from "process";

// Load environment variables from .env file
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
}

export default config;