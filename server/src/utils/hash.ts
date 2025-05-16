import bcrypt from "bcryptjs";

export function hashPassword(password : string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}