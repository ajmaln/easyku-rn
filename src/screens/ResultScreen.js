import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Linking } from 'react-native'
import api from '../api'
import { FlatList } from 'react-native-gesture-handler'


export default ({ navigation }) => {

    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.fetchResults();
            setResults(res)
        }
        fetchData()
    }, [])

    console.log(results.length)

    return <View>
        <FlatList
            data={results}
            keyExtractor={item => Object.keys(item)[0]}
            renderItem={
                ({ item: dateObj }) => {
                    return Object.keys(dateObj).map(date => {
                        return dateObj[date].map(result => <View style={styles.itemView} key={result.link}>
                            <Text >{result.title}</Text>
                            <Button title="Download" onPress={() => Linking.openURL(result.link)} />
                        </View>)
                    })
                }
            }
        />
    </View>
}

const styles = StyleSheet.create({
    itemView: {
        padding: 10
    },
    button: {
        margin: 5
    }
})
