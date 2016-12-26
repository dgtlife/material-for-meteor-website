{ Template } = require 'meteor/templating'
getText = require('meteor/dgtlife:code-prism').getText
postSnackbar = require('meteor/dgtlife:material').postSnackbar
{ Meteor } = require 'meteor/meteor'
require './md-snackbar-demo.jade'

Template.md_snackbar__demo.helpers
  tabs: ->
    [
      name: 'md-snackbar__spacebars'
      label: 'Spacebars'
      ripple: true
    ,
      name: 'md-snackbar__jade'
      label: 'Jade'
      ripple: true
    ,
      name: 'md-snackbar__js'
      label: 'JavaScript'
      ripple: true
    ]
  code__spacebars: ->
    getText 'md-snackbar__spacebars.txt'
  code__jade: ->
    getText 'md-snackbar__jade.txt'
  code__js: ->
    getText 'md-snackbar__js.txt'

Template.md_snackbar__demo.events
  'click #launch-snackbar--simple': ->
    postSnackbar
      message: 'This is a simple MD Snackbar'

  'click #launch-snackbar--action': ->
    postSnackbar
      message: 'This is an action MD Snackbar'
      button__name: 'button--action'
      button__label: 'action'

  'click #launch-snackbar--multiple': ->
    postSnackbar
      message: 'This is the first simple MD Snackbar'

    Meteor.setTimeout ->
      postSnackbar
        message: 'This is the second simple MD Snackbar'
    , 1000

    Meteor.setTimeout ->
      postSnackbar
        message: 'This is the third simple MD Snackbar'
    , 2000

  'click #launch-snackbar--simple-multi': ->
    postSnackbar
      message: 'This is a simple MD Snackbar that is long enough to wrap on mobile'

  'click #launch-snackbar--action-multi': ->
    postSnackbar
      message: 'This is an action MD Snackbar that is quite long enough to wrap on mobile'
      button__name: 'button--action'
      button__label: 'action'

  'click #launch-snackbar--multiple-multi': ->
    postSnackbar
      message: 'This is the first simple MD Snackbar that is long enough to wrap on mobile'

    Meteor.setTimeout ->
      postSnackbar
        message: 'This is the second simple MD Snackbar that is long enough to wrap on mobile'
    , 1000

    Meteor.setTimeout ->
      postSnackbar
        message: 'This is the third simple MD Snackbar that is long enough to wrap on mobile'
    , 2000
