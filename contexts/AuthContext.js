import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Context for authentication state
export const AuthContext = createContext();

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider component for AuthContext
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        // Subscribe to user on auth state changed
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (initializing) setInitializing(false);
        });

        // Unsubscribe on cleanup
        return unsubscribe;
    }, [initializing]);

    // Provide user and initializing state to children
    return (
        <AuthContext.Provider value={{ user, initializing }}>
            {!initializing && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;