import { C } from 'meteor/dgtlife:code-prism'

// Configure Nav.
Nav.config = {
  contentHelpers: [
    'screen_content'
  ],

  afterScreens: function () {
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
        "use strict";
        return C && C.metadata && C.metadata.ready();
      }
    ],
    okToReload: [
      function () {
        "use strict";
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

