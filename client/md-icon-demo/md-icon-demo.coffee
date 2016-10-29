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
  codeJS__select: ->
    C.getText 'md-icon-api--select__js.txt'
  codeCS__select: ->
    C.getText 'md-icon-api--select__coffee.txt'
  codeJS__define: ->
    C.getText 'md-icon-api--define__js.txt'
  codeCS__define: ->
    C.getText 'md-icon-api--define__coffee.txt'
  code__spacebars__rendering: ->
    C.getText 'md-icon-api--rendering__spacebars.txt'
  code__jade__rendering: ->
    C.getText 'md-icon-api--rendering__jade.txt'
  codeCss__styles: ->
    C.getText 'md-icon-api--styles__css.txt'
