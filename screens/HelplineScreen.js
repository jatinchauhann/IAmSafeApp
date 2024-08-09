import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, RefreshControl, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { helplineBot } from '../geminiConfig';

function HelplineScreen() {
    const [helplines, setHelplines] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const cachedHelplines = useRef(null);

    useEffect(() => {
        getLocationAndFetchHelplines();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getLocationAndFetchHelplines(true).then(() => setRefreshing(false));
    }, []);

    const getLocationAndFetchHelplines = async (forceRefresh = false) => {
        if (!forceRefresh && cachedHelplines.current) {
            // console.log("Using cached helplines:", cachedHelplines.current);
            setHelplines(cachedHelplines.current);
            return;
        }

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
            // console.log("Helplines fetched:", result);
            const parsedHelplines = parseHelplines(result);
            // console.log("Parsed helplines:", parsedHelplines);
            setHelplines(parsedHelplines);
            cachedHelplines.current = parsedHelplines;
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
        if (!helplines) {
            console.log("No helplines to render");
            return null;
        }

        // console.log("Rendering helplines:", helplines);

        const filteredHelplines = helplines.helplines.filter(helpline => 
            helpline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            helpline.number.includes(searchQuery)
        );

        return (
            <View style={styles.helplineList}>
                {filteredHelplines.map((helpline, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.helplineItem}
                        onPress={() => callHelpline(helpline.number)}
                    >
                        <View style={styles.helplineNameContainer}>
                            <Text style={styles.helplineName} numberOfLines={2} ellipsizeMode="tail">
                                {helpline.name}
                            </Text>
                        </View>
                        <View style={styles.helplineNumberContainer}>
                            <Text style={styles.helplineNumber}>{helpline.number}</Text>
                        </View>
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
                <ActivityIndicator size="large" color="#000000" />
                <Text>Getting location and loading helplines...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => getLocationAndFetchHelplines(true)}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search helplines..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* <Text style={styles.title}>Emergency Contacts</Text> */}
                {/* <Text>Swipe down to refresh...</Text> */}
                {helplines && <Text style={styles.locationText}>Location: {helplines.location}</Text>}
                {renderHelplines()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        margin: 16,
        paddingHorizontal: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 50,
        fontSize: 16,
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
    helplineNameContainer: {
        flex: 2,
        marginRight: 10,
    },
    helplineName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    helplineNumberContainer: {
        flex: 1,
    },
    helplineNumber: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'right',
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