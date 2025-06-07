import { useState } from "react";
import { Dialog, Tabs } from "radix-ui";
import { Cross1Icon } from "@radix-ui/react-icons";
import { AuthMode, useAuthDialog } from "@lib/store/auth-dialog";
import LoginForm from "@ui/LoginForm";
import SignupForm from "@ui/SignupForm";
import ForgotPasswordForm from "@ui/ForgotPasswordForm";
import { useAuth } from "@lib/store/auth";

export default function AuthModal() {
    const authDialog = useAuthDialog();
    const auth = useAuth();

    const [email, setEmail] = useState<string>("");

    return <>
        <Dialog.Root open={!auth.loggedIn && authDialog.isOpen} 
            onOpenChange={
                (open) => {
                    if (authDialog.mode == "forgot-password") authDialog.setMode("login")
                    authDialog.setOpen(open)
                }
            }
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-100" 
                    onPointerDown={(e) => e.stopPropagation()}
                />

                <Dialog.Content 
                    className="fixed top-1/2 left-1/2 z-150 max-w-md w-full max-sm:max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-md"
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-xl font-semibold">
                            {(authDialog.mode == "login") && "Login to your account"}
                            {(authDialog.mode == "signup") && "Create a new account"}
                            {(authDialog.mode == "forgot-password") && "Reset Password"}
                        </Dialog.Title>
                        <Dialog.Close>
                            <Cross1Icon/>
                        </Dialog.Close>
                    </div>
                    
                    { authDialog.mode != "forgot-password" ? (
                    <Tabs.Root
                        defaultValue={authDialog.mode}
                        onValueChange={(val) => authDialog.setMode(val as AuthMode)}
                        className="flex flex-col mb-1 space-y-3"
                    >
                            <Tabs.List>
                                <div className="flex justify-center items-center space-x-3">
                                    <Tabs.Trigger value="login"
                                        className={`flex-1 text-sm font-medium border-b-2 ${authDialog.mode === "login" ? "border-primary text-primary" : "text-gray-600 border-gray-200"}`}
                                    >
                                        Login
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="signup"
                                        className={`flex-1 text-sm font-medium border-b-2 ${authDialog.mode === "signup" ? "border-primary text-primary" : "text-gray-600 border-gray-200"}`}
                                    >
                                        Signup
                                    </Tabs.Trigger>
                                </div>
                            </Tabs.List>
                            <div className="mt-4">
                                <Tabs.Content value="login">
                                    <LoginForm email={email} setEmail={setEmail} />
                                </Tabs.Content>
                                <Tabs.Content value="signup">
                                    <SignupForm email={email} setEmail={setEmail} />
                                </Tabs.Content>
                            </div>
                    </Tabs.Root>
                    ) : 
                        <ForgotPasswordForm email={email} setEmail={setEmail}/>
                    }
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}
