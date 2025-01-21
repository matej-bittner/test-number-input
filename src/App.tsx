import { Form, Formik } from "formik";
import { useState } from "react";
import "react-phone-number-input/style.css";
import "./App.css";
import { MuiPhone } from "./components/MuiPhone";
import { MuiPhoneTest } from "./components/MuiPhoneTest";

function App() {
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  const [phone, setPhone] = useState("");
  return (
    <>
      <div>
        <MuiPhoneTest value={phone} onChange={(phone) => setPhone(phone)} />
        <button onClick={() => console.log(phone)}></button>
      </div>
      <Formik initialValues={{ mobile: "+420" }} onSubmit={handleSubmit}>
        <Form>
          <MuiPhone
            name="mobile"
            label="mobilní telefon"
            size="small"
            dropdownCountries={["cz", "us", "ec"]}
          />

          <button type="submit">odeslat</button>
        </Form>
      </Formik>
    </>
  );
}

export default App;
