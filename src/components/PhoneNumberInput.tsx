// import * as React from "react";
// import { Controller, useFormContext } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import PhoneInput, { Value } from "react-phone-number-input";
import cz from "react-phone-number-input/locale/cz.json";
import es from "react-phone-number-input/locale/es.json";
import fr from "react-phone-number-input/locale/fr.json";
import "react-phone-number-input/style.css";

import { useField } from "formik";
import { Country } from "react-phone-number-input";
import CountrySelect from "./CountrySelect";
import CustomPhoneNumber from "./CustomPhoneNumber";
// import phone from "phone";

export type IKey = {
  [key: string]: any;
};

const PhoneNumberInput = ({
  name,
  defaultCountry,

  variant,
  id,

  disabled,
  size = "small",
}: FormPhoneNumber) => {
  //
  const [field, meta, helpers] = useField<unknown>(name);

  const errorMessage = meta.touched && meta.error;
  const isError = meta.touched && Boolean(meta.error);

  const onChange = (value: Value) => {
    helpers.setValue(value);
  };

  const localeCodes: IKey = { es, fr, cz };
  const lngCode = "cz";

  return (
    <PhoneInput
      size={size}
      disabled={disabled}
      id={id}
      variant={variant}
      name={field.name}
      value={field.value as Value}
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
  );
};

export default PhoneNumberInput;
export type FormPhoneNumber = TextFieldProps & {
  name: string;
  defaultCountry?: Country;
  readonly?: boolean;
};
