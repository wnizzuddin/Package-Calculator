import React, { useState } from "react";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import circle from "../images/circle.png";

const Calculator = () => {
  let colorValue;
  let checkRM;
  const [FormData, setFormData] = useState();
  const [raw, setRaw] = useState();
  const [amount, setAmount] = useState();
  const [total, setTotal] = useState();
  const [pack, setPack] = useState();
  const [size, setSize] = useState();
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (field) => {
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const RawValue = (event) => {
    setRaw(event.target.value);
  };

  const AmountValue = (event) => {
    setAmount(event.target.value);
  };

  const WeightageArr = [
    [4.4, 7.4, 10.4, 7.4, 14.4, 21.4],
    [7.4, 10.4, 13.4, 14.4, 21.4, 28.4],
    [10.4, 13.4, 16.4, 21.4, 28.4, 35.4],
    [13.4, 16.4, 19.4, 28.4, 35.4, 42.4],
    [16.4, 19.4, 22.4, 35.4, 42.4, 49.4],
    [19.4, 22.4, 25.4, 42.4, 49.4, 56.4],
  ];

  const SubmitForm = (event) => {
    event.preventDefault();

    const FormData = {
      package: "",
      companysize: "",
      raw: "",
      amount: "",
    };
    FormData.package = event.target.package.value;
    FormData.companysize = event.target.companysize.value;
    FormData.raw = Number(event.target.rawmaterials.value);
    FormData.amount = Number(event.target.productamount.value);

    const findFormErrors = () => {
      const newErrors = {};
      if (FormData.package === "default") {
        newErrors.package = "Package must be selected";
      }
      if (FormData.companysize === "default") {
        newErrors.companysize = "Size must be selected";
      }
      return newErrors;
    };

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("no error");
    }

    const RawResult = (limitCol) => {
      if (FormData.raw < 51) {
        if (limitCol == 0 || limitCol == 3) {
          colorValue = "1";
        }
        if (limitCol == 1 || limitCol == 4) {
          colorValue = "2";
        }
        return WeightageArr[0][limitCol];
      } else if (FormData.raw > 52 && FormData.raw < 101) {
        if (limitCol == 0 || limitCol == 3) {
          colorValue = "1";
        }
        if (limitCol == 1 || limitCol == 4) {
          colorValue = "2";
        }
        return WeightageArr[1][limitCol];
      } else if (FormData.raw > 102 && FormData.raw < 151) {
        if (limitCol == 0 || limitCol == 1 || limitCol == 3 || limitCol == 4) {
          colorValue = "2";
        }
        return WeightageArr[2][limitCol];
      } else if (FormData.raw > 152 && FormData.raw < 201) {
        if (limitCol == 0 || limitCol == 1 || limitCol == 3 || limitCol == 4) {
          colorValue = "2";
        }
        return WeightageArr[3][limitCol];
      } else if (FormData.raw > 202 && FormData.raw < 251) {
        colorValue = "3";
        return WeightageArr[4][limitCol];
      } else {
        colorValue = "3";
        return WeightageArr[5][limitCol];
      }
    };

    let weightageValue;
    let diff;

    if (FormData.companysize === "small") {
      diff = WeightageArr[0][1] - WeightageArr[0][0];
      if (FormData.amount < 51) {
        // limitCol = 0;
        weightageValue = RawResult(0);
      } else if (FormData.amount > 50 && FormData.amount < 101) {
        // limitCol = 1;
        weightageValue = RawResult(1);
      } else {
        // limitCol = 2;
        weightageValue = RawResult(2);
        colorValue = "3";
      }
    }

    if (FormData.companysize === "medium") {
      diff = WeightageArr[0][4] - WeightageArr[0][3];
      if (FormData.amount < 51) {
        weightageValue = RawResult(3);
      } else if (FormData.amount > 50 && FormData.amount < 101) {
        // limitCol = 4;
        weightageValue = RawResult(4);
      } else {
        // limitCol = 5;
        weightageValue = RawResult(5);
        colorValue = "3";
      }
    }

    let temp = weightageValue * (diff * 555);
    let totalPrice;

    switch (FormData.package) {
      case "silver":
        totalPrice = temp;
        break;
      case "diamond":
        totalPrice = temp + colorValue * (2746 + 333);
        break;
      case "platinum":
        totalPrice = temp + colorValue * (2746 + 333 + 1000);
        break;
    }
    totalPrice = totalPrice.toFixed(2);
    setTotal(
      totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    );
    console.log("Executed!");
    // event.preventDefault();
  };

  return (
    <Container>
      <br />
      <h3 style={{ fontWeight: "bold" }}>Calculate Your Price Here!</h3>
      <h6>Developed by HLSB Dev Team</h6>
      <br />
      <Row>
        <Col sm={7}>
          <Card style={{ height: "100%" }}>
            <Card.Body>
              <Container>
                <Form validated={validated} onSubmit={SubmitForm}>
                  <Row>
                    <Col variant="sm" style={{ fontWeight: "bold" }}>
                      Select Package
                    </Col>
                    <FormGroup className="mb-3" controlId="package">
                      <Form.Control
                        as="select"
                        required
                        type="text"
                        style={{ marginTop: 10 }}
                        value={pack}
                        defaultValue={"default"}
                        onChange={(e) => setField("package", e.target.value)}
                        isInvalid={!!errors.package}
                      >
                        <option value={"default"} disabled>
                          Select a package
                        </option>
                        <option value="silver">Silver</option>
                        <option value="diamond">Diamond</option>
                        <option value="platinum">Platinum</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.package}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Row>

                  <Row>
                    <Col variant="sm" style={{ fontWeight: "bold" }}>
                      Company Size
                    </Col>
                    <FormGroup className="mb-3" controlId="companysize">
                      <Form.Control
                        as="select"
                        style={{ marginTop: 10 }}
                        value={size}
                        defaultValue={"default"}
                        onChange={(e) =>
                          setField("companysize", e.target.value)
                        }
                        isInvalid={!!errors.companysize}
                      >
                        <option value={"default"} disabled>
                          Select your company size
                        </option>
                        <option value="small">Small / Micro</option>
                        <option value="medium">Medium / Large</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.companysize}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Row>

                  <Row>
                    <Col style={{ fontWeight: "bold" }}>No. of Products</Col>
                    <Row>
                      <Col xs={8}>
                        <FormGroup className="mb-3" controlId="productamount">
                          <Form.Range
                            onChange={AmountValue}
                            style={{ paddingTop: 20 }}
                            value={amount ? amount : 1}
                            min={1}
                            max={150}
                          ></Form.Range>
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <Form.Control
                          placeholder={amount}
                          type="text"
                          onChange={AmountValue}
                          value={amount ? amount : 1}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Row>

                  <Row>
                    <Col style={{ fontWeight: "bold" }}>Raw Materials</Col>
                    <Row>
                      <Col xs={8}>
                        <FormGroup className="mb-3" controlId="rawmaterials">
                          <Form.Range
                            onChange={RawValue}
                            min={1}
                            max={300}
                            style={{ paddingTop: 20 }}
                            value={raw ? raw : 1}
                          ></Form.Range>
                        </FormGroup>
                      </Col>
                      <Col xs={4}>
                        <Form.Control
                          onChange={RawValue}
                          placeholder={raw}
                          type="text"
                          value={raw ? raw : 1}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Row>

                  <div className="d-grid gap-2 mt-4">
                    <Button
                      size="lg"
                      type="submit"
                      style={{ backgroundColor: "#0E2D35", border: 1 }}
                    >
                      Calculate
                    </Button>
                  </div>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={5}>
          <Card style={{ height: "100%", width: "100%" }}>
            <Card.Body>
              <CardImg variant="top" src={circle} style={{}}></CardImg>
            </Card.Body>

            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "20%",
                right: "20%",
                fontWeight: "bold",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              TOTAL
              <br />
              {(checkRM = total === undefined) ? "" : "RM " + total}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
