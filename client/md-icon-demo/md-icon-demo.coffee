{ C } = require 'meteor/dgtlife:code-prism'

Template.md_icon__demo.helpers
  tabs: ->
    [
      name: "md-icon__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-icon__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-icon__spacebars.txt'
  code__jade: ->
    C.getText 'md-icon__jade.txt'

Nav.registerScreen 'MD Icon API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_icon__api'
  ]
  title: 'MD Icon API'
  path: '/md-icon-api'
  pathPattern: /^\/md-icon-api$/

Template.md_icon__api.helpers
  tabs__select: ->
    [
      name: "md-icon--select__js"
      label: "JavaScript"
      ripple: true
    ,
      name: "md-icon--select__cs"
      label: "CoffeeScript"
      ripple: true
    ]
  tabs__define: ->
    [
      name: "md-icon--define__js"
      label: "JavaScript"
      ripple: true
    ,
      name: "md-icon--define__cs"
      label: "CoffeeScript"
      ripple: true
    ]
  tabs__rendering: ->
    [
      name: "md-icon--rendering__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-icon--rendering__jade"
      label: "Jade"
      ripple: true
    ]
  code__select__js: ->
    C.getText 'md-icon-api--select__js.txt'
  code__select__cs: ->
    C.getText 'md-icon-api--select__coffee.txt'
  code__define__js: ->
    C.getText 'md-icon-api--define__js.txt'
  code__define__cs: ->
    C.getText 'md-icon-api--define__coffee.txt'
  code__rendering__spacebars: ->
    C.getText 'md-icon-api--rendering__spacebars.txt'
  code__rendering__jade: ->
    C.getText 'md-icon-api--rendering__jade.txt'
  codeCss__styles: ->
    C.getText 'md-icon-api--styles__css.txt'
