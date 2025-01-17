// import * as React from "react";
// import { Controller, useFormContext } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import cz from "react-phone-number-input/locale/cz.json";
import es from "react-phone-number-input/locale/es.json";
import fr from "react-phone-number-input/locale/fr.json";
import "react-phone-number-input/style.css";
// import {
//   TextField,
//   Select as MuiSelect,
//   MenuItem,
//   ListItemIcon
// } from "@material-ui/core";
import { useField } from "formik";
import { ComponentProps } from "react";
import { Country } from "react-phone-number-input";
import CountrySelect from "./CountrySelect";
import CustomPhoneNumber from "./CustomPhoneNumber";
// import phone from "phone";
type PhoneInputProps = React.ComponentProps<typeof PhoneInput>;
type ValueType = React.ComponentProps<typeof PhoneInput>["value"];
export type IKey = {
  [key: string]: any;
};

// interface ISelectProps
//   extends React.ComponentProps<typeof CountrySelectComponent> {
//   iconComponent?: any;
// }

// const Select = ({
//   options,
//   onChange,
//   iconComponent: Icon,
//   ...rest
// }: ISelectProps) => (
//   <MuiSelect
//     {...rest}
//     defaultValue="US"
//     margin="dense"
//     variant="outlined"
//     renderValue={(selected) => Icon({ country: selected })}
//     onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
//       onChange!((event.target.value as string) || "");
//     }}
//     MenuProps={{
//       anchorOrigin: {
//         vertical: "bottom",
//         horizontal: "left"
//       },
//       elevation: 0,
//       // keepMounted: true,
//       disablePortal: true,
//       getContentAnchorEl: null,
//       transformOrigin: {
//         vertical: "top",
//         horizontal: "left"
//       }
//     }}
//   >
//     {options?.map(({ label, value }) => {
//       return (
//         <MenuItem key={value + label} value={value}>
//           <ListItemIcon>{Icon({ country: value })}</ListItemIcon>
//           {label}
//         </MenuItem>
//       );
//     })}
//   </MuiSelect>
// );

const PhoneNumberInput = ({
  name,
  defaultCountry,
  ...props
}: FormPhoneNumber) => {
  //
  const [field, meta, helpers] = useField<unknown>(name);

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (props.onChange) {
  //     props.onChange(event);
  //   }
  //   helpers.setValue(event.target.value);
  // };
  const errorMessage = meta.touched && meta.error;
  const isError = meta.touched && Boolean(meta.error);

  const onChange: ComponentProps<typeof PhoneInput>["onChange"] = (value) => {
    helpers.setValue(value);
  };

  const localeCodes: IKey = { es, fr, cz };
  const lngCode = "cz";

  return (
    <div>
      <PhoneInput
        // {...props}

        name={field.name}
        value={field.value as Country}
        onChange={onChange}
        onBlur={field.onBlur}
        placeholder="Enter phone number"
        defaultCountry={defaultCountry}
        labels={localeCodes[lngCode]}
        international={true}
        countrySelectComponent={CountrySelect}
        inputComponent={CustomPhoneNumber}
        helperText={errorMessage}
        error={isError}
      />
    </div>
  );
};

export default PhoneNumberInput;
export type FormPhoneNumber = TextFieldProps & {
  name: string;
  defaultCountry?: Country;
};
