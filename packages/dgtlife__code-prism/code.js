/**
 * @file Defines the Code class, and creates an instance.
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2015
 *
 * Created on 11/27/2015
 */

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';

class Code {
  constructor() {
    // Create a database to store the code snippets.
    this.db = new Mongo.Collection('code');

    // A subscription handle for the collection.
    this.metadata = {};
  }

  /**
   * Get the code text from the specified file.
   * @param {string} filename - the name of the file
   * @returns {*}
   */
  getText(filename) {
    if (this.metadata.ready()) {
      return this.db.findOne({ fileName: filename }).fileText;
    }

    return undefined;
  }

  /**
   * Load the code files. For each file insert a metadata object into the 'code'
   * collection.
   * @param {Array} fileList - an array of objects defining the files that
   *                           contain the code
   */
  loadCode(fileList) {
    if (Meteor.isServer) {
      // Initialize the database, i.e. delete everything from a previous run.
      this.db.remove({});

      // Process each of the file definition objects.
      _.each(fileList, (file) => {
        // Check the input.
        check(file.fileName, String);
        check(file.fileText, String);

        /*
         * For each file insert a metadata object with the filename and the file
         * text into a collection.
         */
        this.db.insert({
          fileName: file.fileName,
          fileText: file.fileText
        });
      });

      // Publish this 'code' collection.
      Meteor.publish('code', () => this.db.find());
    }
  }
}

// Export an instance C as default.
const C = new Code();
export default C;

// On the client, subscribe to the 'code' collection.
if (Meteor.isClient) {
  C.metadata = Meteor.subscribe('code');
}
