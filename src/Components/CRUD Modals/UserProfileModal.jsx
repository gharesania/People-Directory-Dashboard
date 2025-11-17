// Components/UserProfileModal.jsx
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import StatusBadge from "../StatusBadge";

const API_URL = "https://68dcd02d7cd1948060ab6364.mockapi.io/users";

export default function UserProfileModal({ show, handleClose, userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : user ? (
          <div className="text-center">
            <img
              src={user.profileURL}
              alt={user.name}
              className="rounded-circle mb-3 border border-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            <h4>{user.name}</h4>
            <p className="text-muted">@{user.username}</p>

            <div className="mb-2">
              <StatusBadge status={user.status} />
            </div>

            <div className="mt-3 text-start">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contat No:</strong> {user.contactNo}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
              <p>
                <strong>Teams:</strong>{" "}
                {Array.isArray(user.teams) ? user.teams.join(", ") : user.teams}
              </p>
            </div>
          </div>
        ) : (
          <p>No data found.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
