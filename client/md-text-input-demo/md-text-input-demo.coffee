{ C } = require 'meteor/dgtlife:code-prism'

Template.md_text_input__demo.helpers
  tabs: ->
    [
      name: "md-text-input__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-text-input__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-text-input__spacebars.txt'
  code__jade: ->
    C.getText 'md-text-input__jade.txt'

# Register the associated API screen
Nav.registerScreen 'MD Text Input API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_text_input__api'
  ]
  title: 'MD Text Input API'
  path: '/md-text-input-api'
  pathPattern: /^\/md-text-input-api$/
