import { FieldErrors } from "react-hook-form";

interface ValidationProps {
  label: string;
  errors: FieldErrors;
}

export const Validation = ({ label, errors }: ValidationProps) => (
  <div className="row d-flex align-items-center">
    <div className="col-0 col-md-3"></div>
    <div className="col-12 col-md-4 text-danger small">
      {errors[label] && <div>必須項目です</div>}
    </div>
  </div>
);
