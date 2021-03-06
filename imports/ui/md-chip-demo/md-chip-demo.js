import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import './md-chip-demo.jade';

// Helpers for the demo docs.
Template.md_chip__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-chip__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-chip__jade',
        label: 'Jade',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-chip__spacebars.txt');
  },

  code__jade() {
    return getText('md-chip__jade.txt');
  }
});
