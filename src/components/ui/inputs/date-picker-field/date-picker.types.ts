
import type { Dayjs } from "dayjs";
export interface DatePickerProps {
    label? : string;
    value :  Dayjs | null;
    onChange : (value : Dayjs) => void;
    required? : boolean;
    disabled? : boolean;
    error? : string;
    name? : string;
};

