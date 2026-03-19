import { FieldError, UseFormRegister } from "react-hook-form";

export type BaseFieldProps = {
  label: string;
  name?: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
};

export type CommonFieldProps = {
  label?: string;
  error?: string;
};

export type Option = {
  label: string;
  value: string;
};
