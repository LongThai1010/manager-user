import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

function ModalComfirm(props) {
  const { show, handleClose, dataUserDelete, handleDelteUserFromModal } = props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.status === 204) {
      toast.success("Delete the user successfully");
      handleClose();
      handleDelteUserFromModal(dataUserDelete);
    } else {
      toast.error("Delete the user failly");
    }
  };

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
