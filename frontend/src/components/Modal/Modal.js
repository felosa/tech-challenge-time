import msToTime from "../../utils/msToTime";
import "./Modal.css";

export const Modal = ({ open, setOpen, startTime, endTime, description }) => {
  console.log(startTime, endTime, "algo");

  if (!open) {
    return null;
  }
  return (
    <div className="modal">
      <p>{description}</p>
      <p>{new Date(startTime).toString()}</p>
      <p>{new Date(endTime).toString()}</p>
      <p>{msToTime(new Date(endTime) - new Date(startTime))}</p>
      <button onClick={() => setOpen(false)}>Close</button>
      <button onClick={() => setOpen(false)}>Go to my tracks</button>
    </div>
  );
};
