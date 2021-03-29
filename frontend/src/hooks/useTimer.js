import { useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../api";
import msToTime from "../utils/msToTime";

export const useTimer = (startTime = null, sessionID = null) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (startTime !== null) {
      setInterval(() => {
        setTimer(new Date() - new Date(startTime));
      }, 1000);
    } else {
      setTimer("00:00:00");
    }
  }, []);

  const startTimer = (description, userID) => {
    const params = {
      description,
      startTime: new Date(),
      userID: 2,
    };
    sessionsAPI.startSession(params).then((result) => {
      console.log(result);
    });
    return;
  };

  const stopTimer = (sessionID, endTime) => {
    const params = {
      endTime,
    };
    sessionsAPI
      .endSession(params, sessionID)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    return;
  };
  const showCurrentTime = () =>
    startTime === null ? "00:00:00" : msToTime(timer);

  return {
    startTimer,
    stopTimer,
    showCurrentTime,
  };
};
