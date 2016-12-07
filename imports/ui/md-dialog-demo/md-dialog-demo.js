import { Template } from 'meteor/templating';
import C from 'meteor/dgtlife:code-prism';
import MD from 'meteor/dgtlife:material';
import { Meteor } from 'meteor/meteor';
import './md-dialog-demo.jade';

// Helpers for the demo docs.
Template.md_dialog__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-dialog__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-dialog__jade',
        label: 'Jade',
        ripple: true
      }
    ];
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
    MD.openDialog('#demo-dialog--default');
  },

  'click #launch-dialog--set-width'() {
    MD.openDialog('#demo-dialog--set-width');
  },

  'click #launch-dialog--action'() {
    MD.openDialog('#demo-dialog--action');
  },

  'click #launch-dialog--modal'() {
    MD.openDialog('#demo-dialog--modal');
  },

  'click #launch-dialog--scrollable'() {
    MD.openDialog('#demo-dialog--scrollable');
  }
});

// Handle button clicks on the dialogs.
Template.demo_dialogs.events({
  'click .dialog__button--ok, click .dialog__button--cancel'(event) {
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(() => {
      // Close the dialog.
      MD.closeDialog(dialog);
    }, 50);
  },

  'click .dialog__button--accept, click .dialog__button--decline'(event) {
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(() => {
      // Close the dialog.
      MD.closeDialog(dialog);
    }, 50);
  }
});
