// FirstAidScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Card, Modal, Portal, Button, Provider as PaperProvider, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { firstAidBot } from '../geminiConfig';

const { height } = Dimensions.get('window');

const firstAidSituations = [
    "Choking", "Heart attack", "Stroke", "Severe bleeding", "Burns", "Fractures", "Sprains and strains",
    "Concussion", "Seizures", "Allergic reactions", "Asthma attack", "Diabetic emergency", "Heat exhaustion",
    "Hypothermia", "Drowning", "Electric shock", "Poisoning", "Snake bite", "Animal bites", "Eye injuries",
    "Nosebleeds", "Fainting", "Shock", "Chest pain", "Severe abdominal pain", "Impaled objects", "Amputation",
    "Dental emergencies", "Severe dehydration", "Hypoglycemia", "Hyperventilation", "Panic attacks", "Sunburn",
    "Jellyfish stings", "Chemical splashes", "Spinal cord injuries", "Crush injuries", "Puncture wounds",
    "Severe cuts", "Dislocations"
    ];

const FirstAidScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSituation, setSelectedSituation] = useState('');
    const [firstAidInstructions, setFirstAidInstructions] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const filteredSituations = firstAidSituations.filter(situation =>
        situation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleSituationPress = async (situation) => {
        setSelectedSituation(situation);
        setModalVisible(true);
        setIsLoading(true);
        
        try {
        const prompt = `Provide first aid instructions for ${situation}. Include steps, warnings, and when to seek medical help. Format the response in markdown.`;
        const response = await firstAidBot.getFirstAid(prompt);
        setFirstAidInstructions(response);
        } catch (error) {
        console.error('Error fetching first aid instructions:', error);
        setFirstAidInstructions('Unable to fetch instructions. Please try again.');
        } finally {
        setIsLoading(false);
        }
    };
    
    return (
        <PaperProvider>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search first aid situations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            </View>
            
            <ScrollView contentContainerStyle={styles.buttonContainer}>
            {filteredSituations.map((situation, index) => (
                <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleSituationPress(situation)}
                >
                <Ionicons name="medical" size={24} color="#4CAF50" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{situation}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
    
            <Portal>
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                <Card>
                <Card.Title title={selectedSituation} />
                <Card.Content>
                    <ScrollView style={styles.instructionsScroll}>
                    {isLoading ? (
                        <Text>Loading instructions...</Text>
                    ) : (
                        <Markdown style={markdownStyles}>
                        {firstAidInstructions}
                        </Markdown>
                    )}
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => setModalVisible(false)}>Close</Button>
                </Card.Actions>
                </Card>
            </Modal>
            </Portal>
        </View>
        </PaperProvider>
    );
};
    

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
},
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
},
searchIcon: {
    marginRight: 10,
},
searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
},
buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
},
buttonIcon: {
    marginRight: 10,
},
buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
},
modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
},
instructionsScroll: {
    maxHeight: 400,
},
modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: height * 0.8, // Limit the height to 80% of the screen height
},
instructionsScroll: {
    maxHeight: height * 0.6, // Adjust this value as needed
},
});

const markdownStyles = StyleSheet.create({
body: {
    fontSize: 16,
    lineHeight: 24,
},
heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
},
heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
},
paragraph: {
    marginBottom: 12,
},
listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
},
listItemContent: {
    flex: 1,
    marginBottom: 8,
},
listItemBullet: {
    width: 20,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
},
strong: {
    fontWeight: 'bold',
},
emphasis: {
    fontStyle: 'italic',
},
});

export default FirstAidScreen;