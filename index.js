import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  finder: {
    alignItems: "center",
    justifyContent: "center",
  },
  topLeftEdge: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  maskOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  maskInner: {
    backgroundColor: "transparent",
  },
  maskRow: {
    width: "100%",
  },
  maskCenter: {
    display: "flex",
    flexDirection: "row",
  },
  animatedLine: {
    position: "absolute",
    elevation: 4,
    zIndex: 0,
  },
});

const BarcodeMask = ({
  width = 280,
  height = 230,
  edgeWidth = 20,
  edgeHeight = 20,
  edgeColor = "#FFF",
  edgeBorderWidth = 4,
  edgeRadius,
  backgroundColor = "rgb(0, 0, 0)",
  outerMaskOpacity = 0.6,
  showAnimatedLine = true,
  animatedLineColor = "#FFF",
  animatedLineHeight = 2,
  animatedLineWidth = "85%",
  lineAnimationDuration = 5000,
  animatedLineOrientation = "horizontal",
  useNativeDriver = true,
  onLayoutMeasured,
}) => {
  const edgeRadiusOffset = edgeRadius ? -Math.abs(edgeRadius / 3) : 0;

  const [
    { top, left, lineTravelWindowDistance, finderLayout },
    setLayout,
  ] = useState({
    top: new Animated.Value(0),
    left: new Animated.Value(0),
    lineTravelWindowDistance: 0,
    finderLayout: null,
  });

  useEffect(() => {
    let animation = null;

    const isHorizontal = animatedLineOrientation !== "vertical";
    const propertyToChange = isHorizontal ? top : left;
    const startValue = -lineTravelWindowDistance;
    const endValue = lineTravelWindowDistance;

    if (finderLayout && finderLayout.height > 0) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(propertyToChange, {
            toValue: endValue,
            duration: lineAnimationDuration,
            useNativeDriver,
          }),
          Animated.timing(propertyToChange, {
            toValue: startValue,
            duration: lineAnimationDuration,
            useNativeDriver,
          }),
        ])
      );
      animation.start();
    }

    return function cleanup() {
      if (animation) {
        animation.stop();
      }
    };
  }, [
    finderLayout,
    animatedLineOrientation,
    top,
    left,
    lineTravelWindowDistance,
    lineAnimationDuration,
    useNativeDriver,
  ]);

  const _applyMaskFrameStyle = () => {
    return { backgroundColor, opacity: outerMaskOpacity, flex: 1 };
  };

  const _renderEdge = (edgePosition) => {
    const defaultStyle = {
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
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
        left: edgeRadiusOffset,
      },
      bottomRight: {
        borderRightWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomRightRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        right: edgeRadiusOffset,
      },
      bottomLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomLeftRadius: edgeRadius,
        bottom: edgeRadiusOffset,
        left: edgeRadiusOffset,
      },
    };
    return (
      <View
        style={[
          defaultStyle,
          styles[edgePosition + "Edge"],
          edgeBorderStyle[edgePosition],
        ]}
      />
    );
  };

  const _calculateLineTravelWindowDistance = ({
    layout,
    isHorizontalOrientation,
  }) => {
    return ((isHorizontalOrientation ? layout.height : layout.width) - 10) / 2;
  };

  const _onFinderLayoutMeasured = ({ nativeEvent }) => {
    const { layout } = nativeEvent;
    const isHorizontal = animatedLineOrientation !== "vertical";
    const travelDistance = _calculateLineTravelWindowDistance({
      layout,
      isHorizontalOrientation: isHorizontal,
    });
    setLayout({
      top: new Animated.Value(-travelDistance),
      left: new Animated.Value(-travelDistance),
      lineTravelWindowDistance: travelDistance,
      finderLayout: layout,
    });
    if (onLayoutMeasured) {
      onLayoutMeasured(nativeEvent);
    }
  };

  const animatedLineStyle = {
    backgroundColor: animatedLineColor,
    height: animatedLineHeight,
    maxHeight: height,
    width: animatedLineWidth,
    maxWidth: width,
    margin: edgeBorderWidth,
  };

  if (finderLayout && animatedLineOrientation !== "vertical") {
    animatedLineStyle.transform = [
      {
        translateY: top,
      },
    ];
  } else if (finderLayout) {
    animatedLineStyle.transform = [
      {
        translateX: left,
      },
    ];
  }

  return (
    <View style={[styles.container]}>
      <View
        style={[styles.finder, { width, height }]}
        onLayout={_onFinderLayoutMeasured}
      >
        {_renderEdge("topLeft")}
        {_renderEdge("topRight")}
        {_renderEdge("bottomLeft")}
        {_renderEdge("bottomRight")}
        {showAnimatedLine && (
          <Animated.View style={[styles.animatedLine, animatedLineStyle]} />
        )}
      </View>
      <View style={styles.maskOuter}>
        <View style={[styles.maskRow, _applyMaskFrameStyle()]} />
        <View style={[{ height }, styles.maskCenter]}>
          <View style={[_applyMaskFrameStyle()]} />
          <View style={[styles.maskInner, { width, height }]} />
          <View style={[_applyMaskFrameStyle()]} />
        </View>
        <View style={[styles.maskRow, _applyMaskFrameStyle()]} />
      </View>
    </View>
  );
};

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
  lineAnimationDuration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  animatedLineOrientation: PropTypes.string,
  useNativeDriver: PropTypes.bool,
  onLayoutMeasured: PropTypes.func,
};

BarcodeMask.propTypes = propTypes;

export default BarcodeMask;
