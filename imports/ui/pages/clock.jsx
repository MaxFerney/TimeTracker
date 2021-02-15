import React from 'react';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimesCollectionAccess } from '../../../lib/times.js';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';


const ESTCurrentTimeFix = 18000000;

var timerStarted; //Eventually pull from DB
var startTime;
var endTime;
var currentTime;
var elapsedTime; //Eventually pull from DB
var timeObject;
var buttonText;

timerStarted = false;
elapsedTime = 0;
buttonText = "Start";


export default class Clock extends React.Component {
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

  removeDeadTimes(){
    var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
    if (oldTimeObject != undefined){ //If there is live timer abandonded
      TimesCollectionAccess.remove({_id:oldTimeObject._id});
      console.log("deleted an old time: "+oldTimeObject._id);
      var oldTimeObject = TimesCollectionAccess.findOne({is_active:true});
      alert('You previously closed the app with the timer running, please leave the app open in the background to track your time.');
    }
    console.log("fixed all dead times!");
    return;
  }

  pushTimerBtn() {
    $('#manuallyInsertBtn').fadeToggle();

    if (timerStarted == false) {
      $('#startStopBtn').removeClass('greenBG').addClass('redBG');

      //checkAndFixDeadTimes();
      this.removeDeadTimes;

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
       console.log("added item to DB");
      TimesCollectionAccess.update({_id:timeObject._id},{
        $set:{
        stop_time:currentTime,
        is_active:false,
      }});


      $('#startStopBtn').removeClass('redBG').addClass('greenBG');
    }
    return;
  }

  FormattedDate(props) {
      //runs each tick
    //console.log(props);
    currentTime = Math.floor(props.getTime()/1000);
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
        <button id="startStopBtn" className="dropShadow greenBG" onClick={ this.pushTimerBtn }>
            {buttonText}
        </button>
        <button id="manuallyInsertBtn" className="dropShadow tanBG" onclick="">
          Manually Insert Time
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.FormattedDate(this.state.date)}
        <Footer />
      </div>
    );
  }
}
