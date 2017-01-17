/**
 * @file Defines the Platform package
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 */
Package.describe({
  summary: 'Detects the browser/device platform that the app is running on',
  version: '1.2.1',
  name: 'dgtlife:platform'
});

Package.onUse((api) => {
  api.use('ecmascript', 'client');
  api.use('templating', 'client');
  api.mainModule('platform.js', 'client');
});
