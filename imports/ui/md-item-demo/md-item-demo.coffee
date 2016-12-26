{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-item-demo.jade'

Template.md_item__demo.helpers
  tabs: ->
    [
      name: 'md-item__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-item__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-item__spacebars.txt'
  code__jade: ->
    getText 'md-item__jade.txt'
