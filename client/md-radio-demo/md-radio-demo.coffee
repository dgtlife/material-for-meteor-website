C = require('meteor/dgtlife:code-prism').default

Template.md_radio__demo.helpers
  tabs: ->
    [
      name: "md-radio__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-radio__jade"
      label: "Jade"
      ripple: true
    ,
      name: "md-radio__js"
      label: "JavaScript"
      ripple: true
    ]
  quantityButtons: ->
    [
      id: 'mdRb-1'
      group: 'quantity'
      value: 'one'
      label: 'One'
    ,
      id: 'mdRb-2'
      group: 'quantity'
      value: 'two'
      label: 'Two'
      disabled: ''
    ,
      id: 'mdRb-3'
      group: 'quantity'
      value: 'three'
      label: 'Three'
    ,
      id: 'mdRb-4'
      group: 'quantity'
      value: 'four'
      label: 'Four'
    ]
  code__spacebars: ->
    C.getText 'md-radio__spacebars.txt'
  code__jade: ->
    C.getText 'md-radio__jade.txt'
  code__js: ->
    C.getText 'md-radio__js.txt'

# Register the associated API screen
Nav.registerScreen 'MD Radio API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_radio__api'
  ]
  title: 'MD Radio API'
  path: '/md-radio-api'
  pathPattern: /^\/md-radio-api$/
