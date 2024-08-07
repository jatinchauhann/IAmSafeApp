import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import * as Location from 'expo-location';
import { helplineBot } from '../geminiConfig';

function HelplineScreen() {
    const [helplines, setHelplines] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocationAndFetchHelplines();
    }, []);

    const getLocationAndFetchHelplines = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            let locationResult = await Location.getCurrentPositionAsync({});
            setLocation(locationResult);
            
            await fetchHelplines(locationResult.coords.latitude, locationResult.coords.longitude);
        } catch (err) {
            console.error("Error getting location or fetching helplines:", err);
            setError('Failed to get location or fetch helplines. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHelplines = async (latitude, longitude) => {
        try {
            const result = await helplineBot.getHelplines(latitude, longitude);
            console.log("Helplines fetched:", result);  // For debugging
            const parsedHelplines = parseHelplines(result);
            setHelplines(parsedHelplines);
        } catch (err) {
            console.error("Error fetching helplines:", err);
            setError('Failed to fetch helplines. Please try again.');
        }
    };

    const parseHelplines = (helplinesString) => {
        const lines = helplinesString.split('\n');
        let location = '';
        const helplineList = [];

        lines.forEach(line => {
            if (line.startsWith('Location:')) {
                location = line.split(':')[1].trim();
            } else if (line.startsWith('-')) {
                const [name, number] = line.substring(1).split(':').map(s => s.trim());
                helplineList.push({ name, number });
            }
        });

        return { location, helplines: helplineList };
    };

    const renderHelplines = () => {
        if (!helplines) return null;

        return (
            <View style={styles.helplineList}>
                {helplines.helplines.map((helpline, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.helplineItem}
                        onPress={() => callHelpline(helpline.number)}
                    >
                        <Text style={styles.helplineName}>{helpline.name}</Text>
                        <Text style={styles.helplineNumber}>{helpline.number}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const callHelpline = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Getting location and loading helplines...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={getLocationAndFetchHelplines}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Emergency Contacts</Text>
            {/* {helplines && <Text style={styles.locationText}>Location: {helplines.location}</Text>} */}
            {renderHelplines()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    locationText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    helplineList: {
        paddingHorizontal: 20,
    },
    helplineItem: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    helplineName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    helplineNumber: {
        fontSize: 18,
        color: 'blue',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HelplineScreen;