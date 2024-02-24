import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";

type TTextFieldProps = {
  label: string;
  name: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  required?: true;
  type?: "text" | "email" | "date" | "tel";
};

export default function TextField({
  label,
  name,
  error,
  register,
  required,
  type = "text",
}: TTextFieldProps) {
  return (
    <div className="textField">
      <label htmlFor={name} className="textField-label">
        {label}
        {required && <span className="error">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(`${name}`)}
        className={`${
          error?.type === "too_small" ? "textInput-error" : ""
        } textInput`}
      />
      {error && error.type !== "too_small" && (
        <span className="error">{error?.message}</span>
      )}
    </div>
  );
}
