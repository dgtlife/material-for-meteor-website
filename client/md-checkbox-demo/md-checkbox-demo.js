import C from 'meteor/dgtlife:code-prism'

// Helpers for the MD Checkbox demo block.
Template.md_checkbox__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-checkbox__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-checkbox__jade",
        label: "Jade",
        ripple: true
      }
    ]
  },

  code__spacebars() {
    return C.getText('md-checkbox__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-checkbox__jade.txt');
  }
});

// Register the API screen
Nav.registerScreen('MD Checkbox API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_checkbox__api'
  }],
  title: 'MD Checkbox API',
  path: '/md-checkbox-api',
  pathPattern: /^\/md-checkbox-api$/
});

