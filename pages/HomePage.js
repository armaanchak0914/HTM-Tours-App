import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';

function HomePage({ user }) {
  // Mock data for demonstration purposes
  const [guides, setGuides] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/tour_guides/')
      .then(response => {
        setGuides(response.data);
        console.log(guides)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const mockData = {
    locals: guides,
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

  const handleRequest = (localName) => {
    console.log(`Request sent to ${localName}`);
    // Send request to the local
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
                {/* <Text>Interests: {local.interests.join(', ')}</Text> */}
                <Text>Years Lived: {local.years_lived}</Text>
                <Button
                  title="Request"
                  onPress={() => handleRequest(local.name)}
                  color="#007BFF"
                />
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
