import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import newsCategoryList from '@/constants/Categories'
import { Colors } from '@/constants/Colors'

type Props = {
    onCatchange: (category: string) => void,
}

const Categories = ({ onCatchange }: Props) => {

    const scrollRef = useRef<ScrollView>(null)
    const itemRef = useRef<TouchableOpacity[] | null[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index]
        setActiveIndex(index)

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true })
        })

    }

    return (
        <View >
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentWrapper}>
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity ref={(el) => (itemRef.current[index] = el)}
                        key={index}
                        style={[styles.item, activeIndex === index && styles.itemActive]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text style={[styles.itemText, activeIndex === index && styles.fontActive]} >{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
    },
    contentWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,

    }

    ,
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    }
    ,
    fontActive: {
        fontWeight: "600",
        color: Colors.white
    }

})