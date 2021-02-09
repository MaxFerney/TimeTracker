import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { TimeCollection } from '/imports/api/timeCollection';

export const Hello = () => {

    const[counter, setCounter] = useState(Math.floor(Date.now() / 1000 ));
    const[startTime, setStartTime] = useState("Not Started");
    const[stopTime, setStopTime] = useState("Not Stopped");
    const[elapsedTime, setElapsedTime] = useState(0);

    const[timerStarted, setTimerStarted] = useState("false");

    const[buttonText, setButtonText] = useState("Start");

    function getTime() {
        if(timerStarted == "false") {
            console.log(timerStarted);

            setStartTime(counter);
            setStopTime("Not Stopped");
            setButtonText("Stop");

            setTimerStarted("true");
        } else {
            console.log(timerStarted);

            setStopTime(counter);

            setTimerStarted("false");
            setButtonText("Start");
        }
    }

    return (
        <div>
            <p>Time Passed: {elapsedTime} </p>
            <button onClick={getTime}>
                {buttonText}
            </button>
            <p>Start Time: {startTime}</p>
            <p>Stop Time: {stopTime}</p>
        </div>
    );
};
