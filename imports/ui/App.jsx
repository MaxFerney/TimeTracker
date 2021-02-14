import React, { useState, Component } from 'react';
import { TimesCollectionAccess } from './../../lib/times.js';
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

//buttonText; //Eventually pull from DB
// var brokenTimeList = TimesCollectionAccess.find({is_active: true});
timeObject = TimesCollectionAccess.findOne({is_active: true});
if (timeObject != undefined){
    TimesCollectionAccess.update({_id:timeObject._id},{
        $set:{
        stop_time:null,
        is_active:false,
    }});
}

timerStarted = false;
elapsedTime = 0;
buttonText = "Start";


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
    //runs each tick
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
      100
    );
    console.log('tick');
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
