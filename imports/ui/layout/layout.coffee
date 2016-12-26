###
  @file Helpers, event handlers, and the on-render callback for the layout template
  @author Derek Gransaull <derek@dgtlife.com>
  @copyright DGTLife, LLC 2015

  Created on 11/2/2015
###
{ Template } = require 'meteor/templating'
{ Meteor } = require 'meteor/meteor'
toScreen = require('meteor/dgtlife:navigate').toScreen
MD = require('meteor/dgtlife:material').default
require './layout.jade'
require '../includes/loading/loading.jade'
require '../includes/loading/loading.styl'
require '../includes/coming-soon.jade'
navToDemo = require('../../api/mlib.js').navToDemo

# Connection Status indicator helpers.
Template.registerHelper 'connection_status__icon_id', ->
  if Meteor.status().status is 'connected'
    'cloud'
  else if Meteor.status().status is 'offline'
    'cloud-off'
  else
    'cloud-queue'

Template.registerHelper 'connection_status__indication', ->
  switch Meteor.status().status
    when 'connected' then 'status--connection connected'
    when 'connecting' then 'status--connection connecting'
    when 'waiting' then 'status--connection waiting'
    when 'failed' then 'status--connection failed'
    when 'offline' then 'status--connection offline'
    else 'offline'

Template.body.events
  'click [name="go-home"]': ->
    toScreen 'Home'

  'click #more-menu--get-package': ->
    window.open 'https://github.com/dgtlife/material-for-meteor', '_blank'
    MD.clearValueOfMenu '#appbar-more'

  'click #more-menu--show-jade': ->
    tabGroups = MD.dqSA '[data-tabs]'
    _.each tabGroups, (tabGroup) ->
      if tabGroup.id isnt 'demo-tabs'
        MD.setTabGroupSelection tabGroup, '1'

  'click #more-menu--show-spacebars': ->
    tabGroups = MD.dqSA '[data-tabs]'
    _.each tabGroups, (tabGroup) ->
      if tabGroup.id isnt 'demo-tabs'
        MD.setTabGroupSelection tabGroup, '0'

  'click [name="api-button"]': ->
    toScreen @_data

# The Left drawer.
Template.left_drawer__menu_content.events
  'click #menu-item--md-icon-demo': ->
    navToDemo 'md-icon--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-header-panel-demo': ->
    navToDemo 'md-header-panel--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-toolbar-demo': ->
    navToDemo 'md-toolbar--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-tabs-demo': ->
    navToDemo 'md-tabs--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-drawer-demo': ->
    navToDemo 'md-drawer--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-dialog-demo': ->
    navToDemo 'md-dialog--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-snackbar-demo': ->
    navToDemo 'md-snackbar--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-card-demo': ->
    navToDemo 'md-card--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-shadow-demo': ->
    navToDemo 'md-shadow--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-text-input-demo': ->
    navToDemo 'md-text-input--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-button-demo': ->
    navToDemo 'md-button--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-radio-demo': ->
    navToDemo 'md-radio--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-checkbox-demo': ->
    navToDemo 'md-checkbox--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-chip-demo': ->
    navToDemo 'md-chip--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-collapse-demo': ->
    navToDemo 'md-collapse--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-item-demo': ->
    navToDemo 'md-item--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-menu-demo': ->
    navToDemo 'md-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-popup-menu-demo': ->
    navToDemo 'md-popup-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-dropdown-menu-demo': ->
    navToDemo 'md-dropdown-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-image-demo': ->
    navToDemo 'md-image--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-tooltip-demo': ->
    navToDemo 'md-tooltip--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-spinner-demo': ->
    navToDemo 'md-spinner--demo'
    MD.closeDrawer 'left'

# The Right drawer.
Template.right_drawer__menu_content.events
  'click #menu-item--md-icon-api': ->
    toScreen 'MD Icon API'
    MD.closeDrawer 'right'

  'click #menu-item--md-header-panel-api': ->
    toScreen 'MD Header Panel API'
    MD.closeDrawer 'right'

  'click #menu-item--md-toolbar-api': ->
    toScreen 'MD Toolbar API'
    MD.closeDrawer 'right'

  'click #menu-item--md-tabs-api': ->
    toScreen 'MD Tabs API'
    MD.closeDrawer 'right'

  'click #menu-item--md-drawer-api': ->
    toScreen 'MD Drawer API'
    MD.closeDrawer 'right'

  'click #menu-item--md-dialog-api': ->
    toScreen 'MD Dialog API'
    MD.closeDrawer 'right'

  'click #menu-item--md-snackbar-api': ->
    toScreen 'MD Snackbar API'
    MD.closeDrawer 'right'

  'click #menu-item--md-card-api': ->
    toScreen 'MD Card API'
    MD.closeDrawer 'right'

  'click #menu-item--md-shadow-api': ->
    toScreen 'MD Shadow API'
    MD.closeDrawer 'right'

  'click #menu-item--md-text-input-api': ->
    toScreen 'MD Text Input API'
    MD.closeDrawer 'right'

  'click #menu-item--md-button-api': ->
    toScreen 'MD Button API'
    MD.closeDrawer 'right'

  'click #menu-item--md-radio-api': ->
    toScreen 'MD Radio API'
    MD.closeDrawer 'right'

  'click #menu-item--md-checkbox-api': ->
    toScreen 'MD Checkbox API'
    MD.closeDrawer 'right'

  'click #menu-item--md-chip-api': ->
    toScreen 'MD Chip API'
    MD.closeDrawer 'right'

  'click #menu-item--md-collapse-api': ->
    toScreen 'MD Collapse API'
    MD.closeDrawer 'right'

  'click #menu-item--md-item-api': ->
    toScreen 'MD Item API'
    MD.closeDrawer 'right'

  'click #menu-item--md-menu-api': ->
    toScreen 'MD Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-popup-menu-api': ->
    toScreen 'MD Popup Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-dropdown-menu-api': ->
    toScreen 'MD Dropdown Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-image-api': ->
    toScreen 'MD Image API'
    MD.closeDrawer 'right'

  'click #menu-item--md-tooltip-api': ->
    toScreen 'MD Tooltip API'
    MD.closeDrawer 'right'

  'click #menu-item--md-spinner-api': ->
    toScreen 'MD Spinner API'
    MD.closeDrawer 'right'
