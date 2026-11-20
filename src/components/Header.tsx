import React from 'react';
import { 
  ShieldAlert, 
  Navigation, 
  Camera, 
  HeartHandshake, 
  AlertTriangle 
} from 'lucide-react';
import { AccessibilitySettings } from '../types/citizen';

export type CitizenSubTab = 'alerts' | 'routes' | 'reports' | 'mutual_aid';

interface HeaderProps {
  activeTab: CitizenSubTab;
  setActiveTab: (tab: CitizenSubTab) => void;
  settings: AccessibilitySettings;
  activeAlertsCount: number;
  openReportsCount: number;
  onOpenSOSModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  activeAlertsCount,
  openReportsCount,
  onOpenSOSModal
}) => {
  const isHighContrast = settings.highContrast;

  return (
    <header 
      className={`sticky top-0 z-40 transition-all border-b ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-white/95 backdrop-blur-md text-slate-900 border-slate-200/80 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-6">
          
          {/* Logo & Branding */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer select-none group"
            onClick={() => setActiveTab('alerts')}
            title="Ir para o início do Portal do Cidadão"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
              isHighContrast 
                ? 'bg-yellow-400 text-black border-2 border-yellow-500 font-bold' 
                : 'bg-gradient-to-tr from-blue-700 to-civic-500 text-white shadow-sm shadow-blue-500/20 ring-4 ring-blue-50/80'
            }`}>
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className={`text-xl sm:text-2xl font-extrabold tracking-tight font-sans ${
                  isHighContrast ? 'text-yellow-300' : 'text-slate-900'
                }`}>
                  Resilia<span className={isHighContrast ? 'text-white' : 'text-civic-600'}>Tech</span>
                </span>
                <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${
                  isHighContrast 
                    ? 'bg-yellow-400 text-black font-bold' 
                    : 'bg-blue-50 text-civic-700 border border-blue-100/90'
                }`}>
                  Portal do Cidadão
                </span>
              </div>
              <p className={`text-xs ${isHighContrast ? 'text-yellow-200' : 'text-slate-500'} hidden sm:block font-normal leading-tight mt-0.5`}>
                {settings.simplifiedLanguage 
                  ? 'Ajuda mútua e alertas para proteger nosso bairro' 
                  : 'Resiliência Urbana, Alerta Precoce & Defesa Civil Coletiva'}
              </p>
            </div>
          </div>

          {/* Navigation Links - Human-designed Segmented Control */}
          <nav 
            className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border transition-all ${
              isHighContrast 
                ? 'bg-black border-yellow-400' 
                : 'bg-slate-100/80 border-slate-200/70 shadow-inner'
            }`} 
            aria-label="Navegação do Portal do Cidadão"
          >
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'alerts'
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : isHighContrast
                    ? 'text-yellow-300 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-civic-600" />
              <span>Alertas Oficiais</span>
              {activeAlertsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {activeAlertsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'routes'
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : isHighContrast
                    ? 'text-yellow-300 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Rotas Seguras & Abrigos</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'reports'
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : isHighContrast
                    ? 'text-yellow-300 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Ocorrências</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'reports' ? 'bg-slate-200 text-slate-800' : 'bg-slate-200/80 text-slate-700'
              }`}>
                {openReportsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('mutual_aid')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'mutual_aid'
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : isHighContrast
                    ? 'text-yellow-300 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Rede Solidária</span>
            </button>
          </nav>

          {/* Emergency SOS Callout Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenSOSModal}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 ${
                isHighContrast
                  ? 'bg-red-700 text-white border-2 border-white'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-sm hover:shadow-md hover:shadow-red-500/20 border border-red-500/40'
              }`}
              title="Acionar SOS Imediato com Localização para Defesa Civil e Vizinhos"
            >
              <AlertTriangle className="w-4 h-4 text-red-100" />
              <span className="tracking-wide uppercase font-extrabold">SOS EMERGÊNCIA</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Sub-bar */}
        <div className={`flex lg:hidden overflow-x-auto py-2.5 px-0.5 gap-2 border-t scrollbar-none ${
          isHighContrast ? 'border-yellow-400' : 'border-slate-100'
        }`}>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'alerts'
                ? isHighContrast 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                : isHighContrast 
                  ? 'text-yellow-300 border border-yellow-400/40' 
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-civic-600" />
            Alertas ({activeAlertsCount})
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'routes'
                ? isHighContrast 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                : isHighContrast 
                  ? 'text-yellow-300 border border-yellow-400/40' 
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            Rotas & Abrigos
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'reports'
                ? isHighContrast 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                : isHighContrast 
                  ? 'text-yellow-300 border border-yellow-400/40' 
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            Ocorrências ({openReportsCount})
          </button>

          <button
            onClick={() => setActiveTab('mutual_aid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'mutual_aid'
                ? isHighContrast 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                : isHighContrast 
                  ? 'text-yellow-300 border border-yellow-400/40' 
                  : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            Rede Solidária
          </button>
        </div>

      </div>
    </header>
  );
};
