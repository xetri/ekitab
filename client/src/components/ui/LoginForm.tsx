import axios from "axios";
import { useState } from "react";
import { Form } from "radix-ui";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { PasswordInput } from "@ui/Input";
import { useAuthDialog } from "@lib/store/auth-dialog";
import { loginSchema, LoginData } from "@ekitab/shared/validation/auth";
import config from "@/config";
import { useAuth } from "@lib/store/auth";
import Spinner from "@ui/Spinner";

type Props = {
    email: string;
    setEmail: (email: string) => void;
};

function LoginForm({ email, setEmail }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        reValidateMode: "onChange"
    });
    const authDialog = useAuthDialog();
    const auth = useAuth();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginData) => {
        setLoading(true);
        try {
            const res = await axios.post(config.API_URL + "/login", data, {
                withCredentials: true,
            });

            setLoading(false);
            setEmail("");
            toast.success("Logged in successfully");
            auth.login(res.data.data);
            authDialog.setOpen(false);
        } catch(e: any) {
            setLoading(false);
            const errorMessage = e.response?.data?.message || "Failed to connect to server";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-3 space-y-2">
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Form.Field name="email">
                                {/* <Form.Label htmlFor="email">Email</Form.Label> */}
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    {...register("email")}
                                    disabled={loading}
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                )}
                            </Form.Field>
                            <Form.Field name="password" className="flex flex-col">
                                {/* <Form.Label htmlFor="password">Password</Form.Label> */}
                                <PasswordInput
                                    className="peer"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                    disabled={loading}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>
                                )}
                            </Form.Field>
                        </div>
                        <div>
                            {/* {errors.root && (
                                <span className="text-sm text-red-500">{errors.root.message}</span>
                            )} */}
                        </div>
                        <div className="flex justify-center">
                            <div className="text-primary cursor-pointer" onClick={() => authDialog.setMode("forgot-password")}>
                                Forgot Password ?
                            </div>
                        </div>
                    </div>
                    <Form.Submit asChild>
                        <Button className="w-full bg-primary text-white mt-2"
                            disabled={loading}
                        >
                            {loading ? <Spinner/> : "Login"}
                        </Button>
                    </Form.Submit>
                </div>
            </Form.Root>
        </>
    )
}

export default LoginForm;
