import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function SettingsPage({ userType }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('18');
  const [location, setLocation] = useState({ city: '', state: '', country: '' });
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [yearsLived, setYearsLived] = useState('');
  const [datesInTown, setDatesInTown] = useState({ start: '', end: '' });

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest)) {
      setInterests(prevInterests => [...prevInterests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(prevInterests => prevInterests.filter(i => i !== interest));
  };

  const handleAgeChange = (itemValue) => {
    setAge(itemValue);
    setIsPickerVisible(false);
  };

  const handleSubmit = () => {
    const userData = {
      name,
      age,
      location,
      bio,
      interests,
      phoneNumber,
      ...(userType === 'local' ? { yearsLived } : { datesInTown }),
    };
    console.log(userData);
    // Here you would typically make a POST request to your backend
  };

  return (
    <View style={styles.container}>
      {/* Name */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      {/* Age Picker */}
      <Text style={styles.label}>Age:</Text>
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setIsPickerVisible(true)}
      >
        <Text style={styles.pickerTriggerText}>
          Age: {age}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={age}
              onValueChange={handleAgeChange}
              style={styles.picker}
            >
              {Array.from({ length: 83 }, (_, i) => 18 + i).map((value) => (
                <Picker.Item key={value} label={`${value}`} value={value} />
              ))}
            </Picker>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Location */}
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location.city}
        onChangeText={city => setLocation({ ...location, city })}
        placeholder="City"
      />
      <TextInput
        style={styles.input}
        value={location.state}
        onChangeText={state => setLocation({ ...location, state })}
        placeholder="State"
      />
      <TextInput
        style={styles.input}
        value={location.country}
        onChangeText={country => setLocation({ ...location, country })}
        placeholder="Country"
      />

      {/* Bio */}
      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Enter your bio"
      />

      {/* Interests with tag functionality */}
      <Text style={styles.label}>Interests:</Text>
      <View style={styles.interestsContainer}>
        {interests.map((interest, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{interest}</Text>
            <Text
              style={styles.tagRemove}
              onPress={() => handleRemoveInterest(interest)}
            >
              ×
            </Text>
          </View>
        ))}
        <TextInput
          style={styles.input}
          value={newInterest}
          onChangeText={setNewInterest}
          onSubmitEditing={handleAddInterest}
          placeholder="Add interest"
          returnKeyType="done"
        />
      </View>

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
      />

      {/* Conditional fields */}
      {userType === 'local' ? (
        <>
          <Text style={styles.label}>Years Lived:</Text>
          <TextInput
            style={styles.input}
            value={yearsLived}
            keyboardType="numeric"
            onChangeText={setYearsLived}
            placeholder="Enter the number of years"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Dates in Town:</Text>
          <TextInput
            style={styles.input}
            value={datesInTown.start}
            onChangeText={start => setDatesInTown({ ...datesInTown, start })}
            placeholder="Start date (YYYY-MM-DD)"
          />
          <TextInput
            style={styles.input}
            value={datesInTown.end}
            onChangeText={end => setDatesInTown({ ...datesInTown, end })}
            placeholder="End date (YYYY-MM-DD)"
          />
        </>
      )}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 10,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      borderRadius: 20,
      padding: 5,
      marginRight: 5,
      marginTop: 5,
    },
    tagText: {
      marginRight: 5,
    },
    tagRemove: {
      color: '#fff',
      backgroundColor: '#f00',
      borderRadius: 10,
      padding: 2,
    },
    pickerTrigger: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    pickerTriggerText: {
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
    picker: {
      width: '100%',
    },
  });
  

export default SettingsPage;
