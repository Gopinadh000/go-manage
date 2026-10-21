import type { SelectChangeEvent } from '@mui/material/Select'

export interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface SelectConfig {
  label?: string;
  required?: boolean;
  placeholder?: string;

  staticData?: boolean;
  staticOptions?: SelectOption[];

  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  options: SelectOption[];
  onChange: (event: SelectChangeEvent) => void;
  error?: string;
  name: string;
  disabled?: boolean;
}