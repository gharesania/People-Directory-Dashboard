// StatusBadge.jsx
import "./StatusBadge.css";

const STATUS_COLORS = {
  active: { border: "#d1fae5", dot: "#12b76a" },       // green
  inactive: { border: "#e5e7eb", dot: "#9ca3af" },     // gray
  suspended: { border: "#fee2e2", dot: "#ef4444" },    // red
  pending: { border: "#fef3c7", dot: "#f59e0b" },      // yellow
  banned: { border: "#fce7f3", dot: "#db2777" },       // pink/magenta
};

const StatusBadge = ({ status }) => {
  const key = status.toLowerCase();
  const colors = STATUS_COLORS[key] || STATUS_COLORS.inactive;

  return (
    <span
      className="status-badge"
      style={{ borderColor: colors.border, color: colors.dot }}
    >
      <span
        className="status-dot"
        style={{ backgroundColor: colors.dot }}
      ></span>
      {status}
    </span>
  );
};

export default StatusBadge;
