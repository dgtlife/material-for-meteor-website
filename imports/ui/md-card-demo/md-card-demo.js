import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import './md-card-demo.jade';
import './md-card-demo.styl';

// Helpers for the demo docs.
Template.md_card__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-card__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-card__jade',
        label: 'Jade',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-card__spacebars.txt');
  },

  code__jade() {
    return getText('md-card__jade.txt');
  }
});
