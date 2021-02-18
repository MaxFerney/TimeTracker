import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//import { useParams } from 'react-router-dom';

import { useParams, useHistory, Redirect, BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';
import TimeList from './TimeList.jsx';

import { TimesCollectionAccess } from './../../../lib/times.js';

// function RedirectTimeList(){
//     let history = useHistory();
//     function goHome(){
//         console.log("")
//         history.push("/TimeList");
//
//     }
//     return(
//
//     );
// }
export default class EditTime extends React.Component{

    renderCategories(default_category="Work"){
        var mappedCategories = this.props.categories.map((category) => {
            if (category==default_category){
                return(<option selected value={category}>{category}</option>);
            } else {
                return(<option value={category}>{category}</option>);
            }
        });
        return (
             <select name="categories" id="categorySelection" class="tanBG">
                {mappedCategories}
            </select>
        );
    }
    seeNewTime(passedID, oldTime) {

        // console.log('New start time: ' + moment($('#newTimeStart').val(), "HH:mm").format('X'));
        // console.log('New end time: ' + moment($('#newTimeEnd').val(), "HH:mm").format('X'));

        var startTime = parseInt(moment($('#newTimeStart').val()).format('X'));
        var stopTime = parseInt(moment($('#newTimeEnd').val()).format('X'));
        var category = $('#categorySelection').val();

        // console.log("Start : " + startTime + "\tEnd : " + stopTime);
        // console.log("Norty undefined pasedID : " + passedID);

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
        } if (category!=null){
            TimesCollectionAccess.update({_id: passedID},{$set:{
                    category: category
                }
            });
        } else {
            console.error("Update db was called, but nothing was updated dumb dumb!");
        }
        // return(
        //     <TimeList />
        // );
    }

    getData() {
        //console.log(this.props.passedID);

        let currentEvent;
        let passedID = this.props.passedID;
        TimesCollectionAccess.find({_id: passedID}).fetch().map((item) => {
            if(item._id == passedID) {
                currentEvent = item;
            }
        });

        return (
            <div id="editTimeContainer">
                {console.log(JSON.stringify(currentEvent))}
                <h2>{moment(currentEvent.start_time*1000).format('MMMM Do YYYY')}</h2>
                <p>{moment(currentEvent.start_time*1000).format('LT') + " - " + moment(currentEvent.stop_time*1000).format('LT')}</p>

                <p>Start Time</p>
                <input id="newTimeStart" class="tanBG" type="datetime-local" defaultValue={moment(currentEvent.start_time*1000).format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>

                <p>End Time</p>
                <input id="newTimeEnd" class="tanBG" type="datetime-local" defaultValue={moment(currentEvent.stop_time*1000).format('YYYY[-]MM[-]DD[T]HH[:]mm')}/>
                
                <br/>
                { this.renderCategories(currentEvent.category) }

                <br/>
                <button id="saveValuesBtn" class="greenBG" onClick={ () => this.seeNewTime(passedID, currentEvent) }>
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
