// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import UploadScreen from './screens/imageUpload';
// import GetImage from './screens/GetImage';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       {/* Stack navigator initial page is Home and disable header */}
//       <Stack.Navigator initialRouteName="Upload" screenOptions={{
//         headerShown: false
//       }}>
//         {/* Screens in the stack navigator */}
//         <Stack.Screen name="Upload" component={UploadScreen} />
//         <Stack.Screen name="ReadStorage" component={GetImage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React from "react";
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, Alert, View, TextInput } from 'react-native';

export default function App() {



  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.Title}>DailyMemes</Text>
        <Text style={styles.label1}>Username :</Text>
        <TextInput placeholder= "Enter Username here" style= {styles.inputbox1} autoCompleteType="username"></TextInput>
        <Text style={styles.label2}>Password :</Text>
        <TextInput placeholder= "Enter Password here" style= {styles.inputbox2}></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Title: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: '30%',
    letterSpacing: 2,
    textShadowRadius: 10,
    textShadowOffset: {width: 2, height: 5},
    textShadowColor: '#F9C802'
  },
  label1: {
    fontSize: 20,
    position: "absolute",
    top: '40%',
    left: 50,
    fontWeight: "bold"
  },
  inputbox1:{
    position: "absolute",
    top: '40.2%',
    left: 160,
    borderWidth: 1,
    width: 210,
    paddingVertical: -10,
    textAlign: 'left',
    maxWidth: 210
  },
  label2:{
    fontSize: 20,
    position: "absolute",
    top: '47%',
    left: 50,
    fontWeight: "bold"
  },
  inputbox2:{
    position: "absolute",
    top: '47.2%',
    left: 160,
    borderWidth: 1,
    width: 210,
    paddingVertical: -10,
    textAlign: 'left',
    maxWidth: 210
  },
});