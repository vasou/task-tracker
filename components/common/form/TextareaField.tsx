import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps } from "./types";

export default function TextareaField({
  label,
  name,
  register,
  error,
}: BaseFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <textarea
        className={`textarea textarea-bordered w-full ${
          error ? "textarea-error" : ""
        }`}
        {...(register && name ? register(name) : {})}
      />
    </FormFieldWrapper>
  );
}
