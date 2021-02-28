import { Control, FieldErrors, UseControllerOptions } from "react-hook-form";

export interface HookFormProps {
  control: Control<any>;
  name: string;
  errors: FieldErrors<any>;
  rules?: UseControllerOptions["rules"];
  defaultValue?: any;
}
