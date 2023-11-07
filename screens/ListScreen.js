import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, Pressable, Modal, TextInput, Text } from 'react-native';
import { List, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../components/FirebaseConfigs";
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import styles from '../components/Styles';

export default function ListScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    if (user) {
      // Query notes that belong to the authenticated user
      const q = query(collection(db, "notes"), where("userId", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => a.title.localeCompare(b.title));

        setItems(fetchedItems);
      }, (error) => {
        console.error("Error fetching notes:", error);
      });

      // Unsubscribe from the Firestore query when the component unmounts
      return unsubscribe;
    }
  }, [user]);

  async function addNewItem() {
    if (!newItemText.trim()) {
      return;
    }

    try {
      const newNote = {
        title: newItemText,
        text: '',
        userId: user.uid,
      };

      await addDoc(collection(db, "notes"), newNote);
      setNewItemText('');
      setModalVisible(false);

    } catch (error) {
      console.error("Error adding new note:", error);
    }
  };

  async function deleteItem(itemId) {
    // Create a reference to the Firestore document
    const noteRef = doc(db, "notes", itemId);

    try {
      // Delete the document from Firestore
      await deleteDoc(noteRef);
      console.log("Note deleted successfully:", itemId);

      // Update local state to remove the note from the list
      setItems(prevItems => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      // Handle any errors in the deletion
      console.error("Error deleting note:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      console.log('User signed out!');
      navigation.replace('AuthScreen');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('DetailScreen', { item })}
    >
      <List.Item
        title={item.title}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete"
            onPress={() => deleteItem(item.id)}
          />
        )}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <IconButton
        icon="plus"
        size={24}
        style={styles.plusIcon}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter title"
            value={newItemText}
            onChangeText={(text) => setNewItemText(text)}
          />
          <Button onPress={addNewItem}>Add Note</Button>
          <Button onPress={() => setModalVisible(false)}>Cancel</Button>
        </View>
      </Modal>
    </View>
  );
}