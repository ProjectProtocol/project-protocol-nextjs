import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import Feedback from "react-bootstrap/Feedback";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React from "react";

interface IInput extends FormControlProps {
  name?: string;
  error?: string;
  type?: "text" | "email" | "password" | "tel" | "zip";
  controlId?: string;
  label: string;
}

const Input: React.FC<IInput & FormControlProps> = React.forwardRef<
  HTMLInputElement,
  IInput
>(({ error, controlId, type = "text", label, ...props }, ref) => {
  return (
    <FloatingLabel
      label={label}
      controlId={controlId || label.replace(" ", "-")}
    >
      <FormControl {...props} type={type} ref={ref} placeholder={label} />
      <Feedback type="invalid">{error}</Feedback>
    </FloatingLabel>
  );
});

Input.displayName = "Input";

export default Input;
