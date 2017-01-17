/**
 * @file Initialize the client
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 */
/* global Prism:true */
import { metadata as codeMetadata } from 'meteor/dgtlife:code-prism';
import { run as runNav } from 'meteor/dgtlife:navigate';
import { dqS, run as runMD } from 'meteor/dgtlife:material';
import { Meteor } from 'meteor/meteor';
import './register-screens.js';
import '../../ui/layout/layout.js';

console.log(
  '################### THIS IS THE START OF A NEW RUN ####################'
);

// Check that the Code metadata subscription is ready.
const isCodeReady = () => codeMetadata && codeMetadata.ready();

// Run Nav.
runNav({
  contentHelpers: ['screen_content'],

  afterScreens() {
    // Scroll to the top
    if (dqS('[data-content]')) {
      dqS('[data-content]').scrollTop = 0;
    }

    // Highlight code.
    Meteor.defer(() => Prism.highlightAll());
  },

  conditionsToWaitFor: {
    okToLoad: [isCodeReady],
    okToReload: [isCodeReady]
  }
});

// Run MD.
runMD({
  elementsToMove: ['__indicators']
});
