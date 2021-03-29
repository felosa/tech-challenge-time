import { Link } from "react-router-dom";
import msToTime from "../../utils/msToTime";
import "./Modal.css";

export const Modal = ({
  open,
  setOpen,
  startTime,
  endTime,
  description,
  fetchSessions = () => {},
}) => {
  if (!open) {
    return null;
  }
  return (
    <div className="modal">
      <p>{description}</p>
      <p>{new Date(startTime).toLocaleDateString()}</p>
      <p>{new Date(endTime).toLocaleDateString()}</p>
      <p>{msToTime(new Date(endTime) - new Date(startTime))}</p>
      <button
        onClick={() => {
          setOpen(false);
          fetchSessions();
        }}
      >
        New track
      </button>
      <button>
        <Link to="/finished-sessions">Go to my sessions</Link>
      </button>
    </div>
  );
};
