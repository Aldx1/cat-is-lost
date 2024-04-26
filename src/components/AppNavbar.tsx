import Navbar from "react-bootstrap/Navbar";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import { useGeo } from "../contexts/GeoContext";
import PostForm from "./forms/PostForm";
import LoginSignupTab from "./LoginSignupTab";
import { NavbarText } from "react-bootstrap";

const AppNavbar = () => {
  const { setShowModal, setModalTitle, setModalBodyContent } = useModal();

  const { lat, lng } = useGeo();
  const { loggedIn, setApiToken } = useAuth();

  const setModalLoginContent = () => {
    setModalTitle("Login/Signup");
    setModalBodyContent(<LoginSignupTab />);
    setShowModal(true);
  };

  const setModalPostContent = () => {
    setModalTitle("Create Post");
    setModalBodyContent(<PostForm lat={lat} lng={lng} />);
    setShowModal(true);
  };

  return (
    <>
      <Navbar
        className="option-menu"
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          padding: "5px",
        }}
      >
        {!loggedIn && (
          <Navbar.Brand
            href="#"
            className="m-1"
            onClick={() => setModalLoginContent()}
          >
            Login/Signup
          </Navbar.Brand>
        )}

        {loggedIn && (
          <>
            <Navbar.Brand
              className="m-1"
              href="#"
              onClick={() => setApiToken(null)}
            >
              Logout
            </Navbar.Brand>
            <NavbarText>|</NavbarText>
            <Navbar.Brand
              className="m-1"
              href="#"
              onClick={() => setModalPostContent()}
            >
              Post
            </Navbar.Brand>
          </>
        )}
      </Navbar>
    </>
  );
};

export default AppNavbar;
