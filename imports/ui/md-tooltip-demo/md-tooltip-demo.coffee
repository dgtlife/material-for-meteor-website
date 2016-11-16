{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
require './md-tooltip-demo.jade'

Template.md_tooltip__demo.helpers
  tabs: ->
    [
      name: 'md-tooltip__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-tooltip__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-tooltip__spacebars.txt'
  code__jade: ->
    C.getText 'md-tooltip__jade.txt'
