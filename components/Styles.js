import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#5e92f3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    listItem: {
        backgroundColor: '#fff',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 5,
        elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    plusIcon: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#5e92f3',
        borderRadius: 50,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    modalContainer: {
        // Add any styles needed for modalContainer here.
    },
    textInput: {
        width: '100%',
        padding: 10,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    signOutButton: {
        marginRight: 10,
        backgroundColor: '#5e92f3',
        padding: 10,
        borderRadius: 5,
    },
    signOutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleInput: {
        fontSize: 18,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#5e92f3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
