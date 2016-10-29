/**
 * @file Defines the AppNavigator object
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 1/15/14
 */

/*jshint -W117 */    // app- and package-scoped variables not detected by JSHint
/*jshint -W058 */    // no () for constructor

//////////////////////////////////////////////
//////          APP NAVIGATOR           //////
//////////////////////////////////////////////

////// CONSTRUCTOR  //////
AppNavigator = function () {
  "use strict";
  var self = this;

  // Initialize the _config object.
  self._config = {

    // The array of content helpers used to provide dynamic content to screens.
    // Initialize it.
    contentHelpers: [],

    // Enable/disable support for loading a specific screen using its full URL
    // entered in the browser, and reloading a specific screen in the browser.
    supportUrls: true,

    // Enable/disable support for navigating with or without a trailing '/'. If
    // a trailing slash is included, it is removed before attempting to match
    // the path.
    ignoreTrailingSlash: true,

    // Enable/disable case sensitivity.
    ignoreCase: false,

    // Enable/disable support for using the Back/Forward buttons of the browser.
    enableBackAndForwardButtons: true,

    // A function that returns TRUE to indicate that the app should run in
    // full app (standalone) mode on iOS.
    useAppModeOnIos: null,

    // A function that returns TRUE to indicate that the app should run in
    // full app (standalone) mode on Android.
    useAppModeOnAndroid: null,

    // A function that runs before each screen is rendered, and does not have to
    // wait for the data that it operates on.
    beforeScreens: null,

    // A function that runs after each screen is rendered, and does not have to
    // wait for the data that it operates on.
    afterScreens: null,

    // An object in which each member is an array of Boolean conditions, all of
    // which must be TRUE before the function that the conditions gate is
    // allowed to run.
    conditionsToWaitFor: {
      okToLoad: [],
      okToReload: []
    }
  };

  // Screens is an array screen objects. Initialize it.
  self.screens = [];

  // An array of objects containing the screenName-pathPattern pairs, optionally
  // associated with screens, and used to match a path to a screen when URLs are
  // supported. Initialize it.
  self.pathLookup = [];

  // The navigation stack (nav stack) keeps track of the screen transition
  // history for mobile devices when browser history is not being used, i.e. in
  // app mode or in a Cordova-based native app. Initialize it.
  self.navStack = [];

  // A temporary 'storage' facility to hold the eventual results of
  // Tracker.autoruns until they can be retrieved downstream.
  self.temp = {};

  /**
   * Destroy the constructor after construction to ensure only one instance of
   * AppNavigator
   *
   * @return null
   */
  AppNavigator = function () {
    return null;
  };
};

////// PROTOTYPE //////
_.extend(AppNavigator.prototype, {
  constructor: AppNavigator,

  // Create a reactive dictionary.
  reactive: new ReactiveDict,

  /**
   * Register a new screen.
   * The screen object has the following properties assumed by the package:
   *
   *   * screenName {string} - the name of the screen (required)
   *   * contentHelperMap {Array} - an array of objects, each of which provides
   *     the helper-to-template mapping for the screen content (required). Each
   *     template is reactively rendered into the corresponding helper.
   *   * title {string|function} - the title on the browser tab (required)
   *   * path {string} - the relative path associated with the screen (when URLs
   *     are supported).
   *   * pathMask {string} - the relative path mask associated with the screen
   *     (when URLs are supported). The mask defines the location of parameters.
   *   * pathPattern {RegExp} - the RegExp pattern that only this path or path
   *     mask will match (when URLs are supported).
   *   * evaluateMask {function} - a function to generate a path based on the
   *     path mask and screen data
   *   * getScreenDataFromPathParameters {function} - a function to generate screen data based on
   *     the parameters extracted from a path
   *   * isAllowed {boolean|function} - TRUE for screens that are public,
   *     and for screens that are not public, it is a function that computes to
   *     TRUE for those allowed to access it, and false for everyone else
   *   * before {function} - a function to run before this screen is rendered;
   *     this function will run after any function stored in
   *     '_config.beforeScreens'
   *   * after {function} - a function to run after this screen is rendered;
   *     this function will run before any function stored in
   *     '_config.afterScreens'
   *
   * The 'title', and 'isAllowed' properties require the input
   * of the type indicated, or a function that returns the required type.
   *
   * The package user can add any additional properties to the screen object, as
   * desired, and must provide the code to check, retrieve, and use those
   * properties.
   *
   * @param {string} screenName - the name of the screen
   * @param {object} options - other parameters and their values
   */
  registerScreen: function (screenName, options) {
    "use strict";
    var self = this;

    var newScreen;

    // Avoid errors when this function is called with no options.
    options = options || {};

    // Check the required input parameters.
    check(screenName, Utils.nonEmptyString);
    check(options, Match.ObjectIncluding({
      contentHelperMap: [Object],
      title: Utils.nonEmptyStringOrFunction
    }));

    // Check the optional input parameters.
    check(options.path, Match.Optional(Utils.nonEmptyString));
    check(options.pathMask, Match.Optional(Utils.nonEmptyString));
    check(options.pathPattern, Match.Optional(Utils.regExp));
    check(options.evaluateMask, Match.Optional(Utils.function));
    check(options.getScreenDataFromPathParameters, Match.Optional(Utils.function));
    check(options.isAllowed, Match.Optional(Utils.booleanOrFunction));
    check(options.phoneTitle, Match.Optional(Utils.nonEmptyStringOrFunction));
    check(options.before, Match.Optional(Utils.function));
    check(options.after, Match.Optional(Utils.function));

    if (options.path && ! options.pathPattern) {
      // This path is missing the required path pattern.
      throw 'The path pattern was not provided for this path: ' + options.path;
    }
    if (options.pathMask && ! options.pathPattern) {
      // This path mask is missing the required path pattern.
      throw 'The path pattern was not provided for this path mask: ' + options.pathMask;
    }
    if (options.pathMask && ! options.evaluateMask) {
      // This path mask is missing the required function to evaluate the path.
      throw 'The evaluateMask() function definition was not provided for this path mask: ' + options.pathMask;
    }

    if (options.pathMask && ! options.getScreenDataFromPathParameters) {
      // This path mask is missing the required function to get screen data from path parameters.
      throw 'The getScreenDataFromPathParameters() function definition was not provided for this path mask: ' + options.pathMask;
    }

    // If the screen does not already exist, then register it.
    if (! self.screens[screenName]) {
      // Assign the name of the new screen.
      newScreen = {
        name: screenName
      };
      // Assign the isAllowed property of the new screen.
      newScreen.isAllowed = options.isAllowed || true;
      // Assign the other properties of the new screen.
      newScreen = _.extend(newScreen, options);
      // Add this new screen object to the screens array.
      self.screens[screenName] = newScreen;
      self.screens.push(self.screens[screenName]);

      // Add the path pattern object to the path lookup array.
      if (options.path || options.pathMask) {
        self.pathLookup.push({
          screenName: screenName,
          pathPattern: options.pathPattern
        });
      }

      // Define the event handler for the convenience <a> tag (i.e. link) for
      // this screen.
      self._registerScreenLink(screenName);

    } else {
      // The screen already exists, so throw an error.
      throw 'A screen named ' + screenName + ' has already been registered.';
    }
  },

  /**
   * Register a name attribute to enable HTML 'links' to a screen from an
   * element with that name attribute.
   *
   * @param {string} screenName - the name of the screen
   * @private
   */
  _registerScreenLink: function (screenName) {
    "use strict";
    var self = this;

    var eventKey,
        eventMap = {};

    eventKey = "click [name=to-" + self.screens[screenName].name.replace(/\s+/g, '-').toLowerCase() + "]";
    eventMap[eventKey] = function (event) {
      event.preventDefault();
      self.toScreen(screenName);
    };

    // Register this event handler with the body template.
    Template.body.events(eventMap);
  },

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
   * @param {object} [userConfig] - config options provided by the package user
   * @private
   */
  _start: function(userConfig) {
    "use strict";
    var self = this;

    var currentPath;

    // Apply the package user configuration, if provided.
    if (userConfig) {
      self._configure(userConfig);
    }
    // Register all content helpers.
    self._registerContentHelpers();

    // Branch based on mode.
    if (self._inAppMode()) {
      // We're in app mode on a mobile device, so we'll behave like a native app,
      // i.e. no URL entry, no page reloads, and no window.history. Update the
      // config.
      self._config = _.extend(self._config, {
        supportUrls: false,
        enableBackAndForwardButtons: false
      });
      // Start app mode to (eventually) load the desired start screen.
      // ToDo: Add a config property for app mode start screens - public, user, admin
      self._startAppMode();
    } else {
      // We're in browser mode on any device, so behave like a web site,
      // i.e respond to URL entry, page reloads, Back and Forward buttons, and
      // maintain window.history.
      if (self._config.enableBackAndForwardButtons) {
        self._registerListenerForBackAndForwardButtons();
      }
      // Start browser mode to (eventually) load the screen that corresponds to
      // the URL (path) entered directly in the browser, or indirectly via a
      // browser reload.
      currentPath = self._accountForTrailingSlash(window.location.pathname);
      self._startBrowserMode(currentPath);
    }
  },

  /**
   * Configure options for the AppNavigator instance.
   *
   * @param {object} userConfig - config options provided by the package user
   * @private
   */
  _configure: function (userConfig) {
    "use strict";
    var self = this;

    // Check the configuration options supplied by the package user.
    check(userConfig.contentHelpers, Match.Optional([String]));
    check(userConfig.supportUrls, Match.Optional(Boolean));
    check(userConfig.ignoreTrailingSlash, Match.Optional(Boolean));
    check(userConfig.ignoreCase, Match.Optional(Boolean));
    check(userConfig.enableBackAndForwardButtons, Match.Optional(Boolean));
    check(userConfig.useAppModeOnIos, Match.Optional(Utils.function));
    check(userConfig.useAppModeOnAndroid, Match.Optional(Utils.function));
    check(userConfig.beforeScreens, Match.Optional(Utils.function));
    check(userConfig.afterScreens, Match.Optional(Utils.function));
    check(userConfig.conditionsToWaitFor, Match.Optional(Object));
    if (userConfig.conditionsToWaitFor) {
      check(userConfig.conditionsToWaitFor.okToLoad, Match.Optional(Array));
      _.each(userConfig.conditionsToWaitFor.okToLoad, function (member) {
        check(member, Utils.function);
      });
      check(userConfig.conditionsToWaitFor.okToReload, Match.Optional(Array));
      _.each(userConfig.conditionsToWaitFor.okToReload, function (member) {
        check(member, Utils.function);
      });
    }

    // Update the configuration values.
    self._config = _.extend(self._config, userConfig);
    return self._config;
  },

  /**
   * Register all content helpers. Each helper will render the corresponding
   * content template (if any) assigned by the current screen. This will effect
   * reactive rendering of the complete screen.
   *
   * @private
   */
  _registerContentHelpers: function () {
    "use strict";
    var self = this;

    _.each(self._config.contentHelpers, function(contentHelper) {
      Template.registerHelper(contentHelper, function () {
        if (!! self.reactive.get(contentHelper)) {
          return Template[self.reactive.get(contentHelper)];
        } else {
          return null;
        }
      });
    });
  },

  /**
   * Load into standalone/app mode, i.e. without support for the entered URL or
   * reload of a specific screen. Instead, go to the public Home or user "Home"
   * on load.
   *
   * @private
   */
  _startAppMode: function () {
    "use strict";
    var self = this;

    if (self.navStack.length === 0) {
      if (Meteor.userId()) {

        // If the user object is not ready, we'll wait for it.
        self.waitForCondition(Meteor.user, function () {
          if (Meteor.user() && Meteor.user().isAdmin) {
            self.toScreen('Manage Accounts');
          } else {
            self.toScreen('Profile');
          }
        }, true, null);
      } else {
        self.waitForCondition('okToLoad', function () {
          self.toHome();
        }, true, null);
      }
    } else {

      // ToDo: Implement some mechanism to store/retrieve state for mobile case
      // It's an app reload, so go to the screen at the top of the navStack?
      self.toScreen(self.navStack[self.navStack.length - 1], { updateNavStack: false });
    }
  },

  /**
   * Register an event listener for clicks on the Back and Forward buttons of
   * the browser in order to enable navigation along the browser history.
   *
   * @private
   */
  _registerListenerForBackAndForwardButtons: function () {
    "use strict";

    var self = this;

    window.addEventListener('popstate', function (event) {
      var options;
      if (event.state) {
        // Go to the screen indicated by the state object, but don't update the
        // browser history. Supply any screen data that the state object
        // contains.
        options = { updateBrowserHistory: false };
        if (event.state.screenData)
          _.extend(options, { screenData: event.state.screenData });
        self.toScreen(event.state.name, options);
      }
    });
  },

  /**
   * Account for the trailing slash, i.e. remove it if required by the _config.
   *
   * @param {string} path - a path with or without a trailing slash
   * @returns {string} - a path with or without a trailing slash
   * @private
   */
  _accountForTrailingSlash: function (path) {
    "use strict";
    var self = this;

    // If it is '/', we're done.
    if (path === '/') {
      return path;
    } else {
      // Remove the trailing slash, if the option is set in _config.
      if ((path.slice(-1) === '/') && (self._config.ignoreTrailingSlash)) {
        return path.slice(0, -1);
      } else {
        return path;
      }
    }
  },

  /**
   * Start the processing that (eventually) loads the screen that corresponds to
   * the path in the browser.
   *
   * @param {string} path - the current path in the browser
   * @private
   */
  _startBrowserMode: function (path) {
    "use strict";
    var self = this;

    // Check whether there is a path pattern corresponding to this path.
    self._findPathPatternMatch(path);
  },

  /**
   * Find the registered path that contains the RegExp pattern that matches
   * (is satisfied by) a path.
   *
   * @param {string} path - the path
   * @private
   */
  _findPathPatternMatch: function (path) {
    "use strict";
    var self = this;

    var matchedPath;
    matchedPath =  _.find(self.pathLookup, function (registeredPath) {
      // Return true if the path satisfies the RegExp pathPattern.
      return registeredPath.pathPattern.test(path);
    });
    if (matchedPath) {
      // We have a matched path pattern, and matchedPath is the stored path
      // object that produced the match. Now, check for path parameters.
      self._checkForPathParameters(matchedPath, path);
    } else {
      // We have no matched path pattern. The path is not known, so show the
      // 'Not Found' screen.
      self.toScreen('Not Found');
    }
  },

  /**
   * Check whether the path is a parameterized path or not.
   *
   * @param {object} registeredPath - the registered path object that contains
   *                                  the RegExp pattern that matches the path
   * @param {string} path - the path
   * @private
   */
  _checkForPathParameters: function (registeredPath, path) {
    "use strict";
    var self = this;

    var screen,
        execResult,
        screenSpec;

    screen = self.screens[registeredPath.screenName];
    // Use the 'exec' method on the RegExp to check for parameters.
    execResult = registeredPath.pathPattern.exec(path);
    if (execResult.length === 1) {
      // There are no parameters in this path. So check whether the screen is
      // allowed.
      screenSpec = _.pick(screen, 'name', 'isAllowed');
      self._isScreenAllowed(screenSpec);
    } else {
      // One or more parameters will need to be extracted, and this means we
      // will need to retrieve screen data to evaluate the parameter(s).
      screenSpec = _.pick(screen, 'name', 'isAllowed', 'getScreenDataFromPathParameters');
      self._retrieveScreenData(execResult, screenSpec);
    }
  },

  /**
   * Retrieve the screen data associated with the parameters in a path.
   *
   * @param {array} execResult - the result of calling the 'exec' method of the
   *                             RegExp pattern against the path
   * @param {object} screenSpec - an object that contains the 'name',
   *                              'isAllowed', and 'getScreenDataFromPathParameters' keys of the
   *                              screen object
   * @private
   */
  _retrieveScreenData: function (execResult, screenSpec) {
    "use strict";
    var self = this;

    // It is likely that the screen data result will depend on calls to the
    // database. So wait for screen data using a callback.
    screenSpec.getScreenDataFromPathParameters(execResult, function (result, error) {
      if (error) {
        throw('Error retrieving data for ' + screenSpec.name);
      } else {
        // Remove the 'getScreenDataFromPathParameters' key from the screenSpec. Add in the screen
        // data. Then check whether the screen is allowed.
        screenSpec = _.omit(screenSpec, 'getScreenDataFromPathParameters');
        screenSpec = _.extend(screenSpec, { screenData: result });
        self._isScreenAllowed(screenSpec);
      }
    });
  },

  /**
   * Evaluate the isAllowed function, if one is associated with the screen.
   * Otherwise, just use the boolean.
   *
   * @param {object} screenSpec - an object that contains the 'name' and
   *                              'isAllowed' keys, of the screen object and
   *                              optionally a 'screenData' object
   * @private
   */
  _isScreenAllowed: function (screenSpec) {
    "use strict";
    var self = this;

    var isAllowed;

    isAllowed = screenSpec.isAllowed;
    screenSpec = _.omit(screenSpec, 'isAllowed');
    // Evaluate the screen access control function, or apply the boolean.
    if (_.isFunction(isAllowed)) {
      // If it's a user session, we may need to wait for Meteor.user() to be
      // defined before evaluating the access control function.
      if (Meteor.userId()) {
        if (Meteor.user()) {
          // The user object is ready, so evaluate the function.
          self._applyAccessControl(screenSpec, isAllowed());
        } else {
          // It's not ready, so wait for it, then evaluate the function.
          self.waitForCondition(Meteor.user, function () {
            self._applyAccessControl(screenSpec, isAllowed());
          }, true, null);
        }
      } else {
        // It's not a user session, so proceed.
        self._applyAccessControl(screenSpec, isAllowed());
      }
    } else {
      // It's a simple boolean.
      self._applyAccessControl(screenSpec, isAllowed);
    }
  },

  /**
   * A helper function for processing access control. It loads a screen if it
   * is allowed, or loads 'Access Denied' if it is not.
   *
   * @param {string} screenSpec - an object that contains the 'name' key, of the
   *                              screen object and optionally a 'screenData'
   *                              object
   * @param {boolean} isAllowed - TRUE if the screen is allowed for the user
   * @private
   */
  _applyAccessControl: function (screenSpec, isAllowed) {
    "use strict";
    var self = this;

    if (isAllowed) {
      // The light is green.
      self._loadTargetScreenInBrowserMode(screenSpec);
    } else {
      // The light is red. Show 'Access Denied'
      self.toScreen('Access Denied');
    }
  },

  /**
   * Load an allowed screen in browser mode, with any included screen data.
   *
   * @param {string} screenSpec - an object that contains the 'name' key, of the
   *                              screen object and optionally a 'screenData'
   *                              object
   * @private
   */
  _loadTargetScreenInBrowserMode: function (screenSpec) {
    "use strict";
    var self = this;

    var screenName,
        options;

    screenName = screenSpec.name;
    options = _.omit(screenSpec, 'name');
    // Check if a browser history object exists,
    if (window.history.state) {
      // and whether the current screen is the requested one.
      if (screenName === window.history.state.name) {
        // If so, we are there already and we are reloading. Wait on any
        // relevant conditions, but do not update the browser history.
        self.waitForCondition('okToReload', function () {
          _.extend(options, { updateBrowserHistory: false });
          self.toScreen(screenName, options);
        }, true, null);
      } else {
        // Go to this new screen.
        self.toScreen(screenName, options);
      }
    } else {
      // This is likely a first load in a new window or tab, so go to this
      // screen, after any relevant conditions are satisfied.
      self.waitForCondition('okToLoad', function () {
        self.toScreen(screenName, options);
      }, true, null);
    }
  },

  /**
   * Go to this screen, i.e. make this screen the current one. Options can be
   * provided:
   *
   *   * {boolean} updateBrowserHistory - indicates whether the browser history
   *     should be updated or not
   *   * {boolean} updateNavStack - indicates whether the navigation stack
   *     should be updated or not
   *   * {object} screenData - an object containing any data that is essential
   *     to render the screen
   *
   * @param {string} screenName - the name of the screen
   * @param {object} [options] - other screen properties
   */
  toScreen: function (screenName, options) {
    "use strict";
    var self = this;

    var updateBrowserHistory,
        updateNavStack,
        screen,
        screenData,
        path,
        pathMask,
        evaluateMask;

    // Check the screenName first.
    check(screenName, Utils.nonEmptyString);

    // Get the screen (metadata).
    screen = self.screens[screenName];
    // If the screen exists,
    if (screen) {
      // and we are already on that screen, ignore early and return.
      if (self.reactive.get('currentScreen') === screenName) {
        return false;
      }

      // Avoid errors when this function is called with no options.
      options = options || {};
      // Check the optional properties.
      check(options, {
        updateBrowserHistory: Match.Optional(Boolean),
        updateNavStack: Match.Optional(Boolean),
        screenData: Match.Optional(Object)
      });

      // Assign the updateBrowserHistory value.
      if (! _.isUndefined(options.updateBrowserHistory)) {
        updateBrowserHistory = options.updateBrowserHistory;
      } else {
        updateBrowserHistory = true;
      }

      // Assign the updateNavStack value.
      if (! _.isUndefined(options.updateNavStack)) {
        updateNavStack = options.updateNavStack;
      } else {
        updateNavStack = true;
      }

      // Clear all state variables for content helper-template mappings from
      // the previous screen, so that they do not persist if they are not
      // re-mapped in the upcoming screen transition.
      _.each(self._config.contentHelpers, function (helper) {
        self.reactive.set(helper, null);
      });

      // Clear any screen data from the previous screen.
      self.reactive.set('screenData', undefined);

      // Set any screen data for this (soon to be current) screen.
      screenData = options.screenData;
      if (screenData) {
        self.reactive.set('screenData', screenData);
      }

      // Run any global 'before' function.
      // ToDo: Make these block.
      if (self._config.beforeScreens) {
        self._config.beforeScreens();
      }

      // Run any screen-specific 'before' function.
      // ToDo: Make these block.
      if (screen.before) {
        screen.before();
      }

      // Set the window/tab title (using an onRendered callback).
      self._setTitleCallback(screen.contentHelperMap[0].template, screen.title);

      // "Go" to the screen, i.e. trigger the screen transition by setting the
      // reactive state variable 'currentScreen',
      self.reactive.set('currentScreen', screenName);

      // and set reactive state variables for the content helpers. The value
      // of the state variable is the name of the template to be rendered
      // into a given helper on the current screen.
      if (screen.contentHelperMap && screen.contentHelperMap.length > 0) {
        _.each(screen.contentHelperMap, function (helperMapping) {
          self.reactive.set(helperMapping.helper, helperMapping.template);
        });
      }

      // Update the browser history, if the option is set.
      if (updateBrowserHistory) {
        path = screen.path;
        pathMask = screen.pathMask;
        evaluateMask = screen.evaluateMask;
        self._updateBrowserHistory(screenName, path, pathMask, evaluateMask, screenData);
      }

      // Update the navigation stack, if the option is set.
      if (updateNavStack) {
        self._updateNavStack(screenName, screen.phoneTitle, screenData);
      }

      // Run any screen-specific 'after' function.
      // ToDo: ToDo: put these in an onRendered callback for this screen's template.
      if (screen.after) {
        screen.after();
      }

      // Run any global 'after' function.
      // ToDo: put these in an onRendered callback for every screen's template.
      if (self._config.afterScreens) {
        self._config.afterScreens();
      }
    } else {
      throw 'A screen named ' + screenName + ' has not been registered.';
    }
  },

  /**
   * Register an onRendered callback to set the window/tab title for the screen.
   *
   * @param {string} template - the template for the screen (main) content
   * @param {string|function} title - the title property of the screen
   * @private
   */
  _setTitleCallback: function (template, title) {
    Template[template].onRendered(function () {
      "use strict";

      if (_.isFunction(title)) {
        Tracker.autorun(function (comp) {
          if (title()) {
            document.title = title();
            comp.stop();
          }
        });
      } else {
        document.title = title;
      }
    });
  },

  /**
   * Update the browser history to enable support for Back and Forward buttons
   * (for an 'app' running in browser mode).
   *
   * @param {string} screenName - the name of the current screen
   * @param {string} path - the path (unparameterized case) associated with the
   *                        screen
   * @param {string} pathMask - the mask for a parameterized path
   * @param {function} evaluateMask - the definition for the function that
   *                                  evaluates the path from the path mask and
   *                                  the screen data (it's screen-specific)
   * @param {object} screenData - the screen data associated with a
   *                              parameterized path
   * @private
   */
  _updateBrowserHistory: function (screenName, path, pathMask, evaluateMask, screenData) {
    "use strict";

    var screenState;
    // Initialize the screen state object.
    screenState = {
      sid: (function () {
        if (_.isNull(window.history.state)) {
          return 1;
        } else {
          return 1 + window.history.state.sid;
        }
      })(),
      name: screenName
    };
    // Add screen data if it is provided.
    if (screenData)
      _.extend(screenState, { screenData: screenData });

    if (pathMask && ! path) {
      // This is a parameterized path. Construct the pathname by evaluating the
      // path mask.
      evaluateMask(pathMask, function (path) {
        // Push the state, document.title, and path into browser history.
        window.history.pushState(screenState, document.title, path);
      });
    } else {
      // This is literal path. Push the state, document.title, and path into the
      // browser history.
      window.history.pushState(screenState, document.title, path);
    }
  },

  /**
   * Update the navigation stack (in app mode only).
   *
   * @param {string} screenName - the name of the current screen
   * @param {string|function} phoneTitle - the phoneTitle property of the screen
   * @param {object} screenData - the screen data associated with a
   *                              parameterized path
   * @private
   */
  _updateNavStack: function (screenName, phoneTitle, screenData) {
    "use strict";
    var self = this;

    var _phoneTitle,
        screenState;

    if (self._inAppMode() && self.navStack) {
      // We are in app mode.
      // Initialize the screen state object.
      screenState = {
        name: screenName
      };
      // Add screen data if it is provided.
      if (screenData)
        _.extend(screenState, {screenData: screenData});
      // Compute/assign the phone title.
      if (_.isFunction(phoneTitle)) {
        Tracker.autorun(function (comp) {
          if (phoneTitle()) {
            _phoneTitle = phoneTitle();
            _.extend(screenState, { phoneTitle: _phoneTitle });

            // Update the nav stack, and the length of the nav stack array.
            self.navStack.push(screenState);
            self.reactive.set('navStackLength', self.navStack.length);
            comp.stop();
          }
        });
      } else {
        _phoneTitle = phoneTitle;
        // Add the phone title to the screen state.
        _.extend(screenState, { phoneTitle: _phoneTitle });

        // Update the nav stack, and the length of the nav stack array.
        self.navStack.push(screenState);
        self.reactive.set('navStackLength', self.navStack.length);
      }
    } else {
      // We are not in app mode.
      return false;
    }
  },

  /**
   * Convenience function to go to the Home screen. On the Home screen of
   * mobile devices, the navStack is reset to meet expected app mode behavior.
   *
   * @api public
   */
  toHome: function () {
    "use strict";
    var self = this;

    if (self._inAppMode() && self.navStack) {
      self.resetNavStack('Home');
    } else {
      self.toScreen('Home');
    }
  },

  /**
   * Return the phone title of the previous screen (in app mode only).
   *
   * @returns {*}
   */
  getPreviousTitle: function () {
    "use strict";
    var self = this,
        navStackLength;

    if (self._inAppMode() && self.navStack) {
      // We are in app mode.
      navStackLength = self.reactive.get('navStackLength');
      if (navStackLength > 1) {
        return self.navStack[navStackLength - 2].phoneTitle;
      } else {
        return false;
      }
    } else {
      // We are not in app mode.
      return false;
    }
  },

  /**
   * Reset the navigation stack, i.e. clear it and use the named screen as the
   * new starting point of navigation.
   *
   * @param {string} screenName - the name of the screen
   * @private
   */
  resetNavStack: function (screenName) {
    "use strict";
    var self = this;

    if (self._inAppMode() && self.navStack) {
      // We are in app mode.
      check(screenName, String);
      self.navStack = [];
      self.toScreen(screenName);
    } else {
      // We are not in app mode.
      return false;
    }
  },

  /**
   * Go to the previous screen.
   *
   * @returns {*|boolean}
   */
  back: function () {
    "use strict";
    var self = this;

    var options,
        previousScreen;
    if (self._config.supportUrls) {
      // We are in full browser mode. Use the browser history to move back.
      window.history.back();
    } else {
      // We are in standalone/app mode, then use the nav stack to move back.
      if (self.navStack.length === 0) {
        // We are at the root of navigation, so we stop.
        return false;
      } else {
        // Remove the current screen at the top of the nav stack,
        self.navStack.pop();
        // then set the new length of the nav stack,
        self.reactive.set('navStackLength', self.navStack.length);
        // then go to the screen at the top of the nav stack without updating
        // the stack on this reverse transition.
        options = { updateNavStack: false };
        previousScreen = self.navStack[self.navStack.length - 1];
        if (previousScreen.screenData)
          options = _.extend(options, { screenData: previousScreen.screenData });
        self.toScreen(previousScreen.name, options);
      }
    }
  },

  /**
   * Convenient check for whether we are in App mode.
   *
   * @returns {*}
   * @private
   */
  _inAppMode: function () {
    "use strict";
    var self = this;

    if (self._config.useAppModeOnIos) {
      return self._config.useAppModeOnIos();
    } else if (self._config.useAppModeOnAndroid) {
      return self._config.useAppModeOnAndroid();
    } else {
      return false;
    }
  },

  /**
   * Wait for a condition to be TRUE before running a function. This is used to
   * ensure that data is there before calling a function that needs that data.
   *
   * @param {string|function} condition - a conditionId, function name, or a
   *                                      function definition
   * @param {function} func - the function name or function definition
   * @param {boolean} showLoading - TRUE to show the Loading screen
   * @param {object} context - a data context that may be needed
   */
  waitForCondition: function (condition, func, showLoading, context) {
    "use strict";
    var self = this;

    var conditionSatisfied;

    context = context || null;

    // Check for proper inputs.
    check(condition, Utils.nonEmptyStringOrFunction);
    check(func, Utils.function);
    check(showLoading, Boolean);

    // Context may not be a plain object.
    if (!_.isNull(context)) {
      check(context, Match.Where(
        function (val) {
          return _.isObject(val);
        }
      ));
    }

    if (condition instanceof Function) {
      // It's a function, so we can use it directly.
      conditionSatisfied = condition;
    } else {
      // It's a conditionId, so fetch the array of condition functions and
      // compute the status of the condition.
      if (_.has(self._config.conditionsToWaitFor, condition)) {
        conditionSatisfied = function () {
          return _.every(self._config.conditionsToWaitFor[condition], function (conditionFunc) {
            if ((conditionFunc() === false) || (_.isUndefined(conditionFunc())))
              return false;
            return true;
          });
        };
      } else {
        // Throw an error.
        throw new Meteor.Error(400, 'An unknown conditionId was supplied.');
      }
    }

    Tracker.autorun(function (comp) {
      if (! conditionSatisfied()) {
        if (showLoading) {
          // Show the 'Loading' screen, and set the 'Loading' state.
          self.reactive.set('Loading', true);
          self.reactive.set(self._config.contentHelpers[0], 'loading');
        }
      } else {
        if (showLoading)
          self.reactive.set('Loading', false);
        // Call the function that requires the condition to be TRUE, passing the
        // data context to it, if necessary.
        if (_.isNull(context)) {
          func();
        } else {
          func(context);
        }
        comp.stop();
      }
    });
  },

  /**
   * Store a temporary variable.
   *
   * @param name
   * @param content
   * @private
   */
  _setTempVar: function (name, content) {
    "use strict";
    var self = this;

    self.temp[name] = content;
  },

  /**
   * Retrieve the value of a temporary variable, and clear it from storage.
   *
   * @param name
   * @returns {*}
   * @private
   */
  _getTempVar: function (name) {
    "use strict";
    var self = this;

    var result = self.temp[name];
    self.temp = _.omit(self.temp, name);

    return result;
  }

});

//////  INSTANTIATE  //////
Nav = new AppNavigator;

//////  START CLIENT  //////
if (Meteor.isClient) {
  Meteor.startup(function () {
    "use strict";

    // Start a navigation session.
    if (Nav.config) {
      Nav._start(Nav.config);
    } else {
      Nav._start();
    }
  });
}

//\\\\\\\\\       Meteor is a beautiful thing! :-) Thanks MDG!      /////////\\
//\\\\\\\\\\                 End of file                           //////////\\


/*
Notes
pathPattern1 = /^\/lists\/list$/;                                               // For path: '/lists/list'; insensitive to trailing '/'
pathPattern2 = /^\/lists\/list$/;                                               // For path: '/lists/list'; sensitive to trailing '/'
pathPatternA = /^\/lists\/list\/([^\\/]+?)(?:\/(?=$))?$/ ;                      // For path: '/lists/list/:lid'; insensitive to trailing '/'
pathPatternB = /^\/lists\/list\/([^\\/]+?)?$/;                                  // For path: '/lists/list/:lid'; sensitive to trailing '/'
pathPatternC = /^\/lists\/list\/([^\\/]+?)\/product\/([^\\/]+?)(?:\/(?=$))?$/ ; // For path: '/lists/list/:lid/product/:pid'; insensitive to trailing '/'
pathPatternD = /^\/lists\/list\/([^\\/]+?)\/product\/([^\\/]+?)?$/;             // For path: '/lists/list/:lid/product/:pid'; sensitive to trailing '/'

regExp = /^\/ seg[0] \/ seg[1] \/ ([^\\/]+?) \/ seg[3] \/ ([^\\/]+?) ?$/;
newRegExp = new RegExp('\/' + 'lists' + '\/' + 'list' + '$');

*/
