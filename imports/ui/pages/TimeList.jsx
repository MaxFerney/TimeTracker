import React from 'react';
import {Helmet} from "react-helmet";
import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';
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
               <Footer />
           </div>
        );
    }
}
