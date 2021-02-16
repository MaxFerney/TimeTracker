//modules
import React, { useState, Component } from 'react';
import {BrowserRouter as Router, Route, Navlink, Switch, useParams} from 'react-router-dom';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//dbs
import { TimesCollectionAccess } from './../../lib/times.js';
//pages
import Clock from './pages/clock.jsx';
import TimeList from './pages/TimeList.jsx';
import EditTime from './pages/EditTime.jsx';
import Settings from './pages/Settings.jsx';

function User() {
  let { id } = useParams();
  console.log("The id is: " + id);
  return(
    <EditTime passedID={id}/>
  )
}

export default class App extends React.Component{
  routeEditTimes(){
    const listTimes = TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) =>
      <Route
          key={timeItem._id}
          path={"/edit/"+timeItem.start_time}>
          <EditTime passedTimeItem={timeItem}/>
      </Route>
    );
    return listTimes;

  }
  render(){
    return(
        <Router>
          <Switch>
            <Route
              key="Clock"
              path="/"
              exact >
              <Clock />
            </Route>
            <Route
              key="TimeList"
              path="/TimeList"
              exact >
              <TimeList />
            </Route>

            { this.routeEditTimes() }

            <Route
              key="Settings"
              path="/Settings"
              exact >
              <Settings />
            </Route>
            <Route
              key="EditTime"
              path="/edit/:id"
              exact 
              >
              <User />
            </Route>

          </Switch>
        </Router>
    );
  }
}
// <Route
//   key="Edit"
//   path="/edit/:id"
//   exact >
//   <EditTime />
// </Route>
