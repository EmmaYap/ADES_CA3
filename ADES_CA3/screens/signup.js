import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App({ navigation: { navigate } }) {


    const navigation = useNavigation();
    const [Username, SetName] = React.useState("");
    const [password, SetPassword] = React.useState("");

    const host = 'https://ades-ca3-hosting.herokuapp.com'

    function SignUp() {
        fetch(`${host}/signup?username=${Username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                password: password
            })
        })
            .then(function (response) {

                if (response.status == 201) {
                    Alert.alert(`Account Created`, `Welcome ${Username} to DailyMemes`)
                    navigate('Login');
                }
                else if (response.status == 422) {
                    Alert.alert(`Account already exists`, `Choose a different username`)
                }
                else {
                    Alert.alert('System Issue', `Error Code: ${response.status}\n ${response.url}`)
                    console.log(response.status)
                    console.log(response);
                }
            })
    }


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss(); // keyboard will disappear once user clicks anywhere other than the Textbox
        }}>
            <View style={styles.container}>
                <Text style={styles.Title}>DailyMemes</Text>
                <Text style={styles.label1}>Username : </Text>
                <TextInput placeholder="Enter Username here" style={styles.inputbox1} autoCompleteType="username"
                    onChangeText={text => SetName(text)} value={Username} />
                <Text style={styles.label2}>Password :</Text>
                <TextInput placeholder="Enter Password here" style={styles.inputbox2}
                    onChangeText={text => SetPassword(text)} value={password} />
                <TouchableOpacity style={styles.LoginButton} onPress={SignUp}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                <Text style={styles.CreateAccText}>Already have an Account ?</Text>
                <TouchableOpacity style={styles.CreateAccButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.CreateAccLink}>Login instead</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold",
        position: "absolute",
        top: '30%',
        letterSpacing: 2,
        textShadowRadius: 10,
        textShadowOffset: { width: 2, height: 5 },
        textShadowColor: '#F9C802'
    },
    label1: {
        fontSize: 20,
        position: "absolute",
        top: '40%',
        left: 30,
        fontWeight: "bold"
    },
    inputbox1: {
        position: "absolute",
        top: '40.2%',
        left: 145,
        borderWidth: 1,
        width: 210,
        paddingVertical: -10,
        textAlign: 'left',
        maxWidth: 210
    },
    label2: {
        fontSize: 20,
        position: "absolute",
        top: '47%',
        left: 30,
        fontWeight: "bold"
    },
    inputbox2: {
        position: "absolute",
        top: '47.2%',
        left: 145,
        borderWidth: 1,
        width: 210,
        paddingVertical: -10,
        textAlign: 'left',
        maxWidth: 210
    },
    LoginButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: '55%',
        width: 200
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    CreateAccText: {
        position: "absolute",
        top: '65%',
        fontSize: 18,
        left: 30
    },
    CreateAccLink: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: "underline"

    },
    CreateAccButton: {
        position: "absolute",
        top: '65%',
        left: 250
    }
});