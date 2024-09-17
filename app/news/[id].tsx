import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';



type Props = {};

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([])
    const [loading, setLoading] = useState(true);



    const getNews = async () => {
        try {
            const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`);


            if (response && response.data) {

                setNews(response.data.results);
                setLoading(false)
            }

        } catch (error) {
            console.error("Failed to fetch news details:", error);
        }
    };

    useEffect(() => {
        getNews()
    }, [])





    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='arrow-back' size={22} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { }}>
                            <Ionicons name='heart' size={22} />
                        </TouchableOpacity>
                    ),
                    title: ""
                }} />

            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>{news[0].title}</Text>
                    <Image source={{ uri: news[0].image_url }} style={styles.newsImage} />
                    <View style={styles.sourceInfo}>
                        <Image source={{ uri: news[0].source_icon }} style={styles.sourceIcon} />
                        <Text style={styles.sourceName}>{news[0].source_name}</Text>
                        <Text style={styles.date}>{news[0].pubDate}</Text>

                    </View>
                    <Text>{news[0].content}</Text>
                </View>
            )}

        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    newsImage: {
        width: '100%',
        marginTop: 10,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        objectFit: "fill"
    },
    sourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sourceIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    sourceName: {
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        color: '#555',
    },
    date: {
        color: Colors.lightGrey,
        paddingLeft: 30,

    }
});
