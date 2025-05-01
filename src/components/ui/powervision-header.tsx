import { Settings, Sun, Moon, Globe, Battery, Zap, Activity } from 'lucide-react';
import { Button } from './button';
import { useTranslation } from '../../hooks/use-translation';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitch } from './language-switch';
import { BackgroundSelector } from './background-selector';

interface PowerVisionHeaderProps {
  onOpenSettings: () => void;
}

export function PowerVisionHeader({ onOpenSettings }: PowerVisionHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/40 px-4">
      <div className="max-w-[1920px] mx-auto h-full flex items-center justify-between">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            {/* Company Logo */}
            <div className="flex items-center justify-center h-12 w-auto">
              <img 
                src="/etmap/Header-logo.PNG" 
                alt="GREAN WORLD ENERGY TECHNOLOGY PLC Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            {/* Brand and Title */}
            <div>
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                PowerVision Pro
              </h1>
              <p className="text-xs text-slate-300 font-medium tracking-wide">GREAN WORLD ENERGY TECHNOLOGY PLC</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50">
              <Activity className="h-4 w-4" />
              {t('Dashboard')}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50">
              <Battery className="h-4 w-4" />
              {t('Energy Storage')}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50">
              <Sun className="h-4 w-4" />
              {t('Solar Power')}
            </Button>
          </nav>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2 mr-2">
            <BackgroundSelector />
            <ThemeToggle />
            <LanguageSwitch />
          </div>
          
          {/* System Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium">{t('System Online')}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            className="flex items-center gap-2 border-slate-700 hover:border-slate-600 hover:bg-slate-700/50 text-slate-300 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t('Settings')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 