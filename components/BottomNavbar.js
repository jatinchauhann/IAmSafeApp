// BottomNavbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavbar({ state, descriptors, navigation }) {
    return (
        <View style={styles.container}>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
            };

            let iconName;
            if (route.name === 'Search') {
            iconName = 'search';
            } else if (route.name === 'Home') {
            iconName = 'home';
            } else if (route.name === 'Profile') {
            iconName = 'person';
            }

            return (
            <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabButton}
            >
                <Ionicons 
                name={iconName} 
                size={24} 
                color={isFocused ? '#007AFF' : '#8E8E93'}
                />
                <Text style={[
                styles.tabText,
                { color: isFocused ? '#007AFF' : '#8E8E93' },
                route.name === 'Home' && styles.homeText
                ]}>
                {label}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F7',
        borderTopWidth: 1,
        borderTopColor: '#D1D1D6',
        paddingBottom: 20,
        paddingTop: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
    },
    homeText: {
        fontWeight: 'bold',
    },
});