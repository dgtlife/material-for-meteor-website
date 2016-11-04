/**
 * @file Initialize the client
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 1/20/2016
 */

import { Nav } from 'meteor/dgtlife:app-navigator';
import C from 'meteor/dgtlife:code-prism';
import { MD } from 'meteor/dgtlife:material';

console.log('################### THIS IS THE START OF A NEW RUN ####################');

// Configure Nav.
Nav.config = {
  contentHelpers: [
    'screen_content'
  ],

  afterScreens() {
    // Scroll to the top
    if (MD.dqS('[data-content]')) {
      MD.dqS('[data-content]').scrollTop = 0;
    }

    // Highlight code.
    Meteor.setTimeout(function () {
      Prism.highlightAll();
    }, 0);
  },

  conditionsToWaitFor: {
    okToLoad: [
      function () {
        return C && C.metadata && C.metadata.ready();
      }
    ],
    okToReload: [
      function () {
        return C && C.metadata && C.metadata.ready();
      }
    ]
  }
};

// Configure MD.
MD.options = {
  elementsToMove: [
    '__indicators'
  ]
};
