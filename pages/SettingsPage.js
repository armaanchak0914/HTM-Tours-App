// SettingsPage.js
import React from 'react';
import { View, Text } from 'react-native';

function SettingsPage({ user }) {
    return (
      <View>
        <Text>Welcome, {user.name}!</Text>
        {user.type === 'tourist' ? (
          <Text>You are viewing the tourist settings page.</Text>
          // Add more tourist-specific content here
        ) : (
          <Text>You are viewing the local settings page.</Text>
          // Add more local-specific content here
        )}
      </View>
    );
  }
  

export default SettingsPage;
