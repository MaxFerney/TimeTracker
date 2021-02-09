import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import PropTypes from 'prop-types';

var currentTime;

export const App = () => (
  <div>
    <Clock/>
    <Hello/>
    <Info/>
  </div>
);

function FormattedDate(props) {
  currentTime = Math.floor(props.date.getTime()/1000);
  return <h2>It is {currentTime}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    console.log("This is a tick");
  }

  render() {
    return (
      <div>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
