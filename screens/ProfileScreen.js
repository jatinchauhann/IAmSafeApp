// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Profile Screen</Text>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('About')}
        >
            <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log('Login/Signup')}
        >
            <Text style={styles.buttonText}>Login/Signup</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});