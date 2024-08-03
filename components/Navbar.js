import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/styles';

export default function Navbar({ onMenuPress }) {
  const insets = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint="dark" style={[styles.navbar, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.appName}>IAmSafe</Text>
      <View style={styles.placeholder}></View>
    </BlurView>
  );
}