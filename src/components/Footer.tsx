import React from 'react';
import { ShieldAlert, Phone, Shield, Building, Award } from 'lucide-react';
import { AccessibilitySettings } from '../types/citizen';

interface FooterProps {
  settings: AccessibilitySettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const isHighContrast = settings.highContrast;

  return (
    <footer className={`border-t mt-12 transition-colors py-10 ${
      isHighContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-navy-950 text-slate-300 border-navy-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-navy-900">
          
          <div className="space-y-2.5 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-civic-600 text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                Resilia<span className="text-civic-400">Tech</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-navy-900 text-slate-300 border border-navy-800">
                CitizenTech
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Plataforma Web de Inovação Cívica para Resiliência Urbana, Alerta Precoce, Acessibilidade Universal e Gestão Colaborativa do Território.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <Award className="w-4 h-4 text-slate-400" />
              <span>Projeto concebido para a <strong>Global Solution FIAP</strong></span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-civic-400" />
              Canais de Emergência
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Defesa Civil Municipal:</span>
                <strong className="text-white">199</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Corpo de Bombeiros:</span>
                <strong className="text-white">193</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>SAMU (Emergência Médica):</span>
                <strong className="text-white">192</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Polícia Militar:</span>
                <strong className="text-white">190</strong>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-civic-400" />
              Padrões & Diretrizes
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Acessibilidade WCAG 2.1 Nível AAA</li>
              <li>• Diretrizes UN-Habitat (Cidades Humanizadas)</li>
              <li>• ONU ODS 11 (Cidades Sustentáveis)</li>
              <li>• Arquitetura Offline-First (PWA Ready)</li>
              <li>• React 18 + TypeScript + Tailwind CSS</li>
            </ul>
          </div>

        </div>

        <div className="pt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ResiliaTech CitizenTech. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Desenvolvido para apoio comunitário e mitigação de riscos climáticos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
