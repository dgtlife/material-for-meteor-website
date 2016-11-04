C = require('meteor/dgtlife:code-prism').default

Template.md_header_panel__demo.helpers
  tabs: ->
    [
      name: "md-header-panel__spacebars"
      label: "Spacebars"
      ripple: true
    ,
      name: "md-header-panel__jade"
      label: "Jade"
      ripple: true
    ]
  code__spacebars: ->
    C.getText 'md-header-panel__spacebars.txt'
  code__jade: ->
    C.getText 'md-header-panel__jade.txt'
  codeJS: ->
    C.getText 'md-header-panel__js.txt'

# Register the associated API screen.
Nav.registerScreen 'MD Header Panel API',
  contentHelperMap: [
    helper: 'screen_content'
    template: 'md_header_panel__api'
  ]
  title: 'MD Header Panel API'
  path: '/md-header-panel-api'
  pathPattern: /^\/md-header-panel-api$/

