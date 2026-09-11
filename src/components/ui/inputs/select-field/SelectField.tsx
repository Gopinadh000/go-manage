import React from "react";
import type { SelectConfig } from "./select.types";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select as SelectField,
  type SelectChangeEvent,
} from "@mui/material";


const Select = ({
  label,
  value,
  options,
  onChange,
  error,
  name,
  disabled = false,
  required = false,
  placeholder = "Select an option",
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-app-text">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <FormControl fullWidth size={"small"}>
        <SelectField
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          displayEmpty
          sx={{
            borderRadius: "4px",
            fontSize: "0.875rem",
            color: "var(--app-text)",
            backgroundColor: "var(--app-surface)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--app-border)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--app-border-strong)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--app-primary-500)",
            },
            "& .MuiSelect-icon": {
              color: "var(--app-text-muted)",
            },
            "& .MuiSelect-select": {
              py: 1.20,
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span className="text-app-text-muted">
                  {placeholder}
                </span>
              );
            }

            const selectedOption = options.find(
              (option) => option.value === selected
            );

            return selectedOption?.label ?? selected;
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  backgroundColor: "var(--app-surface)",
                  color: "var(--app-text)",
                  border: "1px solid var(--app-border)",
                },
              },
            },
          }}
        >
          {options?.length > 0 ?  options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )) : 
           <MenuItem key="" value="" disabled>
              {"No Options"}
            </MenuItem>
          }
        </SelectField>
      </FormControl>

      {error ? (
        <FormHelperText sx={{ color: "var(--app-error)" }}>
          {error}
        </FormHelperText>
      ) : null}
    </div>
  );
};

export default Select;
