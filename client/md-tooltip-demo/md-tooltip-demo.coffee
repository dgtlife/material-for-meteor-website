{ C } = require 'meteor/dgtlife:code-prism'

Template.md_tooltip__demo.helpers
  tabs: ->
    [
      name: "md-tooltip__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-tooltip__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-tooltip__spacebars.txt'
  code__jade: ->
    C.getText 'md-tooltip__jade.txt'

# Register the associated API screen
Nav.registerScreen 'MD Tooltip API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_tooltip__api'
  ]
  title: 'MD Tooltip API'
  path: '/md-tooltip-api'
  pathPattern: /^\/md-tooltip-api$/
