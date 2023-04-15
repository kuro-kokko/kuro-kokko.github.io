import { Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../pages/register";
import { Validation } from "./Validation";
import { LabelRequired } from "./LabelRequired";
import { LabelAuto } from "./LabelAuto";

type InputProps = {
  name: string;
  label: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  errors: any;
  value?: string;
  isAuto?: boolean;
  size?: string;
};

export const Textbox = ({
  name,
  label,
  register,
  required,
  maxLength,
  minLength,
  errors,
  isAuto,
  size,
}: InputProps) => (
  <>
    <div className="col-12 col-md-3">
      <div className={`${errors[label] ? "text-danger fw-bold" : ""}`}>
        {name}
        <LabelRequired required={required}></LabelRequired>
        <LabelAuto isAuto={isAuto}></LabelAuto>
      </div>
    </div>
    <div
      className={`col-12 ${
        size === "small"
          ? "col-md-4"
          : size === "large"
          ? "col-md-8"
          : "col-md-6"
      }`}
    >
      <input
        type="text"
        className={`form-control ${errors[label] ? "error" : ""}`}
        {...register(label, { required, maxLength, minLength })}
      />
    </div>
    <div className="pt-1">
      <Validation label={label} errors={errors} />
    </div>
  </>
);
