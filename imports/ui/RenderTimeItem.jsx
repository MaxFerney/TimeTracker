import {TimeCollection} from './../api/links.js';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default class RenderTimeItem extends React.Component{
    const
    render(){
        return (
            <div key={this.props.time_prop_obj._id} className="time__item">
                <p>Start time: {this.props.time_prop_obj.start} </p>
                <p>Stop time: {this.props.time_prop_obj.stop} </p>
            </div>

        );
    }
}
RenderTimeItem.propTypes = {
    time_prop_obj: PropTypes.object.isRequired,
};
