// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import HelplineScreen from './screens/HelplineScreen';
import SafetyInfoScreen from './screens/SafetyInfoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Helplines') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'SafetyInfo') {
              iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Helplines" component={HelplineScreen} />
        <Tab.Screen name="SafetyInfo" component={SafetyInfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}