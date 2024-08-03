import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function SettingItem({ title, value, onValueChange, iconName }) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingTitleContainer}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={iconName} size={20} color="#007AFF" />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D1D6", true: "#4CD964" }}
        thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
      />
    </View>
  );
}