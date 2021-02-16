import React from 'react';
import {Helmet} from "react-helmet";
import moment from 'moment';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';

import { TimesCollectionAccess } from './../../../lib/times.js';
<<<<<<< HEAD

=======
import { NavLink } from 'react-router-dom';
>>>>>>> e32f149be96595dc22c58961c0318e340d7ffdc3
export default class TimeList extends React.Component{
  datesAvaliable(){
    var dates = [];
    TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) => {
      var date=moment(timeItem.start_time*1000).format("MMMM Do YYYY");
<<<<<<< HEAD
      //console.log("DATE: "+date);
      //console.log("DATE IN DATES: "+dates.indexOf(date) > -1);
=======
<<<<<<< HEAD
=======
      //console.log("DATE: "+date);
      //console.log("DATE IN DATES: "+dates.indexOf(date) > -1);
>>>>>>> e32f149be96595dc22c58961c0318e340d7ffdc3
>>>>>>> afa2b5e15815939c40329e2b669ad3c9acf80c3e
      if(!(dates.indexOf(date) > -1)){
        dates.push(date);
      }
    });
<<<<<<< HEAD
    dates.forEach((item, i) => {
      //console.log(item);
    });
=======
<<<<<<< HEAD
=======
    dates.forEach((item, i) => {
      //console.log(item);
    });
>>>>>>> e32f149be96595dc22c58961c0318e340d7ffdc3
>>>>>>> afa2b5e15815939c40329e2b669ad3c9acf80c3e

    return(
      dates
    );
  }
  renderTimeItem(timeItem){
    return(
<<<<<<< HEAD
      <div key={timeItem._id} className="timeDetails">
        <NavLink to={"/edit/" + timeItem._id}>
          <p>{start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
          <p>Placeholder Category</p>
        </NavLink>
=======
<<<<<<< HEAD
      <div key={timeItem._id} class="timeDetails">
        <NavLink to={"/edit/"+timeItem.start_time}>
          <div>
            <p> {start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
            <p>Placeholder Category</p>
          </div>
        </NavLink>
        {console.log("/edit/"+timeItem.start_time)}
=======
      <div key={timeItem._id} className="timeDetails">
        <NavLink to={"/edit/" + timeItem._id}>
          <p>{start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
          <p>Placeholder Category</p>
        </NavLink>
>>>>>>> e32f149be96595dc22c58961c0318e340d7ffdc3
>>>>>>> afa2b5e15815939c40329e2b669ad3c9acf80c3e
      </div>
    );
  }
  renderTimesInDate(date){
    const allTimesInDate = TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) =>{
      var currentDate = moment(timeItem.start_time*1000).format("MMMM Do YYYY");
      if (currentDate == date){
        return(this.renderTimeItem(timeItem));
      }
    });
    return(
      allTimesInDate
    );
  }
  renderTimeList(){
    var dates = this.datesAvaliable();
    const dateList = dates.map((date, index) =>
      <div key={index.toString()} className="time_item">
        <p>{date}</p>
        {this.renderTimesInDate(date)}
      </div>
    );
    return (
      dateList
    );
  }

  render(){
    return (
       <div>
         <Helmet>
           <title>Error</title>
         </Helmet>
         <Header />
         <div className="times">
            { this.renderTimeList() }
         </div>
         <Footer />
       </div>
    );
  }
}
