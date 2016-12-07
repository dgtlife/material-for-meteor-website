/**
 * @file Main module of this package on the client
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 *
 * Created on 11/17/16
 */
import Material from './api/material.js';
import './ui/md-button/md-button.js';
import './ui/md-card/md-card.jade';
import './ui/md-checkbox/md-checkbox.js';
import './ui/md-chip/md-chip.js';
import './ui/md-collapse/md-collapse.coffee';
import './ui/md-dialog/md-dialog.coffee';
import './ui/md-drawer/md-drawer.coffee';
import './ui/md-dropdown-menu/md-dropdown-menu.coffee';
import './ui/md-header-panel/md-header-panel.js';
import './ui/md-icon/md-icon.jade';
import './ui/md-image/md-image.coffee';
import './ui/md-item/md-item.jade';
import './ui/md-menu/md-menu.js';
import './ui/md-popup-menu/md-popup-menu.coffee';
import './ui/md-radio/md-radio.js';
import './ui/md-ripple/md-ripple.coffee';
import './ui/md-snackbar/md-snackbar.coffee';
import './ui/md-spinner/md-spinner.coffee';
import './ui/md-tabs/md-tabs.js';
import './ui/md-text-input/md-text-input.coffee';
import './ui/md-toolbar/md-toolbar.js';
import './ui/md-tooltip/md-tooltip.js';
import './md-styles.styl';
import registerIconHelper from './api/md-icon-api.js';

const MD = new Material();
export default MD;

Meteor.startup(() => {
  // Configure MD.
  if (MD.options) {
    MD.configure(MD.options);
  }

  // Register the icon helper.
  registerIconHelper();
});
