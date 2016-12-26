import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import './md-tabs-demo.jade';

// Helpers for the MD Tabs demo block.
Template.md_tabs__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-tabs__spacebars',
        label: 'Spacebars',
        ripple: true
      },

      {
        name: 'md-tabs__jade',
        label: 'Jade',
        ripple: true
      },

      {
        name: 'md-tabs__js',
        label: 'JavaScript',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-tabs__spacebars.txt');
  },

  code__jade() {
    return getText('md-tabs__jade.txt');
  },

  code__js() {
    return getText('md-tabs__js.txt');
  }
});

Template.tabs_demo.helpers({
  demo_tabs() {
    return [
      {
        name: 'demo-tab-pane-1',
        label: 'Tab 1',
        ripple: true
      },
      {
        name: 'demo-tab-pane-2',
        label: 'Tab 2',
        ripple: true
      },
      {
        name: 'demo-tab-pane-3',
        label: 'Tab 3',
        ripple: true
      },
      {
        name: 'demo-tab-pane-4',
        label: 'Tab 4',
        ripple: true
      }
    ];
  }
});

