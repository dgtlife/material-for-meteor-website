/**
 * @file Defines the Utils namespace and methods
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 12/13/14
 */
/* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Match\.." }] */
import { check, Match } from 'meteor/check';

/**
 * @namespace Utils
 * @summary The namespace for all Navigate utility functions and variables
 */
const Utils = {
  // Match pattern for a non-empty string
  nonEmptyString: Match.Where((value) => {
    check(value, String);
    return value.length > 0;
  }),

  // Match pattern for function.
  function: Match.Where(val => val instanceof Function),

  // Match pattern for RegExp.
  regExp: Match.Where(val => val instanceof RegExp),

  // Match pattern for string or function.
  nonEmptyStringOrFunction: Match.Where(
    val => Match.test(val, Utils.nonEmptyString) || (val instanceof Function)
  ),

  // Match pattern for null or function.
  nullOrFunction: Match.Where(
    val => Match.test(val, null) || (val instanceof Function)
  ),

  // Match pattern for undefined or function.
  undefinedOrFunction: Match.Where(
    val => Match.test(val, undefined) || (val instanceof Function)
  ),

  // Match pattern for boolean or function.
  booleanOrFunction: Match.Where(
    val => (typeof val === 'boolean') || (val instanceof Function)
  ),

  /**
   * Update the browser history to enable support for Back and Forward buttons
   * used in browser mode.
   * @param {string} name - the name of the current screen
   * @param {string} path - the path (unparameterized case) associated with the
   *                        screen
   * @param {string} pathMask - the mask for a parameterized path
   * @param {function} generatePath - the definition for the function that
   *                                  generates the path from the path mask and
   *                                  the screen data (it's screen-specific)
   * @param {object} screenData - the screen data associated with a
   *                              parameterized path
   * @private
   */
  updateBrowserHistory(name, path, pathMask, generatePath, screenData) {
    // Initialize the screen state object.
    const screenState = {
      sid: (function getSid() {
        if (_.isNull(window.history.state)) {
          return 1;
        }

        return 1 + window.history.state.sid;
      }()),
      name: name
    };

    // Add screen data if it is provided.
    let params;
    if (screenData) {
      _.extend(screenState, { screenData: screenData });
      params = screenData.params;
    } else {
      params = null;
    }

    if (pathMask && params && !path) {
      /*
       * This is a parameterized path. Construct the pathname by using the
       * path mask and the parameters provided.
       */
      const _path = generatePath(pathMask, params);

      // Push the state, document.title, and path into browser history.
      window.history.pushState(screenState, document.title, _path);
    } else {
      /*
       * This is a literal path. Push the state, document.title, and path into
       * the browser history.
       */
      window.history.pushState(screenState, document.title, path);
    }
  }
};

export default Utils;
