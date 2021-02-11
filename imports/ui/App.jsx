import React, { useState, Component } from 'react';
import { TimesCollectionAccess } from './../../lib/times.js';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

//var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var timeObject;
var stateText = "initialize";
var stateAddText = "none";
// var timeObjectID;
var elapsedTime = 0; //Eventually pull from DB

buttonText = "Start"; //Eventually pull from DB
timeObject = TimesCollectionAccess.findOne({is_active:true})
if (timeObject==undefined){
    var timerStarted=false;
    elapsedTime=0;
    buttonText="Start";
} else{
    var timerStarted=true;
    buttonText="Stop";
    elapsedTime=1;
    startTime=timeObject.start_time;
}

function getTime() {
  if (timerStarted == false) {
      stateText="timer stopped. inside getTime() timerStarted=true";
    // timeObject = TimesCollectionAccess.findOne({is_active:true})
    // if (timeObject==undefined){
    //
    // }else{
    //     console.log("STATE OF TIME OBJECT: "+ timeObject+"isactive: "+timeObject.is_active);
    // }

    // if (timeObject.is_active == true){
    //     TimesCollectionAccess.update({_id:timeObject._id},{
    //         $set:{
    //         stop_time:currentTime,
    //         is_active:false,
    //     }});
    //
    // }
    startTime = currentTime;
    endTime = "Waiting...";
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
        stop_time: 0,
        is_active: true,
    });
    timerStarted = true;
    timeObject = TimesCollectionAccess.findOne({is_active:true})
  } else { //TIMER HAS STARTED already
    stateText="timer started. inside getTime()timerStarted=false";
    endTime = currentTime;
    timeObject = TimesCollectionAccess.findOne({is_active:true})
    //console.log("ENTIRE DB\n\n"+TimesCollectionAccess.find().fetch());
    TimesCollectionAccess.update({_id:timeObject._id},{
        $set:{
        stop_time:currentTime,
        is_active:false,
    }});
    buttonText = "Start";
    timerStarted = false;
  }
}

function FormattedDate(props) {
  currentTime = Math.floor(props.date.getTime()/1000);
  timeObject = TimesCollectionAccess.findOne({is_active:true})
  if(timerStarted == true) {
      stateAddText="timer started true. this is saved state: [";
    if (timeObject != undefined){
        stateAddText+="time object defined";
        startTime = timeObject.start_time;
        buttonText = "Stop";
        endTime = "Waiting...";
        elapsedTime = currentTime - startTime;
    } else{
        elapsedTime = currentTime - startTime;
    }
  } else if (timerStarted == false) {
    stateAddText="timer started false. this is default state: [";
    if (timeObject != undefined){
        stateAddText+="time object defined";
        startTime = timeObject.start_time;
        buttonText = "start";
        endTime = timeObject.stop_time;
        elapsedTime = endTime - startTime;
    } else {
        elapsedTime = 0;
    }
}

  stateText="formatted date. timeObject is undefined: "+(timeObject===undefined).toString()+" | stateAddText: "+stateAddText;
  return (
    <div>
      <h2>It is {currentTime}.</h2>
      <p>Elapsed Time = {elapsedTime}</p>
      <p>Start Time: {startTime}</p>
      <p>Stop time: {endTime}</p>
      <p>STATE: {stateText}</p>
      <button onClick={getTime}>
          {buttonText}

      </button>
      <h3>stored Times</h3>
      <div className="times">
        { TimesCollectionAccess.find().fetch().map((timeItem) =>
            <div key={timeItem._id} className="time_item">
                <p>Time ID: {timeItem._id}</p>
                <p>Start: {timeItem.start_time}</p>
                <p>Stop: {timeItem.stop_time}</p>
                <p>Is Active: {timeItem.is_active.toString()}</p>
            </div>
        )}
      </div>
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
