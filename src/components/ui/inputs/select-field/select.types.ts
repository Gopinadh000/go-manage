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