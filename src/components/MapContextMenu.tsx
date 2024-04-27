import React from "react";
import { LngLat } from "mapbox-gl";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

interface IContextMenuProps {
  left: number;
  top: number;
  latlng: LngLat;
}

// Context menu for main map
const MapContextMenu = React.forwardRef<HTMLDivElement, IContextMenuProps>(
  ({ left, top, latlng }, ref) => {
    const { loggedIn } = useAuth();
    // Set modal content with the post view
    const { setModalLoginSignUp, setModalPostForm } = useModal();
    const setModalPostContent = () => {
      if (loggedIn) {
        setModalPostForm(latlng.lat, latlng.lng);
      } else {
        setModalLoginSignUp();
      }
    };

    return (
      <div
        ref={ref}
        className="option-menu context-menu"
        style={{ left, top }}
        onClick={setModalPostContent}
      >
        {loggedIn ? "Add Post" : "Login"}
      </div>
    );
  }
);

export default MapContextMenu;
