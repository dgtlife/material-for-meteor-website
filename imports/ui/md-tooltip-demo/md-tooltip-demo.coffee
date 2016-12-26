{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
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
    getText 'md-tooltip__spacebars.txt'
  code__jade: ->
    getText 'md-tooltip__jade.txt'
