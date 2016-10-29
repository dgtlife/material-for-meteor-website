import { C } from 'meteor/dgtlife:code-prism'

// Helpers for the MD Collapse demo block.
Template.md_collapse__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-collapse__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-collapse__jade",
        label: "Jade",
        ripple: true
      }
    ]
  },

  code__spacebars() {
    return C.getText('md-collapse__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-collapse__jade.txt');
  }
});

// Register the API screen
Nav.registerScreen('MD Collapse API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_collapse__api'
  }],
  title: 'MD Collapse API',
  path: '/md-collapse-api',
  pathPattern: /^\/md-collapse-api$/
});

