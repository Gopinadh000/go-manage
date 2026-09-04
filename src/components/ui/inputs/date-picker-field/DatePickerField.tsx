import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { DatePickerProps } from "./date-picker.types";

const DatePickerField = ({
  label,
  value,
  required = false,
  disabled = false,
  error,
  placeholder = "Select date",
  onChange,
}: DatePickerProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-app-text">
          {label}
          {required && <span className="ml-1 text-red-500">* </span>}
        </label>
      )}

      <DesktopDatePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        format="DD/MM/YYYY"
        slotProps={{
          field: {
            clearable: true,
          },
          textField: {
            fullWidth: true,
            size: "small",
            //  placeholder={placeholder},
            error: !!error,
            helperText: error,
          },
        }}
        sx={{
          width: "100%",

          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            backgroundColor: "var(--app-surface)",
            color: "var(--app-text)",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--app-border)",
          },

          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--app-border-strong)",
          },

          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "var(--app-primary-500)",
            },

          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
            paddingTop: "8px",
            paddingBottom: "8px",
          },

          "& .MuiSvgIcon-root": {
            color: "var(--app-text-muted)",
          },
        }}
      />
    </div>
  );
};

export default DatePickerField;
