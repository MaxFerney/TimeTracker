import React from 'react';
import Hello from './Hello.jsx';
import { Info } from './Info.jsx';
import {TimeCollection} from './../api/links.js';
import PropTypes from 'prop-types';
import RenderTimeList from './RenderTimeList.jsx';

export default class App extends React.Component{
    render(){
        return(
            <div className="renderdiv">
                <h1>Welcome to Meteor!</h1>
                <Hello
                    passedStart={this.props.startTime}
                    passedStop={this.props.stopTime}
                    passedTimerStarted={this.props.timerStarted}
                    passedCurrentObject={this.props.currentObject}
                    passedCounter={this.props.counter}/>
                <RenderTimeList passed_times={this.props.passed_times}/>
                <Info/>
            </div>
        );
    }
};
App.propTypes = {
    passed_times: PropTypes.array.isRequired,
};
