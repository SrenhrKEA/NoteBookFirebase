import React, { useState } from 'react';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../components/config"
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import this hook

function DetailScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation(); // Use the navigation hook

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingText, setEditingText] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedText, setEditedText] = useState(item.text);

  const startEditingTitle = () => {
    setEditingTitle(true);
  };

  const startEditingText = () => {
    setEditingText(true);
  };

  const saveTitle = () => {
    setEditingTitle(editedTitle);
    // Implement logic to save the edited title here
  };

  const saveText = () => {
    setEditingText(editedText);
    // Implement logic to save the edited text here
  };

  function create() {
    // Submit data
    addDoc(collection(db, "notes"), {
      title: editedTitle,
      text: editedText,
    }).then(() => {
      // Submit was successfully!)
      console.log('data submitted');
    }).catch((error) => {
      //Submit failed
      console.log(error)
    });
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={startEditingTitle}>
        {editingTitle ? (
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            onBlur={saveTitle}
            autoFocus
            style={styles.textBoxes}
          />
        ) : (
          <Text>Title: {item.title}</Text>
        )}
      </Pressable>
      
      <Pressable onPress={startEditingText}>
        {editingText ? (
          <TextInput
            value={editedText}
            onChangeText={setEditedText}
            onBlur={saveText}
            autoFocus
            style={styles.textBoxes}
          />
        ) : (
          <Text>Text: {item.text}</Text>
        )}
      </Pressable>

      <Pressable title="Submit Data" onPress={() => {create(); navigation.goBack();}} />
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

export default DetailScreen;
