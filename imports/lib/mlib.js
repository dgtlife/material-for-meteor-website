/**
 * @file Defines a library of utility functions for MFM (Mlib)
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 12/20/2015
 */
import { MD } from 'meteor/dgtlife:material';
import Nav from 'meteor/dgtlife:navigate';

const Mlib = {
  /**
   * Navigate to a selected component demo section.
   * @param {string} id - the id of the demo section
   */
  navToDemo(id) {
    const content = MD.dqS('[data-content]');

    // Scrolls a demo element to the top of the content element.
    function _scrollToDemo(demo) {
      content.scrollTop = (demo.offsetTop - demo.parentNode.offsetTop) + 8;
    }

    // Handle on-Home and off-Home cases.
    if (Nav.reactive.get('currentScreen') === 'Home') {
      _scrollToDemo(MD.dgEBI(id));
    } else {
      Nav.toScreen('Home');

      // Wait for the demo element to render before scrolling up.
      const demoSelector = `#${id}`;
      MD.waitForElement(content, demoSelector, _scrollToDemo, 0);
    }
  },

  /**
   * Set the width of a code box based on the width of the window.
   * @param {object} codeBox - the code box element
   */
  setBoxWidth(codeBox) {
    const box = codeBox;
    const windowWidth = window.innerWidth;
    let boxWidth;
    if (windowWidth < 600) {
      boxWidth = windowWidth - 32;
    } else if ((windowWidth >= 600) && (windowWidth < 960)) {
      boxWidth = windowWidth - 48;
    } else if ((windowWidth >= 960) && (windowWidth < 1440)) {
      boxWidth = windowWidth - 192 - 48;
    } else if ((windowWidth >= 1440) && (windowWidth < 1824)) {
      boxWidth = windowWidth - 192 - 192 - 48;
    } else {
      boxWidth = 1440;
    }

    box.style.width = `${boxWidth}px`;
  }
};

export default Mlib;

