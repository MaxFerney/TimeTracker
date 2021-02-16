//modules
import React, { useState, Component } from 'react';
import {BrowserRouter as Router, Route, Navlink, Switch} from 'react-router-dom';
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

export default class App extends React.Component{
  routeEditTimes(){
    const listTimes = TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) =>
      <Route
          key={timeItem._id}
          path={"/edit/"+timeItem._id}>
          <EditTime timeItem={timeItem}/>
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
            <Route
              key="Edit"
              path="/edit/:id">
              <EditTime />
            </Route>
            { /*this.routeEditTimes()*/ }
            <Route
              key="Settings"
              path="/Settings"
              exact >
              <Settings />
            </Route>

          </Switch>
        </Router>
    );
  }
}
