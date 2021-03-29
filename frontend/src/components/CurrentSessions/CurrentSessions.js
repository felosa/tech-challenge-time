import React, { useEffect, useState } from "react";
import SingleTimer from "./SingleTimer.js";
import { sessions as sessionsAPI } from "../../api";

export function CurrentSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    sessionsAPI.getActive({ userID: 2 }).then((result) => {
      console.log(result, "sessions");
      setSessions(result);
    });
  }, []);

  return (
    <>
      {sessions.length > 0 &&
        sessions.map((session, index) => {
          return <SingleTimer key={index} session={session}></SingleTimer>;
        })}
      <SingleTimer></SingleTimer>
    </>
  );
}
