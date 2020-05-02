import { Component } from 'react';

export interface BarcodeMaskProps {
	width?: number | string;
	height?: number | string;
	edgeWidth?: number | string;
	edgeHeight?: number | string;
	edgeColor?: string;
	edgeBorderWidth?: number | string;
	edgeRadius?: number;
	backgroundColor?: string;
	outerMaskOpacity?: number;
	showAnimatedLine?: boolean;
	animatedLineColor?: string;
	animatedLineHeight?: number | string;
	animatedLineWidth?: number | string,
	lineAnimationDuration?: number;
	animatedLineOrientation?: PropTypes.string;
	onLayoutMeasured: PropTypes.func;
}

declare class BarcodeMask extends Component<BarcodeMaskProps, {}> {}

export default BarcodeMask;
