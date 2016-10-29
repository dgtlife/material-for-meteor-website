{ C } = require 'meteor/dgtlife:code-prism'

# Helpers for the demo docs.
Template.md_toolbar__demo.helpers
  tabs: ->
    [
      name: "md-toolbar__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-toolbar__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-toolbar__spacebars.txt'
  code__jade: ->
    C.getText 'md-toolbar__jade.txt'

# Register the associated API screen.
Nav.registerScreen 'MD Toolbar API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_toolbar__api'
  ]
  title: 'MD Toolbar API'
  path: '/md-toolbar-api'
  pathPattern: /^\/md-toolbar-api$/


