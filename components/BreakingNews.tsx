import { StyleSheet, FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NewsDataType } from '@/types';
import SliderItem from '@/components/SliderItem';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, runOnJS } from 'react-native-reanimated';
import Pagination from './Pagination';

type Props = {
    newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
            const index = Math.round(e.contentOffset.x / e.layoutMeasurement.width);
            runOnJS(setPaginationIndex)(index);
        },
    });

    const loadMoreNews = () => {
        setData((prevData) => [...prevData, ...newsList]);
    };

    return (

        <View style={styles.container}>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    renderItem={({ item, index }) => <SliderItem slideItem={item} index={index} scrollX={scrollX} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReached={loadMoreNews}
                />
                <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
            </View>

        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },

    slideWrapper: {
        justifyContent: 'center',
    },
});
