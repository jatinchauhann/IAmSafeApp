// SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import genAI from '../geminiConfig';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = `Generate a list of 5 key points about "${searchQuery}". Separate each point with a newline character.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Split the text into an array of points
        const points = text.split('\n').filter(point => point.trim() !== '');
        setSearchResults(points);
        } catch (error) {
        console.error('Error searching:', error);
        setSearchResults(['An error occurred while searching.']);
        } finally {
        setIsLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.resultItem}>
        <Text>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
        {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
        ) : (
            <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No results to display</Text>}
            />
        )}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F7',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: 'white',
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    resultItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#8E8E93',
    },
});