import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated';

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
};

const Pagination = ({ items, scrollX }: Props) => {
    return (
        <View style={styles.container}>
            {items.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    const scale = interpolate(
                        scrollX.value,
                        [(index - 1) * 300, index * 300, (index + 1) * 300],
                        [0.8, 1.4, 0.8],
                        Extrapolation.CLAMP
                    );

                    const opacity = interpolate(
                        scrollX.value,
                        [(index - 1) * 300, index * 300, (index + 1) * 300],
                        [0.5, 1, 0.5],
                        Extrapolation.CLAMP
                    );

                    return {
                        transform: [{ scale }],
                        opacity
                    };
                });

                return <Animated.View style={[styles.dot, animatedStyle]} key={index} />;
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        backgroundColor: '#333',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    },
});
