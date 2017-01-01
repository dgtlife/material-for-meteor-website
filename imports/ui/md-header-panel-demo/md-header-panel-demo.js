import { Template } from 'meteor/templating';
import { getText } from 'meteor/dgtlife:code-prism';
import { toScreen, toHome } from 'meteor/dgtlife:navigate';
import { changeHeaderPanelMode } from '../../api/mlib.js';
import './md-header-panel-demo.jade';

Template.md_header_panel__demo.helpers({
  tabs() {
    return [
      {
        name: 'md-header-panel__spacebars',
        label: 'Spacebars',
        ripple: true
      },
      {
        name: 'md-header-panel__jade',
        label: 'Jade',
        ripple: true
      }
    ];
  },

  code__spacebars() {
    return getText('md-header-panel__spacebars.txt');
  },

  code__jade() {
    return getText('md-header-panel__jade.txt');
  }
});

Template.md_header_panel__demo.events({
  'click #to-standard-screen'() {
    toHome();
    changeHeaderPanelMode('standard');
  },

  'click #to-seamed-screen'() {
    toScreen('Seamed Header Panel');
  },

  'click #to-scroll-screen'() {
    toScreen('Scroll Header Panel');
  },

  'click #to-waterfall-screen'() {
    toScreen('Waterfall Header Panel');
  },

  'click #to-expand-on-scroll-screen'() {
    toScreen('Expand on Scroll Header Panel');
  },

  'click #to-cover-screen'() {
    toScreen('Cover Header Panel');
  }
});
