import {TimeCollection} from './../api/links.js';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RenderTimeItem from './RenderTimeItem.jsx';

export default class RenderTimeList extends React.Component{
    renderAllTimes(){
        if (this.props.passed_times.length === 0) {
            return (
                <div>
                    <p>add a time to start!</p>
                </div>
            );
        } else {
            return this.props.passed_times.map((time_item) => {
                return <RenderTimeItem key={time_item._id} time_prop_obj={time_item}/>
            });
        }
    }
    render(){
        return (
            <div className="time-list">
                {this.renderAllTimes()}
            </div>

        );
    }
}
RenderTimeList.propTypes = {
    passed_times: PropTypes.array.isRequired,
};
