import React, { useEffect, useState } from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { ILogin } from "../../models/Login";

interface ILoginFormProps {
  setDisabled: (disable: boolean) => void;
}

const LoginForm = ({ setDisabled }: ILoginFormProps) => {
  // Store login model and form values
  const [loginFormData, setloginFormData] = useState<any>({});
  const [invokeFetch, setInvokeFetch] = useState(false);
  const [loginDetails, setLoginDetails] = useState<ILogin>({
    email: "",
    password: "",
  });

  // useFetch success callback
  const { setApiToken } = useAuth();
  const loginSuccess = (data?: string) => {
    if (data && data.length > 0) setApiToken(`Bearer ${data}`);
  };

  // useFetch hook. Invoke on form submit
  const { loading, error } = useFetch<string>(
    invokeFetch,
    setInvokeFetch,
    "login",
    loginFormData,
    false,
    loginSuccess
  );

  // Disable the parent (tab) if loading
  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  // Handle form submit. Append form data and invoke fetch hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", loginDetails.email);
    formData.append("password", loginDetails.password);

    setloginFormData(loginDetails);
    setInvokeFetch(true);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevLoginDetails) => ({
      ...prevLoginDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              required
              name="email"
              placeholder="Email address"
              value={loginDetails.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              required
              name="password"
              placeholder="Password"
              type="password"
              value={loginDetails.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </Col>
          {error && (
            <Col>
              <p className="form-error-text">
                Error logging in. Please try again
              </p>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
};

export default LoginForm;
