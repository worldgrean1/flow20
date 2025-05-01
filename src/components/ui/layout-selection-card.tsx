import { useState, useEffect } from 'react';
import { layoutOptions } from '../../lib/elk-layout';
import { GitBranch, Network, Layers, AlignEndHorizontal, Zap, X, Bolt, Info, ExternalLink, Star, ArrowRight, Settings } from 'lucide-react';
import { getTranslation } from "@lib/translations";
import { Button } from "@/components/ui/button";

type LayoutType = keyof typeof layoutOptions | 'custom';

interface LayoutSelectionCardProps {
  onApplyLayout: (layoutType: LayoutType) => void;
  onClose: () => void;
  language?: "en" | "am";
  onOpenSettings?: () => void;
}

export function LayoutSelectionCard({ onApplyLayout, onClose, language = "am", onOpenSettings }: LayoutSelectionCardProps) {
  const [isLayouting, setIsLayouting] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | null>(null);

  // Translation function
  const t = (key: string) => {
    // Try to translate using the language context
    try {
      return getTranslation(key, language);
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  useEffect(() => {
    // Add blur effect to background when modal is shown
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLayoutClick = (layoutType: LayoutType) => {
    if (isLayouting) return;
    
    setActiveButton(layoutType);
    setIsLayouting(true);
    
    try {
      // Apply the layout with a small delay for animation
      setTimeout(() => {
        setSelectedLayout(layoutType);
        onApplyLayout(layoutType);
        onClose();
      }, 500);
    } catch (error) {
      console.error(`Error in layout selection for ${layoutType}:`, error);
      setIsLayouting(false);
      setActiveButton(null);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Shared button classes - enhanced for more modern look
  const buttonBaseClass = "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 w-full shadow-md border border-transparent hover:shadow-lg group";
  const buttonDisabledClass = "opacity-50 cursor-not-allowed scale-100 shadow-none";
  
  // CSS for animations
  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
      100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* Custom scrollbar styles */
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.3);
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, rgba(74, 222, 128, 0.5), rgba(59, 130, 246, 0.5));
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, rgba(74, 222, 128, 0.7), rgba(59, 130, 246, 0.7));
    }
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* Add style tag for animations */}
      <style>{animations}</style>
      
      <div 
        className="relative w-[850px] max-w-[90vw] bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          height: 'min(80vh, 580px)',
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        {/* Decorative elements - enhanced */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        {/* Header with logo and title */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-900/90 to-transparent px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg shadow-lg p-0.5"
                  style={{ animation: 'pulse 2s infinite' }}>
                <div className="h-full w-full bg-slate-900 rounded-md flex items-center justify-center">
                  <Bolt className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500" 
                      style={{ 
                        textShadow: '0 2px 10px rgba(74, 222, 128, 0.2)',
                        backgroundSize: '200% auto',
                        animation: 'gradient 3s ease infinite'
                      }}>
                    {t("PowerVision Pro")}
                  </h1>
                  <p className="text-xs text-gray-300">{t("Advanced Energy Visualization")}</p>
                </div>
                <img 
                  src="/etmap/grean-world-logo.png.png" 
                  alt="Grean World Energy Technology" 
                  className="h-6 w-auto object-contain ml-3"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Better spacing and structure */}
        <div className="flex h-full pt-20 pb-16 px-6">
          {/* Left Column - Layout Options */}
          <div className="w-2/3 flex flex-col pr-6">
            {/* Title & Description */}
            <div className="flex flex-col mb-4 relative z-10">
              <h2 className="text-lg font-semibold text-white mb-1">{t("Choose Layout Style")}</h2>
              <p className="text-gray-300 text-sm">{t("Select a layout that best visualizes your energy network")}</p>
            </div>
            
            {/* Layout Buttons - Enhanced */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {/* Custom Manual Layout Button */}
              <button
                onClick={() => handleLayoutClick('custom')}
                className={`${buttonBaseClass} bg-gradient-to-br from-yellow-400/20 to-yellow-700/20 hover:from-yellow-400/30 hover:to-yellow-700/30 hover:border-yellow-500/40 
                  ${isLayouting && activeButton === 'custom' ? 'bg-yellow-600/30 border-yellow-500/50 scale-95' : ''}
                  ${isLayouting && activeButton !== 'custom' ? buttonDisabledClass : ''}`}
                disabled={isLayouting}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-md flex items-center justify-center mb-1 shadow group-hover:shadow-yellow-500/20 transition-all duration-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <span className="font-semibold text-xs text-white">{t("Custom (Manual)")}</span>
                <span className="text-[10px] text-gray-300 mt-0.5">{t("Drag & save your own layout")}</span>
                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-3 w-3 text-yellow-400" />
                </div>
              </button>
              {/* Power Sources Column Layout Button - Enhanced */}
              <button
                onClick={() => handleLayoutClick('powerSourcesColumn')}
                className={`${buttonBaseClass} bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 hover:from-indigo-500/30 hover:to-indigo-700/30 hover:border-indigo-500/40 
                  ${isLayouting && activeButton === 'powerSourcesColumn' ? 'bg-indigo-600/30 border-indigo-500/50 scale-95' : ''}
                  ${isLayouting && activeButton !== 'powerSourcesColumn' ? buttonDisabledClass : ''}`}
                disabled={isLayouting}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-md flex items-center justify-center mb-1 shadow group-hover:shadow-indigo-500/20 transition-all duration-300">
                  <AlignEndHorizontal className="h-4 w-4" />
                </div>
                <span className="font-semibold text-xs text-white">{t("Power Sources Column")}</span>
                <span className="text-[10px] text-gray-300 mt-0.5">{t("Vertical power source arrangement")}</span>
                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-3 w-3 text-indigo-400" />
                </div>
              </button>
            </div>
          </div>
          
          {/* Right Column - Project Information - Enhanced */}
          <div className="w-1/3 pl-6 border-l border-slate-700/50 flex flex-col">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3">
              {t("PowerVision Pro: A Real-World Green Energy Simulator")}
            </h3>
            
            <div className="flex-grow overflow-y-auto pr-3 text-gray-300 text-sm leading-relaxed custom-scrollbar">
              <p className="mb-3">
                "PowerVision Pro," developed by 1888IQ for GREAN WORLD ENERGY TECHNOLOGY PLC, is an innovative real-world simulator designed to showcase sustainable green energy solutions.
              </p>
              <p className="mb-3">
                Step into the future of clean energy with interactive demonstrations that bring solar power, wind energy, and other eco-friendly technologies to life.
              </p>
              <p className="mb-3">
                Explore how renewable energy can revolutionize our world and make a positive impact on communities, industries, and the environment.
              </p>
              <p>
                With PowerVision Pro, you'll experience firsthand how sustainable energy can power homes, businesses, and cities, shaping a cleaner, brighter tomorrow.
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-400 font-medium">{t("Status: Online")}</span>
              </div>
              <span className="text-sm text-gray-400">© 2025 1888IQ</span>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent pt-6 pb-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/etmap/grean-world-logo.png.png" 
                alt="Grean World Energy Technology" 
                className="h-8 w-auto object-contain mr-3"
              />
              <span className="text-sm text-gray-300 font-medium">{t("Grean World Energy Technology")}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-xs px-2 py-0.5 bg-slate-700/50 rounded-full text-green-400 border border-green-500/30">v1.2.0</span>
              <span className="text-xs text-gray-400">{t("Advanced Energy Visualization System")}</span>
            </div>
          </div>
        </div>
        
        {/* Project Info Modal - Enhanced */}
        {showInfo && (
          <div 
            className="absolute inset-0 z-20 bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-md rounded-2xl p-7 flex flex-col"
            style={{
              animation: 'fadeIn 0.3s ease-out',
              transition: 'all 0.3s ease-out',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <button 
              onClick={toggleInfo}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-5 flex items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mr-4 shadow-lg"
                  style={{ animation: 'pulse 2s infinite' }}>
                <Bolt className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                    style={{ 
                      textShadow: '0 2px 10px rgba(74, 222, 128, 0.2)',
                      backgroundSize: '200% auto',
                      animation: 'gradient 3s ease infinite'
                    }}>
                  {t("PowerVision Pro")}
                </h2>
                <p className="text-sm text-gray-300">{t("A Real-World Green Energy Simulator")}</p>
              </div>
            </div>
            
            <div className="grow overflow-y-auto pr-4 text-gray-300 text-sm leading-relaxed custom-scrollbar">
              <p className="mb-4">
                "PowerVision Pro," developed by 1888IQ for GREAN WORLD ENERGY TECHNOLOGY PLC, is an innovative real-world simulator designed to showcase sustainable green energy solutions.
              </p>
              <p className="mb-4">
                Step into the future of clean energy with interactive demonstrations that bring solar power, wind energy, and other eco-friendly technologies to life. Explore how renewable energy can revolutionize our world and make a positive impact on communities, industries, and the environment.
              </p>
              <p className="mb-4">
                With PowerVision Pro, you'll experience firsthand how sustainable energy can power homes, businesses, and cities, shaping a cleaner, brighter tomorrow.
              </p>
              <p className="mb-4">
                Our mission is to educate and inspire action towards adopting renewable energy technologies that can help combat climate change while meeting the world's growing energy demands.
              </p>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mt-2 mb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">{t("Key Features")}</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <div className="min-w-5 mr-2 mt-0.5 text-green-500">•</div>
                    <span>Interactive energy network visualization with multiple layout options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-5 mr-2 mt-0.5 text-green-500">•</div>
                    <span>Real-time simulation of energy flow and distribution</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-5 mr-2 mt-0.5 text-green-500">•</div>
                    <span>Detailed analytics and performance metrics for renewable energy sources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-5 mr-2 mt-0.5 text-green-500">•</div>
                    <span>Educational tools to demonstrate the benefits of green energy solutions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-5 flex items-center justify-between border-t border-gray-700/50 pt-4">
              <div className="flex items-center">
                <img 
                  src="/etmap/grean-world-logo.png.png" 
                  alt="Grean World Energy Technology" 
                  className="h-8 w-auto object-contain mr-3"
                />
                <span className="text-sm text-gray-300 font-medium">{t("GREAN WORLD ENERGY TECHNOLOGY PLC")}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">© 2025 1888IQ</span>
                <button className="flex items-center text-green-400 text-sm bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1 rounded-full border border-green-500/30 transition-colors hover:border-green-500/50 hover:text-green-300">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  <span>{t("Visit Website")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 