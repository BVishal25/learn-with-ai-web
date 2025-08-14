

import React, { useState, useEffect } from 'react';
import DashboardView from './components/DashboardView';
import LearnView from './components/LearnView';
import AIVentureGame from './components/AIVentureGame';
import SettingsView from './components/SettingsView';
import NotesView from './components/NotesView';
import PomodoroTimer from './components/PomodoroTimer';
import LoginView from './components/LoginView';
import AIUpdatesView from './components/AIUpdatesView';
import { THEMES, Theme } from './data/themes';
import { BookOpenIcon, LayoutDashboardIcon, GameControllerIcon, Cog6ToothIcon, BrainCircuitIcon, PencilIcon as NotesIcon, ClockIcon, Bars3Icon, SparklesIcon, XMarkIcon } from './components/ui/icons';
import { useAuth } from './contexts/AuthContext';
import { useAiProviderStore } from './hooks/useAiProviderStore';
import { MicroLesson } from './types';
import { AI_PROVIDERS } from './data/providers';

const NavItem: React.FC<{
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isExpanded: boolean;
}> = ({ icon: Icon, label, isActive, onClick, isExpanded }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
            isActive ? 'bg-brand-accent text-brand-primary font-semibold' : 'hover:bg-brand-secondary text-brand-light'
        } ${isExpanded ? 'justify-start' : 'justify-center'}`}
        title={isExpanded ? '' : label}
    >
        <Icon className="h-6 w-6 shrink-0" />
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto ml-3' : 'w-0'}`}>
            <span className="font-medium whitespace-nowrap">{label}</span>
        </div>
    </button>
);


type View = 'dashboard' | 'learn' | 'game' | 'notes' | 'ai-updates' | 'settings';

const ApiKeyBanner: React.FC<{ onNav: () => void, providerId: string }> = ({ onNav, providerId }) => {
  const provider = AI_PROVIDERS.find(p => p.id === providerId) || AI_PROVIDERS[0];
  return (
    <div className="bg-yellow-500 text-black p-2 text-center text-sm font-semibold flex-shrink-0">
      Your {provider.name} API Key is not set. AI features are disabled. 
      <button onClick={onNav} className="underline font-bold ml-2 hover:text-yellow-800">
        Go to Settings to add it.
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedThemeName = localStorage.getItem('learn-with-ai-theme');
    return THEMES.find(t => t.name === savedThemeName) || THEMES[0];
  });
  
  // Sidebar State
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Check for desktop view to disable hover on mobile
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768); // 768px is Tailwind's 'md' breakpoint

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktopView(desktop);
      if (!desktop) {
        // Ensure sidebar doesn't stay in a desktop-only state on resize
        setIsSidebarHovered(false);
        setIsSidebarPinned(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { user, isLoaded: authIsLoaded } = useAuth();
  const [settings, _, __, providerSettingsAreLoaded] = useAiProviderStore();
  const [selectedMicroLesson, setSelectedMicroLesson] = useState<MicroLesson | null>(null);
  
  // Pomodoro State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // in seconds
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [isPomodoroVisible, setIsPomodoroVisible] = useState(false);
  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);

  const isSidebarExpanded = (isSidebarPinned || isSidebarHovered) && isDesktopView;
  const isApiKeySetForProvider = settings.apiKeys[settings.activeProviderId];

  const applyTheme = (themeToApply: Theme) => {
    const root = document.documentElement;
    Object.entries(themeToApply.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };
  
  useEffect(() => {
    const darkTheme = THEMES.find(t => t.name === 'Deep Space')!;
    const lightTheme = THEMES.find(t => t.name === 'Daylight')!;
    const systemThemeName = 'System';
    const storageKey = 'learn-with-ai-theme';

    localStorage.setItem(storageKey, theme.name);

    if (theme.name === systemThemeName) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
        applyTheme(e.matches ? darkTheme : lightTheme);
      };
      
      handleSystemThemeChange(mediaQuery);
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  // --- Pomodoro Timer Logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(t => t - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPomodoroActive, pomodoroTime]);

  useEffect(() => {
    if (pomodoroTime === 0 && isPomodoroActive) {
      setIsPomodoroActive(false);
      setIsBreakModalVisible(true);
      // Optionally play a sound here
    }
  }, [pomodoroTime, isPomodoroActive]);

  const handleToggleTimer = () => {
    setIsPomodoroActive(prev => {
      const nowActive = !prev;
      if (nowActive && pomodoroTime > 0) { // Only autohide if starting
        // Autohide the timer component 3 seconds after starting
        setTimeout(() => setIsPomodoroVisible(false), 3000);
      }
      return nowActive;
    });
  };

  const handleResetTimer = () => {
    setIsPomodoroActive(false);
    setPomodoroTime(25 * 60);
  };
  
  const handleAcknowledgeRest = () => {
    setIsBreakModalVisible(false);
    handleResetTimer();
  };
  // --- End Pomodoro Timer Logic ---


  const handleNavClick = (view: View) => {
    if (view === 'learn') {
      setSelectedMicroLesson(null);
    }
    setActiveView(view);
    setIsMobileSidebarOpen(false); // Close mobile sidebar on navigation
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={(view) => handleNavClick(view as View)} />;
      case 'learn':
        return <LearnView selectedMicroLesson={selectedMicroLesson} setSelectedMicroLesson={setSelectedMicroLesson} />;
      case 'game':
        return <AIVentureGame />;
      case 'notes':
        return <NotesView />;
      case 'ai-updates':
        return <AIUpdatesView />;
      case 'settings':
        return <SettingsView currentTheme={theme} onThemeChange={setTheme} />;
      default:
        return <DashboardView onNavigate={(view) => handleNavClick(view as View)} />;
    }
  };

  const isLoaded = authIsLoaded && providerSettingsAreLoaded;

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="h-screen flex bg-brand-primary font-sans text-brand-light">
         {/* Overlay for mobile sidebar */}
        {isMobileSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/60 z-30 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
                aria-hidden="true"
            ></div>
        )}

        {/* Sidebar */}
        <nav 
          className={`fixed inset-y-0 left-0 bg-brand-primary border-r border-slate-800 p-3 z-40 flex flex-col transition-all duration-300 md:static overflow-x-hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isSidebarExpanded || isMobileSidebarOpen ? 'w-64' : 'w-20'}`}
          onMouseEnter={isDesktopView ? () => setIsSidebarHovered(true) : undefined}
          onMouseLeave={isDesktopView ? () => setIsSidebarHovered(false) : undefined}
        >
          <div className="flex-grow">
              <div className="flex items-center mb-10 h-10">
                {/* Desktop Header */}
                <div className={`hidden md:flex w-full items-center ${isSidebarExpanded ? 'justify-start' : 'justify-center'}`}>
                  <button onClick={() => setIsSidebarPinned(!isSidebarPinned)} className="p-2 text-brand-muted hover:text-white">
                    <Bars3Icon className="h-6 w-6" />
                  </button>
                  <div className={`flex items-center space-x-2 overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'w-auto ml-2' : 'w-0'}`}>
                    <BrainCircuitIcon className="h-8 w-8 text-brand-accent flex-shrink-0" />
                    <h1 className="text-xl font-black text-brand-light whitespace-nowrap">
                      Learn <span className="text-brand-muted text-lg">(with)</span> AI
                    </h1>
                  </div>
                </div>
                {/* Mobile Header */}
                <div className="flex md:hidden w-full items-center justify-between">
                   <div className="flex items-center space-x-2 overflow-hidden">
                        <BrainCircuitIcon className="h-8 w-8 text-brand-accent flex-shrink-0" />
                        <h1 className="text-xl font-black text-brand-light whitespace-nowrap">
                        Learn <span className="text-brand-muted text-lg">(with)</span> AI
                        </h1>
                    </div>
                    <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-brand-muted hover:text-white">
                        <XMarkIcon className="h-6 w-6"/>
                    </button>
                </div>
              </div>
              <div className="space-y-2">
                  <NavItem
                      icon={LayoutDashboardIcon}
                      label="Dashboard"
                      isActive={activeView === 'dashboard'}
                      onClick={() => handleNavClick('dashboard')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
                  <NavItem
                      icon={BookOpenIcon}
                      label="Learn"
                      isActive={activeView === 'learn'}
                      onClick={() => handleNavClick('learn')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
                   <NavItem
                      icon={NotesIcon}
                      label="Notes"
                      isActive={activeView === 'notes'}
                      onClick={() => handleNavClick('notes')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
                   <NavItem
                      icon={SparklesIcon}
                      label="AI Updates"
                      isActive={activeView === 'ai-updates'}
                      onClick={() => handleNavClick('ai-updates')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
                  <NavItem
                      icon={GameControllerIcon}
                      label="AI Venture"
                      isActive={activeView === 'game'}
                      onClick={() => handleNavClick('game')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
                  <NavItem
                      icon={Cog6ToothIcon}
                      label="Settings"
                      isActive={activeView === 'settings'}
                      onClick={() => handleNavClick('settings')}
                      isExpanded={isSidebarExpanded || isMobileSidebarOpen}
                  />
              </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-brand-primary flex flex-col relative overflow-hidden">
          {!isApiKeySetForProvider && <ApiKeyBanner onNav={() => handleNavClick('settings')} providerId={settings.activeProviderId} />}
          
           <header className="flex-shrink-0 flex justify-between items-center p-4 border-b border-slate-800">
                <button 
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="p-1 text-brand-muted hover:text-white md:hidden"
                  aria-label="Open menu"
                >
                    <Bars3Icon className="h-6 w-6"/>
                </button>
                <div className="flex-grow"></div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsPomodoroVisible(prev => !prev)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-secondary border border-slate-700 hover:bg-slate-700"
                        aria-label="Toggle Focus Session Timer"
                    >
                        <ClockIcon className="h-5 w-5 text-brand-accent" />
                        <span className="hidden sm:inline">Focus Session</span>
                    </button>
                </div>
            </header>

            {isPomodoroVisible && (
                <div className="absolute top-20 right-4 z-50">
                    <PomodoroTimer 
                      timeInSeconds={pomodoroTime}
                      isActive={isPomodoroActive}
                      onToggle={handleToggleTimer}
                      onReset={handleResetTimer}
                      onClose={() => setIsPomodoroVisible(false)} 
                    />
                </div>
            )}
            
            {isBreakModalVisible && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" role="dialog">
                    <div className="bg-brand-secondary p-8 rounded-xl border border-slate-700 text-center max-w-sm mx-4">
                        <h2 className="text-2xl font-bold text-brand-accent mb-4">Time's Up!</h2>
                        <p className="text-brand-light mb-6">
                            Please rest for 5 minutes. Your health is important as much as your learning!
                        </p>
                        <button
                            onClick={handleAcknowledgeRest}
                            className="w-full bg-brand-accent text-brand-primary font-bold py-3 rounded-lg hover:bg-emerald-200 transition-colors"
                        >
                            Okay, I'll take a rest
                        </button>
                    </div>
                </div>
            )}
          
          <div className="flex-grow overflow-y-auto">
            {renderView()}
          </div>
        </main>

      </div>
    </div>
  );
};

export default App;