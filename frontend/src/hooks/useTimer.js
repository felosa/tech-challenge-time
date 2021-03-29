import { useEffect, useState } from "react";
import { sessions as sessionsAPI } from "../api";

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor(duration / (1000 * 60 * 60));
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export const useTimer = (startTime = null, sessionID = null) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (startTime !== null) {
      setInterval(() => {
        setTimer(new Date() - new Date(startTime));
      }, 100);
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

  const stopTimer = (sessionID) => {
    const params = {
      endTime: new Date(),
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
