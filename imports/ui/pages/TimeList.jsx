import React from 'react';
import {Helmet} from "react-helmet";
import moment from 'moment';
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
               <div className="times">
                    { TimesCollectionAccess.find({},{sort: {start_time:-1}}).fetch().map((timeItem) =>
                      <div key={timeItem._id} className="time_item">
                        {console.log(moment(timeItem.start_time*1000).format("MMMM Do YYYY"))}

                        <p>{moment(timeItem.start_time*1000).format("MMMM Do YYYY")}</p>

                        <div class="timeDetails">
                          <p> {start = moment(timeItem.start_time*1000).format('LT')} - {moment(timeItem.stop_time*1000).format('LT')}</p>
                          <p>Placeholder Category</p>
                        </div>
                      </div>
                    )}
                </div>
               <Footer />
           </div>
        );
    }
}
