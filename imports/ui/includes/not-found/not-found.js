/**
 * @file Controls the Not Found screen
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2014
 * Created on 1/30/14
 */
// ToDo: Remove the need for this template with a config property

import { Template } from 'meteor/templating';
import './not-found.jade';

// Handler helpers.
Template.notFound.helpers({
  helpNotFoundP1() {
    return 'Unfortunately, there is no content corresponding to the URL you ' +
      'entered. Click ';
  },
  helpNotFoundP2() {
    return 'here';
  },
  helpNotFoundP3() {
    return ' to get back on track.';
  }
});
