###
  @file Helpers, event handlers, and the on-render callback for the layout template
  @author Derek Gransaull <derek@dgtlife.com>
  @copyright DGTLife, LLC 2015

  Created on 11/2/2015
###

{ Template } = require 'meteor/templating'
Mlib = require('/imports/lib/mlib.js').default

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
    "use strict"
    Nav.toScreen 'Home'

  'click #more-menu--get-package': ->
    "use strict"
    window.open 'https://github.com/dgtlife/material-for-meteor', '_blank'
    MD.clearValueOfMenu '#appbar-more'

  'click #more-menu--show-jade': ->
    "use strict"
    tabGroups = MD.dqSA '[data-tabs]'
    _.each tabGroups, (tabGroup) ->
      if tabGroup.id isnt 'demo-tabs'
        MD.setSelectedTab tabGroup, '1'

  'click #more-menu--show-spacebars': ->
    "use strict"
    tabGroups = MD.dqSA '[data-tabs]'
    _.each tabGroups, (tabGroup) ->
      if tabGroup.id isnt 'demo-tabs'
        MD.setSelectedTab tabGroup, '0'

  'click [name="api-button"]': ->
    "use strict"
    Nav.toScreen @_data

# The Left drawer.
Template.left_drawer__menu_content.events
  'click #menu-item--md-icon-demo': ->
    "use strict"
    Mlib.navToDemo 'md-icon--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-header-panel-demo': ->
    "use strict"
    Mlib.navToDemo 'md-header-panel--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-toolbar-demo': ->
    "use strict"
    Mlib.navToDemo 'md-toolbar--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-tabs-demo': ->
    "use strict"
    Mlib.navToDemo 'md-tabs--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-drawer-demo': ->
    "use strict"
    Mlib.navToDemo 'md-drawer--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-dialog-demo': ->
    "use strict"
    Mlib.navToDemo 'md-dialog--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-snackbar-demo': ->
    "use strict"
    Mlib.navToDemo 'md-snackbar--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-card-demo': ->
    "use strict"
    Mlib.navToDemo 'md-card--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-shadow-demo': ->
    "use strict"
    Mlib.navToDemo 'md-shadow--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-text-input-demo': ->
    "use strict"
    Mlib.navToDemo 'md-text-input--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-button-demo': ->
    "use strict"
    Mlib.navToDemo 'md-button--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-radio-demo': ->
    "use strict"
    Mlib.navToDemo 'md-radio--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-checkbox-demo': ->
    "use strict"
    Mlib.navToDemo 'md-checkbox--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-chip-demo': ->
    "use strict"
    Mlib.navToDemo 'md-chip--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-collapse-demo': ->
    "use strict"
    Mlib.navToDemo 'md-collapse--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-item-demo': ->
    "use strict"
    Mlib.navToDemo 'md-item--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-menu-demo': ->
    "use strict"
    Mlib.navToDemo 'md-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-popup-menu-demo': ->
    "use strict"
    Mlib.navToDemo 'md-popup-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-dropdown-menu-demo': ->
    "use strict"
    Mlib.navToDemo 'md-dropdown-menu--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-image-demo': ->
    "use strict"
    Mlib.navToDemo 'md-image--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-tooltip-demo': ->
    "use strict"
    Mlib.navToDemo 'md-tooltip--demo'
    MD.closeDrawer 'left'

  'click #menu-item--md-spinner-demo': ->
    "use strict"
    Mlib.navToDemo 'md-spinner--demo'
    MD.closeDrawer 'left'

# The Right drawer.
Template.right_drawer__menu_content.events
  'click #menu-item--md-icon-api': ->
    "use strict"
    Nav.toScreen 'MD Icon API'
    MD.closeDrawer 'right'

  'click #menu-item--md-header-panel-api': ->
    "use strict"
    Nav.toScreen 'MD Header Panel API'
    MD.closeDrawer 'right'

  'click #menu-item--md-toolbar-api': ->
    "use strict"
    Nav.toScreen 'MD Toolbar API'
    MD.closeDrawer 'right'

  'click #menu-item--md-tabs-api': ->
    "use strict"
    Nav.toScreen 'MD Tabs API'
    MD.closeDrawer 'right'

  'click #menu-item--md-drawer-api': ->
    "use strict"
    Nav.toScreen 'MD Drawer API'
    MD.closeDrawer 'right'

  'click #menu-item--md-dialog-api': ->
    "use strict"
    Nav.toScreen 'MD Dialog API'
    MD.closeDrawer 'right'

  'click #menu-item--md-snackbar-api': ->
    "use strict"
    Nav.toScreen 'MD Snackbar API'
    MD.closeDrawer 'right'

  'click #menu-item--md-card-api': ->
    "use strict"
    Nav.toScreen 'MD Card API'
    MD.closeDrawer 'right'

  'click #menu-item--md-shadow-api': ->
    "use strict"
    Nav.toScreen 'MD Shadow API'
    MD.closeDrawer 'right'

  'click #menu-item--md-text-input-api': ->
    "use strict"
    Nav.toScreen 'MD Text Input API'
    MD.closeDrawer 'right'

  'click #menu-item--md-button-api': ->
    "use strict"
    Nav.toScreen 'MD Button API'
    MD.closeDrawer 'right'

  'click #menu-item--md-radio-api': ->
    "use strict"
    Nav.toScreen 'MD Radio API'
    MD.closeDrawer 'right'

  'click #menu-item--md-checkbox-api': ->
    "use strict"
    Nav.toScreen 'MD Checkbox API'
    MD.closeDrawer 'right'

  'click #menu-item--md-chip-api': ->
    "use strict"
    Nav.toScreen 'MD Chip API'
    MD.closeDrawer 'right'

  'click #menu-item--md-collapse-api': ->
    "use strict"
    Nav.toScreen 'MD Collapse API'
    MD.closeDrawer 'right'

  'click #menu-item--md-item-api': ->
    "use strict"
    Nav.toScreen 'MD Item API'
    MD.closeDrawer 'right'

  'click #menu-item--md-menu-api': ->
    "use strict"
    Nav.toScreen 'MD Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-popup-menu-api': ->
    "use strict"
    Nav.toScreen 'MD Popup Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-dropdown-menu-api': ->
    "use strict"
    Nav.toScreen 'MD Dropdown Menu API'
    MD.closeDrawer 'right'

  'click #menu-item--md-image-api': ->
    "use strict"
    Nav.toScreen 'MD Image API'
    MD.closeDrawer 'right'

  'click #menu-item--md-tooltip-api': ->
    "use strict"
    Nav.toScreen 'MD Tooltip API'
    MD.closeDrawer 'right'

  'click #menu-item--md-spinner-api': ->
    "use strict"
    Nav.toScreen 'MD Spinner API'
    MD.closeDrawer 'right'
