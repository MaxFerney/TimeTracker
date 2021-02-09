import React, { useState, Component } from 'react';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var elapsedTime = 0; //Eventually pull from DB

buttonText = "Start"; //Eventually pull from DB


function getTime() {
  if (timerStarted == false) {
    startTime = currentTime;
    endTime = "Waiting..."
    buttonText = "Stop";
    timerStarted = true;
  } else {
    endTime = currentTime;
    buttonText = "Start";
    timerStarted = false;
  }
}

function FormattedDate(props) {
  currentTime = Math.floor(props.date.getTime()/1000);
  if(timerStarted == true) {
    elapsedTime = currentTime - startTime;
  } else if(endTime) {
    elapsedTime = endTime - startTime;
  } else {
    elapsedTime = 0; //Eventually Pull from DB
  }
  return (
    <div>
      <h2>It is {currentTime}.</h2>
      <p>Elapsed Time = {elapsedTime}</p>
      <p>Start Time: {startTime}</p>
      <p>Stop time: {endTime}</p>
      <button onClick={getTime}>
          {buttonText}
      </button>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}


