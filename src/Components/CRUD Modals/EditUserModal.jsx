import { Modal, Form, Button } from "react-bootstrap";
import TeamSelector from "../TeamSelector";
import { Camera, Trash2 } from "lucide-react";

const EditUserModal = ({
  show,
  handleClose,
  selectedUser,
  name,
  email,
  username,
  status,
  role,
  teams,
  gender,
  profileURL,
  setName,
  setEmail,
  setUsername,
  setStatus,
  setRole,
  setTeams,
  setGender,
  setProfileURL,
  handleSave,
}) => {
  if (!selectedUser) return null;

  const DEFAULT_PROFILE_URL =
    "https://i.pravatar.cc/150?u=default";

  const handleRemovePhoto = () => {
    setProfileURL(DEFAULT_PROFILE_URL);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileURL(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={profileURL || selectedUser.profileURL}
              alt="Profile"
              className="rounded-circle border border-2 shadow-sm"
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
              }}
            />

            <div className="d-flex justify-content-center gap-2 mt-3">

              {/* Change photo */}
              <label className="btn btn-outline-secondary">
                <Camera size={16} className="me-2" />
                Change Photo
                {/* <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  // onChange={handlePhotoChange}
                /> */}
              </label>

              {/* Remove photo */}
              <Button
                variant="outline-danger"
                // onClick={handleRemovePhoto}
              >
                <Trash2 size={16} className="me-2" />
                Remove Photo
              </Button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Product Designer">Product Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="UX Designer">UX Designer</option>
                <option value="UX Copywriter">UX Copywriter</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Custom">Custom</option>
              </Form.Select>

              {role === "Custom" && (
                <Form.Control
                  className="mt-2"
                  placeholder="Enter custom role"
                  onChange={(e) => setRole(e.target.value)}
                />
              )}
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Banned">Banned</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </div>

            <div className="col-12 mb-3">
              <Form.Label>Teams</Form.Label>
              <TeamSelector teams={teams} setTeams={setTeams} />
            </div>

            <div className="col-12 mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" className="add-user">
              Save
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
