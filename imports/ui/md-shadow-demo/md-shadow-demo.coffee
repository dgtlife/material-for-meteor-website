{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
require './md-shadow-demo.jade'

Template.md_shadow__demo.helpers
  tabs: ->
    [
      name: 'md-shadow__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-shadow__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-shadow__spacebars.txt'
  code__jade: ->
    C.getText 'md-shadow__jade.txt'
