import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>IAmSafe</Text>
        <Text style={styles.drawerHeaderBottomText}>Powered by AI</Text>
      </View>
      {props.state.routeNames.map((name, index) => (
        <TouchableOpacity
          key={name}
          style={[
            styles.drawerItem,
            props.state.index === index && styles.activeDrawerItem,
          ]}
          onPress={() => props.navigation.navigate(name)}
        >
          <Ionicons
            name={name === 'Home' ? 'home-outline' : 'information-circle-outline'}
            size={24}
            color={props.state.index === index ? '#007AFF' : '#000'}
          />
          <Text style={[
            styles.drawerItemText,
            props.state.index === index && styles.activeDrawerItemText,
          ]}>
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  drawerHeaderText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerHeaderBottomText : {
    color: '#000',
    fontSize: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  activeDrawerItem: {
    backgroundColor: '#e6e6e6',
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  activeDrawerItemText: {
    color: '#007AFF',
  },
});