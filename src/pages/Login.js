import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: localStorage.getItem("emailid") || "",
    password: localStorage.getItem("password") || "",
  });
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = inputs;
    if (remember) {
      localStorage.setItem("emailid", email);
      localStorage.setItem("password", password);
    }
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          history.push("/orders");
        } else {
          setError("could not login");
        }
      })
      .catch((error) => {
        setError("could not login", error);
      });
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRememberChange = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <>
      <Card className="Card">
        <Card.Body className="CardBody">
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={inputs.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div>
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={handleRememberChange}
                id="flexCheckChecked"
                checked={remember}
              />
              <label class="form-check-label" for="flexCheckChecked">
                Remember me
              </label>
            </div>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
