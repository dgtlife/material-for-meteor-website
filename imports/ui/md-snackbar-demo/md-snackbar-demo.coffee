{ Template } = require 'meteor/templating'
C = require('meteor/dgtlife:code-prism').default
MD = require('meteor/dgtlife:material').default
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
    C.getText 'md-snackbar__spacebars.txt'
  code__jade: ->
    C.getText 'md-snackbar__jade.txt'
  code__js: ->
    C.getText 'md-snackbar__js.txt'

Template.md_snackbar__demo.events
  'click #launch-snackbar--simple': ->
    'use strict'

    MD.postSnackbar
      message: 'This is a simple MD Snackbar'

  'click #launch-snackbar--action': ->
    'use strict'

    MD.postSnackbar
      message: 'This is an action MD Snackbar'
      button__name: 'button--action'
      button__label: 'action'

  'click #launch-snackbar--multiple': ->
    'use strict'

    MD.postSnackbar
      message: 'This is the first simple MD Snackbar'

    Meteor.setTimeout ->
      MD.postSnackbar
        message: 'This is the second simple MD Snackbar'
    , 1000

    Meteor.setTimeout ->
      MD.postSnackbar
        message: 'This is the third simple MD Snackbar'
    , 2000

  'click #launch-snackbar--simple-multi': ->
    'use strict'

    MD.postSnackbar
      message: 'This is a simple MD Snackbar that is long enough to wrap on mobile'

  'click #launch-snackbar--action-multi': ->
    'use strict'

    MD.postSnackbar
      message: 'This is an action MD Snackbar that is quite long enough to wrap on mobile'
      button__name: 'button--action'
      button__label: 'action'

  'click #launch-snackbar--multiple-multi': ->
    'use strict'

    MD.postSnackbar
      message: 'This is the first simple MD Snackbar that is long enough to wrap on mobile'

    Meteor.setTimeout ->
      MD.postSnackbar
        message: 'This is the second simple MD Snackbar that is long enough to wrap on mobile'
    , 1000

    Meteor.setTimeout ->
      MD.postSnackbar
        message: 'This is the third simple MD Snackbar that is long enough to wrap on mobile'
    , 2000
