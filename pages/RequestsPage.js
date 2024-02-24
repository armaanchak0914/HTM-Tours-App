import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RequestsPage({ user }) {
  // Initial mock data for demonstration purposes
  const [requests, setRequests] = useState({
    incoming: [
      { id: 1, name: 'Alice Johnson', status: 'pending', phoneNumber: '123-456-7890' },
      { id: 2, name: 'Bob Brown', status: 'pending', phoneNumber: '098-765-4321' },
    ],
    yourRequests: [
      { id: 1, name: 'John Doe', status: 'pending', phoneNumber: '555-123-4567' },
      { id: 2, name: 'Jane Smith', status: 'accepted', phoneNumber: '555-987-6543' },
    ],
  });

  const handleAccept = (requestId) => {
    updateRequestStatus(requestId, 'accepted', 'incoming');
  };

  const handleReject = (requestId) => {
    updateRequestStatus(requestId, 'rejected', 'incoming');
  };

  const updateRequestStatus = (requestId, newStatus, requestType) => {
    const updatedRequests = requests[requestType].map((request) => {
      if (request.id === requestId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setRequests({ ...requests, [requestType]: updatedRequests });
    // Update request status in the backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}!</Text>
      <View>
        <Text style={styles.sectionTitle}>Incoming Requests:</Text>
        {requests.incoming.map((request) => (
          <View key={request.id} style={styles.requestItem}>
            <Text style={styles.fieldName}>{request.name}</Text>
            {request.status === 'pending' ? (
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleAccept(request.id)}>
                  <Ionicons name="checkmark" size={20} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReject(request.id)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.status}>{request.status}</Text>
            )}
            {request.status === 'accepted' && <Text style={styles.fieldValue}>Phone: {request.phoneNumber}</Text>}
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.sectionTitle}>Your Requests:</Text>
        {requests.yourRequests.map((request) => (
          <View key={request.id} style={styles.requestItem}>
            <Text style={styles.fieldName}>{request.name} - {request.status}</Text>
            {request.status === 'accepted' && <Text style={styles.fieldValue}>Phone: {request.phoneNumber}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#800020', // Burgundy
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#DAA520', // Gold
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#DAA520', // Gold
      marginBottom: 10,
    },
    requestItem: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#DAA520', // Gold
      borderRadius: 10,
      backgroundColor: '#B28645', // Light gold
      padding: 10,
    },
    fieldName: {
      fontWeight: 'bold',
      color: '#800020', // Burgundy
      fontSize: 16,
      fontFamily: 'Arial', // Change to your preferred font
      marginBottom: 5,
    },
    fieldValue: {
      color: '#800020', // Burgundy
      fontSize: 14,
      fontFamily: 'Arial', // Change to your preferred font
      marginBottom: 5,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    status: {
      fontWeight: 'bold',
      color: '#800020', // Burgundy
      fontSize: 16,
      fontFamily: 'Arial', // Change to your preferred font
    },
  });
  
  
export default RequestsPage;
