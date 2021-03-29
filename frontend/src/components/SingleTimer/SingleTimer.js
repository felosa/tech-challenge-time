import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import msToTime from "../../utils/msToTime";
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

  const { showCurrentTime, startTimer, stopTimer } = useTimer(startTime);

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
          {endTime ? (
            <>
              <p>Session: {description}</p>
              <h3>Time: {msToTime(new Date(endTime) - new Date(startTime))}</h3>
              <button
                onClick={() => {
                  handleShowFinishModal();
                  fetchSessions();
                }}
              >
                STOP
              </button>
            </>
          ) : (
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
            Session:{" "}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Eg. Morning run"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </label>
          <h3>{showCurrentTime()}</h3>
          {input === "" ? <p>Name your session before you begin</p> : null}
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
