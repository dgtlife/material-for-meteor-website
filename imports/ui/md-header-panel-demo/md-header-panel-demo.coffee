{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-header-panel-demo.jade'

Template.md_header_panel__demo.helpers
  tabs: ->
    [
      name: 'md-header-panel__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-header-panel__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-header-panel__spacebars.txt'
  code__jade: ->
    getText 'md-header-panel__jade.txt'
  codeJS: ->
    getText 'md-header-panel__js.txt'
