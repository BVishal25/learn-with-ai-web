import React, { useEffect } from 'react';
import { BrainCircuitIcon } from './ui/icons';
import { useAuth } from '../contexts/AuthContext';

// This is a global variable from the GSI script
declare const google: any;

// Read the Google Client ID from Vite's environment variables to check if it's configured
const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

const LoginView: React.FC = () => {
    const { isGsiInitialized } = useAuth();
    const isClientIdMissing = !GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE';

    useEffect(() => {
        // The renderButton function should only be called once GSI is initialized and the element exists.
        if (isGsiInitialized && !isClientIdMissing && document.getElementById('signInDiv')) {
            try {
                google.accounts.id.renderButton(
                    document.getElementById('signInDiv'),
                    { theme: 'filled_black', size: 'large', type: 'standard', text: 'signin_with', shape: 'rectangular', width: '300' }
                );
            } catch (error) {
                console.error("Error rendering Google Sign-In button:", error);
            }
        }
    }, [isGsiInitialized, isClientIdMissing]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-brand-primary p-4">
            <div className="w-full max-w-md text-center bg-brand-secondary p-8 rounded-2xl border border-slate-700 shadow-2xl">
                <BrainCircuitIcon className="h-16 w-16 text-brand-accent mx-auto mb-4" />
                <h1 className="text-4xl font-black text-white mb-2">Welcome to Learn (with) AI</h1>
                <p className="text-brand-muted mb-8">Sign in to begin your journey into the world of AI.</p>
                
                {isClientIdMissing ? (
                     <div className="bg-yellow-900/50 text-yellow-200 p-4 rounded-lg text-left text-sm">
                        <p className="font-bold text-lg text-center mb-3">Google Sign-In Not Configured</p>
                        <p className="mb-2">To enable Google Sign-In, the application owner needs to provide a Google Client ID as an environment variable (`VITE_GOOGLE_CLIENT_ID`).</p>
                        <p className="mt-2">If running locally, you can create a <code className="bg-slate-700 px-1 py-0.5 rounded">.env.local</code> file with the variable.</p>
                    </div>
                ) : (
                    isGsiInitialized ? (
                         <div id="signInDiv" className="flex justify-center"></div>
                    ) : (
                         <div className="bg-yellow-900/50 text-yellow-300 p-4 rounded-lg">
                            <p className="font-bold">Loading...</p>
                            <p className="text-sm">Initializing Google Sign-In services.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default LoginView;
