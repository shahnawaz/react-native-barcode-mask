import { Component } from 'react';

/* taken from react-native types */
export interface LayoutRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

/* taken from react-native types */
export interface LayoutChangeEvent {
    nativeEvent: {
		target: number;
        layout: LayoutRectangle;
    };
}

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
	animatedLineOrientation?: string;
	useNativeDriver?: boolean;
	onLayoutMeasured?: (event: LayoutChangeEvent) => void;
}

declare class BarcodeMask extends Component<BarcodeMaskProps, {}> {}

export default BarcodeMask;
