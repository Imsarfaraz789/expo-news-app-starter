import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.userImg} source={{ uri: "https://images.pexels.com/photos/6267567/pexels-photo-6267567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} />
                <View style={{ gap: 3 }}>
                    <Text style={styles.welcomeUser}>Welcome</Text>
                    <Text style={styles.userName}>Jhon Doe!</Text>
                </View>
            </View>
            <Ionicons name='notifications-outline' size={28} color={"black"} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    welcomeUser: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    userName: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.black
    }
})