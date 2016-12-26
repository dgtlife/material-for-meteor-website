/**
 * @file Parse the user agent string to detect browser/device cases
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 7/2/14
 */
/* eslint max-len: ["error", { "ignoreComments": true }] */
import { Meteor } from 'meteor/meteor';

/**
 * Returns an object, the properties of which, are the boolean results of
 * various platform-matching tests.
 * @param {string} uaString - a user agent string
 */
const parseAgentString = (uaString) => {
  // Checks the uaString against a RegEx pattern.
  const matches = pattern => (pattern).test(uaString);

  // The server case.
  if (!uaString) {
    return undefined;
  }

  return {
    // Chrome on a Desktop.
    isChromeOnDesktop: matches(
      /(?!Android)Macintosh.*AppleWebKit.*(Chrome\/[.0-9]* (?!Mobile))/),

    // Chrome on an Android device.
    isChromeOnAndroid: matches(
      /Linux.*Android.*WebKit.*(Chrome\/[.0-9]*)/),

    // Chrome on an Android Phone.
    isChromeOnAndroidPhone: matches(
      /Linux.*Android.*WebKit.*(Chrome\/[.0-9]* Mobile)/),

    // Chrome on an Android Tablet.
    isChromeOnAndroidTablet: matches(
      /Linux.*Android.*WebKit.*(Chrome\/[.0-9]* (?!Mobile))/),

    // Chrome on an iPhone.
    isChromeOnIphone: matches(
      /iPhone.*WebKit.*(CriOS\/[.0-9]* Mobile)/),

    // Safari on a Desktop
    isSafariOnDesktop: matches(
      /Macintosh.*AppleWebKit.*(Version\/[.0-9]*)(?!.*Chrome)(?!Mobile)/),

    // Safari on an iPhone
    isSafariOnIphone: matches(
      /iPhone.*WebKit\/[.0-9](?!.*Chrome).* Mobile/),

    // Safari on an iPad
    isSafariOnIpad: matches(
      /iPad.*WebKit\/[.0-9](?!.*Chrome).* Mobile/),

    // Firefox on a Desktop
    isFirefoxOnDesktop: matches(
      /(Gecko\/[.0-9]*).*(Firefox\/[.0-9]*)/),

    // Opera on a Desktop
    isOperaOnDesktop: matches(
      /(Opera\/[.0-9]*).*(Presto\/[.0-9]*)/)
  };
};

// Get the platform's user agent string.
const userAgentString =
        (window && window.navigator && navigator.userAgent) || '';

// Get and export the Platform object.
const Platform = parseAgentString(userAgentString);
export default Platform;

// Create some global template helpers.
if (Meteor.isClient) {
  Template.registerHelper('on_phone', () =>
  (Platform.isChromeOnAndroidPhone ||
  Platform.isChromeOnIphone ||
  Platform.isSafariOnIphone));

  Template.registerHelper('on_desktop', () =>
  (Platform.isChromeOnDesktop ||
  Platform.isSafariOnDesktop ||
  Platform.isFirefoxOnDesktop ||
  Platform.isOperaOnDesktop));
}

/*
 * Reference user agent strings:
 * Chrome on Desktop:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.30 Safari/537.36"
 * Chrome on Android:  "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.93 Mobile Safari/537.36"
 * Safari on Desktop:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/600.6.3 (KHTML, like Gecko) Version/8.0.6 Safari/600.6.3"
 * Safari on iPhone:   "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70"
 * Safari on iPad:     "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F69 Safari/600.1.4"
 * Firefox on Desktop: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:29.0) Gecko/20100101 Firefox/29.0"
 * Opera on Desktop:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.10.2) Presto/2.12.388 Version/12.16"
 */
