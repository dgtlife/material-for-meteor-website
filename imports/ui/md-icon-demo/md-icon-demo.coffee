{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-icon-demo.jade'

Template.md_icon__demo.helpers
  tabs: ->
    [
      name: 'md-icon__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-icon__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-icon__spacebars.txt'
  code__jade: ->
    getText 'md-icon__jade.txt'

Template.md_icon__api.helpers
  tabs__select: ->
    [
      name: 'md-icon--select__js'
      label: 'JavaScript'
      ripple: true
    ,
      name: 'md-icon--select__cs'
      label: 'CoffeeScript'
      ripple: true
    ]
  tabs__define: ->
    [
      name: 'md-icon--define__js'
      label: 'JavaScript'
      ripple: true
    ,
      name: 'md-icon--define__cs'
      label: 'CoffeeScript'
      ripple: true
    ]
  tabs__rendering: ->
    [
      name: 'md-icon--rendering__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-icon--rendering__jade'
      label: 'Jade'
      ripple: true
    ]
  code__select__js: ->
    getText 'md-icon-api--select__js.txt'
  code__select__cs: ->
    getText 'md-icon-api--select__coffee.txt'
  code__define__js: ->
    getText 'md-icon-api--define__js.txt'
  code__define__cs: ->
    getText 'md-icon-api--define__coffee.txt'
  code__rendering__spacebars: ->
    getText 'md-icon-api--rendering__spacebars.txt'
  code__rendering__jade: ->
    getText 'md-icon-api--rendering__jade.txt'
  codeCss__styles: ->
    getText 'md-icon-api--styles__css.txt'
