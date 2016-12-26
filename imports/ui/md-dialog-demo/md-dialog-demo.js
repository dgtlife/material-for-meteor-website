import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import { openDialog, closeDialog } from 'meteor/dgtlife:material';
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
    return getText('md-dialog__spacebars.txt');
  },

  code__jade() {
    return getText('md-dialog__jade.txt');
  }
});

// Launch dialog from button clicks.
Template.md_dialog__demo.events({
  'click #launch-dialog--default'() {
    openDialog('#demo-dialog--default');
  },

  'click #launch-dialog--set-width'() {
    openDialog('#demo-dialog--set-width');
  },

  'click #launch-dialog--action'() {
    openDialog('#demo-dialog--action');
  },

  'click #launch-dialog--modal'() {
    openDialog('#demo-dialog--modal');
  },

  'click #launch-dialog--scrollable'() {
    openDialog('#demo-dialog--scrollable');
  }
});

// Handle button clicks on the dialogs.
Template.demo_dialogs.events({
  'click .dialog__button--ok, click .dialog__button--cancel'(event) {
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(() => {
      // Close the dialog.
      closeDialog(dialog);
    }, 50);
  },

  'click .dialog__button--accept, click .dialog__button--decline'(event) {
    const dialog = event.currentTarget.parentElement.parentElement.parentElement;

    // Wait 50ms for ripple to start.
    Meteor.setTimeout(() => {
      // Close the dialog.
      closeDialog(dialog);
    }, 50);
  }
});
