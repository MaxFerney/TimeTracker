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
/*
    updateDB(startTime=null, stopTime=null, category=null){
        //MAKE SURE TIMES ARE IN UNIX TIME (SECONDS)
        if (startTime!=null){
            TimesCollectionAccess.update({_id: this.props.passedID},{$set:{
                    start_time: startTime
                }
            });
        } if (stopTime!=null) {
            TimesCollectionAccess.update({_id: this.props.passedID},{$set:{
                    stop_time: stopTime
                }
            });
        } if (category!=null){
            TimesCollectionAccess.update({_id: this.props.passedID},{$set:{
                    category: category
                }
            });
        } else {
            console.error("Update db was called, but nothing was updated dumb dumb!");
        }
    }
*/
    seeNewTime(passedID, oldTime) {
        console.log('New start time: ' + moment($('#newTimeStart').val(), "HH:mm").format('X'));
        console.log('New end time: ' + moment($('#newTimeEnd').val(), "HH:mm").format('X'));
        //var oldDate = moment(oldTime.start_time*1000).format('MMMM Do YYYY');
        var startTime = moment($('#newTimeStart').val()).format('X');
        var stopTime = moment($('#newTimeEnd').val()).format('X');

        console.log("Start : " + startTime + "\tEnd : " + stopTime);
        console.log("Norty undefined pasedID : " + passedID);

        if (startTime!=null){
            TimesCollectionAccess.update({_id: passedID},{$set:{
                    start_time: startTime
                }
            });
        } if (stopTime!=null) {
            TimesCollectionAccess.update({_id: passedID},{$set:{
                    stop_time: stopTime
                }
            });
        // } if (category!=null){
        //     TimesCollectionAccess.update({_id: this.props.passedID},{$set:{
        //             category: category
        //         }
        //     });
        } else {
            console.error("Update db was called, but nothing was updated dumb dumb!");
        }
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
                <p>{moment(currentEvent.start_time*1000).format()}</p>

                <button>
                    <span id="editStart">Start</span>
                    <span id="editStop">Stop</span>
                </button>

                <input id="newTimeStart" type="datetime-local" step="60" defaultValue={moment(currentEvent.start_time*1000).format()}/>
                <input id="newTimeEnd" type="datetime-local" step="60" defaultValue={moment(currentEvent.stop_time*1000).format()}/>

                <br/>
                <button id="saveValuesBtn" onClick={ () => this.seeNewTime(this.props.passedID, currentEvent) }>
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
