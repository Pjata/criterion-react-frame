# criterion-frame

> Internal React frame for projects

[![NPM](https://img.shields.io/npm/v/criterion-frame.svg)](https://www.npmjs.com/package/criterion-frame) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://pjata.github.io/criterion-react-frame)

## Install

```bash
npm install --save criterion-frame
```

## Usage
See stories in Storybook

## Components
`CriterionFrame` 
============================

The frame of a Criterion webapp. It comes in a uncontrolled and controlled mode.
The default is uncontrolled. It includes a topbar with logout callback and userInfo and
a menu, that you can config with the MenuConfig prop.
On a menu select it calls the onItemSelected callback.

Props
-----

### `children`

The children to be rendered as content

type: `node`


### `menuConfig`

Array of menu config items. It must contain fieldsÉlabel, icon, path

type: `array`


### `onItemSelected`

The callback is called when a menu item is selected from the menu

type: `func`


### `onLogout`

The callback function for the logout button click

type: `func`


### `selectedIndex`

If set the component is in controlled mode. You must handle the correct selectIndex value.

type: `number`


### `style`

Optional param for styling the container div

type: `object`


### `title`

The title that the frame displays in the TopBar

type: `string`


### `userInfo`

UserInfo object. It must contain a userName field

type: `object`
## License

GPL-3.0 © [Pjata](https://github.com/Pjata)
