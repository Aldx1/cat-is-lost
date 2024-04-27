import React, { createContext, useContext, useState, ReactNode } from "react";
import PostForm from "../components/forms/PostForm";
import LoginSignupTab from "../components/LoginSignupTab";
import PostView from "../components/PostView";
import { IPost } from "../models/Post";

interface IModalContext {
  showModal: boolean;
  modalTitle: string;
  modalBodyContent: React.ReactNode | null;
  setModalLoginSignUp: () => void;
  setModalPostForm: (lat: number, lng: number) => void;
  setModalPostView: (post: IPost) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext>({
  showModal: false,
  modalTitle: "",
  modalBodyContent: null,
  setModalLoginSignUp: () => {},
  setModalPostForm: () => {},
  setModalPostView: () => {},
  closeModal: () => {},
});

interface IModalProviderProps {
  children: ReactNode;
}

// Modal context to show modal, define children and define content.
export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalBodyContent, setModalBodyContent] =
    useState<React.ReactNode | null>(null);

  const closeModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalBodyContent(null);
  };

  const setModalLoginSignUp = () => {
    setModalTitle("Login/Signup");
    setModalBodyContent(<LoginSignupTab />);
    setShowModal(true);
  };

  const setModalPostForm = (lat: number, lng: number) => {
    setModalTitle("Create Post");
    setModalBodyContent(<PostForm lat={lat} lng={lng} />);
    setShowModal(true);
  };

  const setModalPostView = (post: IPost) => {
    setModalTitle(`${post.name}`);
    setModalBodyContent(<PostView {...post} />);
    setShowModal(true);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        modalTitle,
        modalBodyContent,
        setModalLoginSignUp,
        setModalPostForm,
        setModalPostView,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
