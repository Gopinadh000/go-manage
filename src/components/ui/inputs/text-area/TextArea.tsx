import React from "react";
import { getTextAreaClasses } from "./textarea.styles";
import type { TextAreaProps } from "./textarea.types";

const TextArea = ({
  label,
  value,
  placeholder = "Enter Description",
  required,
  disabled,
  readOnly,
  rows = 4,
  maxLength,
  error,
  helperText,
  onChange,
  onBlur,
}: TextAreaProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-app-text">
          {label}
          {required && <span className="ml-1 text-app-error"> *</span>}
        </label>
      )}
      <textarea
        className={getTextAreaClasses({ error, disabled })}
        readOnly={readOnly}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        rows={rows}
      />
      {error && <p className="mt-1 text-xs text-app-error">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-app-text-muted">{helperText}</p>
      )}
    </div>
  );
};

export default TextArea;
