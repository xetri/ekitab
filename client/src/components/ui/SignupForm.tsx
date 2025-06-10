import { useState } from "react";
import axios from "axios";
import { Form } from "radix-ui";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import config from "@/config";
import Input, { PasswordInput } from "@ui/Input";
import { signupSchema, SignUpData } from "@lib/validation/auth";
import { useAuth } from "@lib/store/auth";
import { useAuthDialog } from "@lib/store/auth-dialog";

type Props = {
    email: string;
    setEmail: (email: string) => void;
};

function SignupForm({ email, setEmail }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        resolver: zodResolver(signupSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const authDialog = useAuthDialog();


    const onSubmit = async (data: SignUpData) => {
        setLoading(true);
        try {
            const res = await axios.post(config.API_URL + "/signup", data, {
                withCredentials: true,
            });
            toast.success("Signed up successfully");
            auth.login(res.data.user);
            authDialog.setOpen(false);
        } catch(e: any) {
            const errorMessage = e.response?.data?.message || "Failed to connect to server";
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)} >
                <div className="mx-3 space-y-2">
                    <div className="space-y-2">
                        <Form.Field name="email">
                            {/* <Form.Label htmlFor="email">Email</Form.Label> */}
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </Form.Field>
                        <Form.Field name="name">
                            {/* <Form.Label htmlFor="name">Name</Form.Label> */}
                            <Input
                                type="text"
                                placeholder="Name"
                                {...register("name")}
                                disabled={loading}
                            />
                            {errors.name && (
                                <span className="text-sm text-red-500">{errors.name.message}</span>
                            )}
                        </Form.Field>
                        <Form.Field name="password" className="flex flex-col">
                            {/* <Form.Label htmlFor="password">Password</Form.Label> */}
                            <PasswordInput
                                className="peer"
                                placeholder="Password"
                                {...register("password")}
                                disabled={loading}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">{errors.password.message}</span>
                            )}
                        </Form.Field>
                        <Form.Field name="confirmPassword" className="flex flex-col">
                            {/* <Form.Label htmlFor="password">Confirm Password</Form.Label> */}
                            <PasswordInput
                                className="peer"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                                disabled={loading}
                            />
                            {errors.confirmPassword && (
                                <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        </Form.Field>
                    </div>
                    <div>
                        {errors.root && (
                            <span className="text-sm text-red-500">{errors.root.message}</span>
                        )}
                    </div>
                    <Form.Submit asChild>
                        <Button className="w-full bg-primary text-white mt-3"
                            disabled={loading}
                        >
                            Signup
                        </Button>
                    </Form.Submit>
                </div>
            </Form.Root>
        </>
    )
}

export default SignupForm;
