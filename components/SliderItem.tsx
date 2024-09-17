import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NewsDataType } from '@/types';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

type Props = {
    slideItem: NewsDataType;
    index: number;
    scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    scrollX.value,
                    [(index - 1) * width, index * width, (index + 1) * width],
                    [-width * 0.15, 0, width * 0.15],
                    Extrapolation.CLAMP
                ),
            },
            {
                scale: interpolate(
                    scrollX.value,
                    [(index - 1) * width, index * width, (index + 1) * width],
                    [0.9, 1, 0.9],
                    Extrapolation.CLAMP
                ),
            },
        ],
    }));

    return (
        <Link href={`/news/${slideItem.article_id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={[styles.itemWrapper, animatedStyle]}>
                    <Image style={styles.image} source={{ uri: slideItem.image_url }} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}>
                        <View style={styles.sourceInfo}>
                            {slideItem.source_icon && <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />}
                            <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                        </View>
                        <Text style={styles.title} numberOfLines={2}>
                            {slideItem.title}
                        </Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 20,
    },
    background: {
        position: 'absolute',
        left: 30,
        right: 30,
        width: width - 60,
        borderRadius: 20,
        height: 180,
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
    },
    sourceInfo: {
        flexDirection: 'row',
        position: 'absolute',
        top: 85,
        left: 20,
        alignItems: 'center',
    },
    sourceName: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 10,
    },
    title: {
        fontSize: 14,
        color: Colors.white,
        position: 'absolute',
        top: 120,
        left: 20,
        right: 20,
    },
});
