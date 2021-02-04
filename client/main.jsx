import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {TimeCollection} from '/imports/api/links.js';

import App from './../imports/ui/App.jsx';
Meteor.startup(() => {
    // Tracker.autorun(()=>{
        const dbTimes = TimeCollection.find().fetch();
        let startTime = 0;
        let stopTime = 0;
        let timerStarted="false";
        let currentObject=0;
        let counter=Math.floor(Date.now() / 1000 );

        ReactDOM.render(<App
            passed_times={dbTimes}
            passedStart={startTime}
            passedStop={stopTime}
            passedTimerStarted={timerStarted}
            passedCurrentObject={currentObject}
            passedCounter={counter}/>,
            document.getElementById('react-target'));
    // });
});
