/**
 * @file Define the Code package
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 */
Package.describe({
  summary: 'Render code as text into a Blaze template helper and color with Prism',
  version: '0.7.0',
  name: 'dgtlife:code-prism'
});

Package.onUse((api) => {
  api.use('ecmascript', ['client', 'server']);
  api.use('underscore', ['client', 'server']);
  api.use('check', ['client', 'server']);
  api.use('mongo', ['client', 'server']);
  api.mainModule('code.js');
  api.addFiles('prism.css', 'client');
  api.addFiles('prism.js', 'client');
});
