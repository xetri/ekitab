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
    const hexBytes = randomBytes(64).toString("hex");
    const id = createHash("sha256").update(hexBytes).digest("hex");
    return id;
}

export const genReviewId = (): string => {
    const hexBytes = randomBytes(32).toString("hex");
    const id = createHash("sha256").update(hexBytes).digest("hex");
    return id;
}

export const genCoverId = () : string => {
    const hexBytes = randomBytes(24).toString("hex");
    const timestamp = Date.now().toString(16);
    const hexBytesWithTimestamp = hexBytes + timestamp;
    const id = createHash("sha256").update(hexBytesWithTimestamp).digest("hex");
    return id;
}

export const genBookId = () : string => {
    const hexBytes = randomBytes(32).toString("hex");
    const timestamp = Date.now().toString(16);
    const hexBytesWithTimestamp = hexBytes + timestamp;
    const id = createHash("sha256").update(hexBytesWithTimestamp).digest("hex").slice(1, 16);

    return id;
}