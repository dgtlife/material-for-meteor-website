/**
 * @file Defines the Material class.
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 *
 * Created on 9/29/2015
 */
/* eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Match\.." }] */
import { ReactiveDict } from 'meteor/reactive-dict';
import { check, Match } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { enableButton, disableButton } from './md-button-api.js';
import { setStateOfCheckbox, getStateOfCheckbox } from './md-checkbox-api.js';
import {
  openDialog,
  closeDialog,
  closeAnyOpenDialog,
  refitDialog,
  isDialogOpen,
  isDialogClosed,
  closeDialogFs,
  openDialogFs,
  isDialogFsOpen } from './md-dialog-api.js';
import {
  dockDrawer,
  undockDrawer,
  closeDrawer,
  openDrawer,
  toggleDrawer } from './md-drawer-api.js';
import {
  setValueOfDropdownMenu,
  getValueOfDropdownMenu,
  clearValueOfDropdownMenu } from './md-dropdown-menu-api.coffee';
import {
  resetHeaderPanelSystem,
  initializeHeaderPanelSystem } from './md-header-panel-api.js';
import {
  setValueOfMenu,
  getValueOfMenu,
  clearValueOfMenu } from './md-menu-api.js';
import {
  enableRadioButton,
  disableRadioButton,
  setValueOfRadioGroup,
  getValueOfRadioGroup,
  clearValueOfRadioGroup } from './md-radio-api.js';
import { postSnackbar } from './md-snackbar-api.js';
import { setTabGroupSelection, getTabGroupSelection } from './md-tabs-api.js';
import {
  getValueOfTextField,
  setValueOfTextField,
  clearValueOfTextField,
  disableTextField,
  enableTextField,
  getValueOfTextArea,
  setValueOfTextArea,
  clearValueOfTextArea } from './md-text-input-api.js';
import { detectTabs } from './md-toolbar-api.js';
import {
  dgEBI,
  dqS,
  dqSA,
  eqS,
  eqSA,
  waitForElement,
  clearSelectedElements,
  handleClickOnSelectableElement,
  getSelectedElements } from './md-utils.js';

// Define the Material class.
class Material {
  constructor() {
    // The config object.
    this.config = {
      // The elements to move with the snackbar as it is raised and lowered.
      elementsToMove: []
    };
  }

  /**
   * Configure options for the Material instance.
   * @param {object} _config - configuration options provided by the package user
   */
  configure(_config) {
    // Check the configuration options supplied by the package user.
    check(_config.elementsToMove, Match.Optional([String]));

    // Update the configuration values.
    this.config = _.extend(this.config, _config);
    return this.config;
  }
}

// Manage reactive variables.
Material.prototype.reactive = new ReactiveDict();

// MD Button.
Material.prototype.enableButton = enableButton;
Material.prototype.disableButton = disableButton;

// MD Checkbox.
Material.prototype.setStateOfCheckbox = setStateOfCheckbox;
Material.prototype.getStateOfCheckbox = getStateOfCheckbox;

// MD Dialog.
Material.prototype.openDialog = openDialog;
Material.prototype.closeDialog = closeDialog;
Material.prototype.closeAnyOpenDialog = closeAnyOpenDialog;
Material.prototype.refitDialog = refitDialog;
Material.prototype.isDialogOpen = isDialogOpen;
Material.prototype.isDialogClosed = isDialogClosed;
Material.prototype.openDialogFs = openDialogFs;
Material.prototype.closeDialogFs = closeDialogFs;
Material.prototype.isDialogFsOpen = isDialogFsOpen;

// MD Drawer.
Material.prototype.dockDrawer = dockDrawer;
Material.prototype.undockDrawer = undockDrawer;
Material.prototype.openDrawer = openDrawer;
Material.prototype.closeDrawer = closeDrawer;
Material.prototype.toggleDrawer = toggleDrawer;

// MD Dropdown Menu.
Material.prototype.setValueOfDropdownMenu = setValueOfDropdownMenu;
Material.prototype.getValueOfDropdownMenu = getValueOfDropdownMenu;
Material.prototype.clearValueOfDropdownMenu = clearValueOfDropdownMenu;

// MD Header Panel.
Material.prototype.resetHeaderPanelSystem = resetHeaderPanelSystem;
Material.prototype.initializeHeaderPanelSystem = initializeHeaderPanelSystem;

// MD Menu.
Material.prototype.setValueOfMenu = setValueOfMenu;
Material.prototype.getValueOfMenu = getValueOfMenu;
Material.prototype.clearValueOfMenu = clearValueOfMenu;

// MD Radio.
Material.prototype.enableRadioButton = enableRadioButton;
Material.prototype.disableRadioButton = disableRadioButton;
Material.prototype.setValueOfRadioGroup = setValueOfRadioGroup;
Material.prototype.getValueOfRadioGroup = getValueOfRadioGroup;
Material.prototype.clearValueOfRadioGroup = clearValueOfRadioGroup;

// MD Snackbar.
Material.prototype.postSnackbar = postSnackbar;

// MD Tabs.
Material.prototype.setTabGroupSelection = setTabGroupSelection;
Material.prototype.getTabGroupSelection = getTabGroupSelection;

// MD Text Input.
Material.prototype.getValueOfTextField = getValueOfTextField;
Material.prototype.setValueOfTextField = setValueOfTextField;
Material.prototype.clearValueOfTextField = clearValueOfTextField;
Material.prototype.disableTextField = disableTextField;
Material.prototype.enableTextField = enableTextField;
Material.prototype.getValueOfTextArea = getValueOfTextArea;
Material.prototype.setValueOfTextArea = setValueOfTextArea;
Material.prototype.clearValueOfTextArea = clearValueOfTextArea;

// MD Toolbar.
Material.prototype.detectTabs = detectTabs;

// MD Utils.
Material.prototype.dgEBI = dgEBI;
Material.prototype.dqS = dqS;
Material.prototype.dqSA = dqSA;
Material.prototype.eqS = eqS;
Material.prototype.eqSA = eqSA;
Material.prototype.waitForElement = waitForElement;
Material.prototype.clearSelectedElements = clearSelectedElements;
Material.prototype.handleClickOnSelectableElement =
  handleClickOnSelectableElement;
Material.prototype.getSelectedElements = getSelectedElements;

export default Material;
