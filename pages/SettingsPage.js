import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function SettingsPage({ user }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('18');
  const [location, setLocation] = useState({ city: '', state: '', country: '' });
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [yearsLived, setYearsLived] = useState('');
  const [datesInTown, setDatesInTown] = useState({ start: '', end: '' });
  const [focusedInput, setFocusedInput] = useState(null);
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

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = () => {
    const userData = {
      name,
      age,
      location,
      bio,
      interests,
      phoneNumber,
      ...(user.type === 'local' ? { yearsLived } : { datesInTown }),
    };
    console.log(userData);
    // Here you would typically make a POST request to your backend
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        {/* Name */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'name' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
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
          style={[
            styles.input,
            focusedInput === 'location' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={location.city}
          onChangeText={city => setLocation({ ...location, city })}
          placeholder="City"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('location')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[
            styles.input,
            focusedInput === 'location' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={location.state}
          onChangeText={state => setLocation({ ...location, state })}
          placeholder="State"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('location')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[
            styles.input,
            focusedInput === 'location' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={location.country}
          onChangeText={country => setLocation({ ...location, country })}
          placeholder="Country"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('location')}
          onBlur={handleBlur}
        />

        {/* Bio */}
        <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'bio' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('bio')}
          onBlur={handleBlur}
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
            style={[
              styles.input,
              focusedInput === 'interests' ? { backgroundColor: '#B28645' } : {}
            ]}
            value={newInterest}
            onChangeText={setNewInterest}
            onSubmitEditing={handleAddInterest}
            placeholder="Add interest"
            placeholderTextColor="#DAA520" // Gold color for placeholder text
            onFocus={() => handleFocus('interests')}
            onBlur={handleBlur}
            returnKeyType="done"
          />
        </View>

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'phoneNumber' ? { backgroundColor: '#B28645' } : {}
          ]}
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
          placeholderTextColor="#DAA520" // Gold color for placeholder text
          onFocus={() => handleFocus('phoneNumber')}
          onBlur={handleBlur}
        />

        {/* Conditional fields */}
        {user.type === 'local' ? (
          <>
            <Text style={styles.label}>Years Lived:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'yearsLived' ? { backgroundColor: '#B28645' } : {}
              ]}
              value={yearsLived}
              keyboardType="numeric"
              onChangeText={setYearsLived}
              placeholder="Enter the number of years"
              placeholderTextColor="#DAA520" // Gold color for placeholder text
              onFocus={() => handleFocus('yearsLived')}
              onBlur={handleBlur}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Dates in Town:</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'datesInTown' ? { backgroundColor: '#B28645' } : {}
              ]}
              value={datesInTown.start}
              onChangeText={start => setDatesInTown({ ...datesInTown, start })}
              placeholder="Start date (YYYY-MM-DD)"
              placeholderTextColor="#DAA520" // Gold color for placeholder text
              onFocus={() => handleFocus('datesInTown')}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === 'datesInTown' ? { backgroundColor: '#B28645' } : {}
              ]}
              value={datesInTown.end}
              onChangeText={end => setDatesInTown({ ...datesInTown, end })}
              placeholder="End date (YYYY-MM-DD)"
              placeholderTextColor="#DAA520" // Gold color for placeholder text
              onFocus={() => handleFocus('datesInTown')}
              onBlur={handleBlur}
            />
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#800020', // Burgundy
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#DAA520', // Gold
    fontSize: 16,
    fontFamily: 'Arial', // Change to your preferred font
  },
  input: {
    borderWidth: 1,
    borderColor: '#DAA520', // Gold
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: 'white', // Burgundy
    fontSize: 14,
    fontFamily: 'Arial', // Change to your preferred font
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
    backgroundColor: '#DAA520', // Gold
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    marginRight: 5,
    color: '#800020', // Burgundy
    fontSize: 14,
    fontFamily: 'Arial', // Change to your preferred font
  },
  tagRemove: {
    color: '#fff',
    backgroundColor: '#800020', // Burgundy
    borderRadius: 10,
    padding: 2,
  },
  pickerTrigger: {
    borderWidth: 1,
    borderColor: '#DAA520', // Gold
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#B28645', // Light gold
  },
  pickerTriggerText: {
    fontSize: 16,
    color: '#800020', // Burgundy
    fontFamily: 'Arial', // Change to your preferred font
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
  buttonContainer: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#DAA520', // Gold
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#white', // Burgundy
    fontSize: 16,
    fontFamily: 'Arial', // Change to your preferred font
    fontWeight: 'bold',
  },
});

export default SettingsPage;
