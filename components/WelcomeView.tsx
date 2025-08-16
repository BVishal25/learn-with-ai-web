import React, { useEffect } from 'react';
import { BrainCircuitIcon } from './ui/icons';
import { useAuth } from '../contexts/AuthContext';

declare const google: any;

const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

const WelcomeView: React.FC = () => {
    const { isGsiInitialized, startGuestSession } = useAuth();
    const isClientIdMissing = !GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE';

    useEffect(() => {
        if (isGsiInitialized && !isClientIdMissing && document.getElementById('signInDiv')) {
            try {
                google.accounts.id.renderButton(
                    document.getElementById('signInDiv'),
                    { theme: 'filled_black', size: 'large', type: 'standard', text: 'signin_with', shape: 'rectangular', width: '300' }
                );
                 // Prompt for login automatically on this screen
                google.accounts.id.prompt();
            } catch (error) {
                console.error("Error rendering Google Sign-In button:", error);
            }
        }
    }, [isGsiInitialized, isClientIdMissing]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-brand-primary p-4">
            <div className="w-full max-w-md text-center bg-brand-secondary p-8 rounded-2xl border border-slate-700 shadow-2xl animate-fade-in">
                <BrainCircuitIcon className="h-16 w-16 text-brand-accent mx-auto mb-4" />
                <h1 className="text-4xl font-black text-white mb-2">Welcome to Learn (with) AI</h1>
                <p className="text-brand-muted mb-8">Choose how you'd like to start your journey.</p>
                
                {isClientIdMissing ? (
                     <div className="bg-yellow-900/50 text-yellow-200 p-4 rounded-lg text-left text-sm mb-6">
                        <p className="font-bold text-lg text-center mb-3">Google Sign-In Not Configured</p>
                        <p>To enable signing in, a Google Client ID needs to be configured. You can continue as a guest.</p>
                    </div>
                ) : (
                    isGsiInitialized ? (
                         <div id="signInDiv" className="flex justify-center mb-4"></div>
                    ) : (
                         <div className="h-[40px] mb-4 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
                        </div>
                    )
                )}

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-slate-600"></div>
                    <span className="flex-shrink mx-4 text-brand-muted text-sm">OR</span>
                    <div className="flex-grow border-t border-slate-600"></div>
                </div>

                <button
                    onClick={startGuestSession}
                    className="w-full max-w-[300px] mx-auto bg-brand-muted text-white font-bold py-2.5 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                    Continue as Guest
                </button>
                 <p className="text-xs text-brand-muted mt-3 max-w-xs mx-auto">
                    Guest progress is stored on this device only. Sign in to sync your progress (feature coming soon).
                </p>

            </div>
        </div>
    );
};

export default WelcomeView;

