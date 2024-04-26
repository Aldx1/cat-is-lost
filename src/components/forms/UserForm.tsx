import React, { useEffect, useState } from "react";
import { Button, Row, Form, Col } from "react-bootstrap";
import { IUser } from "../../models/User";
import { useFetch } from "../../hooks/useFetch";

interface IUserFormProps {
  setDisabled: (disable: boolean) => void;
}

const UserForm = ({ setDisabled }: IUserFormProps) => {
  // Store user model and form values
  const [userFormData, setUserFormData] = useState<any>({});
  const [invokeFetch, setInvokeFetch] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // useFetch hook. Invoke on form submit
  const { loading, error } = useFetch<string>(
    invokeFetch,
    setInvokeFetch,
    "users",
    userFormData,
    false
  );

  // Disable parent (tab) if fetch is loading
  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  // Handle form submit. Append form data and invoke fetch hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);
    formData.append("phone", userDetails.phone);

    setUserFormData(formData);
    setInvokeFetch(true);
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
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
              name="name"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              name="phone"
              placeholder="Phone number"
              value={userDetails.phone}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Control
              required
              name="email"
              placeholder="Email address"
              //type="email"
              value={userDetails.email}
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
              value={userDetails.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit">Submit</Button>
          </Col>
          {error && (
            <Col>
              <p className="form-error-text">Error creating user.</p>
            </Col>
          )}
        </Row>
      </Form>
    </>
  );
};

export default UserForm;
