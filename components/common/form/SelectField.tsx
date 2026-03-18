import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFieldProps, Option } from "./types";

type SelectFieldProps = BaseFieldProps & {
  options: Option[];
};

export default function SelectField({
  label,
  name,
  register,
  options,
  error,
}: SelectFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        className={`select select-bordered w-full ${
          error ? "select-error" : ""
        }`}
        {...register(name)}
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
