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
var oldTimeObject;
var timeObject;
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
  var timeObject = TimesCollectionAccess.findOne({is_active: true});
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
    startTime = currentTime;
    endTime = "Waiting..."
    buttonText = "Stop";
    timerStarted = true;
    TimesCollectionAccess.insert({
      start_time: currentTime,
      stop_time: 0,
      is_active: true
    });

  } else {
    $('#startStopBtn').removeClass('redBG').addClass('greenBG');
    endTime = currentTime;
    buttonText = "Start";
    timerStarted = false;

    findAndUpdate();
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
      console.log(
        "[\nid: "+cursorItem._id+
        "start_time: "+cursorItem.start_time+
        "stop_time: "+cursorItem.stop_time+
        "is_active: "+cursorItem.is_active+"\n]"
      )
    });
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
      <button id="startStopBtn" class="dropShadow greenBG" onClick={pushTimerBtn()}>
          {buttonText}
      </button>
      <button id="manuallyInsertBtn" class="dropShadow tanBG" onClick="">
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
