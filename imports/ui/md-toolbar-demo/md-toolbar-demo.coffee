{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
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
    getText 'md-toolbar__spacebars.txt'
  code__jade: ->
    getText 'md-toolbar__jade.txt'
