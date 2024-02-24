import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';

function HomePage({ user }) {
  const [guides, setGuides] = useState([]);
  // Implement logic that loads guides if user is tourist or tourists is user is guides.

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

  const handleRequest = (name) => {
    console.log(`Request sent to ${name}`);
    // Send request to the person
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
              <Text style={styles.fieldName}>Name:</Text>
              <Text style={styles.fieldValue}>{local.name}</Text>
              <Text style={styles.fieldName}>Age:</Text>
              <Text style={styles.fieldValue}>{local.age}</Text>
              <Text style={styles.fieldName}>Bio:</Text>
              <Text style={styles.fieldValue}>{local.bio}</Text>
              <Text style={styles.fieldName}>Interests:</Text>
              <Text style={styles.fieldValue}>{local.interests.join(', ')}</Text>
              <Text style={styles.fieldName}>Years Lived:</Text>
              <Text style={styles.fieldValue}>{local.yearsLived}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleRequest(local.name)}>
                  <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
              </View>
            </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>You are viewing the local homepage.</Text>
            {mockData.tourists.map((tourist, index) => (
  <View key={index} style={styles.item}>
    <Image source={{ uri: tourist.picture }} style={styles.image} />
    <Text style={styles.fieldName}>Name:</Text>
    <Text style={styles.fieldValue}>{tourist.name}</Text>
    <Text style={styles.fieldName}>Age:</Text>
    <Text style={styles.fieldValue}>{tourist.age}</Text>
    <Text style={styles.fieldName}>Bio:</Text>
    <Text style={styles.fieldValue}>{tourist.bio}</Text>
    <Text style={styles.fieldName}>Interests:</Text>
    <Text style={styles.fieldValue}>{tourist.interests.join(', ')}</Text>
    <Text style={styles.fieldName}>Dates in Town:</Text>
    <Text style={styles.fieldValue}>{tourist.datesInTown}</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => handleRequest(tourist.name)}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
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
      backgroundColor: '#800020', // Burnt Orange
    },
    item: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#DAA520', // Gold
      borderRadius: 10,
      backgroundColor: '#B28645', // Burgundy
      padding: 10,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    fieldName: {
      fontWeight: 'bold',
      color: '#800020', // Gold
      fontSize: 16,
      fontFamily: 'Arial', // Change to your preferred font
      marginBottom: 5,
    },
    fieldValue: {
      color: '#FFFFFF', // White
      fontSize: 14,
      fontFamily: 'Arial', // Change to your preferred font
      marginBottom: 5,
    },
    buttonContainer: {
      marginTop: 10,
      borderRadius: 20,
      overflow: 'hidden',
    },
    button: {
      fontWeight: 'bold',
      backgroundColor: '#DAA520', // Gold
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#800020', // Burgundy
      fontSize: 16,
      fontFamily: 'Arial', 
      fontWeight: 'bold',// Change to your preferred font
    },
  });
  
export default HomePage;
