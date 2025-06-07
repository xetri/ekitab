import jwt from "jsonwebtoken";
import config from "@/config";

export default function verify(sessionToken: string) {
    try {
        jwt.verify(sessionToken, config.JWT_SECRET_KEY);
        const data = jwt.decode(sessionToken, config.JWT_SECRET_KEY);
        return {
            error: null,
            data: data
        }
    } catch(e) {
        return {
            error: e,
            data: null
        }
    }
}