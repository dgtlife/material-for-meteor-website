{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
require './md-text-input-demo.jade'

Template.md_text_input__demo.helpers
  tabs: ->
    [
      name: 'md-text-input__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-text-input__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-text-input__spacebars.txt'
  code__jade: ->
    C.getText 'md-text-input__jade.txt'

