import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

type Props = {
    NewsList: Array<NewsDataType>
}

const NewsList = ({ NewsList }: Props) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {NewsList.map((item, index) => (
                <Link href={`/news/${item.article_id}`} asChild>
                    <TouchableOpacity>
                        <View key={index} style={styles.itemContainer}>
                            <Image source={{ uri: item.image_url }} style={styles.itemImg} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemCategory}>{item.category}</Text>
                                <Text style={styles.itemTitle}>{item.title}</Text>

                                <View style={styles.sourceInfo}>
                                    <Image source={{ uri: item.source_icon }} style={styles.sourceIcon} />
                                    <Text style={styles.sourceName} >{item.source_name}</Text>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                </Link>
            ))}
        </ScrollView>
    )
}

export default NewsList

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        paddingVertical: 10,
        borderBottomWidth: 1,  // Added a subtle border for visual separation
        borderBottomColor: Colors.lightGrey,
    },
    itemImg: {
        width: 100,            // Slightly increased image size for better prominence
        height: 100,
        borderRadius: 16,      // Reduced radius for more balanced corners
        marginRight: 12,       // Adjusted for consistent spacing
    },
    itemInfo: {
        flex: 1,
        justifyContent: "space-between",
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: "uppercase",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.black,
    },
    sourceInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    sourceIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    sourceName: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.darkGrey,
        marginLeft: 6,
    },
});
