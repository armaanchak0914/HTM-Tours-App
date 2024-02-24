import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const tempUser = {
  name: "Test User",
  type: "tourist" // Change this to "local" to test as a local
};

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator user={tempUser} />
    </NavigationContainer>
  );
}