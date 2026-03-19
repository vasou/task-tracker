import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps, Option } from "./types";

type SelectFieldProps = BaseFieldProps & {
  options: readonly Option[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function SelectField({
  label,
  name,
  register,
  options,
  error,
  value,
  onChange,
}: SelectFieldProps) {
  const isControlled = value !== undefined && onChange;

  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        className={`select select-bordered w-full ${
          error ? "select-error" : ""
        }`}
        {...(!isControlled && register && name ? register(name) : {})}
        value={isControlled ? value : undefined}
        onChange={isControlled ? (e) => onChange(e?.target?.value) : undefined}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
}
