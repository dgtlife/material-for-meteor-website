{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
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
    C.getText 'md-header-panel__spacebars.txt'
  code__jade: ->
    C.getText 'md-header-panel__jade.txt'
  codeJS: ->
    C.getText 'md-header-panel__js.txt'
