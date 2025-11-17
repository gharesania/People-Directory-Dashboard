// Components/AddUserModal.jsx
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import TeamSelector from "../TeamSelector";

const AddUserModal = ({
  show,
  handleClose,
  name,
  email,
  username,
  status,
  role,
  teams,
  gender,
  setName,
  setEmail,
  setUsername,
  setStatus,
  setRole,
  setTeams,
  setGender,
  handleSave,
}) => {
  const [customTeam, setCustomTeam] = useState(""); // NEW: custom team input

  const handleTeamChange = (e) => {
    const selected = [...e.target.selectedOptions].map((o) => o.value);

    setTeams(selected);

    // If "Custom" selected, keep track for input field
    if (selected.includes("Custom")) {
      setCustomTeam("");
    }
  };

  const addCustomTeam = () => {
    if (customTeam.trim() === "") return;

    // Remove "Custom" placeholder and replace with actual value
    const updatedTeams = teams
      .filter((t) => t !== "Custom")
      .concat(customTeam.trim());

    setTeams(updatedTeams);
    setCustomTeam("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
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
                value={role.startsWith("Custom") ? "" : role}
                onChange={(e) => setRole(e.target.value)}
              />
            )}
          </Form.Group>

          {/* Teams */}
          <Form.Group className="mb-3">
            <Form.Label>Select Teams</Form.Label>
            <TeamSelector teams={teams} setTeams={setTeams} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100 add-user">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
