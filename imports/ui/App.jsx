import React, { useState, Component } from 'react';
import moment from 'moment';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var elapsedTime = "00:00:00"; //Eventually pull from DB

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
    elapsedTime = "00:00:00"; //Eventually Pull from DB
  }
  return (
    <div id="homeTimer">
      <h2>Welcome Back <br/> <span id="userName">User X</span></h2>
      <h2>{moment().format('LTS')}</h2>
      <p>Elasped Time</p>
      <h1>{elapsedTime}</h1>
      <button id="startStopBtn" class="dropShadow" onClick={getTime}>
          {buttonText}
      </button>
      <button id="manuallyInsertBtn" class="dropShadow" onclick="">
        Manually Insert Time
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


