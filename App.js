import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
          {/* Authentication Screens */}
          {/* Uncomment and add authentication screens as needed */}
          {/* <Stack.Screen name="Auth" component={AuthScreen} /> */}

          {/* Main App Screens */}
          {/* Uncomment and add more app screens as needed */}
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

          {/* List Screen */}
          <Stack.Screen name="Notes" component={ListScreen} options={{ headerShown: false }} />

          {/* Detail Screen */}
          <Stack.Screen name="Edit Note" component={DetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
