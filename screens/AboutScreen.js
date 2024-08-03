import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Navbar onMenuPress={() => navigation.toggleDrawer()} />
      <View style={styles.content}>
        <Text style={styles.title}>About IAmSafe</Text>
        <Text style={styles.description}>
          IAmSafe is a personal safety app designed to provide peace of mind and quick access to emergency services when you need them most. Our mission is to make the world a safer place by empowering individuals with technology-driven safety solutions.
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  version: {
    fontSize: 14,
    color: '#888',
  },
});