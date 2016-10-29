{ C } = require 'meteor/dgtlife:code-prism'

Template.md_item__demo.helpers
  tabs: ->
    [
      name: "md-item__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-item__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-item__spacebars.txt'
  code__jade: ->
    C.getText 'md-item__jade.txt'

# Register the associated API screen
Nav.registerScreen 'MD Item API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_item__api'
  ]
  title: 'MD Item API'
  path: '/md-item-api'
  pathPattern: /^\/md-item-api$/
