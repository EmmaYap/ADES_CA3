import React from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import database from '@react-native-firebase/database';

export default function App() {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const [ImageSet, SetImage] = React.useState(null);
    const read = () => {
        Alert.alert('is here')
        console.log('here')
        database()
            .ref('images/')
            .once('value')
            .then(snapshot => {
                let values = [];
                snapshot.forEach((snapshot) => {
                    values.push(snapshot.val());
                    console.log('User data: ', snapshot);
                })
                image = values[getRandomInt(values.length)].url
                SetImage(image);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={read}>
                <Text style={styles.buttonText}> Read Storage</Text>
            </TouchableOpacity>
            <Image source={{ uri: ImageSet }} style={styles.imageBox} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#bbded6'
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageBox: {
        width: 300,
        height: 300
    }
});