import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import './md-checkbox-demo.jade';

// Helpers for the MD Checkbox demo block.
Template.md_checkbox__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-checkbox__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-checkbox__jade',
        label: 'Jade',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-checkbox__spacebars.txt');
  },

  code__jade() {
    return getText('md-checkbox__jade.txt');
  }
});
