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
        Close
      </button>
      <button onClick={() => setOpen(false)}>Go to my tracks</button>
    </div>
  );
};
