/**
 * @file Controls the doc_box and api_box templates
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 *
 * Created on 10/19/2016
 */

import { Template } from 'meteor/templating';
import Mlib from '../../../lib/mlib';
import './doc-box.jade';
import './doc-box.styl';

Template.doc_box.onRendered(function onRenderedDocBox() {
  const docBox = this.firstNode;

  // Set the doc box width, initially ...
  Mlib.setBoxWidth(docBox);

  // ... and on resize.
  window.addEventListener('resize', () => {
    Mlib.setBoxWidth(docBox);
  });
});

Template.api_box.onRendered(function onRenderedApiBox() {
  const apiBox = this.firstNode;

  // Set the api box width, initially ...
  Mlib.setBoxWidth(apiBox);

  // ... and on resize.
  window.addEventListener('resize', () => {
    Mlib.setBoxWidth(apiBox);
  });
});
