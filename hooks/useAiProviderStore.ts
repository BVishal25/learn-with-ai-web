import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_PROVIDER_ID } from '../data/providers';

const PROVIDER_SETTINGS_PREFIX = 'learn-with-ai-provider-settings-v1';
const SETTINGS_UPDATED_EVENT = 'learn-with-ai-provider-settings-updated';

interface AiProviderSettings {
    activeProviderId: string;
    apiKeys: Record<string, string>;
}

export const useAiProviderStore = (): [
    AiProviderSettings, 
    (providerId: string) => void,
    (providerId: string, key: string | null) => void,
    boolean
] => {
  const { user, sessionMode } = useAuth();
  const [settings, setSettings] = useState<AiProviderSettings>({
      activeProviderId: DEFAULT_PROVIDER_ID,
      apiKeys: {}
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const getStorageKey = useCallback(() => {
    if (sessionMode === 'user' && user) {
        return `${PROVIDER_SETTINGS_PREFIX}-${user.id}`;
    }
    if (sessionMode === 'guest') {
        return `${PROVIDER_SETTINGS_PREFIX}-guest`;
    }
    return null;
  }, [user, sessionMode]);

  const loadSettingsFromStorage = useCallback(() => {
    const storageKey = getStorageKey();
    const defaultSettings = { activeProviderId: DEFAULT_PROVIDER_ID, apiKeys: {} };
    if (storageKey) {
      try {
        const storedSettings = localStorage.getItem(storageKey);
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings);
          setSettings({
              activeProviderId: parsed.activeProviderId || DEFAULT_PROVIDER_ID,
              apiKeys: parsed.apiKeys || {}
          });
        } else {
            setSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Failed to load provider settings:', error);
        setSettings(defaultSettings);
      }
    } else {
      setSettings(defaultSettings);
    }
  }, [getStorageKey]);

  useEffect(() => {
    setIsLoaded(false);
    loadSettingsFromStorage();
    setIsLoaded(true);

    const handleSettingsUpdate = () => loadSettingsFromStorage();
    
    window.addEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdate);

    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, handleSettingsUpdate);
    };
  }, [loadSettingsFromStorage]);

  const updateStoredSettings = (newSettings: AiProviderSettings) => {
      const storageKey = getStorageKey();
      if (storageKey) {
          try {
              localStorage.setItem(storageKey, JSON.stringify(newSettings));
              window.dispatchEvent(new Event(SETTINGS_UPDATED_EVENT));
          } catch (error) {
              console.error('Failed to save provider settings:', error);
          }
      }
  };

  const setActiveProviderId = (providerId: string) => {
      setSettings(prev => {
          const newSettings = { ...prev, activeProviderId: providerId };
          updateStoredSettings(newSettings);
          return newSettings;
      });
  };

  const setApiKey = (providerId: string, key: string | null) => {
      setSettings(prev => {
          const newApiKeys = { ...prev.apiKeys };
          if (key && key.trim()) {
              newApiKeys[providerId] = key.trim();
          } else {
              delete newApiKeys[providerId];
          }
          const newSettings = { ...prev, apiKeys: newApiKeys };
          updateStoredSettings(newSettings);
          return newSettings;
      });
  };

  return [settings, setActiveProviderId, setApiKey, isLoaded];
};
