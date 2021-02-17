import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//import { useParams } from 'react-router-dom';

import { useParams } from "react-router";

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';

import { TimesCollectionAccess } from './../../../lib/times.js';

export default class EditTime extends React.Component{
    updateDB(currentEvent, startTime=null, stopTime=null, category=null){
        //MAKE SURE TIMES ARE IN UNIX TIME (SECONDS)
        if (startTime!=null){
            TimesCollectionAccess.update({_id:currentEvent._id},{$set:{
                    start_time: startTime
                }
            });
        } if (stopTime!=null) {
            TimesCollectionAccess.update({_id:currentEvent._id},{$set:{
                    stop_time: stopTime
                }
            });
        } if (category!=null){
            TimesCollectionAccess.update({_id:currentEvent._id},{$set:{
                    category: category
                }
            });
        } else {
            console.error("Update db was called, but nothing was updated!");
        }
    }
    seeNewTime() {
        console.log($('#newTime').value);
    }

    getData() {
        //console.log(this.props.passedID);
        let currentEvent;

        TimesCollectionAccess.find({_id: this.props.passedID}).fetch().map((item) => {
            if(item._id == this.props.passedID) {
                currentEvent = item;
            }
        });

        return (
            <div id="editTimeContainer">
                {console.log(JSON.stringify(currentEvent))}
                <h2>{moment(currentEvent.start_time*1000).format('MMMM Do YYYY')}</h2>
                <p>{moment(currentEvent.start_time*1000).format('LT') + " - " + moment(currentEvent.stop_time*1000).format('LT')}</p>

                <button>
                    <span id="editStart">Start</span>
                    <span id="editStop">Stop</span>
                </button>

                <input id="newTimeStart" type="time" step="60"/>
                <input type="netTimeEnd" type="time" step="60"/>

                <br/>
                <button id="saveValuesBtn">
                    Save
                </button>
            </div>
        );
    }

    render(){
        return (
           <div>
                <Helmet>
                    <title>Edit Time</title>
                </Helmet>
                <Header />

                {this.getData()}

                <Footer />
           </div>
        );
    }
}
/*
EditTime.propTypes = {
    timeItem: PropTypes.object.isRequired,
};
*/
