import C from 'meteor/dgtlife:code-prism'

// Helpers for the MD Dropdown Menu demo block.
Template.md_dropdown_menu__demo.helpers({
  tabs() {
    "use strict";
    return [
      {
        name: "md-dropdown-menu__spacebars",
        label: "Spacebars",
        ripple: true
      },
      {
        name: "md-dropdown-menu__jade",
        label: "Jade",
        ripple: true
      },
      {
        name: "md-dropdown-menu__js",
        label: "JavaScript",
        ripple: true
      }
    ]
  },

  items__dropdown_menu_1() {
    "use strict";
    return [
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option A'
      },
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option B'
      },
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option C'
      },
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option D'
      },
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option E'
      },
      {
        menu: 'demo-menu--dropdown-1',
        text: 'Dropdown Option F'
      }
    ];
  },

  items__dropdown_menu_2() {
    "use strict";
    return [
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option G'
      },
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option H'
      },
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option I'
      },
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option J'
      },
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option K'
      },
      {
        menu: 'demo-menu--dropdown-2',
        text: 'Dropdown Option L'
      }
    ];
  },

  code__spacebars() {
    return C.getText('md-dropdown-menu__spacebars.txt');
  },

  code__jade() {
    return C.getText('md-dropdown-menu__jade.txt');
  },

  code__js() {
    return C.getText('md-dropdown-menu__js.txt');
  }
});

// Register the API screen
Nav.registerScreen('MD Dropdown Menu API', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'md_dropdown_menu__api'
  }],
  title: 'MD Dropdown Menu API',
  path: '/md-dropdown-menu-api',
  pathPattern: /^\/md-dropdown-menu-api$/
});

