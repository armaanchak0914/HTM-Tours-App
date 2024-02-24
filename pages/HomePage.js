// HomePage.js
import React from 'react';
import { View, Text } from 'react-native';

function HomePage({ user }) {
  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      {user.type === 'tourist' ? (
        <Text>You are viewing the tourist homepage.</Text>
        // Add more tourist-specific content here
      ) : (
        <Text>You are viewing the local homepage.</Text>
        // Add more local-specific content here
      )}
    </View>
  );
}

export default HomePage;
