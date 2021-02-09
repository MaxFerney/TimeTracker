import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { LinksCollection,TimeCollection } from '/imports/api/links';

function insertTime({ start, stop, category}){
    TimeCollection.insert({start, stop, category});
}

function insertLink({ title, url }) {
    LinksCollection.insert({title, url, createdAt: new Date()});
}
var connectHandler = WebApp.connectHandlers;

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
//snippets below from
/*
https://stackoverflow.com/questions/15959501/how-to-add-cors-headers-to-a-meteor-app
https://www.w3.org/wiki/CORS_Enabled
*/
    connectHandler.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:12632'); //allow access
      return next();
    })
    Tracker.autorun(()=>{

        if (LinksCollection.find().count() === 0) {
            insertLink({
                title: 'Do the Tutorial',
                url: 'https://www.meteor.com/tutorials/react/creating-an-app'
            });

            insertLink({
                title: 'Follow the Guide',
                url: 'http://guide.meteor.com'
            });

            insertLink({
                title: 'Read the Docs',
                url: 'https://docs.meteor.com'
            });

            insertLink({
                title: 'Discussions',
                url: 'https://forums.meteor.com'
            });
        }
        if (TimeCollection.find().count() === 0) {
            insertTime({
                start: 'test time',
                stop: 'test stop'
            });
        }

    });
});

/**
 * HTTP Header Security
 *
 * enforce HTTP Strict Transport Security (HSTS) to prevent ManInTheMiddle-attacks
 * on supported browsers (all but IE)
 * > http://www.html5rocks.com/en/tutorials/security/transport-layer-security
 *
 * @header Strict-Transport-Security: max-age=2592000; includeSubDomains
 */

var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

// attach connect-style middleware for response header injection
Meteor.startup(function () {
  connectHandler.use(function (req, res, next) {
    res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
    return next();
  })
})
