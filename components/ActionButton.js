import React, { useRef } from 'react';
import { Text, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ActionButton({ title, gradientColors, iconName, onPress }) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePress = (callback) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => callback());
  };

  return (
    <AnimatedTouchable
      style={[styles.actionButton, { transform: [{ scale: animatedScale }] }]}
      onPress={() => handlePress(onPress)}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <Ionicons name={iconName} size={24} color="white" />
        <Text style={styles.actionButtonText}>{title}</Text>
      </LinearGradient>
    </AnimatedTouchable>
  );
}