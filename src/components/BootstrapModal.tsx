import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useModal } from "../contexts/ModalContext";

// Bootstrap modal used to display app forms and views
const BModal = () => {
  const { modalTitle, modalBodyContent, showModal, closeModal } = useModal();

  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
        <Button className="btn-close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>{modalBodyContent}</Modal.Body>
    </Modal>
  );
};

export default BModal;
