/**
 * @file Defines a library of utility functions for MFM (Mlib)
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 12/20/2015
 */
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import {
  dqS,
  dqSA,
  dgEBI,
  waitForElement,
  resetHeaderPanelSystem,
  initializeHeaderPanelSystem
} from 'meteor/dgtlife:material';
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
 * Sets the mode of the Header Panel on this site.
 * @param {string} mode - the mode
 */
export const changeHeaderPanelMode = (mode) => {
  resetHeaderPanelSystem();

  if (mode === 'expand on scroll') {
    dqS('[data-header-panel]').setAttribute('data-mode', 'waterfall-collapse');
    dqS('[data-header-panel]').setAttribute('data-expand-on-scroll', 'true');
  } else {
    dqS('[data-header-panel]').removeAttribute('data-expand-on-scroll');
    dqS('[data-header-panel]').setAttribute('data-mode', mode);
  }

  // Engage the new setting.
  initializeHeaderPanelSystem();
};

/**
 * Reset the mode of the Header Panel mode (if returning from a Header Panel
 * demo screen)
 */
export const resetHeaderPanelMode = () => {
  const headerPanelMode = dqS('[data-header-panel]').getAttribute('data-mode');
  if (headerPanelMode !== 'waterfall-collapse') {
    changeHeaderPanelMode('waterfall-collapse');
    dqS('[data-header-panel]').removeAttribute('data-expand-on-scroll');
  }
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
      resetHeaderPanelMode();

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

    resetHeaderPanelMode();
  }
};
