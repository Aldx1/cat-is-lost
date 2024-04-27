import Navbar from "react-bootstrap/Navbar";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import { useGeo } from "../contexts/GeoContext";
import { NavbarText } from "react-bootstrap";

const AppNavbar = () => {
  const { setModalLoginSignUp, setModalPostForm } = useModal();

  const { lat, lng } = useGeo();
  const { loggedIn, setApiToken } = useAuth();

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
          <Navbar.Brand href="#" className="m-1" onClick={setModalLoginSignUp}>
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
              onClick={() => setModalPostForm(lat, lng)}
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
