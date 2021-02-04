import React, { useState } from 'react';

export const Hello = () => {

    const[counter, setCounter] = useState(Math.floor(Date.now() / 1000 ));
    const[startTime, setStartTime] = useState("Not Started");
    const[stopTime, setStopTime] = useState("Not Stopped");
    const[elapsedTime, setElapsedTime] = useState(0);

    const[timerStarted, setTimerStarted] = useState("false");

    //if (timerStarted == "true") {
    //    setElapsedTime(counter - startTime);
    //}

    setInterval(() => {
      setCounter(Math.floor(Date.now() / 1000 ));
    }, 1000);

    function getTime() {
        if(timerStarted == "false") {
            console.log(timerStarted);

            setStartTime(counter);
            setStopTime("Not Stopped");

            setTimerStarted("true");
        } else {
            console.log(timerStarted);

            setStopTime(counter);
            setElapsedTime(stopTime - startTime);

            setTimerStarted("false");
        }
    }

    return (
        <div>
        <p>Time Passed: {elapsedTime} </p>
          <p>Current Unix Time: {counter} </p>
          <button onClick={getTime}>
            Get Time
          </button>
          <p>Start Time: {startTime}</p>
          <p>Stop Time: {stopTime}</p>
        </div>
    );
};
