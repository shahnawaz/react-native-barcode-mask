import { Component } from "react";

export interface MeasureLayoutEvent {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BarcodeMaskProps {
  width?: number | string;
  height?: number | string;
  edgeWidth?: number | string;
  edgeHeight?: number | string;
  edgeColor?: string;
  edgeBorderWidth?: number | string;
  backgroundColor?: string;
  showAnimatedLine?: boolean;
  animatedLineColor?: string;
  animatedLineHeight?: number;
  lineAnimationDuration?: number;
  onMeasureLayout?: (event: MeasureLayoutEvent) => void;
}

declare class BarcodeMask extends Component<BarcodeMaskProps, {}> {}

export default BarcodeMask;
