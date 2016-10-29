{ C } = require 'meteor/dgtlife:code-prism'

Template.md_spinner__demo.helpers
  tabs: ->
    [
      name: "md-spinner__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-spinner__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-spinner__spacebars.txt'
  code__jade: ->
    C.getText 'md-spinner__jade.txt'

# Register the associated API screen
Nav.registerScreen 'MD Spinner API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_spinner__api'
  ]
  title: 'MD Spinner API'
  path: '/md-spinner-api'
  pathPattern: /^\/md-spinner-api$/
