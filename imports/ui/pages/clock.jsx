import React from 'react';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimesCollectionAccess } from '../../../lib/times.js';
import Footer from '../components/footer.jsx';
import Header from '../components/header.jsx';

//a change

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
bgColor = "greenBG";


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

  renderCategories(){
    var mappedCategories = this.props.categories.map((category) =>
        <option value={category}>{category}</option>
    );
    return (
        <select name="categories" id="categorySelection" class="tanBG dropShadow" >
            {mappedCategories}
        </select>
    );
  }

  pushTimerBtn() {
    $('#categorySelection').fadeToggle();
    $('#manuallyInsertBtn').fadeToggle();

    if (timerStarted == false) {
      bgColor='redBG';
      //checkAndFixDeadTimes();
      // var query = TimesCollectionAccess.find({is_active:true})
      TimesCollectionAccess.find({is_active:true}).fetch().map((deadTime) => {
         TimesCollectionAccess.remove({_id:deadTime._id});
      });
      // TimesCollectionAccess.remove(query);
      startTime = currentTime;
      endTime = "Waiting..."
      buttonText = "Stop";
      timerStarted = true;
      TimesCollectionAccess.insert({
        start_time: currentTime,
        stop_time: 0,
        category: $('#categorySelection').val(),
        is_active: true,
      });
      bgColor='redBG';
      timeObject = TimesCollectionAccess.findOne({is_active: true});
    } else {

      bgColor='greenBG';
      endTime = currentTime;
      buttonText = "Start";
      timerStarted = false;

      // findAndUpdate();
      timeObject = TimesCollectionAccess.findOne({is_active:true})
       //console.log("added item to DB");
      TimesCollectionAccess.update({_id:timeObject._id},{
        $set:{
        stop_time:currentTime,
        is_active:false,
      }});


      bgColor='greenBG';
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
        <button id="startStopBtn" className={"dropShadow " + bgColor} onClick={ this.pushTimerBtn }>
            {buttonText}
        </button>
        {this.renderCategories()}
        <br/>
        <br/>
        <NavLink to="/CreateTime" id="manuallyInsertBtn" className="dropShadow tanBG">
          Manually Insert Time
        </NavLink>
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
