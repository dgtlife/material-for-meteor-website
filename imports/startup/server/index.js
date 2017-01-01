/**
 * @file Initialize the server
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 1/20/2016
 */

import { selectIcons, defineIconAssets } from 'meteor/dgtlife:material';
import { loadCode } from 'meteor/dgtlife:code-prism';

// Banner
console.log('################### THIS IS THE START OF A NEW RUN ####################');

// Icons selected from the included icon sets.
selectIcons([
  {
    set: 'av',
    include: [
      'replay-30'
    ]
  },
  {
    set: 'base',
    include: [
      'account-circle',
      'add',
      'add-shopping-cart',
      'arrow-forward',
      'check',
      'check-circle',
      'close',
      'cloud',
      'cloud-off',
      'cloud-queue',
      'cloud-upload',
      'code',
      'create',
      'delete',
      'expand-less',
      'event',
      'help',
      'home',
      'info',
      'list',
      'lock',
      'lock-open',
      'menu',
      'more-horiz',
      'more-vert',
      'refresh',
      'report-problem',
      'search',
      'settings',
      'settings-applications',
      'verified-user',
      'view-list',
      'visibility-off',
      'visibility',
      'warning'
    ]
  },
  {
    set: 'communication',
    include: [
      'email',
      'mail',
      'message',
      'vpn-key'
    ]
  },
  {
    set: 'extras',
    include: [
      'account-key',
      'edit'
    ]
  },
  {
    set: 'image',
    include: [
      'photo-camera'
    ]
  },
  {
    set: 'maps',
    include: [
      'directions-walk',
      'directions-bus',
      'directions-subway',
      'flight',
      'local-see'
    ]
  },
  {
    set: 'notification',
    include: [
      'confirmation-number'
    ]
  },
  {
    set: 'social',
    include: [
      'group',
      'group-add',
      'location-city',
      'person',
      'person-add',
      'person-outline',
      'share'
    ]
  }
]);

// Icons from a custom iconset.
defineIconAssets(
  {
    iconsDefinedByG: [
      {
        file: Assets.getText('custom.svg'),
        include: [
          'help-2',
          'facebook',
          'facebook-box',
          'google-plus',
          'google-plus-box',
          'github-box',
          'github-circle'
        ],
        hyphensOnly: true
      }
    ]
  }
);

// Code files.
loadCode(
  [
    {
      fileName: 'md-button--base__jade.txt',
      fileText: Assets.getText('docs/md-button--base__jade.txt')
    },
    {
      fileName: 'md-button--base__spacebars.txt',
      fileText: Assets.getText('docs/md-button--base__spacebars.txt')
    },
    {
      fileName: 'md-button--fab__jade.txt',
      fileText: Assets.getText('docs/md-button--fab__jade.txt')
    },
    {
      fileName: 'md-button--fab__spacebars.txt',
      fileText: Assets.getText('docs/md-button--fab__spacebars.txt')
    },
    {
      fileName: 'md-button--icon-button__jade.txt',
      fileText: Assets.getText('docs/md-button--icon-button__jade.txt')
    },
    {
      fileName: 'md-button--icon-button__spacebars.txt',
      fileText: Assets.getText('docs/md-button--icon-button__spacebars.txt')
    },
    {
      fileName: 'md-button--no-ripple__jade.txt',
      fileText: Assets.getText('docs/md-button--no-ripple__jade.txt')
    },
    {
      fileName: 'md-button--no-ripple__spacebars.txt',
      fileText: Assets.getText('docs/md-button--no-ripple__spacebars.txt')
    },
    {
      fileName: 'md-button--toggle__jade.txt',
      fileText: Assets.getText('docs/md-button--toggle__jade.txt')
    },
    {
      fileName: 'md-button--toggle__spacebars.txt',
      fileText: Assets.getText('docs/md-button--toggle__spacebars.txt')
    },
    {
      fileName: 'md-button--with-icon__jade.txt',
      fileText: Assets.getText('docs/md-button--with-icon__jade.txt')
    },
    {
      fileName: 'md-button--with-icon__spacebars.txt',
      fileText: Assets.getText('docs/md-button--with-icon__spacebars.txt')
    },
    {
      fileName: 'md-card__jade.txt',
      fileText: Assets.getText('docs/md-card__jade.txt')
    },
    {
      fileName: 'md-card__spacebars.txt',
      fileText: Assets.getText('docs/md-card__spacebars.txt')
    },
    {
      fileName: 'md-checkbox__jade.txt',
      fileText: Assets.getText('docs/md-checkbox__jade.txt')
    },
    {
      fileName: 'md-checkbox__spacebars.txt',
      fileText: Assets.getText('docs/md-checkbox__spacebars.txt')
    },
    {
      fileName: 'md-chip__jade.txt',
      fileText: Assets.getText('docs/md-chip__jade.txt')
    },
    {
      fileName: 'md-chip__spacebars.txt',
      fileText: Assets.getText('docs/md-chip__spacebars.txt')
    },
    {
      fileName: 'md-collapse__jade.txt',
      fileText: Assets.getText('docs/md-collapse__jade.txt')
    },
    {
      fileName: 'md-collapse__spacebars.txt',
      fileText: Assets.getText('docs/md-collapse__spacebars.txt')
    },
    {
      fileName: 'md-dialog__jade.txt',
      fileText: Assets.getText('docs/md-dialog__jade.txt')
    },
    {
      fileName: 'md-dialog__spacebars.txt',
      fileText: Assets.getText('docs/md-dialog__spacebars.txt')
    },
    {
      fileName: 'md-drawer__jade.txt',
      fileText: Assets.getText('docs/md-drawer__jade.txt')
    },
    {
      fileName: 'md-drawer__spacebars.txt',
      fileText: Assets.getText('docs/md-drawer__spacebars.txt')
    },
    {
      fileName: 'md-dropdown-menu__jade.txt',
      fileText: Assets.getText('docs/md-dropdown-menu__jade.txt')
    },
    {
      fileName: 'md-dropdown-menu__js.txt',
      fileText: Assets.getText('docs/md-dropdown-menu__js.txt')
    },
    {
      fileName: 'md-dropdown-menu__spacebars.txt',
      fileText: Assets.getText('docs/md-dropdown-menu__spacebars.txt')
    },
    {
      fileName: 'md-header-panel__jade.txt',
      fileText: Assets.getText('docs/md-header-panel__jade.txt')
    },
    {
      fileName: 'md-header-panel__spacebars.txt',
      fileText: Assets.getText('docs/md-header-panel__spacebars.txt')
    },
    {
      fileName: 'md-icon-api--define__coffee.txt',
      fileText: Assets.getText('docs/md-icon-api--define__coffee.txt')
    },
    {
      fileName: 'md-icon-api--define__js.txt',
      fileText: Assets.getText('docs/md-icon-api--define__js.txt')
    },
    {
      fileName: 'md-icon-api--rendering__jade.txt',
      fileText: Assets.getText('docs/md-icon-api--rendering__jade.txt')
    },
    {
      fileName: 'md-icon-api--rendering__spacebars.txt',
      fileText: Assets.getText('docs/md-icon-api--rendering__spacebars.txt')
    },
    {
      fileName: 'md-icon-api--select__coffee.txt',
      fileText: Assets.getText('docs/md-icon-api--select__coffee.txt')
    },
    {
      fileName: 'md-icon-api--select__js.txt',
      fileText: Assets.getText('docs/md-icon-api--select__js.txt')
    },
    {
      fileName: 'md-icon-api--styles__css.txt',
      fileText: Assets.getText('docs/md-icon-api--styles__css.txt')
    },
    {
      fileName: 'md-icon__jade.txt',
      fileText: Assets.getText('docs/md-icon__jade.txt')
    },
    {
      fileName: 'md-icon__spacebars.txt',
      fileText: Assets.getText('docs/md-icon__spacebars.txt')
    },
    {
      fileName: 'md-image__jade.txt',
      fileText: Assets.getText('docs/md-image__jade.txt')
    },
    {
      fileName: 'md-image__js.txt',
      fileText: Assets.getText('docs/md-image__js.txt')
    },
    {
      fileName: 'md-image__spacebars.txt',
      fileText: Assets.getText('docs/md-image__spacebars.txt')
    },
    {
      fileName: 'md-item__jade.txt',
      fileText: Assets.getText('docs/md-item__jade.txt')
    },
    {
      fileName: 'md-item__spacebars.txt',
      fileText: Assets.getText('docs/md-item__spacebars.txt')
    },
    {
      fileName: 'md-menu__jade.txt',
      fileText: Assets.getText('docs/md-menu__jade.txt')
    },
    {
      fileName: 'md-menu__js.txt',
      fileText: Assets.getText('docs/md-menu__js.txt')
    },
    {
      fileName: 'md-menu__spacebars.txt',
      fileText: Assets.getText('docs/md-menu__spacebars.txt')
    },
    {
      fileName: 'md-popup-menu__jade.txt',
      fileText: Assets.getText('docs/md-popup-menu__jade.txt')
    },
    {
      fileName: 'md-popup-menu__js.txt',
      fileText: Assets.getText('docs/md-popup-menu__js.txt')
    },
    {
      fileName: 'md-popup-menu__spacebars.txt',
      fileText: Assets.getText('docs/md-popup-menu__spacebars.txt')
    },
    {
      fileName: 'md-radio__jade.txt',
      fileText: Assets.getText('docs/md-radio__jade.txt')
    },
    {
      fileName: 'md-radio__js.txt',
      fileText: Assets.getText('docs/md-radio__js.txt')
    },
    {
      fileName: 'md-radio__spacebars.txt',
      fileText: Assets.getText('docs/md-radio__spacebars.txt')
    },
    {
      fileName: 'md-shadow__jade.txt',
      fileText: Assets.getText('docs/md-shadow__jade.txt')
    },
    {
      fileName: 'md-shadow__spacebars.txt',
      fileText: Assets.getText('docs/md-shadow__spacebars.txt')
    },
    {
      fileName: 'md-snackbar__jade.txt',
      fileText: Assets.getText('docs/md-snackbar__jade.txt')
    },
    {
      fileName: 'md-snackbar__js.txt',
      fileText: Assets.getText('docs/md-snackbar__js.txt')
    },
    {
      fileName: 'md-snackbar__spacebars.txt',
      fileText: Assets.getText('docs/md-snackbar__spacebars.txt')
    },
    {
      fileName: 'md-spinner__jade.txt',
      fileText: Assets.getText('docs/md-spinner__jade.txt')
    },
    {
      fileName: 'md-spinner__spacebars.txt',
      fileText: Assets.getText('docs/md-spinner__spacebars.txt')
    },
    {
      fileName: 'md-tabs__jade.txt',
      fileText: Assets.getText('docs/md-tabs__jade.txt')
    },
    {
      fileName: 'md-tabs__js.txt',
      fileText: Assets.getText('docs/md-tabs__js.txt')
    },
    {
      fileName: 'md-tabs__spacebars.txt',
      fileText: Assets.getText('docs/md-tabs__spacebars.txt')
    },
    {
      fileName: 'md-text-input__jade.txt',
      fileText: Assets.getText('docs/md-text-input__jade.txt')
    },
    {
      fileName: 'md-text-input__spacebars.txt',
      fileText: Assets.getText('docs/md-text-input__spacebars.txt')
    },
    {
      fileName: 'md-toolbar__jade.txt',
      fileText: Assets.getText('docs/md-toolbar__jade.txt')
    },
    {
      fileName: 'md-toolbar__spacebars.txt',
      fileText: Assets.getText('docs/md-toolbar__spacebars.txt')
    },
    {
      fileName: 'md-tooltip__jade.txt',
      fileText: Assets.getText('docs/md-tooltip__jade.txt')
    },
    {
      fileName: 'md-tooltip__spacebars.txt',
      fileText: Assets.getText('docs/md-tooltip__spacebars.txt')
    }
  ]
);
