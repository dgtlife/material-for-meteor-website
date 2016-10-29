{ C } = require 'meteor/dgtlife:code-prism'

Template.md_shadow__demo.helpers
  tabs: ->
    [
      name: "md-shadow__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-shadow__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-shadow__spacebars.txt'
  code__jade: ->
    C.getText 'md-shadow__jade.txt'

# Register the associated API screen
Nav.registerScreen 'MD Shadow API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_shadow__api'
  ]
  title: 'MD Shadow API'
  path: '/md-shadow-api'
  pathPattern: /^\/md-shadow-api$/
