/**
 * @file Define the dgtlife:navigate package
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 *
 * Created on 1/15/14
 */
Package.describe({
  summary: 'Navigate is a simple lightweight navigation package for ' +
           'Meteor-based web apps',
  version: '0.8.5',
  name: 'dgtlife:navigate',
  git: ''
});

Package.onUse((api) => {
  api.use('ecmascript', 'client');
  api.use('templating', 'client');
  api.use('spacebars', 'client');
  api.use('reactive-dict', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('check', 'client');
  api.mainModule('navigate.js', 'client');
  api.addFiles('nav-utils.js', 'client');
});
