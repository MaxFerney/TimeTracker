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
//app closed unexpectedly - close old time(s)
// TimesCollectionAccess.findAndModify(
//   {is_active:true},
//   [],
//   {
//     $set:{
//       is_active:false,
//       stop_time:null
//     }
//   },
//   function(err, object) {
//     if (err){
//       console.warn(err.message);  // returns error if no matching object found
//     } else {
//       console.dir("ITEM FOUND!\n\t"+object);
//     }
//   }
// );
// TimesCollectionAccess.findOneAndUpdate(
//   {is_active: true},
//   {
//     $set: {
//       is_active: false,
//       stop_time: null
//     }
//   }, function (err, result){
//     if (err){
//       console.warn("no broken times\n"+err.message);
//     } else {
//       console.log("culled item: ["+result.value._id+"]");
//     }
//   }
// );


// oldTimeObject = TimesCollectionAccess.findOne(
//   {is_active:true}.callback
//   function(err, result){
//     if (err){
//       console.warn("no broken times\n"+err.message);
//     } else {
//       console.log("culled item: ["+result.value._id+"]");
//     }
//   }
// )
// if (oldTimeObject != undefined){
//   TimesCollectionAccess.update({_id:timeObject._id},{
//     $set:{
//     stop_time:null,
//     is_active:false,
//   }});
// }

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
    console.log("deleted an old time: "+oldTimeObject._id);
    oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
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


// checkAndFixDeadTimes();

timeObject = TimesCollectionAccess.findOne({is_active:true});
console.log(timeObject);
while (timeObject != undefined){
  TimesCollectionAccess.update({_id:timeObject._id},{
    $set:{
    stop_time:null,
    is_active:false,
  }});
  console.log("deleted an old time: "+timeObject._id);
  timeObject = TimesCollectionAccess.findOne({is_active:true});
}
console.log("fixed all dead times!");


function pushTimerBtn() {
  $('#manuallyInsertBtn').fadeToggle();

  if (timerStarted == false) {
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
    // TimesCollectionAccess.find
    // TimesCollectionAccess.findOneAndUpdate(
    //   {is_active: true},
    //   {
    //     $set: {
    //       is_active: false,
    //       stop_time: currentTime
    //     }
    //   }, function (err, result){
    //     if (err){
    //       console.warn("TIME ITEM NOT FOUND!!\n"+err.message);
    //     } else {
    //       console.log("Stopped Time ID: ["+result.value._id+"]");
    //     }
    //   }
    // );

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
      {/*<Helmet>
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="js/main.js"></script>
      </Helmet>*/}
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
