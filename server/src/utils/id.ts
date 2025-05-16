import { randomBytes, createHash } from "crypto";
import { v4 as uuid } from "uuid";

export const genUserId = (): string => {
    return uuid().replace(/-/g, "");
}

export const genSessionId = () : string => {
    const hexBytes = randomBytes(32).toString("hex");
    const id = createHash("sha256").update(hexBytes).digest("hex");
    return id;
}

export const genOrderId = () => {

}