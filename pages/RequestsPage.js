import React from 'react';
import { View, Text } from 'react-native';

function RequestsPage({ user }) {
  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      {user.type === 'tourist' ? (
        <Text>You are viewing who you requested.</Text>
        // Add more tourist-specific content here
      ) : (
        <Text>You are viewing who requested you.</Text>
        // Add more local-specific content here
      )}
    </View>
  );
}

export default RequestsPage;
