import axios from "axios";
import { Pen, Search, Trash, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Spinner,
  OverlayTrigger,
  Popover,
  Pagination,
} from "react-bootstrap";

import "./People.css";
import "../App.css";

import StatusBadge from "../Components/StatusBadge";
import FilterDropdown from "../Components/FilterDropdown/FilterDropdown.jsx";

import { toast, ToastContainer } from "react-toastify";

// NEW MODAL COMPONENTS
import AddUserModal from "../Components/CRUD Modals/AddUserModal.jsx";
import EditUserModal from "../Components/CRUD Modals/EditUserModal.jsx";
import DeleteUserModal from "../Components/CRUD Modals/DeleteUserModal.jsx";
import UserProfileModal from "../Components/CRUD Modals/UserProfileModal.jsx";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Loading-sand-clock.json";

const People = () => {
  const API_URL = "https://68dcd02d7cd1948060ab6364.mockapi.io/users";
  const DEFAULT_PROFILE_URL = "https://i.pravatar.cc/150?u=default";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  async function getData() {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      const formatted = res.data.map((u) => ({
        ...u,
        teams: Array.isArray(u.teams) ? u.teams : u.teams ? [u.teams] : [],
      }));

      setData(formatted);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Modal States
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [profileUserId, setProfileUserId] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [teams, setTeams] = useState([]);
  const [gender, setGender] = useState("");
  const [profileURL, setProfileURL] = useState("");

  // Reset Form
  const resetForm = () => {
    setName("");
    setEmail("");
    setUsername("");
    setStatus("");
    setRole("");
    setTeams([]);
    setGender("");
    setEditMode(false);
    setSelectedUser(null);
  };

  // Add or Edit User
  async function handleSave(e) {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !username ||
      !status ||
      !role ||
      teams.length === 0
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const userData = {
      name,
      email,
      username,
      status,
      role,
      teams,
      gender,
      profileURL: profileURL || selectedUser?.profileURL || DEFAULT_PROFILE_URL,
    };

    try {
      if (editMode && selectedUser) {
        const res = await axios.put(`${API_URL}/${selectedUser.id}`, userData);

        setData((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? res.data : u))
        );

        toast.success("User updated successfully!");
      } else {
        const res = await axios.post(API_URL, userData);
        setData((prev) => [...prev, res.data]);

        toast.success("User added successfully!");
      }

      handleClose();
    } catch (err) {
      console.error("Error saving user:", err);
      toast.error("Something went wrong while saving the user.");
    }
  }

  // Delete User
  async function deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData((prev) => prev.filter((u) => u.id !== id));
      handleDeleteClose();
      toast.warning("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  // --- Modal Control ---
  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const handleDeleteClose = () => setDeleteShow(false);

  const handleDeleteShow = (user) => {
    setSelectedUser(user);
    setDeleteShow(true);
  };

  const handleEditShow = (user) => {
    setSelectedUser(user);
    setEditMode(true);

    setName(user.name);
    setEmail(user.email);
    setUsername(user.username);
    setStatus(user.status);
    setRole(user.role);
    setTeams(user.teams || []);
    setGender(user.gender || "");

    handleShow();
  };

  // Filter By Role & Team
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  // --- Filtering ---
  const filteredData = data.filter((user) => {
    const query = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query) ||
      (Array.isArray(user.teams)
        ? user.teams.some((team) => team.toLowerCase().includes(query))
        : user.teams?.toLowerCase().includes(query));

    const matchesRole = selectedRole ? user.role === selectedRole : true;

    const matchesTeam = selectedTeam
      ? Array.isArray(user.teams)
        ? user.teams.includes(selectedTeam)
        : user.teams === selectedTeam
      : true;

    return matchesSearch && matchesRole && matchesTeam;
  });

  // --- Pagination Logic ---
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <ToastContainer />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0">
          Team Members{" "}
          <span className="user-count">
            {loading ? "Loading..." : `${data.length} users`}
          </span>
        </h4>

        <div className="d-flex align-items-center gap-2">
          <InputGroup className="search-box">
            <Form.Control
              className="search-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="search-btn">
              <Search size={18} color="#6A37C4" />
            </Button>
          </InputGroup>

          {/* Filter */}
          <OverlayTrigger
            trigger="click"
            placement="bottom-end"
            rootClose
            overlay={
              <Popover id="filter-popover" className="filter-popover">
                <Popover.Body>
                  <FilterDropdown
                    roles={[
                      ...new Set(data.map((u) => u.role).filter(Boolean)),
                    ]}
                    teams={[
                      ...new Set(
                        data
                          .flatMap((u) =>
                            Array.isArray(u.teams) ? u.teams : [u.teams]
                          )
                          .filter(Boolean)
                      ),
                    ]}
                    selectedRole={selectedRole}
                    selectedTeam={selectedTeam}
                    setSelectedRole={setSelectedRole}
                    setSelectedTeam={setSelectedTeam}
                  />

                  <div className="text-center mt-3">
                    <Button
                      variant="outline-danger"
                      className="clear-filters-btn"
                      onClick={() => {
                        setSelectedRole("");
                        setSelectedTeam("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="outline-secondary" className="filter-btn">
              <Filter
                size={18}
                color={selectedRole || selectedTeam ? "#6A37C4" : "black"}
              />
            </Button>
          </OverlayTrigger>

          <Button className="add-user" onClick={() => handleShow()}>
            + Add Member
          </Button>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: 180, height: 180 }}
          />
        </div>
      ) : (
        <>
          {/* Table */}
          <Table responsive>
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
                <th>Email</th>
                <th>Teams</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.profileURL || DEFAULT_PROFILE_URL}
                        alt={user.name}
                        className="rounded-circle me-2 border border-2 border-primary"
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setProfileUserId(user.id);
                          setProfileShow(true);
                        }}
                      />

                      <div>
                        <div className="fw-bold text-dark">{user.name}</div>
                        <small className="text-muted">@{user.username}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <StatusBadge status={user.status} />
                  </td>

                  <td>{user.role}</td>
                  <td>{user.email}</td>

                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      {/* Show only first 2 teams */}
                      {user.teams.slice(0, 2).map((team, i) => {
                        const colorMap = {
                          Design: { bg: "#E3F2FD", text: "#1565C0" },
                          Product: { bg: "#FFF3E0", text: "#EF6C00" },
                          Marketing: { bg: "#F3E5F5", text: "#8E24AA" },
                          Engineering: { bg: "#E8F5E9", text: "#2E7D32" },
                          Research: { bg: "#FBE9E7", text: "#D84315" },
                          Interactions: { bg: "#ECEFF1", text: "#37474F" },
                          Creative: { bg: "#E1F5FE", text: "#0277BD" },
                          Custom: { bg: "#E0E0E0", text: "#424242" },
                        };

                        const { bg, text } = colorMap[team] || {
                          bg: "#ECEFF1",
                          text: "#263238",
                        };

                        return (
                          <span
                            key={i}
                            className="team-pill"
                            style={{
                              backgroundColor: bg,
                              color: text,
                            }}
                          >
                            {team}
                          </span>
                        );
                      })}

                      {/* If more than 2 teams, show +X */}
                      {user.teams.length > 2 && (
                        <span
                          className="px-3 py-1 rounded-pill fw-semibold"
                          style={{
                            backgroundColor: "#D6D6D6",
                            color: "#333",
                            fontSize: "0.8rem",
                          }}
                        >
                          +{user.teams.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>{user.gender || "N/A"}</td>

                  <td>
                    <div className="d-flex gap-2 align-items-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleEditShow(user)}
                      >
                        <Pen size={16} />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleDeleteShow(user)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                />

                {Array.from({ length: totalPages }).map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Add User Modal */}
      <AddUserModal
        show={show && !editMode}
        handleClose={handleClose}
        name={name}
        email={email}
        username={username}
        status={status}
        role={role}
        teams={teams}
        gender={gender}
        setName={setName}
        setEmail={setEmail}
        setUsername={setUsername}
        setStatus={setStatus}
        setRole={setRole}
        setTeams={setTeams}
        setGender={setGender}
        handleSave={handleSave}
      />

      {/* Edit User Modal */}
      <EditUserModal
        show={show && editMode}
        handleClose={handleClose}
        selectedUser={selectedUser}
        name={name}
        email={email}
        username={username}
        status={status}
        role={role}
        teams={teams}
        gender={gender}
        setName={setName}
        setEmail={setEmail}
        setUsername={setUsername}
        setStatus={setStatus}
        setRole={setRole}
        setTeams={setTeams}
        setGender={setGender}
        handleSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        show={deleteShow}
        handleClose={handleDeleteClose}
        selectedUser={selectedUser}
        handleDelete={deleteUser}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        show={profileShow}
        handleClose={() => setProfileShow(false)}
        userId={profileUserId}
      />
    </div>
  );
};

export default People;
