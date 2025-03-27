import { useState } from "react";
import "react-phone-number-input/style.css";
import "./App.css";
import FIleUpload from "./components/fileUpload/FIleUpload";
const itemData: { id: number; url: string }[] = [
  {
    url: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    id: 16,
  },
  {
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    id: 19,
  },
  {
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    id: 22,
  },
  {
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    id: 25,
  },
  {
    url: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    id: 45,
  },
  {
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    id: 100,
  },
  {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    id: 105,
  },
];
function App() {
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
  };
  const [phone, setPhone] = useState("");
  console.log("phone", phone);

  const value = {
    url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    id: 105,
  };

  return (
    <>
      <FIleUpload multiple={true} value={itemData} />

      {/* <Formik initialValues={{ mobile: "" }} onSubmit={handleSubmit}>
        <Form>
          <FormPhoneNumber
            name="mobile"
            label="mobilní telefon"
            size="small"
            locale="cs"
          />
          

          <button type="submit">odeslat</button>
        </Form>
      </Formik>
      <MuiPhoneTest value={phone} onChange={(phone) => setPhone(phone)} /> */}
    </>
  );
}

export default App;
