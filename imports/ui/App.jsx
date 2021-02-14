import React, { useState, Component } from 'react';
import {Helmet} from "react-helmet";

import moment from 'moment';
import { TimesCollectionAccess } from './../../lib/times.js';

export const App = () => (
  <div>
    <Clock/>
  </div>
);

const ESTCurrentTimeFix = 18000000;

var timerStarted = false; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var elapsedTime = 0; //Eventually pull from DB
var oldTimeObject;
var timeObject;
var startStopBtnClass = 'greenBG';

const cursor = TimesCollectionAccess.find({});
cursor.forEach((cursorItem, index) => {
  console.log(
    "[\nid: "+cursorItem._id+
    "start_time: "+cursorItem.start_time+
    "stop_time: "+cursorItem.stop_time+
    "is_active: "+cursorItem.is_active+"\n]"
  )
});

timerStarted = false;
elapsedTime = 0;
buttonText = "Start";


function checkAndFixDeadTimes(){
  var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
  while (oldTimeObject != undefined){
    TimesCollectionAccess.update({_id:oldTimeObject._id},{
      $set:{
      stop_time:null,
      is_active:false,
    }});
    console.log("null'd an old time: "+oldTimeObject._id);
    oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
  }
  console.log("fixed all dead times!");
}

function removeDeadTimes(){
  var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
  while (oldTimeObject != undefined){
    TimesCollectionAccess.remove({_id:oldTimeObject._id});
    console.log("deleted an old time: "+oldTimeObject._id);
    var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
  }
  console.log("fixed all dead times!");
}

function findAndUpdate(){
  timeObject = TimesCollectionAccess.findOne({is_active: true});
  TimesCollectionAccess.update({_id:timeObject._id},{
     $set:{
     stop_time:currentTime,
     is_active:false,
   }});
}


checkAndFixDeadTimes();



function pushTimerBtn() {
  $('#manuallyInsertBtn').fadeToggle();

  if (timerStarted == false) {
    $('#startStopBtn').removeClass('greenBG').addClass('redBG');

    //checkAndFixDeadTimes();
    removeDeadTimes();

    startTime = currentTime;
    endTime = "Waiting..."
    buttonText = "Stop";
    timerStarted = true;
    TimesCollectionAccess.insert({
      start_time: currentTime,
      stop_time: 0,
      is_active: true,
    });
    //$('#startStopBtn').removeClass('greenBG').addClass('redBG');
    startStopBtnClass='redBG';
    timeObject = TimesCollectionAccess.findOne({is_active: true});
  } else {
    $('#startStopBtn').removeClass('redBG').addClass('greenBG');
    endTime = currentTime;
    buttonText = "Start";
    timerStarted = false;

    // findAndUpdate();
    timeObject = TimesCollectionAccess.findOne({is_active:true})
    console.log("ENTIRE DB\n\n"+TimesCollectionAccess.find().fetch());
    TimesCollectionAccess.update({_id:timeObject._id},{
      $set:{
      stop_time:currentTime,
      is_active:false,
    }});

    //all items in db
    const cursor = TimesCollectionAccess.find({});
    cursor.forEach((cursorItem, index) => {
      console.log("[\nid: "+cursorItem._id);
      console.log("start_time: "+cursorItem.start_time);
      console.log("stop_time: "+cursorItem.stop_time);
      console.log("is_active: "+cursorItem.is_active+"\n]");
    });



    //$('#startStopBtn').removeClass('redBG').addClass('greenBG');
    startStopBtnClass='greenBG';
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
    <div id="bodyDiv">
      <header className="redBG">
        <h2>Winthrop University</h2>
      </header>
      <div id="homeTimer">

        <h2>Welcome Back <br/> <span id="userName">User X</span></h2>
        <h2>{moment().format('LTS')}</h2>
        <h1>{moment(ESTCurrentTimeFix + elapsedTime*1000).format('HH:mm:ss')}</h1>
        <button id="startStopBtn" className={"dropShadow "+startStopBtnClass} onClick={pushTimerBtn}>
            {buttonText}
        </button>
        <button id="manuallyInsertBtn" className="dropShadow tanBG" onclick="">
          Manually Insert Time
        </button>
      </div>
      <footer className="redBG">
        <ul>
          <li><a href="#"><img src="images/Home.png" alt="Settings Icon"/></a></li>
          <li><a href="#"><img src="images/List.png" alt="Settings Icon"/></a></li>
          <li><a href="#"><img src="images/Settings.png" alt="Settings Icon"/></a></li>
        </ul>
      </footer>
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
