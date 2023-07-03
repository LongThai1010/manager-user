import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ModalComfirm(props) {
  const { show, handleClose, dataUserDelete } = props;

  const confirmDelete = () => {};

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete the user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Do you now Delete this user!!! vs name: {dataUserDelete.first_name}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComfirm;
