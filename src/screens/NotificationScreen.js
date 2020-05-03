import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Linking } from 'react-native'
import api from '../api'
import { FlatList } from 'react-native-gesture-handler'


export default () => {

    const [notifications, setResults] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.fetchNotifications();
            setResults(res)
        }
        fetchData()
    }, [])

    return <View>
        <FlatList
            data={notifications}
            keyExtractor={item => Object.keys(item)[0]}
            renderItem={
                ({ item: dateObj }) => {
                    return Object.keys(dateObj).map(date => {
                        return dateObj[date].map(result => <View style={styles.itemView} key={result.link}>
                            <Text key={result.link}>{result.title}</Text>
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
