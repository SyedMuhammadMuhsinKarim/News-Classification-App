import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {
  Container,
  InputGroup,
  Button,
  FormControl,
  Navbar
} from "react-bootstrap";
import axios from "axios";

import { urduText, labels, regexEng } from "./constants";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [label, setLabel] = React.useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (error) return setError(null);
  };

  useEffect(() => {
    if (inputValue && loading) {
      axios
        .post(`https://news-classification-server.herokuapp.com`, {
          text: inputValue
        })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [inputValue, loading]);

  useEffect(() => {
    if (response) {
      setLabel(labels[response.labels]);
    }
  }, [response]);

  return (
    <>
      <AppBar />
      <Container>
        <SubmitForm
          inputValue={inputValue}
          handleChange={handleChange}
          handleOnSubmit={handleOnSubmit}
        />

        {label && (
          <p>
            کٹیگری:
            <span className="badge badge-primary pt-2 pb-2">{label}</span>
          </p>
        )}

        {error && console.log(`Error: ${error}`)}

        <Texts />
      </Container>
    </>
  );
}

const AppBar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home" className="mx-auto">
      {urduText.brand}
    </Navbar.Brand>
  </Navbar>
);

const SubmitForm = ({ handleChange, handleOnSubmit, inputValue }) => (
  <InputGroup className="mt-3 mb-3">
    <FormControl
      placeholder={urduText.inputText}
      className="rounded form-control form-item p-4"
      onChange={handleChange}
    />
    <InputGroup.Prepend>
      <Button
        onClick={handleOnSubmit}
        className="rounded-left"
        variant="danger"
        disabled={!inputValue || regexEng.test(inputValue)}
      >
        {urduText.buttonText}
      </Button>
    </InputGroup.Prepend>
  </InputGroup>
);

const Texts = () => (
  <>
    <h5>
      <b>ضروری ہدایات:</b>
    </h5>
    <ul>
      <li>
        یہ ایپ اردو خبروں کی سرخیوں کی مدد سے اس کا زمرہ (کٹیگری) بتاتی ہے{" "}
      </li>
      <li>
        زمرہ جات میں صرف{" "}
        <b>
          کاروبار، کھیل، صحت، عالمی، سائنس ایںڈ ٹیکنالوجی، شوبز، دلچسپ، اسلام
          اور کورونا وائرس{" "}
        </b>
        شامل ہیں،{" "}
      </li>
      <li>
        یہ ایپ صرف <b>اردو حرف تہجی</b> میں لکھے جملوں پر ہی کارآمد ہے
      </li>
      <li>
        یہ ایک مصنوعی ذہانت (مشین لرننگ) پر لکھی گئی ایپلیکیشن ہے جس کی ایکوریسی
        ریٹ 88 ٪ہے۔لہذا غلطیوں کا امکان موجود ہے۔
      </li>
    </ul>
  </>
);
