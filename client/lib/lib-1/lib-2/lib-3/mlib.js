/**
 * @file Defines a library of utility functions for MFM (Mlib)
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 12/20/2015
 */

Mlib = {};

_.extend(Mlib, {

  /**
   * ToDo: Improve the timing associated with the else branch.
   * Navigate to a selected component demo section.
   * @param {string} id - the id of the demo section
   */
  navToDemo(id) {
    "use strict";
    function _scrollToDemo() {
      const demo = MD.dgEBI(id);
      const content = MD.dqS('[data-content]');
      content.scrollTop = demo.offsetTop - demo.parentNode.offsetTop + 8;
    }

    if (Nav.reactive.get('currentScreen') === 'Home') {
      _scrollToDemo();
    } else {
      Nav.toScreen('Home');
      Meteor.setTimeout(function () {
        _scrollToDemo();
      }, 650);
    }
  },

  setBoxWidth(codeBox) {
    "use strict";
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      codeBox.style.width = (windowWidth - 32) + 'px';
    } else if ((windowWidth >= 600) && (windowWidth < 960)) {
      codeBox.style.width = (windowWidth - 48) + 'px';
    } else if ((windowWidth >= 960) && (windowWidth < 1440)) {
      codeBox.style.width = (windowWidth - 192 - 48) + 'px';
    } else if ((windowWidth >= 1440) && (windowWidth < 1824)) {
      codeBox.style.width = (windowWidth - 192 - 192 - 48) + 'px';
    } else {
      codeBox.style.width = 1440 + 'px';
    }
  }
});

