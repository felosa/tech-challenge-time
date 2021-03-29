import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import Modal from "../Modal";
import "./SingleTimer.css";

export const SingleTimer = ({
  session = { startTime: null },
  fetchSessions = () => {},
}) => {
  const { startTime = null, sessionID = null, description } = session;
  const [endTime, setEndTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const { showCurrentTime, startTimer, stopTimer } = useTimer(
    startTime,
    sessionID
  );

  const handleShowFinishModal = async () => {
    const finishTime = new Date();
    await stopTimer(sessionID, finishTime);
    setEndTime(finishTime);
    setOpen(true);
  };

  return (
    <div className="single-timer-container">
      <Modal
        open={open}
        setOpen={setOpen}
        startTime={startTime}
        endTime={endTime}
        description={description}
        fetchSessions={fetchSessions}
      ></Modal>
      {startTime !== null ? (
        <>
          {endTime ? null : (
            <>
              <p>Session: {description}</p>
              <h3>Time: {showCurrentTime()}</h3>
              <button
                onClick={() => {
                  handleShowFinishModal();
                  fetchSessions();
                }}
              >
                STOP
              </button>
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
          <h3>{showCurrentTime()}</h3>
          {input === "" ? (
            <p>You need a name for your session before start</p>
          ) : null}
          <button
            disabled={input === ""}
            onClick={async () => {
              await startTimer(input, 2);
              setInput("");
              fetchSessions();
            }}
          >
            START
          </button>
        </>
      )}
    </div>
  );
};
