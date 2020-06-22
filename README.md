# react-native-barcode-mask

![version](https://img.shields.io/npm/v/react-native-barcode-mask.svg?style=flat-square)
![download](https://img.shields.io/npm/dt/react-native-barcode-mask?style=flat-square)
![licence](https://img.shields.io/npm/l/react-native-barcode-mask.svg?style=flat-square)
![build](https://img.shields.io/circleci/build/github/shahnawaz/react-native-barcode-mask?style=flat-square)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/shahnawaz/react-native-barcode-mask?color=%2397CA00&style=flat-square)
![dependencies](https://img.shields.io/david/shahnawaz/react-native-barcode-mask.svg?style=flat-square)

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
<BarcodeMask width={100} height={300} showAnimatedLine={false} outerMaskOpacity={0.8}/>

// Barcode example 3
<BarcodeMask width={300} height={100} edgeBorderWidth={1} />
```

#### Barcode full code example:
https://gist.github.com/shahnawaz/d24ae843fc3a6056bef9c752d9b35e03
  
  
:star: Pretty cool! Right?  

## Properties

#### `width`

Value: `number` | `string` (`%`)  
Default: `280`

Finder's width (the visible area)

#### `height`

Value: `number` | `string` (`%`)  
Default: `230`

Finder's height (the visible area)

#### `edgeWidth`

Value: `number` | `string` (`%`)  
Default: `20`

Edge/Corner's width

#### `edgeHeight`

Value: `number` | `string` (`%`)  
Default: `20`

Edge/Corner's height

#### `edgeColor`

Value: `string`  
Default: `#FFF`

Use this to give custom color to edges

#### `edgeBorderWidth`

Value: `number` | `string` (`%`)  
Default: `4`

Use this to modify the border (thickness) of edges

#### `edgeRadius`

Value: `number` 
Default: `0`

Use this to modify the border radius of edges

#### `backgroundColor`

Value: `string`  
Default: `rgb(0, 0, 0, 0.6)`

Use this to modify the background color of area around finder

#### `outerMaskOpacity`

Value: `number` (0 - 1)  
Default: 0.6

Use this to modify the transparency of outer mask

#### `showAnimatedLine`

Value: `boolean`  
Default: `true`

#### `animatedLineColor`

Value: `string`  
Default: `#FFF`

#### `animatedLineHeight`

Value: `number`  
Default: `2`

#### `animatedLineWidth`

Value: `number` | `string` (`%`)  
Default: `85%`

#### `lineAnimationDuration`

Value: `number`  
Default: `1500`

#### `animatedLineOrientation`

Value: `string` (`horizontal` | `vertical`)  
Default: `horiontal`

#### `useNativeDriver`

Value: `boolean`  
Default: `true`

React Native > `0.62.x` requires us to sepcify `useNativeDriver` while working with animation

#### `onLayoutMeasured`

value: `function`  

Details: Handler to receive `onLayout` event of finder. Useful if you want to only detect barcode inside the Finder area.

parameter: `event`
```
{
    nativeEvent: {
        target: number,
        layout: { height: number, width: number, x: number, y: number}
    }
}
```

## Contribution

Want to add some new styles or layout?  
Want to update few things?  

Feel free to open a PR.

## License

[MIT](https://github.com/shahnawaz/react-native-barcode-mask/blob/master/LICENSE)
