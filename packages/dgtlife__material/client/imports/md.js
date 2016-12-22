/**
 * @file Main module of this package on the client. It defines and exports MD
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 *
 * Created on 11/17/16
 */
import { check, Match } from 'meteor/check';
import { enableButton, disableButton } from './api/md-button-api.js';
import { setStateOfCheckbox, getStateOfCheckbox } from './api/md-checkbox-api.js';
import {
  openDialog,
  closeDialog,
  closeAnyOpenDialog,
  refitDialog,
  isDialogOpen,
  isDialogClosed,
  closeDialogFs,
  openDialogFs,
  isDialogFsOpen
} from './api/md-dialog-api.js';
import {
  dockDrawer,
  undockDrawer,
  closeDrawer,
  openDrawer,
  toggleDrawer
} from './api/md-drawer-api.js';
import {
  setValueOfDropdownMenu,
  getValueOfDropdownMenu,
  clearValueOfDropdownMenu
} from './api/md-dropdown-menu-api.coffee';
import {
  resetHeaderPanelSystem,
  initializeHeaderPanelSystem
} from './api/md-header-panel-api.js';
import registerIconHelper from './api/md-icon-api.js';
import {
  setValueOfMenu,
  getValueOfMenu,
  clearValueOfMenu
} from './api/md-menu-api.js';
import {
  enableRadioButton,
  disableRadioButton,
  setValueOfRadioGroup,
  getValueOfRadioGroup,
  clearValueOfRadioGroup
} from './api/md-radio-api.js';
import { postSnackbar } from './api/md-snackbar-api.js';
import { setTabGroupSelection, getTabGroupSelection } from './api/md-tabs-api.js';
import {
  getValueOfTextField,
  setValueOfTextField,
  clearValueOfTextField,
  disableTextField,
  enableTextField,
  getValueOfTextArea,
  setValueOfTextArea,
  clearValueOfTextArea
} from './api/md-text-input-api.js';
import { detectTabs } from './api/md-toolbar-api.js';
import {
  dgEBI,
  dqS,
  dqSA,
  eqS,
  eqSA,
  waitForElement,
  clearSelectedElements,
  handleClickOnSelectableElement,
  getSelectedElements
} from './api/md-utils.js';
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

// Define and export the MD object.
const MD = {
  config: {
    // The elements to move with the snackbar as it is raised and lowered.
    elementsToMove: []
  },
  run(options) {
    // Configure MD, after checking the options supplied by the package user.
    if (options) {
      check(options.elementsToMove, Match.Optional([String]));
      this.config.elementsToMove = options.elementsToMove;
    }

    // Register the icon helper.
    registerIconHelper();
  },
  getConfig() {
    return this.config;
  },
  // MD Button
  enableButton,
  disableButton,
  // MD Checkbox
  setStateOfCheckbox,
  getStateOfCheckbox,
  // MD Dialog
  openDialog,
  closeDialog,
  closeAnyOpenDialog,
  refitDialog,
  isDialogOpen,
  isDialogClosed,
  openDialogFs,
  closeDialogFs,
  isDialogFsOpen,
  // MD Drawer
  dockDrawer,
  undockDrawer,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  // MD Dropdown Menu
  setValueOfDropdownMenu,
  getValueOfDropdownMenu,
  clearValueOfDropdownMenu,
  // MD Header Panel
  resetHeaderPanelSystem,
  initializeHeaderPanelSystem,
  // MD Menu
  setValueOfMenu,
  getValueOfMenu,
  clearValueOfMenu,
  // MD Radio
  enableRadioButton,
  disableRadioButton,
  setValueOfRadioGroup,
  getValueOfRadioGroup,
  clearValueOfRadioGroup,
  // MD Snackbar
  postSnackbar,
  // MD Tabs
  setTabGroupSelection,
  getTabGroupSelection,
  // MD Text Input
  getValueOfTextField,
  setValueOfTextField,
  clearValueOfTextField,
  disableTextField,
  enableTextField,
  getValueOfTextArea,
  setValueOfTextArea,
  clearValueOfTextArea,
  // MD Toolbar
  detectTabs,
  // MD Utils
  dgEBI,
  dqS,
  dqSA,
  eqS,
  eqSA,
  waitForElement,
  clearSelectedElements,
  handleClickOnSelectableElement,
  getSelectedElements
};

export default MD;
