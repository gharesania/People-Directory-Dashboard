// Components/TeamSelector.jsx
import "./TeamSelector.css";

const ALL_TEAMS = [
  "Design",
  "Product",
  "Marketing",
  "Engineering",
  "Research",
  "Custom",
];

const TeamSelector = ({ teams, setTeams }) => {
  const toggleTeam = (team) => {
    if (teams.includes(team)) {
      setTeams(teams.filter((t) => t !== team));
    } else {
      setTeams([...teams, team]);
    }
  };

  return (
    <div className="team-selector">
      {ALL_TEAMS.map((team) => (
        <span
          key={team}
          className={`team-pill ${teams.includes(team) ? "selected" : ""}`}
          onClick={() => toggleTeam(team)}
        >
          {team}
        </span>
      ))}
    </div>
  );
};

export default TeamSelector;
