// Components/UserMenu/UserMenu.jsx
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { User, Settings, LogOut } from "lucide-react";

const UserMenu = ({ user }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        id="profile-menu"
        className="d-flex align-items-center border-0 bg-transparent"
        style={{ cursor: "pointer" }}
      >
        <img
          src={user.profileURL}
          alt="profile"
          className="rounded-circle border"
          style={{ width: "35px", height: "35px" }}
        />
        <span className="ms-2 fw-semibold">{user.name}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item>
          <User size={16} className="me-2" />
          My Profile
        </Dropdown.Item>

        <Dropdown.Item>
          <Settings size={16} className="me-2" />
          Settings
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item className="text-danger">
          <LogOut size={16} className="me-2" />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
