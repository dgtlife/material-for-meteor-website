{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
require './md-button-demo.jade'

Template.md_button__base.helpers
  tabs: ->
    [
      name: 'md-button--base__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--base__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--base__spacebars.txt'
  code__jade: ->
    getText 'md-button--base__jade.txt'

Template.md_button__with_icon.helpers
  tabs: ->
    [
      name: 'md-button--with-icon__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--with-icon__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--with-icon__spacebars.txt'
  code__jade: ->
    getText 'md-button--with-icon__jade.txt'

Template.md_button__no_ripple.helpers
  tabs: ->
    [
      name: 'md-button--no-ripple__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--no-ripple__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--no-ripple__spacebars.txt'
  code__jade: ->
    getText 'md-button--no-ripple__jade.txt'

Template.md_button__toggle.helpers
  tabs: ->
    [
      name: 'md-button--toggle__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--toggle__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--toggle__spacebars.txt'
  code__jade: ->
    getText 'md-button--toggle__jade.txt'

Template.md_button__icon_button.helpers
  tabs: ->
    [
      name: 'md-button--icon-button__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--icon-button__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--icon-button__spacebars.txt'
  code__jade: ->
    getText 'md-button--icon-button__jade.txt'

Template.md_button__fab.helpers
  tabs: ->
    [
      name: 'md-button--fab__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-button--fab__jade'
      label: 'Jade'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-button--fab__spacebars.txt'
  code__jade: ->
    getText 'md-button--fab__jade.txt'
