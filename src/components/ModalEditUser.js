import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  
  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updateAt)
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
    handleClose();
    console.log(res);
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Job</label>
              <input
                type="text"
                className="form-control"
                placeholder="Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
