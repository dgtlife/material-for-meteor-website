{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-spinner-demo.jade'

Template.md_spinner__demo.helpers
  tabs: ->
    [
      name: 'md-spinner__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-spinner__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-spinner__spacebars.txt'
  code__jade: ->
    getText 'md-spinner__jade.txt'
