import React, { useState } from 'react';
import { View, FlatList, Pressable, Modal, TextInput, StyleSheet } from 'react-native';
import { List, IconButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function ListScreen() {
  const navigation = useNavigation();
  
  // TODO: Hent listen fra firestore.
  const [items, setItems] = useState([
    { id: 1, title: 'Note 1', text: '' },
    { id: 2, title: 'Note 2', text: '' },
    { id: 3, title: 'Note 3', text: '' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newItemText, setNewItemText] = useState('');

  const addItem = () => {
    if (!newItemText.trim()) {
      return;
    }

    const newItem = { id: items.length + 1, title: newItemText, text: '' };
    setItems([...items, newItem]);
    setModalVisible(false);
    setNewItemText('');
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('Edit Note', { item })}
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
      <IconButton icon="plus" onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter title"
            value={newItemText}
            onChangeText={(text) => setNewItemText(text)}
          />
          <Button onPress={addItem}>Tilføj Note</Button>
          <Button onPress={() => setModalVisible(false)}>Annuller</Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ListScreen;
