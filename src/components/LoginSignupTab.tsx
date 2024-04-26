import Nav from "react-bootstrap/Nav";

import { useState } from "react";
import UserForm from "./forms/UserForm";
import LoginForm from "./forms/LoginForm";

enum TabName {
  LOGIN = "Login",
  SIGNUP = "SignUp",
}

const LoginSignupTab = () => {
  const [activeTab, setActiveTab] = useState(TabName.LOGIN);
  const [disabled, setDisabled] = useState(false);

  const handleTabSelect = (tab: TabName) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Nav variant="underline">
        <Nav.Link
          disabled={disabled}
          active={activeTab === TabName.LOGIN}
          onClick={() => handleTabSelect(TabName.LOGIN)}
        >
          Login
        </Nav.Link>
        <Nav.Link
          disabled={disabled}
          active={activeTab === TabName.SIGNUP}
          onClick={() => handleTabSelect(TabName.SIGNUP)}
        >
          Sign up
        </Nav.Link>
      </Nav>

      {activeTab === TabName.LOGIN && <LoginForm setDisabled={setDisabled} />}
      {activeTab === TabName.SIGNUP && <UserForm setDisabled={setDisabled} />}
    </div>
  );
};

export default LoginSignupTab;
