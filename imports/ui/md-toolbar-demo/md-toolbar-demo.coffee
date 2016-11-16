{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
require './md-toolbar-demo.jade'

Template.md_toolbar__demo.helpers
  tabs: ->
    [
      name: 'md-toolbar__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-toolbar__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-toolbar__spacebars.txt'
  code__jade: ->
    C.getText 'md-toolbar__jade.txt'
