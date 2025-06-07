import config from "@/config";
import db from "@services/db";
import { User } from "@/services/db/modals";
import { ForgotPasswordData } from "@ekitab/shared/validation/auth";

export default async function register(data: ForgotPasswordData, res: any) {
    const { email } = data;
    const userRepo = db.getRepository(User);

    const existingUser = await userRepo.findOne({
        where: [
            { email: email },
        ]
    });
    
    if (!existingUser) {
        res.status(404).send({
            message: "Account not found"
        });
        return;
    }

    //simulate sending email
    res.status(200).send({
        message: "Check your email to reset your password"
    });
}