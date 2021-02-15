import React from 'react';
import {Helmet} from "react-helmet";
import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';
import { TimesCollectionAccess } from './../../../lib/times.js';
export default class TimeList extends React.Component{
    render(){
        return (
           <div>
               <Helmet>
                   <title>Error</title>
               </Helmet>
               <Header />
               <h1>TIME LIST WOOT!</h1>
               <p>This means we couldn't find the page you were looking for</p>
               <div className="times">
                  { TimesCollectionAccess.find().fetch().map((timeItem) =>
                    <div key={timeItem._id} className="time_item">
                      <p>Time ID: {timeItem._id}</p>
                      <p>Start: {timeItem.start_time}</p>
                      <p>Stop: {timeItem.stop_time}</p>
                      <p>Is Active: {timeItem.is_active.toString()}</p>
                    </div>
                  )}
                </div>
               <Footer />
           </div>
        );
    }
}
