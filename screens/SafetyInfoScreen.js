// SafetyInfoScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const dummyData = {
    accidents: [
        { type: 'Car Crash', location: 'MG Road and Brigade Road junction', date: '2023-08-05', distance: '2.3 km' },
        { type: 'Pedestrian Incident', location: 'Indiranagar 100 Feet Road', date: '2023-08-07', distance: '5.1 km' },
    ],
    theftProneAreas: [
        { area: 'Koramangala', type: 'Phone snatching', distance: '4.7 km' },
        { area: 'Marathahalli', type: 'Car break-ins', distance: '8.2 km' },
    ],
    otherCrimes: [
        { type: 'Robbery', location: 'Jayanagar 4th Block', date: '2023-08-03', details: 'Suspect apprehended', distance: '6.5 km' },
        { type: 'Assault', location: 'Whitefield', date: '2023-08-06', details: 'Investigation ongoing', distance: '12.3 km' },
    ],
    safetyAssessment: {
        overallRate: 'Moderate',
        recentChanges: 'Slight increase in petty thefts',
        cautionAreas: 'Be vigilant in crowded markets and during night travel',
    },
    };

    const SafetyInfoScreen = () => {
        return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Text style={styles.header}>Safety Information</Text> */}
        
            <Card style={styles.card}>
            <Card.Title title="General Safety Assessment" left={(props) => <Ionicons name="shield" size={24} color="#4169E1" />} />
            <Card.Content>
                <Text style={styles.itemTitle}>Overall crime rate</Text>
                <Text>{dummyData.safetyAssessment.overallRate}</Text>
                <Text style={styles.itemTitle}>Recent changes</Text>
                <Text>{dummyData.safetyAssessment.recentChanges}</Text>
                <Text style={styles.itemTitle}>Areas to be cautious</Text>
                <Text>{dummyData.safetyAssessment.cautionAreas}</Text>
            </Card.Content>
            </Card>

            <Card style={styles.card}>
            <Card.Title title="Recent Accidents" left={(props) => <Ionicons name="car" size={24} color="#FF6347" />} />
            <Card.Content>
                {dummyData.accidents.map((accident, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.itemTitle}>{accident.type}</Text>
                    <Text>{accident.location}</Text>
                    <Text>Date: {accident.date}</Text>
                    <Text>Distance: {accident.distance}</Text>
                </View>
                ))}
            </Card.Content>
            </Card>

            <Card style={styles.card}>
            <Card.Title title="Theft-Prone Areas" left={(props) => <Ionicons name="alert-circle" size={24} color="#FFD700" />} />
            <Card.Content>
                {dummyData.theftProneAreas.map((area, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.itemTitle}>{area.area}</Text>
                    <Text>Common issue: {area.type}</Text>
                    <Text>Distance: {area.distance}</Text>
                </View>
                ))}
            </Card.Content>
            </Card>

            <Card style={styles.card}>
            <Card.Title title="Other Notable Crimes" left={(props) => <Ionicons name="warning" size={24} color="#DC143C" />} />
            <Card.Content>
                {dummyData.otherCrimes.map((crime, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.itemTitle}>{crime.type}</Text>
                    <Text>{crime.location}</Text>
                    <Text>Date: {crime.date}</Text>
                    <Text>Details: {crime.details}</Text>
                    <Text>Distance: {crime.distance}</Text>
                </View>
                ))}
            </Card.Content>
            </Card>

        </ScrollView>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    card: {
        margin: 10,
        elevation: 4,
    },
    item: {
        marginBottom: 15,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SafetyInfoScreen;