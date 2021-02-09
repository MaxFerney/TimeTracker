import React, { useState, Component } from 'react';
import { TimesCollectionAccess } from './../../lib/times.js';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var timeObject;
// var timeObjectID;
var elapsedTime = 0; //Eventually pull from DB

buttonText = "Start"; //Eventually pull from DB


function getTime() {
  if (timerStarted == false) {
    startTime = currentTime;
    endTime = "Waiting..."
    buttonText = "Stop";
    // timeObject = {
    //     start_time: currentTime,
    //     stop_time: -1,
    //     is_active: "true",
    // };
    // TimesCollectionAccess.insert(timeObject, function(err){
    //     if (err) return;
    //     //successfully inputs item
    //     timeObjectID = timeObject._id;
    // });
    TimesCollectionAccess.insert({
        start_time: currentTime,
        stop_time: -1,
        is_active: "true",
    });
    timerStarted = true;
  } else {
    endTime = currentTime;
    timeObject = TimesCollectionAccess.findOne({is_active:"true"})
    console.log("ENTIRE DB\n\n"+TimesCollectionAccess.find().fetch());
    TimesCollectionAccess.update({_id:timeObject._id},{
        $set:{
        stop_time:currentTime,
        is_active:"false",
    }});
    buttonText = "Start";
    timerStarted = false;
    console.log(TimesCollectionAccess.find().fetch());
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
