import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps } from "./types";

type InputFieldProps = BaseFieldProps & {
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function InputField({
  label,
  name,
  register,
  error,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const isControlled = value !== undefined && onChange;

  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type={type}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...(!isControlled && register && name ? register(name) : {})}
        value={isControlled ? value : undefined}
        onChange={isControlled ? (e) => onChange(e?.target?.value) : undefined}
      />
    </FormFieldWrapper>
  );
}
