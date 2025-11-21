// import "./statusButton.css";
import "../../styles/statusButton.css";


const StatusButton = ({ label, type, currentStatus, onClick }) => {
  const isSelected = currentStatus === type;

  let extraClass = "status-neutral"; // default white
  if (isSelected && type === "present") extraClass = "status-present";
  if (isSelected && type === "absent") extraClass = "status-absent";

  return (
    <button
      className={`status-btn ${extraClass}`}
      onClick={() => onClick(type)}
    >
      {label}
    </button>
  );
};

export default StatusButton;
