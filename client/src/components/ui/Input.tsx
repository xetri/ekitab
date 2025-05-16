import { forwardRef, InputHTMLAttributes } from "react";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={className}
        {...props}
      />
    );
  }
);

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({className, autoComplete = "current-password", ...props}, ref) => {
  return (
    <div>
      <PasswordToggleField.Root>
        <div className="relative">
          <PasswordToggleField.Input
            ref={ref}
            className={className}
            {...props}
          />
          <PasswordToggleField.Toggle className="absolute inset-y-0 right-1 flex items-center peer-focus:text-primary">
            <PasswordToggleField.Icon
              visible={<EyeOpenIcon />}
              hidden={<EyeClosedIcon />}
            />
          </PasswordToggleField.Toggle>
        </div>
      </PasswordToggleField.Root>
    </div>
  )
});

export default Input;
