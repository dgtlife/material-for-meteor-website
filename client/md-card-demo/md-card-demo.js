import { C } from 'meteor/dgtlife:code-prism'

// Helpers for the demo docs.
Template.md_card__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-card__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-card__jade",
        label: "Jade",
        ripple: true
      }
    ]
  },

  code__spacebars() {
    return C.getText('md-card__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-card__jade.txt');
  }
});

// Register the associated API screen
Nav.registerScreen('MD Card API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_card__api'
  }],
  title: 'MD Card API',
  path: '/md-card-api',
  pathPattern: /^\/md-card-api$/
});

