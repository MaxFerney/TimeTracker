import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {TimeCollection} from './../api/links.js';


export default class Hello extends React.Component{

    // const[counter, setCounter] = useState(Math.floor(Date.now() / 1000 ));
    // const[startTime, setStartTime] = useState("Not Started");
    // const[stopTime, setStopTime] = useState("Not Stopped");
    //
    // const[timerStarted, setTimerStarted] = useState("false");
    // var[currentObject, setCurrentObject] = useState(0);


    // setInterval(() => {
    //   this.props.counter = (Math.floor(Date.now() / 1000 ));
    // }, 1000);

    getTime() {
        if(this.props.timerStarted == "false") {
            console.log(this.props.timerStarted);

            this.props.startTime = (Math.floor(Date.now() / 1000 ));
            // startTime = Math.floor(Date.now() / 1000 );

            TimeCollection.insert({
                start: this.props.startTime,
            });

            this.props.currentObject = (TimeCollection.find(
                    {
                        start:this.props.startTime
                    }
                ).fetch()
            );
            console.log(this.props.currentObject);

            // setStopTime("Not Stopped");

            this.props.timerStarted="true";
        } else {
            console.log(this.props.timerStarted);
            this.props.stopTime = (Math.floor(Date.now() / 1000 ));
            // setStopTime(counter);
            TimeCollection.update({_id: this.props.currentObject._id},{
                stop:this.props.stopTime
            });
            console.log("CURRENT OBJECT" + this.props.currentObject);
            this.props.timerStarted="false";
        }
    }
    getTimeList(){
        return (<p>{TimeCollection.find().fetch()}</p>);
    }

    // function makeTime(event){
    //     event.preventDefault();
    //     let categoryName = event.target.category.value;
    //     let start = Math.floor(Date.now() / 1000 );
    //     let stop = 0;
    //     if(categoryName){
    //         if (stop != 0){
    //             TimeCollection.insert({
    //                 start: start,
    //                 category: categoryName,
    //             });
    //         }
    //         else{
    //             let stop = Math.floor(Date.now() / 1000 );
    //             event.target.category.value = '';
    //             TimeCollection.update({},{
    //
    //             });
    //         }
    //     }
    // }
    render(){
        return (
            <div>
                <p>Current Unix Time: {this.props.counter} </p>
                <button onClick={this.getTime()}>
                Get Time
                </button>
                <button onClick={this.getTimeList()}>
                Get Time List!
                </button>
                <p>Start Time: {this.props.startTime}</p>
                <p>Stop Time: {this.props.stopTime}</p>
            </div>
        );
    }

    // <form className="form" onSubmit={this.processData.bind(this)}>
    //     <input className='form__input' type='text' name='category' placeholder='Insert Category Name...'/>
    //     <button className='button'>Start!</button>
    // </form>
};
