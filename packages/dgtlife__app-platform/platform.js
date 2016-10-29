/**
 * @file Parse the user agent string to detect browser/device cases
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 7/2/14
 */

if (Meteor.isClient) {
  Platform = {};

  var userAgentString = (window.navigator && navigator.userAgent) || '';

  // Define a parsing function that detects the desired cases
  var parseAgentString = function (uaString) {
    'use strict';

    var contains = function  (string) {
      return (string).test(uaString);
    };

    return {

      // Chrome on a Desktop.
      isChromeOnDesktop: contains(/(?!Android)Macintosh.*AppleWebKit.*(Chrome\/[.0-9]* (?!Mobile))/),

      // Chrome on an Android device.
      isChromeOnAndroid: contains(/Linux.*Android.*WebKit.*(Chrome\/[.0-9]*)/),

      // Chrome on an Android Phone.
      isChromeOnAndroidPhone: contains(/Linux.*Android.*WebKit.*(Chrome\/[.0-9]* Mobile)/),

      // Chrome on an Android Tablet.
      isChromeOnAndroidTablet: contains(/Linux.*Android.*WebKit.*(Chrome\/[.0-9]* (?!Mobile))/),

      // Chrome on an iPhone.
      isChromeOnIphone: contains(/iPhone.*WebKit.*(CriOS\/[.0-9]* Mobile)/),

      // Safari on a Desktop
      isSafariOnDesktop: contains(/Macintosh.*AppleWebKit.*(Version\/[.0-9]*)(?!.*Chrome)(?!Mobile)/),

      // Safari on an iPhone
      isSafariOnIphone: contains(/iPhone.*WebKit\/[.0-9](?!.*Chrome).* Mobile/),

      // Safari on an iPad
      isSafariOnIpad: contains(/iPad.*WebKit\/[.0-9](?!.*Chrome).* Mobile/),

      // Firefox on a Desktop
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:29.0) Gecko/20100101 Firefox/29.0"
      isFirefoxOnDesktop: contains(/(Gecko\/[.0-9]*).*(Firefox\/[.0-9]*)/),

      // Opera on a Desktop
      // "Opera/9.80 (Macintosh; Intel Mac OS X 10.10.2) Presto/2.12.388 Version/12.16"
      isOperaOnDesktop: contains(/(Opera\/[.0-9]*).*(Presto\/[.0-9]*)/)

    };
  };

  Platform = parseAgentString(userAgentString);

  // Define some global helpers
  Template.registerHelper('on_phone', function () {
    return Platform.isChromeOnAndroidPhone || Platform.isChromeOnIphone ||
    Platform.isSafariOnIphone;
  });
}

// Reference user agent strings:
// Chrome on Desktop: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.30 Safari/537.36"
// Chrome on Android: "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.93 Mobile Safari/537.36"
// Safari on Desktop: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/600.6.3 (KHTML, like Gecko) Version/8.0.6 Safari/600.6.3"
// Safari on iPhone:  "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70"
// Safari on iPad:    "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F69 Safari/600.1.4"
