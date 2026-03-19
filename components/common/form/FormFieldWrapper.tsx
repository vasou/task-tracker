type FormFieldWrapperProps = {
  label: string;
  isRequired?: boolean;
  error?: { message?: string };
  children: React.ReactNode;
};

export default function FormFieldWrapper({
  label,
  isRequired = false,
  error,
  children,
}: FormFieldWrapperProps) {
  return (
    <div>
      <label className="label">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      {children}
      {error && <p className="text-error text-xs mt-1">{error.message}</p>}
    </div>
  );
}
