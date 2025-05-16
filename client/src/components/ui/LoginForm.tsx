import { Form } from "radix-ui";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { PasswordInput } from "@ui/Input";
import { useAuthDialog } from "@lib/store/auth-dialog";
import { loginSchema, LoginData } from "@ekitab/shared/validation/auth";

type Props = {};

function LoginForm({}: Props) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        reValidateMode: "onChange"
    });
    const authDialog = useAuthDialog()

    const onSubmit = (data: LoginData) => {
        console.log(data)
        setError("root", { type: "manual", message: "Invalid login credentials" });
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
                                    {...register("email")}
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
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">{errors.password.message}</span>
                                )}
                            </Form.Field>
                        </div>
                        <div>
                            {errors.root && (
                                <span className="text-sm text-red-500">{errors.root.message}</span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <div className="text-primary cursor-pointer" onClick={() => authDialog.setMode("forgot-password")}>
                                Forgot Password ?
                            </div>
                        </div>
                    </div>
                    <Form.Submit asChild>
                        <Button className="w-full bg-primary text-white mt-2">
                            Login
                        </Button>
                    </Form.Submit>
                </div>
            </Form.Root>
        </>
    )
}

export default LoginForm;
