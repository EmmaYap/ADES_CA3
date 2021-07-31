// import necessary modules
import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, View, TextInput } from 'react-native';

export default function App({ navigation: { navigate } }) {

  const [Username, SetName] = React.useState(""); // username hook
  const [Password, SetPassword] = React.useState(""); // password hook

  const host = 'https://ades-ca3-hosting.herokuapp.com' // backend host

  function SignUp(){ // sign up
    navigate('SignUp') // navigate to signup page
  }

  function Login() { // login
    fetch(`${host}/login?username=${Username}`, { // call backend api
      method: 'POST', // api method is POST
      body: JSON.stringify({
        password: Password // send password to backend through the body
      }),
      headers: {
        'Content-Type': 'application/json' // header type
      }
    }).then(function (response) {

      if (response.status == 201) {
        Alert.alert(`Login Succeeded`, `Welcome ${Username} to DailyMemes`) // notify user that they have login successfully
        navigate('Upload'); // navigate to Upload screen
      }
      else if (response.status == 401) {
        Alert.alert(`Login Failed`, `Invalid Username or Password was provided`) // notify user about inputting wrong values
      }
      else {
        Alert.alert('System Issue', `Error Code: ${response.status}`) // notify user that there is an issue
      }
      SetName(""); // set username to empty string
      SetPassword(""); // set password to empty string
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
          onChangeText={text => SetName(text)} value={Username} /> {/* username */}
        <Text style={styles.label2}>Password :</Text>
        <TextInput placeholder="Enter Password here" style={styles.inputbox2}
          onChangeText={text => SetPassword(text)} value={Password} secureTextEntry={true} /> {/* password */}
        <TouchableOpacity style={styles.LoginButton} onPress={Login}>  {/* Login */}
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.CreateAccText}>No Account ?</Text>
        <TouchableOpacity style={styles.CreateAccButton} onPress={SignUp}> {/* navigate to signup page */}
          <Text style={styles.CreateAccLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // set container flex
    alignItems: 'center', // alugn items center in the x-axis
    backgroundColor: 'white' // background color
  },
  Title: {
    fontSize: 30, // font size
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
    left: 145, // left by 145
    borderWidth: 1, // border width
    width: 210, // default width 210
    paddingVertical: -10, // reduce vertical padding by 10
    textAlign: 'left', // align text to left
    maxWidth: 210, // max width is 210
    color: 'black' // font color
  },
  label2: {
    fontSize: 20, // font size
    position: "absolute", // position absolute
    top: '47%', // 47% from top
    left: 30, // left by 30
    fontWeight: "bold" // font weight
  },
  inputbox2: {
    position: "absolute", // position absolute
    top: '47.2%', // 47.2% from top
    left: 145, // left by 145
    borderWidth: 1, // width of border
    width: 210, // default width 210
    paddingVertical: -10, // reduce padding vertically by 10
    textAlign: 'left', // align text to the left
    maxWidth: 210, // max width of input box
    color: 'black' // font color
  },
  LoginButton: {
    borderRadius: 5, // radius of border
    width: 150, // default widht 150
    height: 50, // default height 50
    backgroundColor: '#8ac6d1', // background color
    alignItems: 'center', // alignitems to center along x-axis
    justifyContent: 'center', // alignitems to center along y-axis
    position: "absolute", // position absolute
    top: '55%', // 55% from top
    width: 200 // default width 200
  },
  buttonText: {
    color: 'white', // font color
    fontSize: 18, // font size
    fontWeight: 'bold' // font weight
  },
  CreateAccText: {
    position: "absolute", // position absolute
    top: '65%', // 65% from top
    fontSize: 18, // font size
    left: 80 // left by 80
  },
  CreateAccLink: {
    fontSize: 18, // font size
    color: 'blue', // font color 
    textDecorationLine: "underline" /// underline text

  },
  CreateAccButton: {
    position: "absolute", // position absolute
    top: '65%', // 65% from top
    left: 200 // left by 200
  }
});