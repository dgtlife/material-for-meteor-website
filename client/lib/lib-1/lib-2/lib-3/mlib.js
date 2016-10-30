/**
 * @file Defines a library of utility functions for MFM (Mlib)
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 12/20/2015
 */

import { Nav } from 'meteor/dgtlife:app-navigator';
import { MD } from 'meteor/dgtlife:material';

Mlib = {};
_.extend(Mlib, {

  /**
   * Navigate to a selected component demo section.
   * @param {string} id - the id of the demo section
   */
  navToDemo(id) {
    "use strict";
    const content = MD.dqS('[data-content]');

    // Scrolls a demo element to the top of the content element.
    function _scrollToDemo(demo) {
      content.scrollTop = demo.offsetTop - demo.parentNode.offsetTop + 8;
    }

    // Handle on-Home and off-Home cases.
    if (Nav.reactive.get('currentScreen') === 'Home') {
      _scrollToDemo(MD.dgEBI(id));
    } else {
      Nav.toScreen('Home');

      // Wait for the demo element to render before scrolling up.
      MD.waitForElement(content, '#' + id,  _scrollToDemo, 0);
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

