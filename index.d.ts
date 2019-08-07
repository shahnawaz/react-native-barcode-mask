import { Component } from 'react';

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
}

declare class BarcodeMask extends Component<BarcodeMaskProps, {}> {}

export default BarcodeMask;
