{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-drawer-demo.jade'

Template.md_drawer__demo.helpers
  tabs: ->
    [
      name: 'md-drawer__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-drawer__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-drawer__spacebars.txt'
  code__jade: ->
    getText 'md-drawer__jade.txt'

Template.md_drawer__api.helpers
  code__spacebars__structure: ->
    getText 'md-header-panel-api__structure--spacebars.txt'
  code__jade__structure: ->
    getText 'md-header-panel-api__structure--jade.txt'
