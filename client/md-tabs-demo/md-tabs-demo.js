import C from 'meteor/dgtlife:code-prism'

// Helpers for the MD Tabs demo block.
Template.md_tabs__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-tabs__spacebars",
        label: "Spacebars",
        ripple: true
      },

      {
        name: "md-tabs__jade",
        label: "Jade",
        ripple: true
      },

      {
        name: "md-tabs__js",
        label: "JavaScript",
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return C.getText('md-tabs__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-tabs__jade.txt');
  },

  code__js() {
    return C.getText('md-tabs__js.txt');
  }
});

Template.tabs_demo.helpers({
  demo_tabs() {
    "use strict";
    return [
      {
        name: "demo-tab-pane-1",
        label: "Tab 1",
        ripple: true
      },
      {
        name: "demo-tab-pane-2",
        label: "Tab 2",
        ripple: true
      },
      {
        name: "demo-tab-pane-3",
        label: "Tab 3",
        ripple: true
      },
      {
        name: "demo-tab-pane-4",
        label: "Tab 4",
        ripple: true
      }
    ];
  }
});

// Register the API screen
Nav.registerScreen('MD Tabs API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_tabs__api'
  }],
  title: 'MD Tabs API',
  path: '/md-tabs-api',
  pathPattern: /^\/md-tabs-api$/
});

