import React, { useState, useEffect, createContext, useContext } from 'react';

// This is a global variable from the GSI script
declare const google: any;

interface AuthUser {
    id: string;
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoaded: boolean;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Read the Google Client ID from Vite's environment variables
const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const isClientIdConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE";
    const userStorageKey = 'learn-with-ai-user';

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
        setUser(newUser);
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem(userStorageKey); // Always remove user data from storage on sign out
        if (isClientIdConfigured && typeof google !== 'undefined') {
            // Disable one-tap login after a user explicitly signs out
            google.accounts.id.disableAutoSelect();
        }
    };
    
    useEffect(() => {
        // If the client ID is not configured, we cannot authenticate. The user state will remain null,
        // and the main App component will render the LoginView, which shows the configuration error.
        if (!isClientIdConfigured) {
            // Clear any potentially lingering user data from local storage (e.g., an old mock user)
            localStorage.removeItem(userStorageKey);
            setIsLoaded(true);
            return;
        }

        // Check for a persisted user session in localStorage from a previous successful sign-in.
        const storedUser = localStorage.getItem(userStorageKey);
        if (storedUser) {
             try {
                const parsedUser = JSON.parse(storedUser);
                // A simple validation to ensure it looks like a real user object from Google
                if (parsedUser && parsedUser.id && parsedUser.email) {
                    setUser(parsedUser);
                } else {
                    // Stored data is invalid or from a mock user, so clear it.
                    localStorage.removeItem(userStorageKey);
                }
            } catch(e) {
                 console.error("Failed to parse stored user, clearing storage.", e);
                 localStorage.removeItem(userStorageKey);
            }
        }

        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: true
            });

            // Prompt for login only if we didn't find a user in storage.
            // This prevents the one-tap prompt from showing up on every page load for a signed-in user.
            if (!localStorage.getItem(userStorageKey)) {
                google.accounts.id.prompt((notification: any) => {
                    if (notification.isNotDisplayed()) {
                        console.log('One-tap prompt was not displayed:', notification.getNotDisplayedReason());
                    } else if (notification.isSkippedMoment()) {
                        console.log('One-tap prompt was skipped:', notification.getSkippedReason());
                    } else if (notification.isDismissedMoment()) {
                         console.log('One-tap prompt was dismissed:', notification.getDismissedReason());
                    }
                });
            }
        }
        setIsLoaded(true);
    }, [isClientIdConfigured]);

    const value = { user, isLoaded, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};