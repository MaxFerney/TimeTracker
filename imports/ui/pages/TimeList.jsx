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
      if(!(dates.indexOf(date) > -1)){
        dates.push(date);
      }
    });

    return(
      dates
    );
  }
  renderTimeItem(timeItem){
    return(
      <div key={timeItem._id} class="timeDetails">
        <NavLink to={"/edit/"+timeItem.start_time}>
          <div>
            <p> {start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
            <p>Placeholder Category</p>
          </div>
        </NavLink>
        {console.log("/edit/"+timeItem.start_time)}
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
      <div key={index.toString()} class="time_item">
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
