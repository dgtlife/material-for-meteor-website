/**
 * @file Defines the Platform package
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 6/30/14
 */
Package.describe({
  summary: 'Detects the browser/device platform that the app runs on',
  version: '1.2.2',
  name: 'dgtlife:app-platform'
});

Package.onUse(function(api) {
  api.use('templating', 'client');
  api.addFiles('platform.js', 'client');
  api.export('Platform', 'client');
});

//\\\\\\\\\       Meteor is a beautiful thing! :-) Thanks MDG!      /////////\\
//\\\\\\\\\\                 End of file                           //////////\\
