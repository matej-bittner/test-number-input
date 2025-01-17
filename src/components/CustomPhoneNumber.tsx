import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export type phoneInputInt = TextFieldProps & {};
const PhoneInput = forwardRef<HTMLInputElement, phoneInputInt>(
  ({ ...props }, ref) => {
    return (
      <TextField
        {...props}
        sx={{
          "& label": { paddingLeft: (theme) => theme.spacing(2) },
          //   "& input": { paddingLeft: (theme) => theme.spacing(3.5) },
          "& fieldset": {
            paddingLeft: (theme) => theme.spacing(2.5),
            borderRadius: "0px",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          },
        }}
        inputRef={ref}
        fullWidth
        size="small"
        label="Phone Number"
        variant="outlined"
        name="phone"
      />
    );
  }
);

export default PhoneInput;
