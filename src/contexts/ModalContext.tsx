import React, { createContext, useContext, useState, ReactNode } from "react";

interface IModalContext {
  showModal: boolean;
  setShowModal: (show: boolean) => void;

  modalTitle: string;
  setModalTitle: (title: string) => void;

  modalBodyContent: React.ReactNode | null;
  setModalBodyContent: (content: React.ReactNode | null) => void;

  closeModal: () => void;
}

const ModalContext = createContext<IModalContext>({
  showModal: false,
  setShowModal: () => {},
  modalTitle: "",
  setModalTitle: () => {},
  modalBodyContent: null,
  setModalBodyContent: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

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

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        modalTitle,
        setModalTitle,
        modalBodyContent,
        setModalBodyContent,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
