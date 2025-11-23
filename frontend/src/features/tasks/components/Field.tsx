import React from "react";
import "./Field.css";

interface FieldProps {
  label: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactElement<{ id?: string; className?: string }>;
}

export const Field = ({ label, error, htmlFor, children }: FieldProps) => {
  const fieldId = htmlFor || (children.props as { id?: string }).id;
  const hasError = !!error;
  const existingClassName =
    (children.props as { className?: string }).className || "";

  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      {React.cloneElement(children, {
        className:
          `${existingClassName} ${hasError ? "error" : ""}`.trim() || undefined,
      } as Partial<{ className?: string }>)}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
