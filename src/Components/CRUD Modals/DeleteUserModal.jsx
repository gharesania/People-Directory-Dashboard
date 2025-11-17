// Components/DeleteUserModal.jsx
import { Modal, Button } from "react-bootstrap";

const DeleteUserModal = ({ show, handleClose, selectedUser, handleDelete }) => {
  if (!selectedUser) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete <strong>{selectedUser.name}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(selectedUser.id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
