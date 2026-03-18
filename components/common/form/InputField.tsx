import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps } from "./types";

type InputFieldProps = BaseFieldProps & {
  type?: string;
};

export default function InputField({
  label,
  name,
  register,
  error,
  type = "text",
}: InputFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type={type}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...register(name)}
      />
    </FormFieldWrapper>
  );
}
