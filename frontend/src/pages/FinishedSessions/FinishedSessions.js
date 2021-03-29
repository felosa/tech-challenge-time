import React, { useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../../api";
import SingleTimer from "../../components/SingleTimer";
import msToTime from "../../utils/msToTime";

export function FinishedSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    sessionsAPI.getAll({ userID: 2 }).then((result) => {
      console.log(result, "sessions");
      setSessions(result);
    });
  }, []);

  return (
    <>
      {sessions.length > 0 &&
        sessions.map(({ description, startTime, endTime }, index) => {
          return (
            <div key={index}>
              <p>{description}</p>
              <p>{new Date(startTime).toString()}</p>
              <p>{new Date(endTime).toString()}</p>
              <p>{msToTime(new Date(endTime) - new Date(startTime))}</p>
            </div>
          );
        })}
    </>
  );
}
