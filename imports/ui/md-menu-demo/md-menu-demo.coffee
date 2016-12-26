{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-menu-demo.jade'

Template.md_menu__demo.helpers
  tabs: ->
    [
      name: 'md-menu__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-menu__jade'
      label: 'Jade'
      ripple: true
    ,
      name: 'md-menu__js'
      label: 'JavaScript'
      ripple: true
    ]
  items__static_menu: ->
    [
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-1'
      text: 'MD Menu Item 1'
      ripple: true
    ,
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-2'
      text: 'MD Menu Item 2'
      ripple: true
    ,
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-3'
      text: 'MD Menu Item 3'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-menu__spacebars.txt'
  code__jade: ->
    getText 'md-menu__jade.txt'
  code__js: ->
    getText 'md-menu__js.txt'
