import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// This is a global variable from the GSI script
declare const google: any;

interface AuthUser {
    id: string;
    name: string;
    email: string;
    picture: string;
}

type SessionMode = 'none' | 'guest' | 'user';

interface AuthContextType {
    user: AuthUser | null;
    sessionMode: SessionMode;
    isLoaded: boolean;
    signOut: () => void;
    startGuestSession: () => void;
    isGsiInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Read the Google Client ID from Vite's environment variables
const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [sessionMode, setSessionMode] = useState<SessionMode>('none');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isGsiScriptLoaded, setIsGsiScriptLoaded] = useState(false);
    const [isGsiInitialized, setIsGsiInitialized] = useState(false);
    
    const isClientIdConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE";
    const userStorageKey = 'learn-with-ai-user-v2';
    const sessionModeKey = 'learn-with-ai-session-mode-v2';

    // 1. Restore session on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem(userStorageKey);
        const storedSessionMode = localStorage.getItem(sessionModeKey) as SessionMode | null;

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setSessionMode('user');
            } catch {
                localStorage.removeItem(userStorageKey);
                localStorage.removeItem(sessionModeKey);
                setSessionMode('none');
            }
        } else if (storedSessionMode === 'guest') {
            setSessionMode('guest');
        } else {
            setSessionMode('none');
        }
        setIsLoaded(true);
    }, []);

    // 2. Load GSI script if client ID is configured
    useEffect(() => {
        if (!isClientIdConfigured) {
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => setIsGsiScriptLoaded(true);
        script.onerror = () => console.error('Google GSI script failed to load.');
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector(`script[src="${script.src}"]`);
            if (existingScript) document.body.removeChild(existingScript);
        };
    }, [isClientIdConfigured]);
    
    const handleCredentialResponse = (response: any) => {
        const id_token = response.credential;
        // In a real production app, this token should be sent to a backend server for verification.
        // For this frontend-only app, we'll decode it directly, which is suitable for non-sensitive data.
        const decodedToken: any = JSON.parse(atob(id_token.split('.')[1]));
        const newUser: AuthUser = {
            id: decodedToken.sub, // The user's unique Google ID
            name: decodedToken.name,
            email: decodedToken.email,
            picture: decodedToken.picture,
        };
        localStorage.setItem(userStorageKey, JSON.stringify(newUser));
        localStorage.setItem(sessionModeKey, 'user');
        setUser(newUser);
        setSessionMode('user');
    };

    const signOut = useCallback(() => {
        setUser(null);
        setSessionMode('none');
        localStorage.removeItem(userStorageKey);
        localStorage.removeItem(sessionModeKey);
        if (isGsiInitialized && typeof google !== 'undefined') {
            // Disable one-tap login after a user explicitly signs out
            google.accounts.id.disableAutoSelect();
        }
    }, [isGsiInitialized]);
    
    const startGuestSession = useCallback(() => {
        setSessionMode('guest');
        localStorage.setItem(sessionModeKey, 'guest');
        // Make sure no user data is lingering
        localStorage.removeItem(userStorageKey);
        setUser(null);
    }, []);

    // 3. Initialize GSI when script is loaded
    useEffect(() => {
        if (isGsiScriptLoaded && typeof google !== 'undefined' && google.accounts && !isGsiInitialized) {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: true
            });
            setIsGsiInitialized(true);
        }
    }, [isGsiScriptLoaded, isGsiInitialized]);


    const value = { user, sessionMode, isLoaded, signOut, startGuestSession, isGsiInitialized };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
