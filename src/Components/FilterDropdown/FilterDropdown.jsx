import { Form } from "react-bootstrap";

const FilterDropdown = ({
  roles = [],
  teams = [],
  selectedRole,
  selectedTeam,
  setSelectedRole,
  setSelectedTeam,
}) => {
  return (
    <div className="p-2" style={{ minWidth: "200px" }}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Filter by Role</Form.Label>
        <Form.Select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((role, i) => (
            <option key={i} value={role}>
              {role}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label className="fw-semibold">Filter by Team</Form.Label>
        <Form.Select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">All Teams</option>
          {teams.map((team, i) => (
            <option key={i} value={team}>
              {team}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default FilterDropdown;
