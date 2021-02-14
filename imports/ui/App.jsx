import React, { useState, Component } from 'react';
import moment from 'moment';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

ESTCurrentTimeFix = 18000000;

var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var elapsedTime = 0; //Eventually pull from DB

buttonText = "Start"; //Eventually pull from DB


function pushTimerBtn() {
  $('#manuallyInsertBtn').fadeToggle();

  if (timerStarted == false) {
    startTime = currentTime;
    endTime = "Waiting..."
    buttonText = "Stop";
    timerStarted = true;

    $('#startStopBtn').removeClass('greenBG').addClass('redBG');

  } else {
    endTime = currentTime;
    buttonText = "Start";
    timerStarted = false;

    $('#startStopBtn').removeClass('redBG').addClass('greenBG');
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
    <div id="homeTimer">
      <h2>Welcome Back <br/> <span id="userName">User X</span></h2>
      <h2>{moment().format('LTS')}</h2>
      <h1>{moment(ESTCurrentTimeFix + elapsedTime*1000).format('HH:mm:ss')}</h1>
      {console.log(elapsedTime)}
      <button id="startStopBtn" class="dropShadow greenBG" onClick={pushTimerBtn}>
          {buttonText}
      </button>
      <button id="manuallyInsertBtn" class="dropShadow tanBG" onclick="">
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


