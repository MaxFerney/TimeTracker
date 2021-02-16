import React, { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import moment from 'moment';
//import { useParams } from 'react-router-dom';

import { useParams } from "react-router";

import { useParams } from "react-router";

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';

import { TimesCollectionAccess } from './../../../lib/times.js';
// logItem = function(){
//   let { id } = useParams();
//
//   console.log(id);
// }
export default class EditTime extends React.Component{
<<<<<<< HEAD
    render(){
        return (
           <div>
                <h1>Passed ID is this <br /> {this.props.passedID}</h1>
                <Helmet>
                    <title>Edit Time</title>
                </Helmet>
                <Header />
                <h1>Edit</h1>

                <p>Edit page for times</p>
                <Footer />
           </div>
        );
    }
}
=======
<<<<<<< HEAD

  render(){
    return (
     <div>
       <Helmet>
           <title>Edit Time</title>
       </Helmet>
       <Header />
       <h1>EDIT YOUR TIMES</h1>
       <p>This means we couldn't find the page you were looking for</p>
       <div class="timeInfo">
       {console.log(this.props.passedTimeItem._id)}


       </div>
       <Footer />
     </div>
    );
  }
}
// const time_id = () => {
//   const [state, setState] = useState({});
//   const { id } = useParams();
//   useEffect( () => {
//       api.getTeam(id).then(data => {
//          //logic
//       }
// };
// export default EditTime;


// EditTime.propTypes = {
//     timeItem: PropTypes.object.isRequired,
// };

// <h4>{this.props.timeItem._id}</h4>
// <p>Start Time: {moment(this.props.timeItem.start_time*1000).format('LT')}</p>
// <p>Stop Time: {moment(this.props.timeItem.stop_time*1000).format('LT')}</p>
// <p>Date: {moment(this.props.timeItem.stop_time*1000).format("MMMM Do YYYY")}</p>
=======
    render(){
        return (
           <div>
                <h1>Passed ID is this <br /> {this.props.passedID}</h1>
                <Helmet>
                    <title>Edit Time</title>
                </Helmet>
                <Header />
                <h1>Edit</h1>

                <p>Edit page for times</p>
                <Footer />
           </div>
        );
    }
}
>>>>>>> afa2b5e15815939c40329e2b669ad3c9acf80c3e
/*
EditTime.propTypes = {
    timeItem: PropTypes.object.isRequired,
};
*/
<<<<<<< HEAD
=======
>>>>>>> e32f149be96595dc22c58961c0318e340d7ffdc3
>>>>>>> afa2b5e15815939c40329e2b669ad3c9acf80c3e
