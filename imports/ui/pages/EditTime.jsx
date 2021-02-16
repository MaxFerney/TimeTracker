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
    getData() {
        //console.log(this.props.passedID);
        currentEvent = TimesCollectionAccess.findOne({_id: this.props.passedID});
    
        console.log(JSON.stringify(currentEvent));

        return (
            <div>
                <h2>{(currentEvent.start_time)}</h2>
                <p>{/*(currentEvent.start_time + " - " + currentEvent.end_time)*/}</p>
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
