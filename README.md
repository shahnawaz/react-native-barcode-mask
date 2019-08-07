# react-native-barcode-mask

![version](https://img.shields.io/npm/v/react-native-barcode-mask.svg?style=flat-square)
![dependencies](https://img.shields.io/david/shahnawaz/react-native-barcode-mask.svg?style=flat-square)
![licence](https://img.shields.io/npm/l/react-native-barcode-mask.svg?style=flat-square)

> :camera: A barcode and QR code scan layout for react-native applications with customizable styling

<p align="center" >
    <img 
        height="300" 
        src="https://user-images.githubusercontent.com/20506431/53305262-40d37200-38a1-11e9-9f87-c83a5cb44ac6.gif"
    >
</p>

## Install

`npm i react-native-barcode-mask -s`

## Usage

All you need is to `import` `BarcodeMask` from the `react-native-barcode-mask` module and then use it. 

#### Example use with RNCamera

Inside `<RNCamera>...</RNCamera>` tag as a child component.

```javascript
'use strict';
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

...
    <RNCamera
        ...
    >
        <BarcodeMask />
    </RNCamera>
...
```

## Examples

Few style modifications:

<p align="center" >
    <img 
        height="300" 
        src="https://user-images.githubusercontent.com/20506431/53305263-40d37200-38a1-11e9-8106-6c79f4d59ead.png"
    >
    <img 
        height="300" 
        src="https://user-images.githubusercontent.com/20506431/53305265-416c0880-38a1-11e9-9364-7fd0b987207a.png"
    >
    <img 
        height="300" 
        src="https://user-images.githubusercontent.com/20506431/53305266-416c0880-38a1-11e9-8ef0-9ec9912fd355.png"
    >
    <img 
        height="300" 
        src="https://user-images.githubusercontent.com/20506431/53305264-40d37200-38a1-11e9-8752-1c5deaf78c65.png"
    >
</p>

```javascript
// Barcode
<BarcodeMask width={300} height={100} />

// QR
<BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={false}/>

// Barcode example 2
<BarcodeMask width={100} height={300} showAnimatedLine={false} transparency={0.8}/>

// Barcode example 3
<BarcodeMask width={300} height={100} edgeBorderWidth={1} />
```
  
:star: Pretty cool! Right?  

## Properties

#### `width`

Value: number | string (`%`)  
Default: `280`

Finder's width (the visible area)

#### `height`

Value: number | string (`%`)  
Default: `230`

Finder's height (the visible area)

#### `edgeWidth`

Value: number | string (`%`)  
Default: `20`

Edge/Corner's width

#### `edgeHeight`

Value: number | string (`%`)  
Default: `20`

Edge/Corner's height

#### `edgeColor`

Value: string  
Default: `#FFF`

Use this to give custom color to edges

#### `edgeBorderWidth`

Value: number | string (`%`)  
Default: `4`

Use this to modify the border (thickness) of edges

#### `backgroundColor`

Value: string `rgba(0, 0, 0, 0.6)` 
Default: `rgba(0, 0, 0, 0.6)`

Use this to modify the background color of area around finder

#### `showAnimatedLine`

Value: boolean `true` | `false`  
Default: `true`

#### `animatedLineColor`

Value: string  
Default: `#FFF`

#### `animatedLineHeight`

Value: number  
Default: `2`

#### `lineAnimationDuration`

Value: number  
Default: `1500`

## Contribution

Want to add some new styles or layout?  
Want to update few things?  

Feel free to open a PR.

## License

[MIT](https://github.com/shahnawaz/react-native-barcode-mask/blob/master/LICENSE)
