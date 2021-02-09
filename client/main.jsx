import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import PropTypes from 'prop-types';
import { TimeCollection } from '../imports/api/timeCollection';


Meteor.startup(() => {
    const allTimesInDB = TimeCollection.find().fetch();
    render(<App/>, document.getElementById('react-target'));
});
