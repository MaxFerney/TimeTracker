import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';

import { useParams } from "react-router";

import Footer from './../components/footer.jsx';
import Header from './../components/header.jsx';

export default class EditTime extends React.Component{
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
/*
EditTime.propTypes = {
    timeItem: PropTypes.object.isRequired,
};
*/
