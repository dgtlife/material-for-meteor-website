/**
 * @file Helpers, event handlers, and the on-render callback for the layout template
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 * Created on 11/1/2015
 */

// Register the Home screen.
Nav.registerScreen('Home', {
  contentHelperMap: [{
    helper: 'screen_content',
    template: 'home'
  }],
  title: 'Material for Meteor',
  path: '/',
  pathPattern: /^\/$/
});
