import React from 'react';
import { Eye, Type, Volume2, VolumeX, SlidersHorizontal, Phone, Shield } from 'lucide-react';
import { AccessibilitySettings } from '../types/citizen';
import { speechService } from '../services/speechService';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  currentPageTitle?: string;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  settings,
  onUpdateSettings,
  currentPageTitle = 'ResiliaTech CitizenTech'
}) => {
  const toggleContrast = () => {
    onUpdateSettings({ highContrast: !settings.highContrast });
  };

  const cycleFontSize = () => {
    if (settings.fontSize === 'normal') {
      onUpdateSettings({ fontSize: 'large' });
    } else if (settings.fontSize === 'large') {
      onUpdateSettings({ fontSize: 'extra-large' });
    } else {
      onUpdateSettings({ fontSize: 'normal' });
    }
  };

  const toggleDyslexic = () => {
    onUpdateSettings({ dyslexicFont: !settings.dyslexicFont });
  };

  const toggleSimpleLanguage = () => {
    onUpdateSettings({ simplifiedLanguage: !settings.simplifiedLanguage });
  };

  const toggleScreenReader = () => {
    if (settings.screenReaderSpeaking) {
      speechService.stop();
      onUpdateSettings({ screenReaderSpeaking: false });
    } else {
      onUpdateSettings({ screenReaderSpeaking: true });
      const textToRead = `Você está na plataforma ResiliaTech. Página ativa: ${currentPageTitle}. Plataforma inclusiva de alerta precoce e resiliência comunitária. Use os botões da barra superior para ajustar contraste, tamanho de letra e linguagem simples.`;
      speechService.speak(textToRead, () => {
        onUpdateSettings({ screenReaderSpeaking: false });
      });
    }
  };

  return (
    <div 
      role="region" 
      aria-label="Barra de Acessibilidade e Recursos Inclusivos"
      className={`text-xs transition-all py-2.5 px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 border-b ${
        settings.highContrast 
          ? 'bg-black text-yellow-300 border-yellow-400' 
          : 'bg-slate-900 text-slate-300 border-slate-800/90'
      }`}
    >
      {/* Left side: Official Emergency Helpline */}
      <div className="flex items-center gap-3.5 flex-wrap">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Defesa Civil Municipal:</span>
          <a href="tel:199" className="text-white font-bold hover:underline flex items-center gap-1">
            <Phone className="w-3 h-3 text-rose-400" />
            Ligue 199 (Plantão 24h)
          </a>
        </div>
        <span className="hidden lg:inline text-slate-700">|</span>
        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Diretrizes WCAG 2.1 AAA</span>
        </div>
      </div>

      {/* Right side: Accessibility Controls */}
      <div className="flex items-center flex-wrap gap-1.5">
        {/* Alto Contraste */}
        <button
          onClick={toggleContrast}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            settings.highContrast
              ? 'bg-yellow-400 text-black border border-yellow-300 font-bold'
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
          }`}
          aria-pressed={settings.highContrast}
          title="Alternar modo de alto contraste para baixa visão"
        >
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Alto Contraste</span>
        </button>

        {/* Tamanho da Fonte */}
        <button
          onClick={cycleFontSize}
          className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border border-slate-700/60 flex items-center gap-1.5"
          title="Aumentar ou diminuir tamanho do texto"
        >
          <Type className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Texto:{' '}
            <strong className="text-white font-semibold">
              {settings.fontSize === 'normal' ? 'Padrão' : settings.fontSize === 'large' ? '+ Grande' : '++ Máximo'}
            </strong>
          </span>
        </button>

        {/* Modo Dislexia */}
        <button
          onClick={toggleDyslexic}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            settings.dyslexicFont
              ? 'bg-amber-400 text-slate-900 border border-amber-500 font-bold'
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
          }`}
          aria-pressed={settings.dyslexicFont}
          title="Fonte facilitadora para pessoas com dislexia"
        >
          <span>Fonte Clara</span>
        </button>

        {/* Linguagem Simples */}
        <button
          onClick={toggleSimpleLanguage}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            settings.simplifiedLanguage
              ? 'bg-emerald-600 text-white border border-emerald-500 font-bold'
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
          }`}
          aria-pressed={settings.simplifiedLanguage}
          title="Simplificar termos técnicos para fácil compreensão"
        >
          <span>Linguagem Simples</span>
        </button>

        {/* Leitor de Voz */}
        <button
          onClick={toggleScreenReader}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            settings.screenReaderSpeaking
              ? 'bg-red-700 text-white border border-red-600 font-bold animate-pulse'
              : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/80 font-semibold'
          }`}
          aria-pressed={settings.screenReaderSpeaking}
          title="Ouvir leitura do conteúdo da página em voz alta"
        >
          {settings.screenReaderSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{settings.screenReaderSpeaking ? 'Parar Leitura' : 'Ouvir Página'}</span>
        </button>
      </div>
    </div>
  );
};
