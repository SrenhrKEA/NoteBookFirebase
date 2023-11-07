import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../components/Styles';

export default function SignupScreen({ navigation }) {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    async function handleSignUp() {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsError(true);
            return;
        }

        setMessage('');
        setIsError(false);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('You have signed up successfully!');
            setIsError(false);
            navigation.goBack();
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                secureTextEntry
            />
            <Text style={isError ? styles.errorText : styles.messageText}>
                {message}
            </Text>
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

        </View>
    );
};
