import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function RequestsPage({ user }) {
  // Initial mock data for demonstration purposes
  const [requests, setRequests] = useState({
    local: [
      { id: 1, touristName: 'Alice Johnson', status: 'pending' },
      { id: 2, touristName: 'Bob Brown', status: 'pending' },
    ],
    tourist: [
      { id: 1, localName: 'John Doe', status: 'pending' },
      { id: 2, localName: 'Jane Smith', status: 'accepted' },
    ],
  });

  const handleAccept = (requestId) => {
    updateRequestStatus(requestId, 'accepted');
  };

  const handleReject = (requestId) => {
    updateRequestStatus(requestId, 'rejected');
  };

  const updateRequestStatus = (requestId, newStatus) => {
    const updatedRequests = requests.local.map((request) => {
      if (request.id === requestId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setRequests({ ...requests, local: updatedRequests });
    // Update request status in the backend
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.name}!</Text>
      {user.type === 'local' ? (
        <View>
          <Text>You are viewing who requested you.</Text>
          {requests.local.map((request) => (
            <View key={request.id} style={styles.requestItem}>
              <Text>{request.touristName}</Text>
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
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text>You are viewing who you requested.</Text>
          {requests.tourist.map((request) => (
            <View key={request.id} style={styles.requestItem}>
              <Text>{request.localName} - {request.status}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontWeight: 'bold',
  },
});

export default RequestsPage;
