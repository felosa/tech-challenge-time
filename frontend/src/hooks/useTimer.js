import { useContext, useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../api";
import { AuthContext } from "../context/auth/auth";
import msToTime from "../utils/msToTime";

export const useTimer = (startTime = null) => {
  const [timer, setTimer] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (startTime !== null) {
      setInterval(() => {
        setTimer(new Date() - new Date(startTime));
      }, 1000);
    } else {
      setTimer("00:00:00");
    }
  }, []);

  const startTimer = async (description) => {
    const params = {
      description,
      startTime: new Date(),
      userID: user.userID,
    };
    await sessionsAPI.startSession(params).then((result) => {
      return result;
    });
  };

  const stopTimer = async (sessionID, endTime) => {
    const params = {
      endTime,
    };
    await sessionsAPI
      .endSession(params, sessionID)
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  };
  
  const showCurrentTime = () =>
    startTime === null ? "00:00:00" : msToTime(timer);

  return {
    startTimer,
    stopTimer,
    showCurrentTime,
  };
};
