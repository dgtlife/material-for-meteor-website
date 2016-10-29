/**
 * @file Define the App Navigator package
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 1/15/14
 */
Package.describe({
  summary: "App Navigator is a simple lightweight navigator package for Meteor-based web apps",
  version: '0.8.3',
  name: 'dgtlife:app-navigator',
  git: ''
});

Package.onUse(function (api) {
  api.use('templating', 'client');
  api.use('spacebars', 'client');
  api.use('reactive-dict', ['client', 'server']);
  api.use('jquery', 'client');
  api.use('underscore', ['client', 'server']);
  api.use('check', ['client', 'server']);

  api.addFiles('nav-utils.js', ['client', 'server']);
  api.addFiles('navigator.js', ['client', 'server']);

  api.export('Nav', ['client', 'server']);
});
