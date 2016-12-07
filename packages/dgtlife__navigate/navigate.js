/**
 * @file Defines the Navigate class and exports an instance.
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 1/15/14
 */
/* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Match\.." }] */
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { check, Match } from 'meteor/check';
import Utils from './nav-utils.js';

class Navigate {
  constructor() {
    // The config object, which holds properties exposed to the package user.
    this.config = {
      /*
       * The array of content helpers used to provide content dynamically to
       * screens. Initialize it.
       */
      contentHelpers: [],

      /*
       * Enable/disable support for loading a specific screen using its full URL
       * entered in the browser, and reloading a specific screen in the browser.
       */
      supportUrls: true,

      /*
       * Enable/disable support for navigating with or without a trailing '/'.
       * If a trailing slash is included, it is removed before attempting to
       * match the path.
       */
      ignoreTrailingSlash: true,

      /*
       * Enable/disable support for using the Back/Forward buttons of the
       * browser.
       */
      useBrowserBackAndForward: true,

      /*
       * A Boolean that is TRUE when the app is running in
       * full-screen/standalone mode on an iOS device.
       */
      inAppModeOnIos: null,

      /*
       * A Boolean that is TRUE when the app is running in
       * full-screen/standalone mode on an Android device.
       */
      inAppModeOnAndroid: null,

      // The first screen that loads in a non-authenticated session in App Mode.
      appModePublicHome: 'Home',

      // The first screen that loads in an authenticated session in App Mode.
      appModeUserHome: 'Home',

      // A function that runs before each and every screen is rendered.
      beforeScreens: null,

      // A function that runs after each and every screen is rendered.
      afterScreens: null,

      /*
       * An object in which each key is an array of functions. Each function
       * returns a Boolean. All functions must return TRUE before the function
       * (typically loading a screen) that the overall condition gates is
       * called. Users can add their own named conditions to the defaults in the
       * constructor.
       */
      conditionsToWaitFor: {
        okToLoad: [],
        okToReload: []
      }
    };

    // The array of screen objects.
    this.screens = [];

    /*
     * An array of objects containing the name-pathPattern pairs, optionally
     * associated with screens, and used to match a path to a screen when URLs
     * are supported.
     */
    this.pathLookup = [];

    /*
     * The navigation stack (nav stack) keeps track of the screen transition
     * history for App Mode, i.e. when browser history is not being.
     */
    this.navStack = [];

    // A reactive dictionary.
    this.reactive = new ReactiveDict();
  }

  /**
   * Register a screen.
   * The 'screen' object has the following properties assumed by the package:
   *   * name {string} - the name of the screen (required)
   *   * contentHelperMap {array} - an array of objects, each of which provides
   *     the helper-to-template mapping for the screen content (required). Each
   *     template is reactively rendered into the corresponding helper.
   *   * title {string|function} - the title on the browser tab (required)
   *   * path {string} - the relative path associated with the screen (when URLs
   *     are supported).
   *   * pathMask {string} - the mask for the relative path associated with the
   *     screen (when URLs are supported). The mask defines the location of
   *     parameters.
   *   * pathPattern {RegExp} - the RegExp pattern that only this path or path
   *     mask will match (when URLs are supported).
   *   * generatePath {function} - a function to generate a path based on the
   *     path mask and screen data.
   *   * getDataFromParams {function} - a function to generate screen data based
   *     on the parameters extracted from a path.
   *   * isAllowed {boolean|function} - TRUE for screens that are public. For
   *     screens that are not public, it is a function that computes to
   *     TRUE for users allowed to access it, and false for everyone else.
   *   * before {function} - a function to run before this screen is rendered;
   *     this function will run after any function stored in
   *     'beforeScreens'
   *   * after {function} - a function to run after this screen is rendered;
   *     this function will run before any function stored in
   *     'afterScreens'
   *
   * The 'title', and 'isAllowed' properties require the input
   * of the type indicated, or a function that returns the required type.
   *
   * The package user can add any additional properties to the screen object, as
   * desired, and must provide the code to check, retrieve, and use those
   * properties.
   *
   * @param {string} name - the name of the screen
   * @param {object} options - other screen properties and their values
   */
  registerScreen(name, options) {
    // Throw an error if no options are provided.
    if (!options) {
      throw new Error('Screen registration requires a minimal set of options');
    }

    // Check the options.
    check(name, Utils.nonEmptyString);
    check(options, Match.ObjectIncluding({
      contentHelperMap: [Object],
      title: Utils.nonEmptyStringOrFunction
    }));
    check(options.path, Match.Optional(Utils.nonEmptyString));
    check(options.pathMask, Match.Optional(Utils.nonEmptyString));
    check(options.pathPattern, Match.Optional(Utils.regExp));
    check(options.generatePath, Match.Optional(Utils.function));
    check(options.getDataFromParams, Match.Optional(Utils.function));
    check(options.isAllowed, Match.Optional(Utils.booleanOrFunction));
    check(options.before, Match.Optional(Utils.function));
    check(options.after, Match.Optional(Utils.function));

    // Check that all path-related options are provided.
    if (options.path && !options.pathPattern) {
      // This screen is missing the required path pattern.
      throw new Error(
        `The path pattern was not provided for path ${options.path}`);
    }
    if (options.pathMask && !options.pathPattern) {
      // This screen is missing the required path pattern.
      throw new Error(
        `The path pattern was not provided for path mask ${options.pathMask}`);
    }
    if (options.pathMask && !options.generatePath) {
      // This screen is missing the required function to generate the path.
      throw new Error(
        `The generatePath function was not provided for path mask
         ${options.pathMask}`);
    }

    if (options.pathMask && !options.getDataFromParams) {
      /*
       * This screen is missing the required function to get screen data from
        * path parameters.
       */
      throw new Error(
        `The getDataFromParams function was not provided for path mask
         ${options.pathMask}`);
    }

    // If the screen is not already registered, then register it.
    if (!this._getScreen(name)) {
      // Initialize a screen object.
      let screen = {
        name: name
      };

      // Assign the 'isAllowed' property of the screen.
      screen.isAllowed = options.isAllowed || true;

      // Assign the other screen properties provided in the options.
      screen = _.extend(screen, options);

      // Add this screen object to the 'screens' array.
      this.screens.push(screen);

      // Add the path pattern object to the path lookup array.
      if (options.path || options.pathMask) {
        this.pathLookup.push({
          name: name,
          pathPattern: options.pathPattern
        });
      }

      /*
       * Define the event handler for the convenience 'data-navlink' attribute
       * for this screen.
       */
      this.registerNavLink(name);
    } else {
      // The screen already exists, so throw an error.
      throw new Error(`A screen named ${name} has already been registered.`);
    }
  }

  /**
   * Get the screen object when given the name of the screen.
   * @param {string} name - the name of the screen
   * @private
   */
  _getScreen(name) {
    return _.findWhere(this.screens, { name: name });
  }

  /**
   * Register a 'data-navlink' attribute to enable HTML 'pseudo-links' to a
   * screen from any element with that attribute. This is meant for app mode but
   * works in all modes.
   * @param {string} name - the name of the screen
   */
  registerNavLink(name) {
    const eventMap = {};
    const eventKey =
            `click [data-navlink=
            to-${name.replace(/\s+/g, '-').toLowerCase()}]`;
    eventMap[eventKey] = (event) => {
      event.preventDefault();
      this.toScreen(name);
    };

    // Register this event handler with the body template.
    Template.body.events(eventMap);
  }

  /**
   * Start a navigation session, i.e. start navigation in one of the following
   * modes:
   *   * app mode
   *       * in native mode on iOS and Android
   *       * on iOS in standalone mode (i.e saved to Home screen on device)
   *       * on Android (both browser and Home screen app)
   *   * browser mode
   *       * on everything else
   *
   * @param {object} [userConfig] - options provided by the package user
   * @private
   */
  run(userConfig) {
    if (!userConfig) {
      throw new Error('Nav.run must be called on a config object.');
    }

    // Check the config options.
    check(userConfig.contentHelpers, Match.Optional([String]));
    check(userConfig.supportUrls, Match.Optional(Boolean));
    check(userConfig.ignoreTrailingSlash, Match.Optional(Boolean));
    check(userConfig.useBrowserBackAndForward, Match.Optional(Boolean));
    check(userConfig.inAppModeOnIos, Match.Optional(Boolean));
    check(userConfig.inAppModeOnAndroid, Match.Optional(Boolean));
    check(userConfig.beforeScreens, Match.Optional(Utils.function));
    check(userConfig.afterScreens, Match.Optional(Utils.function));
    check(userConfig.conditionsToWaitFor, Match.Optional(Object));
    if (userConfig.conditionsToWaitFor) {
      check(userConfig.conditionsToWaitFor.okToLoad, Match.Optional(Array));
      _.each(userConfig.conditionsToWaitFor.okToLoad, (member) => {
        check(member, Utils.function);
      });
      check(userConfig.conditionsToWaitFor.okToReload, Match.Optional(Array));
      _.each(userConfig.conditionsToWaitFor.okToReload, (member) => {
        check(member, Utils.function);
      });
    }

    // Apply the config options.
    this._configure(userConfig);

    // Register the content helpers.
    this._registerContentHelpers(this.config.contentHelpers);

    // Branch based on mode.
    if (this._inAppMode()) {
      /*
       * We're in app mode on a mobile device, so we'll behave like a native
       * app, i.e. no URL entry, no page reloads, and no window.history. Update
       * the config with some additional properties.
       */
      this.config = _.extend(this.config, {
        supportUrls: false,
        useBrowserBackAndForward: false
      });

      // Run in App Mode and (eventually) load the App Mode start screen.
      const publicHome = this.config.appModePublicHome;
      const userHome = this.config.appModeUserHome;
      this._startAppMode(publicHome, userHome);
    } else {
      /*
       * We're in browser mode (on any device), so respond to Back and Forward
       * buttons.
       */
      if (this.config.useBrowserBackAndForward) {
        this._handleBrowserBackAndForward();
      }

      /*
       * Run in browser mode and (eventually) load the screen that corresponds
       * to the URL (path) entered directly in the browser, or indirectly via a
       * browser reload.
       */
      this._startBrowserMode(window.location.pathname);
    }
  }

  /**
   * Configure options for the Navigate instance.
   * @param {object} userConfig - config options provided by the package user
   * @private
   */
  _configure(userConfig) {
    // Update the config values.
    this.config = _.extend(this.config, userConfig);
  }

  /**
   * Register the content helpers for each content area. Each helper will render
   * the corresponding content template (if any) assigned to it by the current
   * screen. This will effect reactive rendering of the complete screen.
   * @param {[string]} contentHelpers - the array of content helpers
   * @private
   */
  _registerContentHelpers(contentHelpers) {
    _.each(contentHelpers, (contentHelper) => {
      Template.registerHelper(contentHelper, () =>
        Template[this.reactive.get(contentHelper)] || null);
    });
  }

  /**
   * Start app mode, i.e. without support for an entered URL or reload of a
   * specific screen. Instead, go to the public "Home" screen or user "Home"
   * screen on load.
   * @param {string} publicHome - the screen that public users start at
   * @param {string} userHome - the screen that authenticated users start at
   * @private
   */
  _startAppMode(publicHome, userHome) {
    if (this.navStack.length === 0) {
      if (Meteor.userId && Meteor.userId()) {
        // If the user object is not ready, we'll wait for it.
        this.waitForCondition(Meteor.user, () => {
          this.waitForCondition('okToLoad', () => {
            this.toScreen(userHome);
          }, true, null);
        }, true, null);
      } else {
        this.waitForCondition('okToLoad', () => {
          this.toScreen(publicHome);
        }, true, null);
      }
    } else {
      // It's an app reload, so go to the screen at the top of the navStack?
      // ToDo: Investigate a mechanism to store/retrieve state for mobile case
      this.toScreen(
        this.navStack[this.navStack.length - 1], { updateNavStack: false });
    }
  }

  /**
   * Register an event listener for clicks on the Back and Forward buttons of
   * the browser in order to support navigation along the browser history.
   * @private
   */
  _handleBrowserBackAndForward() {
    window.addEventListener('popstate', (event) => {
      if (event.state) {
        /*
         * Go to the screen indicated by the state object, but don't update the
         * browser history. Supply any screen data that the state object
         * contains.
         */
        const options = { updateBrowserHistory: false };
        if (event.state.screenData) {
          _.extend(options, { screenData: event.state.screenData });
        }

        this.toScreen(event.state.name, options);
      }
    });
  }

  /**
   * Account for the trailing slash, i.e. remove it if required by the config.
   * @param {string} path - a path with or without a trailing slash
   * @returns {string} - a path with or without a trailing slash
   * @private
   */
  _accountForTrailingSlash(path) {
    // If it's '/', we're done.
    if (path === '/') {
      return path;
    }

    // Remove the trailing slash, if the option is set in config.
    if ((path.slice(-1) === '/') && (this.config.ignoreTrailingSlash)) {
      return path.slice(0, -1);
    }

    return path;
  }

  /**
   * Start the processing that (eventually) loads the screen that corresponds to
   * the path in the browser.
   * @param {string} path - the current path in the browser
   * @private
   */
  _startBrowserMode(path) {
    // Account for trailing slash, if necessary.
    const _path = this._accountForTrailingSlash(path);

    // Find the path pattern for this path.
    this._findPathPatternMatch(_path);
  }

  /**
   * Find the registered path that contains the RegExp pattern that matches
   * (is satisfied by) a path.
   * @param {string} path - the path
   * @private
   */
  _findPathPatternMatch(path) {
    const matchedPath = _.find(this.pathLookup, registeredPath =>
      registeredPath.pathPattern.test(path));
    if (matchedPath) {
      /*
       * We have a matched path pattern, and matchedPath is the stored path
       * object that produced the match. Now, check for path parameters.
       */
      this._checkForPathParameters(matchedPath, path);
    } else {
      /*
       * We have no matched path pattern. The path is not known, so show the
       * 'Not Found' screen.
       */
      this.toScreen('Not Found');
    }
  }

  /**
   * Check whether the path is a parameterized path or not.
   * @param {object} registeredPath - the registered path object that contains
   *                                  the RegExp pattern that matches the path
   * @param {string} path - the path
   * @private
   */
  _checkForPathParameters(registeredPath, path) {
    const screen = _.findWhere(this.screens, { name: registeredPath.name });

    // Use the 'exec' method on the RegExp to check for parameters.
    const execResult = registeredPath.pathPattern.exec(path);
    let screenSpec;
    if (execResult.length === 1) {
      /*
       * There are no parameters in this path. So check whether the screen is
       * allowed.
       */
      screenSpec = _.pick(screen, 'name', 'isAllowed');
      this._isScreenAllowed(screenSpec);
    } else {
      /*
       * One or more parameters will need to be extracted, and this means we
       * will need to retrieve screen data to evaluate the parameter(s).
       */
      screenSpec = _.pick(screen, 'name', 'isAllowed', 'getDataFromParams');
      this._retrieveScreenData(execResult, screenSpec);
    }
  }

  /**
   * Retrieve the screen data associated with the parameter(s) in a path.
   * @param {array} execResult - the result of calling the 'exec' method of the
   *                             RegExp pattern against the path
   * @param {object} screenSpec - an object that contains the 'name',
   *                              'isAllowed', and 'getDataFromParams' keys of the
   *                              screen object
   * @private
   */
  _retrieveScreenData(execResult, screenSpec) {
    let screen = screenSpec;
    if (!screen.getDataFromParams) {
      throw new Error(`Missing "getDataFromParams" method for this 
                       parameterized path`);
    }

    /*
     * It is likely that the screen data result will depend on calls to the
     * database, so use a callback to receive the screen data.
     */
    screen.getDataFromParams(execResult, (result, error) => {
      if (error) {
        throw new Error(`Error retrieving data for ${screen.name}`);
      } else {
        /*
         * Remove the 'getDataFromParams' key from the screenSpec. Add in the
         * screen data. Then check whether the screen is allowed.
         */
        screen = _.omit(screen, 'getDataFromParams');
        screen = _.extend(screen, { screenData: result });
        this._isScreenAllowed(screen);
      }
    });
  }

  /**
   * Evaluate the 'isAllowed' function, if one is associated with the screen.
   * Otherwise, just use the boolean.
   * @param {object} screenSpec - an object that contains the 'name' and
   *                              'isAllowed' keys, of the screen object and
   *                              optionally a 'screenData' object
   * @private
   */
  _isScreenAllowed(screenSpec) {
    let screen = screenSpec;
    const isAllowed = screen.isAllowed;
    screen = _.omit(screen, 'isAllowed');

    // Evaluate the screen access control function, or apply the boolean.
    if (_.isFunction(isAllowed)) {
      /*
       * If it's a user session, we may need to wait for Meteor.user() to be
       * defined before evaluating the access control function.
       */
      if (Meteor.userId && Meteor.userId()) {
        if (Meteor.user()) {
          // The user object is ready, so evaluate the function.
          this._applyAccessControl(screen, isAllowed());
        } else {
          // It's not ready, so wait for it, then evaluate the function.
          this.waitForCondition(Meteor.user, () => {
            this._applyAccessControl(screen, isAllowed());
          }, true, null);
        }
      } else {
        // It's not a user session, so proceed.
        this._applyAccessControl(screen, isAllowed());
      }
    } else {
      // It's a simple boolean.
      this._applyAccessControl(screen, isAllowed);
    }
  }

  /**
   * A helper function for processing access control. It loads a screen if it
   * is allowed, or loads 'Access Denied' if it is not.
   * @param {object} screenSpec - an object that contains the 'name' key, of the
   *                              screen object and optionally a 'screenData'
   *                              object
   * @param {boolean} isAllowed - TRUE if the screen is allowed for the user
   * @private
   */
  _applyAccessControl(screenSpec, isAllowed) {
    if (isAllowed) {
      // The light is green.
      this._loadTargetScreenInBrowserMode(screenSpec);
    } else {
      // The light is red. Show 'Access Denied'
      this.toScreen('Access Denied');
    }
  }

  /**
   * Load an allowed screen in browser mode, with any included screen data.
   * @param {object} screenSpec - an object that contains the 'name' key, of the
   *                              screen object and optionally a 'screenData'
   *                              object
   * @private
   */
  _loadTargetScreenInBrowserMode(screenSpec) {
    const name = screenSpec.name;
    const options = _.omit(screenSpec, 'name');

    // Check if a browser history object exists,
    if (window.history.state) {
      // ... and whether the current screen is the requested one.
      if (name === window.history.state.name) {
        // If so, we are there already and we are reloading. Wait on any
        // relevant conditions, but do not update the browser history.
        this.waitForCondition('okToReload', () => {
          _.extend(options, { updateBrowserHistory: false });
          this.toScreen(name, options);
        }, true, null);
      } else {
        // Go to this new screen.
        this.toScreen(name, options);
      }
    } else {
      // This is likely a first load in a new window or tab, so go to this
      // screen, after any relevant conditions are satisfied.
      this.waitForCondition('okToLoad', () => {
        this.toScreen(name, options);
      }, true, null);
    }
  }

  /**
   * Go to a screen, i.e. make this screen the current one. Options can be
   * provided:
   *   * {boolean} updateBrowserHistory - indicates whether the browser history
   *     should be updated or not
   *   * {boolean} updateNavStack - indicates whether the navigation stack
   *     should be updated or not
   *   * {object} screenData - an object containing any data that is essential
   *     to render the screen
   *
   * @param {string} name - the name of the screen
   * @param {object} [options] - other screen properties
   */
  toScreen(name, options) {
    // Check the name first.
    check(name, Utils.nonEmptyString);

    // Get the screen object.
    const screen = _.findWhere(this.screens, { name: name });

    // Avoid errors when this function is called with no options.
    const _options = options || {};

    // If the screen exists,
    if (screen) {
      // ... and we are already on that screen, ignore early and return.
      if (this.reactive.get('currentScreen') === name) {
        return false;
      }

      // Check the optional properties.
      check(_options, {
        updateBrowserHistory: Match.Optional(Boolean),
        updateNavStack: Match.Optional(Boolean),
        screenData: Match.Optional(Object)
      });

      /*
       * Clear all reactive variables for content helper-template mappings from
       * the previous screen, so that they do not persist if they are not
       * re-mapped in the upcoming screen transition.
       */
      _.each(this.config.contentHelpers, (helper) => {
        this.reactive.set(helper, null);
      });

      // Clear any screen data from the previous screen.
      delete this.reactive.keys.screenData;

      // Run any global 'before' function.
      if (this.config.beforeScreens) {
        this.config.beforeScreens();
      }

      // Set any screen data for this (soon to be current) screen.
      const screenData = _options.screenData;
      if (screenData) {
        this.reactive.set('screenData', screenData);
      }

      // Run any screen-specific 'before' function.
      if (screen.before) {
        screen.before();
      }

      /*
       * Define an onRendered callback to set the window title and run global
       * and screen-specific 'after' functions.
       */
      Template[screen.contentHelperMap[0].template].onRendered(() => {
        // Set the screen title.
        const title = screen.title;
        if (_.isFunction(title)) {
          Tracker.autorun((comp) => {
            if (title()) {
              document.title = title();
              comp.stop();
            }
          });
        } else {
          document.title = title;
        }

        // Run any screen-specific 'after' function
        if (screen.after) {
          screen.after();
        }

        // Run any global 'after' function.
        if (this.config.afterScreens) {
          this.config.afterScreens();
        }
      });

      /*
       * "Go" to the screen, by setting the value of the reactive variable for
       * each content helper. The value of the reactive variable is the name of
       * the template to be rendered into that helper on the current screen.
       * This effectively triggers the screen transition.
       */
      if (screen.contentHelperMap && screen.contentHelperMap.length > 0) {
        _.each(screen.contentHelperMap, (helperMapping) => {
          this.reactive.set(helperMapping.helper, helperMapping.template);
        });
      }

      // Track the name of the current screen in a reactive variable.
      this.reactive.set('currentScreen', name);

      // Assign an updateBrowserHistory variable.
      let updateBrowserHistory;
      if (!_.isUndefined(_options.updateBrowserHistory)) {
        updateBrowserHistory = _options.updateBrowserHistory;
      } else {
        updateBrowserHistory = true;
      }

      // Update the browser history, if necessary.
      if (updateBrowserHistory) {
        Utils.updateBrowserHistory(
          name, screen.path, screen.pathMask, screen.generatePath, screenData);
      }

      // Assign an updateNavStack variable.
      let updateNavStack;
      if (!_.isUndefined(_options.updateNavStack)) {
        updateNavStack = _options.updateNavStack;
      } else {
        updateNavStack = true;
      }

      // Update the navigation stack, if necessary.
      if (updateNavStack) {
        this._updateNavStack(name, screen.title, screenData);
      }
    } else {
      throw new Error(`A screen named ${name} has not been registered.`);
    }

    return true;
  }

  /**
   * Update the navigation stack (in app mode only).
   * @param {string} name - the name of the current screen
   * @param {string|function} title - the title property of the screen
   * @param {object} screenData - the screen data associated with a
   *                              parameterized path
   * @private
   */
  _updateNavStack(name, title, screenData) {
    const _pushToNavStackAndUpdateLength = (screenState, __title) => {
      // Add the title to the screen state.
      _.extend(screenState, { title: __title });

      // Update the nav stack and the reactive variable with its length.
      this.navStack.push(screenState);
      this.reactive.set('navStackLength', this.navStack.length);
    };

    if (this._inAppMode() && this.navStack) {
      // We are in app mode. Initialize the screen state object.
      const screenState = {
        name: name
      };

      // Add screen data if it is provided.
      if (screenData) {
        _.extend(screenState, { screenData: screenData });
      }

      let _title;
      if (_.isFunction(title)) {
        // Compute the title.
        Tracker.autorun((comp) => {
          if (title()) {
            _title = title();
            _pushToNavStackAndUpdateLength(screenState, _title);
            comp.stop();
          }
        });
      } else {
        // Assign the title.
        _title = title;
        _pushToNavStackAndUpdateLength(screenState, _title);
      }

      return true;
    }

    // We are not in app mode.
    return false;
  }

  /**
   * Convenience function to go to the Home screen. On the Home screen of
   * mobile devices, the navStack is reset to meet expected app mode behavior.
   */
  toHome() {
    if (this._inAppMode() && this.navStack) {
      this.resetNavStack('Home');
    } else {
      this.toScreen('Home');
    }
  }

  /**
   * Returns the title of the previous screen in app mode only.
   */
  getPreviousTitle() {
    if (this._inAppMode() && this.navStack) {
      // We are in App mode.
      const navStackLength = this.reactive.get('navStackLength');
      if (navStackLength > 1) {
        return this.navStack[navStackLength - 2].title;
      }

      // We are at the navigation root.
      return false;
    }

    // We are not in App mode
    return false;
  }

  /**
   * Reset the navigation stack, i.e. clear it and use the named screen as the
   * new starting point of navigation.
   * @param {string} name - the name of the screen
   */
  resetNavStack(name) {
    if (this._inAppMode() && this.navStack) {
      // We are in App mode.
      check(name, String);
      this.navStack = [];
      this.toScreen(name);
    }
  }

  /**
   * Go to the previous screen.
   */
  back() {
    if (this.config.supportUrls) {
      // We are in Browser mode. Use the browser history to move back.
      window.history.back();
      return true;
    }

    // We are in App mode on a mobile device. Use the nav stack to move back.
    if (this.navStack.length === 0) {
      // We are at the navigation root, so we stop.
      return false;
    }

    // Remove the current screen at the top of the nav stack.
    this.navStack.pop();

    // Set the new length of the nav stack.
    this.reactive.set('navStackLength', this.navStack.length);

    /*
     * Go to the screen at the top of the nav stack without updating the nav
     * stack on this reverse transition. First, initialize the screen options.
     */
    let options = { updateNavStack: false };
    const previousScreen = this.navStack[this.navStack.length - 1];

    // Add screen data to the options, if necessary.
    if (previousScreen && previousScreen.screenData) {
      options = _.extend(options, { screenData: previousScreen.screenData });
    }

    // Go to the screen.
    this.toScreen(previousScreen.name, options);
    return true;
  }

  /**
   * Check whether we are in App mode.
   * @private
   */
  _inAppMode() {
    if (this.config.inAppModeOnIos) {
      return this.config.inAppModeOnIos;
    }

    if (this.config.inAppModeOnAndroid) {
      return this.config.inAppModeOnAndroid;
    }

    return false;
  }

  /**
   * Wait for a condition to be TRUE before running a function. This is used to
   * ensure that data is there before calling a function that needs that data.
   *
   * @param {string|function} condition - a conditionId (e.g. okToLoad),
   *                                      function name, or a function
   *                                      definition
   * @param {function} func - the name or definition of the function that waits
   * @param {boolean} showLoading - TRUE to show the Loading screen
   * @param {object} context - a data context that may be needed
   */
  waitForCondition(condition, func, showLoading, context) {
    let conditionSatisfied;
    const _context = context || null;

    /**
     * Retrieves the array of condition functions associated with an identified
     * condition, and evaluates the aggregate status of the identified
     * condition.
     * @returns {boolean}
     */
    const evaluateConditions = () =>
      _.every(this.config.conditionsToWaitFor[condition], conditionFunc =>
        !((conditionFunc() === false) || (_.isUndefined(conditionFunc()))));

    // Check for proper inputs.
    check(condition, Utils.nonEmptyStringOrFunction);
    check(func, Utils.function);
    check(showLoading, Boolean);

    // Context may not be a plain object.
    if (!_.isNull(_context)) {
      check(_context, Match.Where(val => _.isObject(val)));
    }

    // Determine how to evaluate the condition.
    if (condition instanceof Function) {
      // It's a function, so we can use it directly.
      conditionSatisfied = condition;
    } else if (_.has(this.config.conditionsToWaitFor, condition)) {
      // It's a conditionId, so we must evaluate the associated conditions.
      conditionSatisfied = evaluateConditions;
    } else {
      throw new Meteor.Error(400, 'Invalid condition or unknown conditionId ' +
        'was supplied.');
    }

    Tracker.autorun((comp) => {
      if (!conditionSatisfied()) {
        if (showLoading) {
          // Show the 'Loading' screen, and set the 'Loading' state.
          this.reactive.set('Loading', true);
          this.reactive.set(this.config.contentHelpers[0], 'loading');
        }
      } else {
        if (showLoading) {
          this.reactive.set('Loading', false);
        }

        /*
         * Call the function that waits for the condition to be TRUE, passing
         * the data context to it, if necessary.
         */
        if (_.isNull(_context)) {
          func();
        } else {
          func(_context);
        }
        comp.stop();
      }
    });
  }
}

const Nav = new Navigate();
export default Nav;
