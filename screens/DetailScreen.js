import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/FirebaseConfigs";
import styles from '../components/Styles';

export default function DetailScreen({ route }) {
  const navigation = useNavigation();
  const item = route.params ? route.params.item : undefined; // Ensure 'item' is not null
  const isNewNote = !item || !item.id; // Check if it's a new note

  const [editedTitle, setEditedTitle] = useState(item ? item.title : '');
  const [editedText, setEditedText] = useState(item ? item.text : '');

  async function saveNote() {
    const noteRef = doc(db, "notes", item.id);

    try {
      await setDoc(noteRef, {
        title: editedTitle,
        text: editedText
      }, { merge: true });
      console.log('Note updated successfully!');
      navigation.goBack(); // Return to the previous screen
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={editedTitle}
        onChangeText={setEditedTitle}
        placeholder="Note Title"
        autoFocus={!item} // Focus only when creating a new note
        style={styles.titleInput}
      />
      <TextInput
        value={editedText}
        onChangeText={setEditedText}
        placeholder="Note Text"
        style={styles.textInput}
        // multiline
        numberOfLines={4}
        keyboardType="default"
        returnKeyType="done"
        multiline={true}
        blurOnSubmit={true}
        onSubmitEditing={() => { Keyboard.dismiss() }}
      />
      <Pressable style={styles.submitButton} onPress={saveNote}>
        <Text style={styles.submitButtonText}>{isNewNote ? 'Add Note' : 'Save Changes'}</Text>
      </Pressable>
    </View>
  );
}
