/**
 * @file Initialize the client
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 1/20/2016
 */
/* global Prism:true */
import C from 'meteor/dgtlife:code-prism';
import Nav from 'meteor/dgtlife:navigate';
import MD from 'meteor/dgtlife:material';
import { Meteor } from 'meteor/meteor';
import './register-screens.js';
import '../../ui/layout/layout.coffee';

console.log(
  '################### THIS IS THE START OF A NEW RUN ####################'
);

// Check that the Code metadata subscription is ready.
function isCodeReady() {
  return C && C.metadata && C.metadata.ready();
}

// Configure Nav.
Nav.run({
  contentHelpers: ['screen_content'],

  afterScreens() {
    // Scroll to the top
    if (MD.dqS('[data-content]')) {
      MD.dqS('[data-content]').scrollTop = 0;
    }

    // Highlight code.
    Meteor.defer(() => {
      Prism.highlightAll();
    });
  },

  conditionsToWaitFor: {
    okToLoad: [isCodeReady],
    okToReload: [isCodeReady]
  }
});

// Configure MD.
MD.options = {
  elementsToMove: ['__indicators']
};
