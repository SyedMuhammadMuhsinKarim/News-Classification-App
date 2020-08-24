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

const urduText = {
  inputText: "نیوز ٹائٹل",
  buttonText: "سبمنٹ"
};

const labels = {
  "6": "کاروبار",
  "3": "شوبز (ثقافت)",
  "5": "عالمی",
  "1": "دلچسپ و عجیب",
  "4": "صحت",
  "8": "کھیل",
  "2": "سائنس و ٹیکنالوجی",
  "7": "کورونا وائرس",
  "0": "اسلامی"
};

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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="mx-auto">
          نیوز ٹائٹل کٹیگریئزر
        </Navbar.Brand>
      </Navbar>
      <Container>
        <InputGroup className="mt-3 mb-3">
          <FormControl
            placeholder={urduText.inputText}
            className="rounded form-control form-item"
            onChange={handleChange}
          />
          <InputGroup.Prepend>
            <Button
              onClick={handleOnSubmit}
              className="rounded-left"
              variant="danger"
              disabled={!inputValue}
            >
              {urduText.buttonText}
            </Button>
          </InputGroup.Prepend>
        </InputGroup>

        {label && (
          <p>
            کٹیگری:
            <span className="badge badge-primary pt-2 pb-2">{label}</span>
          </p>
        )}

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
              کاروبار، کھیل، صحت، عالمی، سائنس ایںڈ ٹیکنالوجی، شوبز، دلچسپ،
              اسلام اور کورونا وائرس{" "}
            </b>
            شامل ہیں،{" "}
          </li>
          <li>
            یہ ایپ صرف <b>اردو حرف تہجی</b> میں لکھے جملوں پر ہی کارآمد ہے
          </li>
          <li>
            یہ ایک مصنوعی ذہانت (مشین لرننگ) پر لکھی گئی ایپلیکیشن ہے جس کی
            ایکوریسی ریٹ 88 ٪ہے۔لہذا غلطیوں کا امکان موجود ہے۔
          </li>
        </ul>
      </Container>
    </>
  );
}
