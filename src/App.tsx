import { Form, Formik } from "formik";
import { ComponentProps, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";
import PhoneNumberInput from "./components/PhoneNumberInput";

function App() {
  const [value, setValue] =
    useState<ComponentProps<typeof PhoneInput>["value"]>();
  console.log("value", value);

  const onChange: ComponentProps<typeof PhoneInput>["onChange"] = (value) => {
    setValue(value);
  };
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Zde můžeš odeslat data na server nebo provést jinou akci
  };
  return (
    <>
      <Formik initialValues={{ mobile: "" }} onSubmit={handleSubmit}>
        <Form>
          <PhoneNumberInput name="mobile" defaultCountry="CZ" />
          <button type="submit">odeslat</button>
        </Form>
      </Formik>
    </>
  );
}

export default App;
