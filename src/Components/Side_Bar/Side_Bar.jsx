import { NavLink } from "react-router-dom";
import "./Side_Bar.css";
import { LayoutDashboard, Users } from "lucide-react";

const Side_Bar = () => {
  return (
    <div className="sidebar-container d-flex flex-column p-3">
      <ul className="list-unstyled m-0">
        <li className="mb-2">
          <NavLink
            to="/home"
            style={({ isActive }) => ({
              color: isActive ? "#6A37C4" : "#444",
              textDecoration: "none",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#f3eaff" : "transparent",
              padding: "10px 12px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            })}
          >
            <LayoutDashboard className="me-2" size={18} />
            Overview
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/directory"
            style={({ isActive }) => ({
              color: isActive ? "#6A37C4" : "#444",
              textDecoration: "none",
              fontWeight: isActive ? "600" : "400",
              backgroundColor: isActive ? "#f3eaff" : "transparent",
              padding: "10px 10px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            })}
          >
            <Users className="me-2" size={18} />
            People Directory
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Side_Bar;
