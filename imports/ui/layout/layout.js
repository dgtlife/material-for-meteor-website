/**
 * @file Helpers, event handlers, and the on-render callback for the layout template
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { toScreen } from 'meteor/dgtlife:navigate';
import {
  clearValueOfMenu,
  dqSA,
  setTabGroupSelection,
  closeDrawer
} from 'meteor/dgtlife:material';
import { navToDemo } from '../../api/mlib.js';
import './layout.jade';
import '../includes/loading/loading.jade';
import '../includes/loading/loading.styl';
import '../includes/coming-soon.jade';

// Connection Status indicator helpers.
Template.registerHelper('connection_status__icon_id', () => {
  const status = Meteor.status().status;
  if (status === 'connected') {
    return 'cloud';
  } else if (status === 'offline') {
    return 'cloud-off';
  }

  return 'cloud-queue';
});

Template.registerHelper('connection_status__indication', () => {
  const status = Meteor.status().status;
  if (status === 'connected') {
    return 'status--connection connected';
  } else if (status === 'connecting') {
    return 'status--connection connecting';
  } else if (status === 'waiting') {
    return 'status--connection waiting';
  } else if (status === 'failed') {
    return 'status--connection failed';
  } else if (status === 'offline') {
    return 'status--connection offline';
  }

  return 'offline';
});

Template.body.events({
  'click [name="go-home"]'() {
    toScreen('Home');
  },

  'click #more-menu--get-package'() {
    window.open('https://github.com/dgtlife/material-for-meteor', '_blank');
    clearValueOfMenu('#appbar-more');
  },

  'click #more-menu--show-jade'() {
    const tabGroups = dqSA('[data-tabs]');
    _.each(tabGroups, (tabGroup) => {
      if (tabGroup.id !== 'demo-tabs') {
        setTabGroupSelection(tabGroup, '1');
      }
    });
  },

  'click #more-menu--show-spacebars'() {
    const tabGroups = dqSA('[data-tabs]');
    _.each(tabGroups, (tabGroup) => {
      if (tabGroup.id !== 'demo-tabs') {
        setTabGroupSelection(tabGroup, '0');
      }
    });
  },

  'click [name="api-button"]'() {
    toScreen(this._data);
  }
});

// The Left drawer.
Template.left_drawer__menu_content.events({
  'click #menu-item--md-icon-demo'() {
    navToDemo('md-icon--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-header-panel-demo'() {
    navToDemo('md-header-panel--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-toolbar-demo'() {
    navToDemo('md-toolbar--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-tabs-demo'() {
    navToDemo('md-tabs--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-drawer-demo'() {
    navToDemo('md-drawer--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-dialog-demo'() {
    navToDemo('md-dialog--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-snackbar-demo'() {
    navToDemo('md-snackbar--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-card-demo'() {
    navToDemo('md-card--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-shadow-demo'() {
    navToDemo('md-shadow--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-text-input-demo'() {
    navToDemo('md-text-input--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-button-demo'() {
    navToDemo('md-button--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-radio-demo'() {
    navToDemo('md-radio--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-checkbox-demo'() {
    navToDemo('md-checkbox--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-chip-demo'() {
    navToDemo('md-chip--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-collapse-demo'() {
    navToDemo('md-collapse--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-item-demo'() {
    navToDemo('md-item--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-menu-demo'() {
    navToDemo('md-menu--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-popup-menu-demo'() {
    navToDemo('md-popup-menu--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-dropdown-menu-demo'() {
    navToDemo('md-dropdown-menu--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-image-demo'() {
    navToDemo('md-image--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-tooltip-demo'() {
    navToDemo('md-tooltip--demo');
    closeDrawer('left');
  },

  'click #menu-item--md-spinner-demo'() {
    navToDemo('md-spinner--demo');
    closeDrawer('left');
  }
});

// The Right drawer.
Template.right_drawer__menu_content.events({
  'click #menu-item--md-icon-api'() {
    toScreen('MD Icon API');
    closeDrawer('right');
  },

  'click #menu-item--md-header-panel-api'() {
    toScreen('MD Header Panel API');
    closeDrawer('right');
  },

  'click #menu-item--md-toolbar-api'() {
    toScreen('MD Toolbar API');
    closeDrawer('right');
  },

  'click #menu-item--md-tabs-api'() {
    toScreen('MD Tabs API');
    closeDrawer('right');
  },

  'click #menu-item--md-drawer-api'() {
    toScreen('MD Drawer API');
    closeDrawer('right');
  },

  'click #menu-item--md-dialog-api'() {
    toScreen('MD Dialog API');
    closeDrawer('right');
  },

  'click #menu-item--md-snackbar-api'() {
    toScreen('MD Snackbar API');
    closeDrawer('right');
  },

  'click #menu-item--md-card-api'() {
    toScreen('MD Card API');
    closeDrawer('right');
  },

  'click #menu-item--md-shadow-api'() {
    toScreen('MD Shadow API');
    closeDrawer('right');
  },

  'click #menu-item--md-text-input-api'() {
    toScreen('MD Text Input API');
    closeDrawer('right');
  },

  'click #menu-item--md-button-api'() {
    toScreen('MD Button API');
    closeDrawer('right');
  },

  'click #menu-item--md-radio-api'() {
    toScreen('MD Radio API');
    closeDrawer('right');
  },

  'click #menu-item--md-checkbox-api'() {
    toScreen('MD Checkbox API');
    closeDrawer('right');
  },

  'click #menu-item--md-chip-api'() {
    toScreen('MD Chip API');
    closeDrawer('right');
  },

  'click #menu-item--md-collapse-api'() {
    toScreen('MD Collapse API');
    closeDrawer('right');
  },

  'click #menu-item--md-item-api'() {
    toScreen('MD Item API');
    closeDrawer('right');
  },

  'click #menu-item--md-menu-api'() {
    toScreen('MD Menu API');
    closeDrawer('right');
  },

  'click #menu-item--md-popup-menu-api'() {
    toScreen('MD Popup Menu API');
    closeDrawer('right');
  },

  'click #menu-item--md-dropdown-menu-api'() {
    toScreen('MD Dropdown Menu API');
    closeDrawer('right');
  },

  'click #menu-item--md-image-api'() {
    toScreen('MD Image API');
    closeDrawer('right');
  },

  'click #menu-item--md-tooltip-api'() {
    toScreen('MD Tooltip API');
    closeDrawer('right');
  },

  'click #menu-item--md-spinner-api'() {
    toScreen('MD Spinner API');
    closeDrawer('right');
  }
});
