import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'


type Props = {}


const Page = (props: Props) => {

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isloading, setisLoading] = useState(true)

  useEffect(() => {
    getBreakingNews()
  }, [])



  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`

      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNews(response.data.results)
        setisLoading(false)
      }
    } catch (error: any) {
      console.log(`Error Message`, error.message)
    }
  }

  useEffect(() => {
    News()
  }, [])

  const News = async (category: string = "") => {
    try {

      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}`

      const response = await axios.get(URL)

      if (response && response.data) {
        setNews(response.data.results)
      }
    } catch (error: any) {
      console.log(`Error Message`, error.message)
    }
  }

  const onCatchange = (category: string) => {
    News(category)
  }

  return (
    <View style={[styles.container]} >
      <View style={styles.container}>
        <Header />
        <SearchBar />

        {isloading ? (
          <ActivityIndicator size={"large"} />
        ) : (

          <BreakingNews newsList={breakingNews} />
        )}

        <Categories onCatchange={onCatchange} />

        <NewsList NewsList={news} />

      </View>
    </View >

  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 10
  },
})