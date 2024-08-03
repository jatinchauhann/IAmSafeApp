import React, { useRef } from 'react';
import { Text, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ShareButton({ onPress }) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePress = (callback) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => callback());
  };

  return (
    <AnimatedTouchable
      style={[styles.shareButton, { transform: [{ scale: animatedScale }] }]}
      onPress={() => handlePress(onPress)}
    >
      <LinearGradient
        colors={['#007AFF', '#004999']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.shareButtonGradient}
      >
        <Ionicons name="share-outline" size={24} color="white" />
        <Text style={styles.shareButtonText}>Share live activity to trusted contacts</Text>
      </LinearGradient>
    </AnimatedTouchable>
  );
}