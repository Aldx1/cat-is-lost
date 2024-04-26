import React from "react";
import { LngLat } from "mapbox-gl";
import PostForm from "./forms/PostForm";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

interface IContextMenuProps {
  left: number;
  top: number;
  latlng: LngLat;
}

// Context menu for main map
const ContextMenu = React.forwardRef<HTMLDivElement, IContextMenuProps>(
  ({ left, top, latlng }, ref) => {
    // Set modal content with the post view
    const { setShowModal, setModalTitle, setModalBodyContent } = useModal();
    const setModalPostContent = () => {
      if (!loggedIn) {
        alert("please login or sign up to create a post");
        return;
      }

      setModalTitle("Create Post");
      setModalBodyContent(<PostForm lat={latlng.lat} lng={latlng.lng} />);
      setShowModal(true);
    };

    const { loggedIn } = useAuth();

    return (
      <div
        ref={ref}
        className="option-menu context-menu"
        style={{ left, top }}
        onClick={setModalPostContent}
      >
        Add Post
      </div>
    );
  }
);

export default ContextMenu;
