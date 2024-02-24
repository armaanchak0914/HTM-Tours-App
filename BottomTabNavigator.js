// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ user }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {() => <HomePage user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => <SettingsPage user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
