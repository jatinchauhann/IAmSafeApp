// CustomSlider.js
import React, { useState, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width * 0.8; // 80% of screen width
const KNOB_WIDTH = SLIDER_WIDTH * 0.45; // 45% of slider width

const CustomSlider = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dx >= 0 && gesture.dx <= SLIDER_WIDTH - KNOB_WIDTH) {
        pan.x.setValue(gesture.dx);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > (SLIDER_WIDTH - KNOB_WIDTH) / 2) {
        Animated.spring(pan.x, { toValue: SLIDER_WIDTH - KNOB_WIDTH, useNativeDriver: false }).start();
        setIsActive(true);
        onToggle(true);
      } else {
        Animated.spring(pan.x, { toValue: 0, useNativeDriver: false }).start();
        setIsActive(false);
        onToggle(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: pan.x.interpolate({
              inputRange: [0, SLIDER_WIDTH - KNOB_WIDTH],
              outputRange: ['#e0e0e0', '#4CD964'],
            }),
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [{ translateX: pan.x }],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.text,
            styles.offText,
            {
              opacity: pan.x.interpolate({
                inputRange: [0, SLIDER_WIDTH - KNOB_WIDTH],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          Off
        </Animated.Text>
        <Animated.Text
          style={[
            styles.text,
            styles.safeText,
            {
              opacity: pan.x.interpolate({
                inputRange: [0, SLIDER_WIDTH - KNOB_WIDTH],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          Active
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: SLIDER_WIDTH,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  knob: {
    width: KNOB_WIDTH,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 1,
  },
  offText: {
    color: '#999',
    left: KNOB_WIDTH / 2 - 15,
  },
  safeText: {
    color: '#999',
    right: KNOB_WIDTH / 2 - 20,
  },
});

export default CustomSlider;