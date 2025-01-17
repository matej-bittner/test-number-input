import { Form, Formik } from "formik";
import "react-phone-number-input/style.css";
import "./App.css";
import PhoneNumberInput from "./components/PhoneNumberInput";

function App() {
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  return (
    <>
      <Formik initialValues={{ mobile: "" }} onSubmit={handleSubmit}>
        <Form>
          <PhoneNumberInput name="mobile" defaultCountry="CZ" size="medium" />
          <button type="submit">odeslat</button>
        </Form>
      </Formik>
    </>
  );
}

export default App;
