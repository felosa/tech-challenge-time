import React, { useContext, useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../../api";
import Stats from "../../components/Stats";
import Table from "../../components/Table";
import { AuthContext } from "../../context/auth/auth";
import msToTime from "../../utils/msToTime";

export function FinishedSessions() {
  const [sessions, setSessions] = useState([]);
  const [criteria, setCriteria] = useState("day");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    sessionsAPI.getAll({ userID: user.userID, criteria }).then((result) => {
      const resultWithTimes = result.map((session) => {
        session.time = msToTime(
          new Date(session.endTime) - new Date(session.startTime)
        );
        session.timeInMs =
          new Date(session.endTime) - new Date(session.startTime);
        session.startTime = new Date(session.startTime).toLocaleString();
        session.endTime = new Date(session.endTime).toLocaleString();
        return session;
      });
      setSessions(resultWithTimes);
    });
  }, [criteria]);

  const columns = [
    { title: "DESCRIPTION", property: "description" },
    { title: "START", property: "startTime" },
    { title: "END", property: "endTime" },
    { title: "TIME", property: "time" },
  ];

  return (
    <>
      <div>
        <label>PERIOD</label>
        <select
          name="categories"
          id="categories"
          value={criteria.category}
          onChange={(e) => setCriteria(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>
      <Stats data={sessions}></Stats>
      <Table width="100%" columns={columns} data={sessions} />
    </>
  );
}
