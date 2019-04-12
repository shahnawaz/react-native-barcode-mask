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
  maskFrame: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
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
    width: '85%',
  },
});

class BarcodeMask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(10),
      maskCenterViewHeight: 0,
    };
  }

  componentDidMount() {
    this._startLineAnimation();
  }

  componentWillUnmount () {
    if (this.animation) {
      this.animation.stop();
    }
  }

  _startLineAnimation = () => {
    const intervalId = setInterval(() => {
      if (this.state.maskCenterViewHeight > 0) {
        this._animateLoop();
        clearInterval(this.state.intervalId);
      }
    }, 500);
    this.setState({
      intervalId,
    });
  };

  _animateLoop = () => {
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.top, {
          toValue: this.state.maskCenterViewHeight - 10,
          duration: this.props.lineAnimationDuration,
        }),
        Animated.timing(this.state.top, {
          toValue: 10,
          duration: this.props.lineAnimationDuration,
        })
      ])
    );
    this.animation.start();
  }

  _onMaskCenterViewLayoutUpdated = ({ nativeEvent }) => {
    this.setState({
      maskCenterViewHeight: nativeEvent.layout.height,
    });
  };

  _applyMaskFrameTransparency = () => {
    let transparency = 0.6;
    if (
      this.props.transparency &&
      Number(this.props.transparency) &&
      (this.props.transparency >= 0 || this.props.transparency <= 1)
    ) {
      transparency = this.props.transparency;
    }
    return { backgroundColor: 'rgba(0,0,0,' + transparency + ')' };
  };

  _renderEdge = (edgePosition) => {
    const defaultStyle = {
      width: this.props.edgeWidth,
      height: this.props.edgeHeight,
      borderColor: this.props.edgeColor,
    };
    const edgeBorderStyle = {
      topRight: {
        borderRightWidth: this.props.edgeBorderWidth,
        borderTopWidth: this.props.edgeBorderWidth,
      },
      topLeft: {
        borderLeftWidth: this.props.edgeBorderWidth,
        borderTopWidth: this.props.edgeBorderWidth,
      },
      bottomRight: {
        borderRightWidth: this.props.edgeBorderWidth,
        borderBottomWidth: this.props.edgeBorderWidth,
      },
      bottomLeft: {
        borderLeftWidth: this.props.edgeBorderWidth,
        borderBottomWidth: this.props.edgeBorderWidth,
      },
    };
    return <View style={[defaultStyle, styles[edgePosition + 'Edge'], edgeBorderStyle[edgePosition]]} />;
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={[
            styles.finder,
            {
              width: this.props.width,
              height: this.props.height,
            },
          ]}
        >
          {this._renderEdge('topLeft')}
          {this._renderEdge('topRight')}
          {this._renderEdge('bottomLeft')}
          {this._renderEdge('bottomRight')}

          {this.props.showAnimatedLine && (
            <Animated.View
              style={[
                styles.animatedLine,
                {
                  backgroundColor: this.props.animatedLineColor,
                  height: this.props.animatedLineHeight,
                  top: this.state.top,
                },
              ]}
            />
          )}
        </View>

        <View style={styles.maskOuter}>
          <View style={[styles.maskRow, styles.maskFrame, this._applyMaskFrameTransparency()]} />
          <View
            style={[{ height: this.props.height }, styles.maskCenter]}
            onLayout={this._onMaskCenterViewLayoutUpdated}
          >
            <View style={[styles.maskFrame, this._applyMaskFrameTransparency()]} />
            <View
              style={[
                styles.maskInner,
                {
                  width: this.props.width,
                  height: this.props.height,
                },
              ]}
            />
            <View style={[styles.maskFrame, this._applyMaskFrameTransparency()]} />
          </View>
          <View style={[styles.maskRow, styles.maskFrame, this._applyMaskFrameTransparency()]} />
        </View>
      </View>
    );
  }

}

const propTypes: PropsType = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  edgeColor: PropTypes.string,
  edgeBorderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transparency: PropTypes.number,
  showAnimatedLine: PropTypes.bool,
  animatedLineColor: PropTypes.string,
  animatedLineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineAnimationDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  width: 280,
  height: 230,
  edgeWidth: 20,
  edgeHeight: 20,
  edgeColor: '#FFF',
  edgeBorderWidth: 4,
  transparency: 0.6,
  showAnimatedLine: true,
  animatedLineColor: '#FFF',
  animatedLineHeight: 2,
  lineAnimationDuration: 1500,
};

BarcodeMask.propTypes = propTypes;
BarcodeMask.defaultProps = defaultProps;

export default BarcodeMask;
