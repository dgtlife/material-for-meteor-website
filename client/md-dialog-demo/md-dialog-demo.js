import { C } from 'meteor/dgtlife:code-prism'

// Helpers for the demo docs.
Template.md_dialog__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-dialog__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-dialog__jade",
        label: "Jade",
        ripple: true
      }
    ]
  },

  code__spacebars() {
    return C.getText('md-dialog__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-dialog__jade.txt');
  }
});

// Launch dialog from button clicks.
Template.md_dialog__demo.events({
  'click #launch-dialog--default'() {
    "use strict";
    MD.openDialog('#demo-dialog--default');
  },

  'click #launch-dialog--set-width'() {
    "use strict";
    MD.openDialog('#demo-dialog--set-width');
  },

  'click #launch-dialog--action'() {
    "use strict";
    MD.openDialog('#demo-dialog--action');
  },

  'click #launch-dialog--modal'() {
    "use strict";
    MD.openDialog('#demo-dialog--modal');
  },

  'click #launch-dialog--scrollable'() {
    "use strict";
    MD.openDialog('#demo-dialog--scrollable');
  }
});

// Handle button clicks on the dialogs.
Template.demo_dialogs.events({
  'click .dialog__button--ok, click .dialog__button--cancel'(event) {
    "use strict";
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(function () {
      // Close the dialog.
        MD.closeDialog(dialog);
    }, 50);
  },

  'click .dialog__button--accept, click .dialog__button--decline'(event) {
    "use strict";
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(function () {
      // Close the dialog.
      MD.closeDialog(dialog);
    }, 50);
  }
});

// Register the associated API screen
Nav.registerScreen('MD Dialog API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_dialog__api'
  }],
  title: 'MD Dialog API',
  path: '/md-dialog-api',
  pathPattern: /^\/md-dialog-api$/
});
