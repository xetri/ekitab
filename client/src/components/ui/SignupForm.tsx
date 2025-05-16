import { Form } from "radix-ui";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { PasswordInput } from "@ui/Input";
import { signupSchema, SignUpData } from "@ekitab/shared/validation/auth";

type Props = {};

function SignupForm({}: Props) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpData>({
        resolver: zodResolver(signupSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    const onSubmit = (data: SignUpData) => {
        console.log(data)
        setError("root", { type: "manual", message: "Email already exists" });
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
                        <Button className="w-full bg-primary text-white mt-3">
                            Signup
                        </Button>
                    </Form.Submit>
                </div>
            </Form.Root>
        </>
    )
}

export default SignupForm;
