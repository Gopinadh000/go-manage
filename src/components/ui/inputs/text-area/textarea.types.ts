import type { ChangeEvent,FocusEvent , ReactNode } from "react";


export interface TextAreaProps {
    label : string;
    placeholder? :string;
    name : string;
    value :string;
  
   

    required?  : boolean;
    readOnly? : boolean;
    disabled? : boolean;

    rows? : number;
    maxLength? : number;

    error? : string;
    helperText? :string;

     startAdornment?: ReactNode;

    onChange : (event : ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur? :  (event : FocusEvent<HTMLTextAreaElement>) => void;

}