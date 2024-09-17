import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native'

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
                <TextInput placeholder='Search' placeholderTextColor={Colors.lightGrey} autoCapitalize='none' style={styles.searchtxt} />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    searchBar: {
        backgroundColor: "#E4E4E4",
        padding: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20

    },
    searchtxt: {
        fontSize: 14,
        flex: 1,
        color: Colors.darkGrey
    }
})