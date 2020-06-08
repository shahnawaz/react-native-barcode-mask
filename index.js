import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
  },
  animatedLine: {
    position: 'absolute',
    elevation: 4,
    zIndex: 0,
  },
});
class BarcodeMask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        edgeRadiusOffset: props.edgeRadius ? -Math.abs(props.edgeRadius / 3) : 0
    };
  }

  componentDidMount() {
    this._startLineAnimation();
  }

  componentWillUnmount() {
    if (this.animation) {
      this.animation.stop();
    }
  }

  _startLineAnimation = () => {
    const intervalId = setInterval(() => {
      const { finderLayout, intervalId } = this.state;
      if (finderLayout && finderLayout.height > 0) {
        this._animateLoop();
        clearInterval(intervalId);
      }
    }, 500);
    this.setState({
      intervalId,
    });
  };

  _animateLoop = () => {
    const { 
      animatedLineOrientation,
      lineAnimationDuration,
      useNativeDriver
    } = this.props;
    const { lineTravelWindowDistance } = this.state;
    const isHorizontal = animatedLineOrientation !== 'vertical';
    const propertyToChange = isHorizontal ? 'top' : 'left';
    const startValue = -lineTravelWindowDistance;
    const endValue = lineTravelWindowDistance;
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state[propertyToChange], {
          toValue: endValue,
          duration: lineAnimationDuration,
          useNativeDriver
        }),
        Animated.timing(this.state[propertyToChange], {
          toValue: startValue,
          duration: lineAnimationDuration,
          useNativeDriver
        })
      ])
    );
    this.animation.start();
  }

  _applyMaskFrameStyle = () => {
    const { backgroundColor, outerMaskOpacity } = this.props;
    return { backgroundColor, opacity: outerMaskOpacity, flex: 1 };
  };

  _renderEdge = (edgePosition) => {
    const { edgeWidth, edgeHeight, edgeColor, edgeBorderWidth, edgeRadius } = this.props;
    const { edgeRadiusOffset } = this.state;
    const defaultStyle = {
        width: edgeWidth,
        height: edgeHeight,
        borderColor: edgeColor
    };
    const edgeBorderStyle = {
      topRight: {
        borderRightWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopRightRadius: edgeRadius,
        top: edgeRadiusOffset,
        right: edgeRadiusOffset,
      },
      topLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopLeftRadius: edgeRadius,
        top: edgeRadiusOffset,
        left: edgeRadiusOffset
      },
      bottomRight: {
        borderRightWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomRightRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        right: edgeRadiusOffset
      },
      bottomLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomLeftRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        left: edgeRadiusOffset,
      },
    };
    return <View style={[defaultStyle, styles[edgePosition + 'Edge'], edgeBorderStyle[edgePosition]]} />;
  };

  _calculateLineTravelWindowDistance({ layout, isHorizontalOrientation }) {
    return (((isHorizontalOrientation ? layout.height : layout.width) - 10)/2);
  }

  _onFinderLayoutMeasured = ({ nativeEvent }) => {
    const { animatedLineOrientation, onLayoutMeasured } = this.props;
    const { layout } = nativeEvent;
    const isHorizontal = animatedLineOrientation !== 'vertical';
    const travelDistance = this._calculateLineTravelWindowDistance({ 
        layout, 
        isHorizontalOrientation: isHorizontal,
    });
    this.setState({
        top: new Animated.Value(-travelDistance),
        left: new Animated.Value(-travelDistance),
        lineTravelWindowDistance: travelDistance, 
        finderLayout: layout,
    })
    if (onLayoutMeasured) {
        onLayoutMeasured({ nativeEvent });
    }
  }

  render() {
    const { 
      width,
      height,
      showAnimatedLine,
      animatedLineColor,
      animatedLineWidth,
      animatedLineHeight,
      animatedLineOrientation,
      edgeBorderWidth
    } = this.props;
    const animatedLineStyle = {
      backgroundColor: animatedLineColor,
      height: animatedLineHeight,
      maxHeight: height,
      width: animatedLineWidth,
      maxWidth: width,
      margin: edgeBorderWidth
    };
    const { finderLayout, top, left } = this.state;
    if (finderLayout && animatedLineOrientation !== 'vertical') {
        animatedLineStyle.transform = [{ 
            translateY: top
        }]
    } else if (finderLayout) {
        animatedLineStyle.transform = [{ 
            translateX: left
        }]
    }

    return (
      <View style={[styles.container]}>
        <View
          style={[ styles.finder, { width, height } ]}
          onLayout={this._onFinderLayoutMeasured}
        >
          {this._renderEdge('topLeft')}
          {this._renderEdge('topRight')}
          {this._renderEdge('bottomLeft')}
          {this._renderEdge('bottomRight')}
          {showAnimatedLine && (
            <Animated.View
              style={[ styles.animatedLine, animatedLineStyle ]}
            />
          )}
        </View>
        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, this._applyMaskFrameStyle()]} />
          <View style={[{ height }, styles.maskCenter]} >
            <View style={[this._applyMaskFrameStyle()]} />
            <View style={[ styles.maskInner, { width, height } ]} />
            <View style={[this._applyMaskFrameStyle()]} />
          </View>
          <View style={[styles.maskRow, this._applyMaskFrameStyle()]} />
        </View>
      </View>
    );
  }

}

const propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeColor: PropTypes.string,
  edgeBorderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  outerMaskOpacity: PropTypes.number,
  showAnimatedLine: PropTypes.bool,
  animatedLineColor: PropTypes.string,
  animatedLineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animatedLineWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineAnimationDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animatedLineOrientation: PropTypes.string,
  useNativeDriver: PropTypes.bool,
  onLayoutMeasured: PropTypes.func
};

const defaultProps = {
  width: 280,
  height: 230,
  edgeWidth: 20,
  edgeHeight: 20,
  edgeColor: '#FFF',
  edgeBorderWidth: 4,
  backgroundColor: 'rgb(0, 0, 0)',
  outerMaskOpacity: 0.6,
  showAnimatedLine: true,
  animatedLineColor: '#FFF',
  animatedLineHeight: 2,
  animatedLineWidth: '85%',
  lineAnimationDuration: 5000,
  animatedLineOrientation: 'horizontal',
  useNativeDriver: true
};

BarcodeMask.propTypes = propTypes;
BarcodeMask.defaultProps = defaultProps;

export default BarcodeMask;
