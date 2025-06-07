import axios from "axios";
import { Form } from "radix-ui";
import { Button } from '@radix-ui/themes';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import config from "@/config";
import { useAuthDialog } from '@lib/store/auth-dialog'
import Input from "@ui/Input";
import { ForgotPasswordData, forgotPasswordSchema } from "@ekitab/shared/validation/auth";

type Props = {
    email: string;
    setEmail: (email: string) => void;
}

function ForgotPasswordForm({ email, setEmail }: Props) {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<ForgotPasswordData>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit"
  });
  const authDialog = useAuthDialog();

  const onSubmit = async (data : ForgotPasswordData) => {
    clearErrors("root");
    
    try {
      await axios.post(config.API_URL + "/reset-password", data, {
        withCredentials: true,
      });
      authDialog.setMode("login");
      toast.info("Check your email for the reset link");
    } catch(e: any) {
      const errorMessage = e.response?.data?.message || "Failed to connect to server";
      toast.error(errorMessage);
    }
  }

  return (<>
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-3 space-y-4">
        <div className="space-y-2">
          <Form.Field name="email">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
          </Form.Field>
          <Form.Field name="confirmEmail">
            <Input
                type="email"
                placeholder="Confirm Email"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <span className="text-sm text-red-500">{errors.confirmEmail.message}</span>
              )}
          </Form.Field>
        </div>
        <div>
          {errors.root && (
              <span className="text-sm text-red-500">{errors.root.message}</span>
          )}
        </div>
        <div className="space-y-1 mt-1">
          <Button 
            type="submit" 
            className="w-full bg-primary text-white mt-1"
          >
            Reset
          </Button>
          <Button 
            type="button" 
            className="w-full border border-black bg-gray-50 text-black"
            onClick={ () => authDialog.setMode("login") }
          >
            Back to Login
          </Button>
        </div>
      </div>
    </Form.Root>
  </>
  )
}

export default ForgotPasswordForm;