import { Bell } from "lucide-react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import UserMenu from "../../Components/UserMenu";

const Header = () => {
  return (
    <header className="header-container d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm">

      {/* Logo Section */}
      <div>
        <NavLink to="/home" className="text-decoration-none">
          <h4 className="logo m-0">PEOPLE.CO</h4>
        </NavLink>
      </div>

      {/* Right-side Icons / Profile */}
      <div className="d-flex align-items-center gap-3">

        {/* Notifications */}
        <button
          className="btn btn-light position-relative p-2 rounded-circle shadow-sm"
          style={{ background: "none", border: "none" }}
          aria-label="Notifications"
        >
          <Bell size={18} color="#6A37C4" />
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ width: "8px", height: "8px" }}
          ></span>
        </button>

        {/* User Dropdown Menu */}
        <UserMenu
          user={{
            name: "Jane Doe",
            profileURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
          }}
        />
      </div>

    </header>
  );
};

export default Header;
