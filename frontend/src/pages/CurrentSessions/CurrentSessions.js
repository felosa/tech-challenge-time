import React, { useContext, useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../../api";
import SingleTimer from "../../components/SingleTimer";
import { AuthContext } from "../../context/auth/auth";

export function CurrentSessions() {
  const [sessions, setSessions] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = () => {
    sessionsAPI.getActive({ userID: user.userID }).then((result) => {
      setSessions(result);
    });
  };

  return (
    <>
      {sessions.length > 0 &&
        sessions.map((session, index) => {
          return (
            <SingleTimer
              key={index}
              session={session}
              fetchSessions={fetchSessions}
            ></SingleTimer>
          );
        })}
      {/* Posibility to track more than 1 session at the same time in the future*/}
      {sessions.length === 0 ? (
        <SingleTimer fetchSessions={fetchSessions}></SingleTimer>
      ) : null}
    </>
  );
}
