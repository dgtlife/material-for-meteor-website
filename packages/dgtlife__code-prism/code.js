/**
 * @file Defines and exports the C object.
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 */

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

// Create a database to store the code snippets.
const Code = new Mongo.Collection('code');

// A subscription handle for the collection.
export const metadata = Meteor.isClient && Meteor.subscribe('code');

/**
 * Get the code text from the specified file.
 * @param {string} filename - the name of the file
 */
export const getText = (filename) => {
  if (metadata.ready()) {
    return Code.findOne({ fileName: filename }).fileText;
  }

  return undefined;
};

/**
 * Load the code files. For each file, insert a metadata object into the
 * 'code' collection.
 * @param {array} fileList - an array of objects defining the files that
 *                           contain the code
 */
export const loadCode = (fileList) => {
  if (Meteor.isServer) {
    // Initialize the database, i.e. delete everything from a previous run.
    Code.remove({});

    // Process each of the file definition objects.
    _.each(fileList, (file) => {
      // Check the input.
      check(file.fileName, String);
      check(file.fileText, String);

      /*
       * For each file insert a metadata object with the filename and the file
       * text into a collection.
       */
      Code.insert({
        fileName: file.fileName,
        fileText: file.fileText
      });
    });

    // Publish this 'code' collection.
    Meteor.publish('code', () => Code.find());
  }
};
