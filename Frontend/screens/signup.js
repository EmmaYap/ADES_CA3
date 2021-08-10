// import necessary modules
import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App({ navigation: { navigate } }) {


    const navigation = useNavigation(); // to use navigation
    const [Username, SetName] = React.useState(""); // username hook
    const [password, SetPassword] = React.useState(""); // password hook

    const host = 'https://ades-ca3-hosting.herokuapp.com' // backend host

    function SignUp() { // sign up
        if (Username.length < 8 || password.length < 8) { // if username or password length less than 8
            Alert.alert(`${Username} or ${password} is too short.`, `Min length is 8`) // notify user that username or password is too short
        }
        else {
            fetch(`${host}/signup?username=${Username}`, { // call backend api
                method: 'POST', // api method is POST
                headers: {
                    'Content-Type': 'application/json; charset=utf-8' // header type
                },
                body: JSON.stringify({
                    password: password // send password to backend throught the req.body
                })
            })
                .then(function (response) {

                    if (response.status == 201) { // if backend returns status 201
                        Alert.alert(`Account Created`, `Welcome ${Username} to DailyMemes`) // notify user on successful creation of account
                        navigate('Login'); // navigate back to login page
                    }
                    else if (response.status == 422) { // if backend response with status 422 
                        Alert.alert(`Account already exists`, `Choose a different username`) // means the username already have been taken
                    }
                    else { // else
                        Alert.alert('System Issue', `Error Code: ${response.status}`) // system error
                    }
                    SetName(""); // set name to empty string
                    SetPassword(""); // set password to empty string
                })
        }
    }



    return (
        // keyboard will disappear once user clicks anywhere other than the Textbox
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Text style={styles.Title}>DailyMemes</Text>
                {/* username */}
                <Text style={styles.label1}>Username : </Text>
                <TextInput placeholder="Enter Username here" style={styles.inputbox1} autoCompleteType="username"
                    onChangeText={text => SetName(text)} value={Username} minLength={8} />
                {/* password */}
                <Text style={styles.label2}>Password :</Text>
                <TextInput placeholder="Enter Password here" style={styles.inputbox2}
                    onChangeText={text => SetPassword(text)} value={password} secureTextEntry={true} minLength={8} />
                {/* button to signup */}
                <TouchableOpacity style={styles.LoginButton} onPress={SignUp}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                <Text style={styles.CreateAccText}>Already have an Account ?</Text>
                {/* button to go back to login page */}
                <TouchableOpacity style={styles.CreateAccButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.CreateAccLink}>Login instead</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // set container flex
        alignItems: 'center', // alignitems to center on x-axis
        backgroundColor: 'white' // background color
    },
    Title: {
        fontSize: 30,  // font size
        fontWeight: "bold", // font weight
        position: "absolute", // position absolute
        top: '30%', // 30% from top
        letterSpacing: 2, // spacing between letters
        textShadowRadius: 10, // size of shadow
        textShadowOffset: { width: 2, height: 5 }, // shadow offset
        textShadowColor: '#F9C802' // shadow color
    },
    label1: {
        fontSize: 20, // font size
        position: "absolute", // position absolute
        top: '40%', // 40% from top
        left: 30, // left by 30
        fontWeight: "bold" // font weight
    },
    inputbox1: {
        position: "absolute", // position absolute
        top: '40.2%', // 40.2% from top
        left: 145, // left by  145
        borderWidth: 1,  // border width
        width: 210,  // default width is 210
        paddingVertical: -10, // reduce padding vertical by 10
        textAlign: 'left', // text align to the left
        maxWidth: 210,  // max width
        color: 'black' // color black
    },
    label2: {
        fontSize: 20, // font size
        position: "absolute",  // position absolute
        top: '47%', // 47% from top
        left: 30,  // left by 30
        fontWeight: "bold" // font weight
    },
    inputbox2: {
        position: "absolute", // position absolute
        top: '47.2%', // 47.2% from top
        left: 145, // left by  145
        borderWidth: 1,  // border width
        width: 210,  // default width is 210
        paddingVertical: -10, // reduce padding vertical by 10
        textAlign: 'left', // text align to the left
        maxWidth: 210,  // max width
        color: 'black' // color black
    },
    LoginButton: {
        borderRadius: 5, // radius of border
        width: 150, // default width is 150
        height: 50,  // default height is 50
        backgroundColor: '#8ac6d1', // background color
        alignItems: 'center', // align items center on x-axis
        justifyContent: 'center', // align items center on y-axis
        position: "absolute", // position absolute
        top: '55%', // 55% from top
        width: 200  // default width is 200
    },
    buttonText: {
        color: 'white', // font color
        fontSize: 18, // font size
        fontWeight: 'bold' // font weight
    },
    CreateAccText: {
        position: "absolute", // position absolute
        top: '65%', // 65% from top
        fontSize: 18,  // font size
        left: 30  // left by 30
    },
    CreateAccLink: {
        fontSize: 18, // font size
        color: 'blue',  // font color
        textDecorationLine: "underline" // underline text

    },
    CreateAccButton: {
        position: "absolute", // position absolute
        top: '65%', // 65% from top
        left: 250  // left by 250
    }
});