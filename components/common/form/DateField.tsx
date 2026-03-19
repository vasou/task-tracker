import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps } from "./types";

export default function DateField({
  label,
  name,
  register,
  error,
}: BaseFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type="date"
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...(register && name ? register(name) : {})}
      />
    </FormFieldWrapper>
  );
}
