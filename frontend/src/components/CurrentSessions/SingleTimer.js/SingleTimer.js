import { useState } from "react";
import { useTimer } from "../../../hooks/useTimer";

export const SingleTimer = ({ session = { startTime: null } }) => {
  const { startTime = null, sessionID = null, description, endTime } = session;

  const [input, setInput] = useState("");

  const { showCurrentTime, startTimer, stopTimer } = useTimer(
    startTime,
    sessionID
  );

  return (
    <div className="App">
      {startTime !== null ? (
        <>
          <p>{description}</p>
          <p>{showCurrentTime()}</p>
          <button onClick={() => stopTimer(sessionID)}>STOP</button>
        </>
      ) : (
        <>
          <label htmlFor="name">
            Name
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
