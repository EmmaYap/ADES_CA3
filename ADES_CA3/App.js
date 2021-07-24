import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UploadScreen from './screens/imageUpload';
import GetImage from './screens/GetImage';
import Login from './screens/login'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Stack navigator initial page is Home and disable header */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        {/* Screens in the stack navigator */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="ReadStorage" component={GetImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

