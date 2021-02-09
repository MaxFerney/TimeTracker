import React, { useState, Component } from 'react';
import { Info } from './Info.jsx';


export const App = () => (
  <div>
    <Clock/>
    <Info/>
  </div>
);

var timerStarted = false;
var startTime;
var endTime;
var currentTime;
var elapsedTime;


function getTime() {
  if (timerStarted == false) {
    startTime = currentTime;
    endTime = "Waiting..."
    timerStarted = true;
  } else {
    endTime = currentTime;
    timerStarted = false;
  }
}

function FormattedDate(props) {
  currentTime = Math.floor(props.date.getTime()/1000);
  if(timerStarted == true) {
    elapsedTime = currentTime - startTime;
  } else {
    elapsedTime = endTime - startTime;
  }
  return (
    <div>
      <h2>It is {currentTime}.</h2>
      <p>Elapsed Time = {elapsedTime}</p>
      <p>Start Time: {startTime}</p>
      <p>Stop time: {endTime}</p>
      <button onClick={getTime}>
          Get Time
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


