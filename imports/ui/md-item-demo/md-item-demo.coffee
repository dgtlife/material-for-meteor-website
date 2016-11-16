{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
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
    C.getText 'md-item__spacebars.txt'
  code__jade: ->
    C.getText 'md-item__jade.txt'
