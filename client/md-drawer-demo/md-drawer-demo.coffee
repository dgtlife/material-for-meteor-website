C = require('meteor/dgtlife:code-prism').default

Template.md_drawer__demo.helpers
  tabs: ->
    [
      name: "md-drawer__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-drawer__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-drawer__spacebars.txt'
  code__jade: ->
    C.getText 'md-drawer__jade.txt'

Nav.registerScreen 'MD Drawer API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_drawer__api'
  ]
  title: 'MD Drawer API'
  path: '/md-drawer-api'
  pathPattern: /^\/md-drawer-api$/

Template.md_drawer__api.helpers
  code__spacebars__structure: ->
    C.getText 'md-header-panel-api__structure--spacebars.txt'
  code__jade__structure: ->
    C.getText 'md-header-panel-api__structure--jade.txt'
