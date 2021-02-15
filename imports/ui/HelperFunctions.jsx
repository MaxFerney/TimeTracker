import React from 'react';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import moment from 'moment';
import { TimesCollectionAccess } from './../../lib/times.js';

import PropTypes from 'prop-types';
// import BusinessCategoryPage from "./../pages/BusinessCategoryPage.js"

const helper_functions = {

  pushTimerBtn: function() {
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
      $('#startStopBtn').removeClass('greenBG').addClass('redBG');
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



      $('#startStopBtn').removeClass('redBG').addClass('greenBG');
    }
  },
  removeDeadTimes:function(){
    var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
    if (oldTimeObject != undefined){ //If there is live timer abandonded
      TimesCollectionAccess.remove({_id:oldTimeObject._id});
      console.log("deleted an old time: "+oldTimeObject._id);
      var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
      alert('You previously closed the app with the timer running, please leave the app open in the background to track your time.');
    }
    console.log("fixed all dead times!");
  },
  FormattedDate: function(props) {
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
          <button id="startStopBtn" className="dropShadow greenBG" onClick={pushTimerBtn}>
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

export default helper_functions;