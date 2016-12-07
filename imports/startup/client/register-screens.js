/**
 * @file Register all screens
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 11/6/2016
 */
import Nav from 'meteor/dgtlife:navigate';
import { navToDemo } from '../../api/mlib.js';
import '../../ui/home/home.js';
import '../../ui/includes/not-found/not-found.js';

// Home screen.
Nav.registerScreen('Home', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'home'
  }],
  title: 'Material for Meteor',
  path: '/',
  pathPattern: /^\/$/,
  after: navToDemo
});

// MD Header Panel API screen.
Nav.registerScreen('MD Header Panel API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_header_panel__api'
  }],
  title: 'MD Header Panel API',
  path: '/md-header-panel-api',
  pathPattern: /^\/md-header-panel-api$/
});

// MD Toolbar API screen.
Nav.registerScreen('MD Toolbar API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_toolbar__api'
  }],
  title: 'MD Toolbar API',
  path: '/md-toolbar-api',
  pathPattern: /^\/md-toolbar-api$/
});

// MD Drawer API screen.
Nav.registerScreen('MD Drawer API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_drawer__api'
  }],
  title: 'MD Drawer API',
  path: '/md-drawer-api',
  pathPattern: /^\/md-drawer-api$/
});

// MD Dialog API screen.
Nav.registerScreen('MD Dialog API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_dialog__api'
  }],
  title: 'MD Dialog API',
  path: '/md-dialog-api',
  pathPattern: /^\/md-dialog-api$/
});

// MD Snackbar API screen.
Nav.registerScreen('MD Snackbar API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_snackbar__api'
  }],
  title: 'MD Snackbar API',
  path: '/md-snackbar-api',
  pathPattern: /^\/md-snackbar-api$/
});

// MD Card API screen
Nav.registerScreen('MD Card API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_card__api'
  }],
  title: 'MD Card API',
  path: '/md-card-api',
  pathPattern: /^\/md-card-api$/
});

// MD Tabs API screen.
Nav.registerScreen('MD Tabs API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_tabs__api'
  }],
  title: 'MD Tabs API',
  path: '/md-tabs-api',
  pathPattern: /^\/md-tabs-api$/
});

// MD Text Input API screen.
Nav.registerScreen('MD Text Input API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_text_input__api'
  }],
  title: 'MD Text Input API',
  path: '/md-text-input-api',
  pathPattern: /^\/md-text-input-api$/
});

// MD Icon API screen.
Nav.registerScreen('MD Icon API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_icon__api'
  }],
  title: 'MD Icon API',
  path: '/md-icon-api',
  pathPattern: /^\/md-icon-api$/
});

// MD Button API screen.
Nav.registerScreen('MD Button API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_button__api'
  }],
  title: 'MD Button API',
  path: '/md-button-api',
  pathPattern: /^\/md-button-api$/
});

// MD Radio API screen.
Nav.registerScreen('MD Radio API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_radio__api'
  }],
  title: 'MD Radio API',
  path: '/md-radio-api',
  pathPattern: /^\/md-radio-api$/
});

// MD Checkbox API screen.
Nav.registerScreen('MD Checkbox API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_checkbox__api'
  }],
  title: 'MD Checkbox API',
  path: '/md-checkbox-api',
  pathPattern: /^\/md-checkbox-api$/
});

// MD Chip API screen.
Nav.registerScreen('MD Chip API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_chip__api'
  }],
  title: 'MD Chip API',
  path: '/md-chip-api',
  pathPattern: /^\/md-chip-api$/
});

// MD Collapse API screen.
Nav.registerScreen('MD Collapse API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_collapse__api'
  }],
  title: 'MD Collapse API',
  path: '/md-collapse-api',
  pathPattern: /^\/md-collapse-api$/
});


// MD Item API screen.
Nav.registerScreen('MD Item API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_item__api'
  }],
  title: 'MD Item API',
  path: '/md-item-api',
  pathPattern: /^\/md-item-api$/
});

// MD Menu API screen.
Nav.registerScreen('MD Menu API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_menu__api'
  }],
  title: 'MD Menu API',
  path: '/md-menu-api',
  pathPattern: /^\/md-menu-api$/
});

// MD Popup Menu API screen.
Nav.registerScreen('MD Popup Menu API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_popup_menu__api'
  }],
  title: 'MD Popup Menu API',
  path: '/md-popup-menu-api',
  pathPattern: /^\/md-popup-menu-api$/
});

// MD Dropdown Menu API screen.
Nav.registerScreen('MD Dropdown Menu API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_dropdown_menu__api'
  }],
  title: 'MD Dropdown Menu API',
  path: '/md-dropdown-menu-api',
  pathPattern: /^\/md-dropdown-menu-api$/
});

// MD Image API screen.
Nav.registerScreen('MD Image API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_image__api'
  }],
  title: 'MD Image API',
  path: '/md-image-api',
  pathPattern: /^\/md-image-api$/
});

// MD Tooltip API screen.
Nav.registerScreen('MD Tooltip API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_tooltip__api'
  }],
  title: 'MD Tooltip API',
  path: '/md-tooltip-api',
  pathPattern: /^\/md-tooltip-api$/
});

// MD Spinner API screen.
Nav.registerScreen('MD Spinner API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_spinner__api'
  }],
  title: 'MD Spinner API',
  path: '/md-spinner-api',
  pathPattern: /^\/md-spinner-api$/
});

// MD Shadow API screen.
Nav.registerScreen('MD Shadow API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_shadow__api'
  }],
  title: 'MD Shadow API',
  path: '/md-shadow-api',
  pathPattern: /^\/md-shadow-api$/
});

// Not Found.
Nav.registerScreen('Not Found', {
  contentHelperMap: [{
    helper: 'top_content',
    template: 'notFound'
  }],
  title: 'Not Found',
  path: '/not-found',
  pathPattern: /^\/not-found$/
});
