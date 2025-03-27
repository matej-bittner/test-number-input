import "react-international-phone/style.css";

import { useField } from "formik";
import React from "react";
import { PhoneNumber, PhoneNumberProps } from "./PhoneInput";

export interface FormPhoneNumberProps
  extends Omit<PhoneNumberProps, "value" | "onChange"> {
  /**
   * The name of the field, used to identify the field in the form.
   */
  name: string;
}

/**
 * FormPhoneNumber is a component that provides a phone number input field
 * integrated with Formik. It validates the phone number and displays the prefix
 * and flag of the currently selected country. Users can input their phone number conveniently.
 */
export const FormPhoneNumber: React.FC<FormPhoneNumberProps> = ({
  name,
  ...restProps
}) => {
  const [field, meta, helpers] = useField<string>(name);

  const errorMessage = meta.touched && meta.error;
  const isError = meta.touched && Boolean(meta.error);

  return (
    <PhoneNumber
      {...field}
      {...restProps}
      value={field.value}
      helperText={errorMessage}
      error={isError}
      onChange={(value) => helpers.setValue(value)}
    />
  );
};
