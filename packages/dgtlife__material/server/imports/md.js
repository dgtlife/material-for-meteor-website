/**
 * @file Main module of this package on the server
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 *
 * Created on 11/22/16
 */
import { Meteor } from 'meteor/meteor';
import {
  Icons,
  defineIconAssets,
  selectIcons } from './api/md-icon-api';

// Initialize the database that will hold all the extracted icon metadata.
Icons.remove({});

// Declare the icons needed by the MD package itself.
selectIcons([
  {
    set: 'base',
    include: [
      'arrow-drop-down',
      'check-box',
      'check-box-outline-blank',
      'expand-more'
    ]
  },
  {
    set: 'extras',
    include: [
      'close-circle'
    ]
  }
]);

Meteor.startup(() => {
  // Publish the 'icons' collection.
  Meteor.publish('icons', () => Icons.find());
  console.log(`MD Icon: metadata for ${Icons.find().count()} icons is ready.`);
});

// Define and export MD on the server.
const MD = {
  defineIconAssets: defineIconAssets,
  selectIcons: selectIcons
};

export default MD;
