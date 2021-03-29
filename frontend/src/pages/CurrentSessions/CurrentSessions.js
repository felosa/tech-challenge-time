import React, { useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../../api";
import SingleTimer from "../../components/SingleTimer";

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
      {/* Posibility to track more than 1 session at the same time */}
      <SingleTimer></SingleTimer>
    </>
  );
}
