import React, { useState, useEffect } from 'react';
import { THEMES, Theme } from '../data/themes';
import { useAuth } from '../contexts/AuthContext';
import { useAiProviderStore } from '../hooks/useAiProviderStore';
import { AI_PROVIDERS } from '../data/providers';

interface SettingsViewProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentTheme, onThemeChange }) => {
  const { user, signOut, sessionMode } = useAuth();
  const [settings, setActiveProviderId, setApiKey] = useAiProviderStore();
  
  const [localApiKey, setLocalApiKey] = useState(settings.apiKeys[settings.activeProviderId] || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const activeProvider = AI_PROVIDERS.find(p => p.id === settings.activeProviderId) || AI_PROVIDERS[0];
  
  useEffect(() => {
    // When the active provider changes, update the local API key input field
    setLocalApiKey(settings.apiKeys[settings.activeProviderId] || '');
    setSaveStatus('idle'); // Reset save status on provider change
  }, [settings.activeProviderId, settings.apiKeys]);

  const handleSaveApiKey = () => {
    setApiKey(settings.activeProviderId, localApiKey.trim() ? localApiKey.trim() : null);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };
  
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveProviderId(e.target.value);
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-8">
        Settings
      </h1>

       {/* API Key Management */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-brand-light">AI Provider & API Key</h2>
        <p className="text-brand-muted mb-6">
            To use the AI-powered features, select a provider and enter your API key. Currently, only Google Gemini is fully integrated.
        </p>

        <div className="mb-6">
          <label htmlFor="aiProvider" className="block text-sm font-medium text-brand-light mb-2">AI Provider</label>
          <select 
            id="aiProvider" 
            value={settings.activeProviderId}
            onChange={handleProviderChange}
            className="w-full p-3 bg-brand-primary border border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none"
          >
            {AI_PROVIDERS.map(provider => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
            <div className="flex-grow">
                 <label htmlFor="apiKey" className="block text-sm font-medium text-brand-light mb-2">Your {activeProvider.name} API Key</label>
                 <input
                    id="apiKey"
                    type="password"
                    value={localApiKey}
                    onChange={(e) => setLocalApiKey(e.target.value)}
                    placeholder={`Enter your ${activeProvider.name} API Key`}
                    className="w-full p-3 bg-brand-primary border border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
            </div>
            <button
              onClick={handleSaveApiKey}
              className={`w-full sm:w-auto px-6 py-3 font-bold rounded-lg transition-colors ${saveStatus === 'saved' ? 'bg-green-600 text-white' : 'bg-brand-accent text-brand-primary hover:bg-emerald-200'}`}
            >
              {saveStatus === 'saved' ? '✓ Saved' : 'Save Key'}
            </button>
        </div>
         <a href={activeProvider.keyUrl} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline mt-4 inline-block text-sm">
            Get your {activeProvider.name} API key &rarr;
        </a>
      </div>
      
      {/* Theme Selector */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-brand-light">Appearance</h2>
        <p className="text-brand-muted mb-6">Choose a theme to personalize your learning environment.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {THEMES.map(theme => (
            <div key={theme.name} className="flex flex-col items-center">
              <button
                onClick={() => onThemeChange(theme)}
                className={`w-full h-24 rounded-lg border-4 transition-all ${currentTheme.name === theme.name ? 'border-brand-accent' : 'border-transparent hover:border-slate-500'}`}
              >
                <div className="flex w-full h-full rounded-md overflow-hidden">
                    <div className="w-1/3 h-full" style={{ backgroundColor: `rgb(${theme.colors['--color-secondary']})` }}></div>
                    <div className="w-2/3 h-full flex flex-col">
                        <div className="h-1/3 w-full" style={{ backgroundColor: `rgb(${theme.colors['--color-primary']})` }}></div>
                        <div className="h-2/3 w-full" style={{ backgroundColor: `rgb(${theme.colors['--color-accent']})` }}></div>
                    </div>
                </div>
              </button>
              <p className={`mt-2 font-medium text-sm ${currentTheme.name === theme.name ? 'text-brand-accent' : 'text-brand-light'}`}>{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-brand-secondary p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-brand-light">Session</h2>
        {sessionMode === 'user' && user ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-brand-muted">
              Signed in as <strong>{user.email}</strong>
            </p>
            <button
              onClick={signOut}
              className="w-full sm:w-auto px-4 py-2 bg-brand-muted text-white font-bold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <p className="text-brand-muted">
              You are currently in <strong>Guest Mode</strong>.
            </p>
            <button
              onClick={signOut}
              className="w-full sm:w-auto px-4 py-2 bg-brand-accent text-brand-primary font-bold rounded-lg hover:bg-emerald-200 transition-colors"
            >
              Sign In or Switch Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;
