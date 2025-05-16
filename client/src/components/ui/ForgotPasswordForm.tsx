import { Form } from "radix-ui";
import { Button } from '@radix-ui/themes';
import { useAuthDialog } from '@lib/store/auth-dialog'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@ui/Input";
import { ForgotPasswordData, forgotPasswordSchema } from "@ekitab/shared/validation/auth";

type Props = {}

function ForgotPasswordForm({}: Props) {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ForgotPasswordData>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit"
  });
  const authDialog = useAuthDialog();

  const onSubmit = (data : ForgotPasswordData) => {
    console.log(data)
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