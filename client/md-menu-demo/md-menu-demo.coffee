C = require('meteor/dgtlife:code-prism').default

Template.md_menu__demo.helpers
  tabs: ->
    [
      name: "md-menu__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-menu__jade"
      label: "Jade"
      ripple: true
    ,
      name: "md-menu__js"
      label: "JavaScript"
      ripple: true
    ]
  items__static_menu: ->
    [
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-1'
      text: 'MD Menu Item 1'
      ripple: true
    ,
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-2'
      text: 'MD Menu Item 2'
      ripple: true
    ,
      menu: 'demo-menu-helper'
      id: 'demo-menu-item-3'
      text: 'MD Menu Item 3'
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-menu__spacebars.txt'
  code__jade: ->
    C.getText 'md-menu__jade.txt'
  code__js: ->
    C.getText 'md-menu__js.txt'

# Register the associated API screen
Nav.registerScreen 'MD Menu API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_menu__api'
  ]
  title: 'MD Menu API'
  path: '/md-menu-api'
  pathPattern: /^\/md-menu-api$/
