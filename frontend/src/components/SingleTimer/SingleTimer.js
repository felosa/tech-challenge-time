import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import Modal from "../Modal";

export const SingleTimer = ({ session = { startTime: null } }) => {
  const { startTime = null, sessionID = null, description } = session;
  const [endTime, setEndTime] = useState(null);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const { showCurrentTime, startTimer, stopTimer } = useTimer(
    startTime,
    sessionID
  );

  const handleShowFinishModal = () => {
    const finishTime = new Date();
    stopTimer(sessionID, finishTime);
    setEndTime(finishTime);
    setOpen(true);
  };

  return (
    <div className="App">
      <Modal
        open={open}
        setOpen={setOpen}
        startTime={startTime}
        endTime={endTime}
        description={description}
      ></Modal>
      {startTime !== null ? (
        <>
          {endTime ? null : (
            <>
              <p>Session: {description}</p>
              <p>Time: {showCurrentTime()}</p>
              <button onClick={() => handleShowFinishModal()}>STOP</button>
            </>
          )}
        </>
      ) : (
        <>
          <label htmlFor="name">
            Session Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Session Name"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </label>
          <p>{showCurrentTime()}</p>
          <button onClick={() => startTimer(input, 2)}>START</button>
        </>
      )}
    </div>
  );
};
