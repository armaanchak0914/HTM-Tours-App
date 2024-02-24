import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

function HomePage({ user }) {
  // Mock data for demonstration purposes
  const mockData = {
    locals: [
      {
        name: 'John Doe',
        age: 30,
        bio: 'Loves hiking and photography.',
        interests: ['Hiking', 'Photography'],
        yearsLived: 5,
        picture: 'https://via.placeholder.com/150',
      },
      {
        name: 'Jane Smith',
        age: 25,
        bio: 'Enjoys exploring new cultures and cuisines.',
        interests: ['Traveling', 'Cooking'],
        yearsLived: 3,
        picture: 'https://via.placeholder.com/150',
      },
      // Add more examples here
    ],
    tourists: [
      {
        name: 'Alice Johnson',
        age: 28,
        bio: 'Passionate about art and history.',
        interests: ['Art', 'History'],
        datesInTown: '2023-01-10 to 2023-01-20',
        picture: 'https://via.placeholder.com/150',
      },
      {
        name: 'Bob Brown',
        age: 32,
        bio: 'Adventure seeker and nature lover.',
        interests: ['Camping', 'Wildlife'],
        datesInTown: '2023-02-15 to 2023-02-25',
        picture: 'https://via.placeholder.com/150',
      },
      // Add more examples here
    ],
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.name}!</Text>
      <ScrollView>
        {user.type === 'tourist' ? (
          <View>
            <Text>You are viewing the tourist homepage.</Text>
            {mockData.locals.map((local, index) => (
              <View key={index} style={styles.item}>
                <Image source={{ uri: local.picture }} style={styles.image} />
                <Text>Name: {local.name}</Text>
                <Text>Age: {local.age}</Text>
                <Text>Bio: {local.bio}</Text>
                <Text>Interests: {local.interests.join(', ')}</Text>
                <Text>Years Lived: {local.yearsLived}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>You are viewing the local homepage.</Text>
            {mockData.tourists.map((tourist, index) => (
              <View key={index} style={styles.item}>
                <Image source={{ uri: tourist.picture }} style={styles.image} />
                <Text>Name: {tourist.name}</Text>
                <Text>Age: {tourist.age}</Text>
                <Text>Bio: {tourist.bio}</Text>
                <Text>Interests: {tourist.interests.join(', ')}</Text>
                <Text>Dates in Town: {tourist.datesInTown}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default HomePage;
