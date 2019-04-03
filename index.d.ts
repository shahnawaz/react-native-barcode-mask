import { Component } from 'react';

export interface BarcodeMaskProps {
  width?: number | string;
  height?: number | string;
  edgeWidth?: number | string;
  edgeHeight?: number | string;
  edgeColor?: string;
  edgeBorderWidth?: number | string;
  transparency?: number;
  showAnimatedLine?: boolean;
  animatedLineColor?: string;
  animatedLineHeight?: number;
  lineAnimationDuration?: number;
}

export class BarcodeMask extends Component<BarcodeMaskProps, {}> {}

export default BarcodeMask;
