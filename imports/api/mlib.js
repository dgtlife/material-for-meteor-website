/**
 * @file Defines a library of utility functions for MFM (Mlib)
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 12/20/2015
 */
import { Meteor } from 'meteor/meteor';
import { dqS, dgEBI, waitForElement } from 'meteor/dgtlife:material';
import { toScreen, currentScreen } from 'meteor/dgtlife:navigate';

/**
 * Scrolls a child (demo) element to the top of the parent (content) element.
 * @param {Element} child - the child DIV element
 * @param {Element} parent - the child DIV element
 */
const scrollToTop = (child, parent) => {
  // eslint-disable-next-line no-param-reassign
  parent.scrollTop = (child.offsetTop - child.parentNode.offsetTop) + 8;
};

/**
 * Navigates to a selected component demo section when the menu item is clicked,
 * or if it is selected in the menu on a reload.
 * @param {string} [id] - the id of the demo section
 */
export const navToDemo = (id) => {
  const content = dqS('[data-content]');

  // Handles on-Home and off-Home cases of menu item click.
  const handleMenuItemClick = (did) => {
    if (currentScreen.get() === 'Home') {
      scrollToTop(dgEBI(did), content);
    } else {
      toScreen('Home');

      // Wait for the demo element to render before scrolling up.
      waitForElement(content, `#${did}`, scrollToTop, 0, content);
    }
  };

  let demoId;
  if (id) {
    demoId = id;
    handleMenuItemClick(demoId);
  } else {
    const selectedValue =
            dgEBI('mfm-catalog-menu').getAttribute('data-selected');
    if (selectedValue) {
      demoId = `${selectedValue.toLowerCase().replace(/ /g, '-')}--demo`;
      Meteor.setTimeout(() => {
        scrollToTop(dgEBI(demoId), content);
      }, 10);
    }
  }
};

/**
 * Set the width of a code box based on the width of the window.
 * @param {object} codeBox - the code box element
 */
export const setBoxWidth = (codeBox) => {
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
};
