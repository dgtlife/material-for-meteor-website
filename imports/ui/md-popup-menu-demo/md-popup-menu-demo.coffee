{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
require './md-popup-menu-demo.jade'

Template.md_popup_menu__demo.helpers
  tabs: ->
    [
      name: 'md-popup-menu__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-popup-menu__jade'
      label: 'Jade'
      ripple: true
    ,
      name: 'md-popup-menu__js'
      label: 'JavaScript'
      ripple: true
    ]
  items__popup_menu__with_helper: ->
    [
      menu: 'demo-popup-menu-3'
      id: 'demo-menu-item-1p-using-helper'
      text: 'MD Menu Item 1 using helper'
    ,
      menu: 'demo-popup-menu-3'
      id: 'demo-menu-item-2p-using-helper'
      text: 'MD Menu Item 2 using helper'
    ,
      menu: 'demo-popup-menu-3'
      id: 'demo-menu-item-3p-using-helper'
      text: 'MD Menu Item 3 using helper'
    ]
  code__spacebars: ->
    C.getText 'md-popup-menu__spacebars.txt'
  code__jade: ->
    C.getText 'md-popup-menu__jade.txt'
  code__js: ->
    C.getText 'md-popup-menu__js.txt'
