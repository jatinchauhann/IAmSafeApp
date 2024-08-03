import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSlider from './CustomSlider';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function Navbar({ onMenuPress }) {
  const insets = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint="dark" style={[styles.navbar, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.appName}>IAmSafe</Text>
      <View style={styles.placeholder}></View>
    </BlurView>
  );
}

function SettingItem({ title, value, onValueChange, iconName }) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingTitleContainer}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={iconName} size={20} color="#007AFF" />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D1D6", true: "#4CD964" }}
        thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
      />
    </View>
  );
}

function ActionButton({ title, gradientColors, iconName, onPress }) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePress = (callback) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => callback());
  };

  return (
    <AnimatedTouchable
      style={[styles.actionButton, { transform: [{ scale: animatedScale }] }]}
      onPress={() => handlePress(onPress)}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <Ionicons name={iconName} size={24} color="white" />
        <Text style={styles.actionButtonText}>{title}</Text>
      </LinearGradient>
    </AnimatedTouchable>
  );
}

function ShareButton({ onPress }) {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePress = (callback) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => callback());
  };

  return (
    <AnimatedTouchable
      style={[styles.shareButton, { transform: [{ scale: animatedScale }] }]}
      onPress={() => handlePress(onPress)}
    >
      <LinearGradient
        colors={['#007AFF', '#004999']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.shareButtonGradient}
      >
        <Ionicons name="share-outline" size={24} color="white" />
        <Text style={styles.shareButtonText}>Share live activity to trusted contacts</Text>
      </LinearGradient>
    </AnimatedTouchable>
  );
}

export default function App() {
  const [locationServices, setLocationServices] = useState(true);
  const [microphone, setMicrophone] = useState(true);
  const [heartbeatSound, setHeartbeatSound] = useState(true);
  const [iAmSafe, setIAmSafe] = useState(false);

  const animatedScale = new Animated.Value(1);
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

  const handlePress = (callback) => {
    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(animatedScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    callback();
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Image
            source={require('./assets/map-placeholder.png')}
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
              <SettingItem
                title="Turn on pulse sound"
                value={heartbeatSound}
                onValueChange={setHeartbeatSound}
                iconName="heart-outline"
              />
              <TouchableOpacity style={styles.trustedContactsButton}>
                <Text style={styles.trustedContactsText}>Set Trusted Contacts</Text>
              </TouchableOpacity>
            </View>
            
            

            <View style={styles.activateContainer}>
              <Text style={styles.activateText}>Activate IAmSafe</Text>
              
              {/* <View style={styles.activateSwitch}>
                <Switch
                  value={iAmSafe}
                  onValueChange={(val) => setIAmSafe(val)}
                  trackColor={{ false: "#D1D1D6", true: "#4CD964" }}
                  thumbColor={iAmSafe ? "#FFFFFF" : "#FFFFFF"}
                  style={styles.switch}
                />
              </View> */}
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomAlignedContent: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 110,
    zIndex: 1000,
  },
  menuButton: {
    padding: 5,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 24,
  },
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    marginLeft: 10,
  },
  settingIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustedContactsButton: {
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  trustedContactsText: {
    color: '#007AFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 5,
    overflow: 'visible', // Change this from 'hidden' to 'visible'
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8, // Adjusted for spacing between icon and text
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  shareButton: {
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'visible', // Change this from 'hidden' to 'visible'
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shareButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listeningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listeningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 10,
  },
  listeningText: {
    color: '#333',
  },
  activateContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  activateSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 10,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  instructionText: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  poweredByAI: {
    color: '#8E8E93',
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  openMapsButton: {
    position: 'absolute',
    top: 120,
    right: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 1001,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openMapsText: {
    color: '#007AFF',
  },
});