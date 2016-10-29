/**
 * @file Defines the Utils namespace and methods
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 12/13/14
 */

/**
 * @namespace Utils
 * @summary The namespace for all Nav utility functions and variables
 */

/*jshint -W117 */    // app- and package-scoped variables not detected by JSHint
/*jshint -W058 */    // no () for constructor

Utils = {};

// Match pattern for a non-empty string
Utils.nonEmptyString = Match.Where(
  function (value) {
    "use strict";

    check(value, String);
    return value.length > 0;
  }
);

// Match pattern for function.
Utils.function = Match.Where(
  function (val) {
    "use strict";

    return (val instanceof Function);
  }
);

// Match pattern for RegExp.
Utils.regExp = Match.Where(
  function (val) {
    "use strict";

    return (val instanceof RegExp);
  }
);

// Match pattern for string or function.
Utils.nonEmptyStringOrFunction = Match.Where(
  function (val) {
    "use strict";

    return Match.test(val, Utils.nonEmptyString) || (val instanceof Function);
  }
);

// Match pattern for null or function.
Utils.nullOrFunction = Match.Where(
  function (val) {
    "use strict";

    return Match.test(val, null) || (val instanceof Function);
  }
);

// Match pattern for undefined or function.
Utils.undefinedOrFunction = Match.Where(
  function (val) {
    "use strict";

    return Match.test(val, undefined) || (val instanceof Function);
  }
);

// Match pattern for boolean or function.
Utils.booleanOrFunction = Match.Where(
  function (val) {
    "use strict";

    return (typeof val === 'boolean') || (val instanceof Function);
  }
);


// Wait for condition (to be true) before running a function.
Utils.waitForCondition = function (condition, func, showLoading, context) {
  "use strict";

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
    conditionSatisfied = condition;
  } else {

    // It is a conditionId.
    if (_.has(Nav._config.conditionsToWaitFor, condition)) {
      conditionSatisfied = function () {
        Nav._config.conditionsToWaitFor[condition].forEach(function (conditionFunc) {
          if (conditionFunc() === false) {
            return false;
          }
        });
        return true;
      };

    } else {
      // Throw an error.
      error.message = 'An unknown condition was specified.';
      throw error;
    }
  }

  Tracker.autorun(function (comp) {
    if (! conditionSatisfied()) {

      // Show the 'Loading' screen, and set the 'Loading' state.
      Nav.session.set('Loading', true);
      Nav.session.set(Nav._config.contentHelpers, 'loading');
    } else {
      Nav.session.set('Loading', false);

      // Call the function that requires the condition to be true, passing the
      // data context to it, if necessary.
      if (_.isNull(context)) {
        func();
      } else {
        func(context);
      }
      comp.stop();
    }
  });
};
