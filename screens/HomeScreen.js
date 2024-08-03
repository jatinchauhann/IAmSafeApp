import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import ActionButton from '../components/ActionButton';
import ShareButton from '../components/ShareButton';
import SettingItem from '../components/SettingItem';
import CustomSlider from '../components/CustomSlider';
import styles from '../styles/styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const [locationServices, setLocationServices] = useState(true);
  const [microphone, setMicrophone] = useState(true);
  const [iAmSafe, setIAmSafe] = useState(false);

  const listeningAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (iAmSafe) {
      Animated.spring(listeningAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.timing(listeningAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [iAmSafe]);

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/map-placeholder.png')}
          style={styles.mapImage}
        />
      </View>
      
      <Navbar onMenuPress={handleMenuPress} />
      
      <SafeAreaView style={styles.contentContainer} edges={['right', 'bottom', 'left']}>
        <TouchableOpacity style={styles.openMapsButton}>
          <Text style={styles.openMapsText}>Open Maps</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomAlignedContent}>
          <Animated.View style={[
            styles.listeningContainer,
            {
              opacity: listeningAnimation,
              transform: [
                { scale: listeningAnimation },
                { translateY: listeningAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                })},
              ],
            },
          ]}>
            <View style={styles.listeningDot} />
            <Text style={styles.listeningText}>Listening to voice and tracking location...</Text>
          </Animated.View>
          <View style={styles.actionButtonsContainer}>
            <ActionButton
              title="Call Police"
              gradientColors={['#0000FF', '#FF0000']}
              iconName="call"
              onPress={() => console.log('Call Police')}
            />
            <ActionButton
              title="Ring Siren"
              gradientColors={['#FF2D55', '#991B33']}
              iconName="warning"
              onPress={() => console.log('Ring Siren')}
            />
          </View>

          <ShareButton onPress={() => console.log('Share live activity')} />

          <View style={styles.settingsContainer}>
            <SettingItem
              title="Location Services"
              value={locationServices}
              onValueChange={setLocationServices}
              iconName="location-outline"
            />
            <SettingItem
              title="Microphone"
              value={microphone}
              onValueChange={setMicrophone}
              iconName="mic-outline"
            />
            <TouchableOpacity style={styles.trustedContactsButton}>
              <Text style={styles.trustedContactsText}>Set Trusted Contacts</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activateContainer}>
            <Text style={styles.activateText}>Activate IAmSafe</Text>
            <View style={styles.sliderContainer}>
              <CustomSlider onToggle={setIAmSafe} />
            </View>
            <Text style={styles.instructionText}>
              Say "I need help" to alert your location to trusted contacts
            </Text>
            <Text style={styles.instructionText}>
              Say "Call Police" to directly call the police helpline
            </Text>
            <Text style={styles.poweredByAI}>Powered by AI</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}