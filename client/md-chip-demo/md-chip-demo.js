import { C } from 'meteor/dgtlife:code-prism'

// Helpers for the demo docs.
Template.md_chip__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-chip__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-chip__jade",
        label: "Jade",
        ripple: true
      }
    ]
  },

  code__spacebars() {
    return C.getText('md-chip__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-chip__jade.txt');
  }
});

// Register the associated API screen
Nav.registerScreen('MD Chip API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_chip__api'
  }],
  title: 'MD Chip API',
  path: '/md-chip-api',
  pathPattern: /^\/md-chip-api$/
});

