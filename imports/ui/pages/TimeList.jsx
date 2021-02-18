import React from 'react';
import {Helmet} from "react-helmet";
import moment from 'moment';
import {BrowserRouter as Router,Switch,Route,NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';

import { TimesCollectionAccess } from './../../../lib/times.js';

export default class TimeList extends React.Component{
  datesAvaliable(){
    var dates = [];
    TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) => {
      var date=moment(timeItem.start_time*1000).format("MMMM Do YYYY");
      //console.log("DATE: "+date);
      //console.log("DATE IN DATES: "+dates.indexOf(date) > -1);
      if(!(dates.indexOf(date) > -1)){
        dates.push(date);
      }
    });
    dates.forEach((item, i) => {
      //console.log(item);
    });

    return(
      dates
    );
  }
  renderTimeItem(timeItem){
    return(
      <div key={timeItem._id} className="timeDetails">
        <NavLink to={"/" + timeItem._id}>
          <p>{start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
          <p>{timeItem.category}</p>
        </NavLink>
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
