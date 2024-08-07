import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const MarqueeText = ({ text, style, speed = 0.1, delay = 1000 }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const textWidth = useRef(0);
    const containerWidth = useRef(0);

    useEffect(() => {
        const animation = Animated.loop(
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(scrollX, {
            toValue: -textWidth.current,
            duration: textWidth.current / speed,
            useNativeDriver: true,
            }),
            Animated.delay(delay),
            Animated.timing(scrollX, {
            toValue: containerWidth.current,
            duration: 0,
            useNativeDriver: true,
            }),
        ])
        );

        animation.start();

        return () => animation.stop();
    }, [scrollX, speed, delay]);

    return (
        <View
        style={styles.container}
        onLayout={(event) => {
            containerWidth.current = event.nativeEvent.layout.width;
        }}
        >
        <Animated.Text
            style={[style, { transform: [{ translateX: scrollX }] }]}
            onLayout={(event) => {
            textWidth.current = event.nativeEvent.layout.width;
            }}
        >
            {text}
        </Animated.Text>
        </View>
    );
    };

    const styles = StyleSheet.css`
    container: {
        overflow: 'hidden',
    }
`;

export default MarqueeText;