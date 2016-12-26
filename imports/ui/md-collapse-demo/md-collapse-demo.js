import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import './md-collapse-demo.jade';
import './md-collapse-demo.styl';

// Helpers for the MD Collapse demo block.
Template.md_collapse__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-collapse__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-collapse__jade',
        label: 'Jade',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-collapse__spacebars.txt');
  },

  code__jade() {
    return getText('md-collapse__jade.txt');
  }
});

