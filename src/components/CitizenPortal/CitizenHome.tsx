import React, { useState } from 'react';
import { 
  Report, 
  OfficialAlert, 
  Shelter, 
  MutualAidItem, 
  Sensor, 
  AccessibilitySettings 
} from '../../types/citizen';
import { 
  Camera, 
  Navigation, 
  HeartHandshake, 
  ShieldAlert, 
  MapPin, 
  ThumbsUp, 
  Volume2, 
  Clock, 
  ChevronRight,
  Activity,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { AlertsFeed } from './AlertsFeed';
import { SafeRoutesMap } from './SafeRoutesMap';
import { MutualAidBoard } from './MutualAidBoard';
import { speechService } from '../../services/speechService';

interface CitizenHomeProps {
  reports: Report[];
  alerts: OfficialAlert[];
  shelters: Shelter[];
  mutualAid: MutualAidItem[];
  sensors: Sensor[];
  settings: AccessibilitySettings;
  activeSubTab?: 'alerts' | 'routes' | 'reports' | 'mutual_aid';
  setActiveSubTab?: (tab: 'alerts' | 'routes' | 'reports' | 'mutual_aid') => void;
  onOpenReportModal: () => void;
  onOpenSOSModal: () => void;
  onUpvoteReport: (reportId: string) => void;
  onAddMutualAid: (newItem: Omit<MutualAidItem, 'id' | 'createdAt' | 'status'>) => void;
}

export const CitizenHome: React.FC<CitizenHomeProps> = ({
  reports,
  alerts,
  shelters,
  mutualAid,
  sensors,
  settings,
  activeSubTab: controlledSubTab,
  setActiveSubTab: setControlledSubTab,
  onOpenReportModal,
  onOpenSOSModal,
  onUpvoteReport,
  onAddMutualAid
}) => {
  const [internalSubTab, setInternalSubTab] = useState<'alerts' | 'routes' | 'reports' | 'mutual_aid'>('alerts');
  const activeSubTab = controlledSubTab ?? internalSubTab;
  const setActiveSubTab = setControlledSubTab ?? setInternalSubTab;
  const isHighContrast = settings.highContrast;

  // Active microterritory summary (e.g. Córrego Verde sensor)
  const riverSensor = sensors.find(s => s.type === 'nivel_rio') || sensors[0];
  const rainSensor = sensors.find(s => s.type === 'pluviometro') || sensors[1];

  const readMicroterritoryAloud = () => {
    const text = `Condição atual do seu bairro: Córrego Verde está com nível de ${riverSensor?.currentValue} metros. Chuva acumulada recente de ${rainSensor?.currentValue} milímetros por hora. Existem ${alerts.length} alertas oficiais ativos e ${reports.length} ocorrências comunitárias registradas.`;
    speechService.speak(text);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Hero / Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Relatar Problema */}
        <div
          onClick={onOpenReportModal}
          className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
            isHighContrast
              ? 'bg-black text-yellow-300 border-2 border-yellow-400'
              : 'bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
              }`}>
                <Camera className="w-5 h-5" />
              </span>
              <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-blue-50 text-blue-700 border border-blue-100/70'
              }`}>
                Colaborativo
              </span>
            </div>
            <h4 className={`text-base font-bold transition-colors ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              Relatar Ocorrência
            </h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${
              isHighContrast ? 'text-yellow-200' : 'text-slate-500'
            }`}>
              Fotografe ou dite por voz: alagamentos, calçadas danificadas ou quedas de árvores.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Enviar chamado</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 2: SOS Emergência */}
        <div
          onClick={onOpenSOSModal}
          className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
            isHighContrast
              ? 'bg-red-950 text-white border-2 border-red-500'
              : 'bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-card hover:shadow-card-hover hover:from-red-700 hover:to-rose-700 hover:-translate-y-1 border border-red-500/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-xl bg-white/20 text-white backdrop-blur-xs flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                Plantão 24h
              </span>
            </div>
            <h4 className="text-base font-extrabold text-white">
              SOS Emergência
            </h4>
            <p className="text-xs text-red-100 mt-1.5 leading-relaxed">
              Morador ilhado, idoso ou cadeirante preso, ou encosta cedendo com urgência vital.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-400/40 flex items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
            <span>Acionar socorro imediato</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 3: Rotas Seguras */}
        <div
          onClick={() => setActiveSubTab('routes')}
          className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
            isHighContrast
              ? 'bg-black text-yellow-300 border-2 border-yellow-400'
              : 'bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
              }`}>
                <Navigation className="w-5 h-5" />
              </span>
              <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100/70'
              }`}>
                Acessibilidade
              </span>
            </div>
            <h4 className={`text-base font-bold transition-colors ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-900 group-hover:text-emerald-600'
            }`}>
              Rotas & Abrigos
            </h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${
              isHighContrast ? 'text-yellow-200' : 'text-slate-500'
            }`}>
              Trajetos sem degraus para evacuação até o ponto de apoio mais próximo com vagas.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
            <span>Ver pontos seguros</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Card 4: Ajuda Mútua */}
        <div
          onClick={() => setActiveSubTab('mutual_aid')}
          className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 group flex flex-col justify-between ${
            isHighContrast
              ? 'bg-black text-yellow-300 border-2 border-yellow-400'
              : 'bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
              }`}>
                <HeartHandshake className="w-5 h-5" />
              </span>
              <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-amber-50 text-amber-700 border border-amber-100/70'
              }`}>
                Solidariedade
              </span>
            </div>
            <h4 className={`text-base font-bold transition-colors ${
              isHighContrast ? 'text-yellow-300' : 'text-slate-900 group-hover:text-amber-600'
            }`}>
              Rede de Ajuda
            </h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${
              isHighContrast ? 'text-yellow-200' : 'text-slate-500'
            }`}>
              Carona adaptada para PcD, acolhimento de famílias, água potável e voluntariado.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
            <span>Abrir mural solidário</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

      </div>

      {/* Territorial Telemetry Bar */}
      <div className={`p-6 rounded-2xl transition-all ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-2 border-yellow-400' 
          : 'bg-white border border-slate-200/80 shadow-card'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isHighContrast ? 'bg-yellow-400 text-black' : 'bg-slate-100 text-slate-800'
            }`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-sm sm:text-base ${
                isHighContrast ? 'text-yellow-300' : 'text-slate-900'
              }`}>
                Monitoramento do Microterritório Local
              </h4>
              <p className={`text-xs ${isHighContrast ? 'text-yellow-200' : 'text-slate-500'}`}>
                Dados em tempo real dos nós sensores comunitários e pluviômetros do bairro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={readMicroterritoryAloud}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/60 shadow-xs'
              }`}
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Ouvir Situação</span>
            </button>
            <button
              onClick={() => setActiveSubTab('routes')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isHighContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
              }`}
            >
              <span>Ver Rotas & Abrigos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-5">
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Nível do Córrego Verde
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {riverSensor?.currentValue} <span className="text-sm font-semibold text-slate-500">{riverSensor?.unit}</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                riverSensor?.status === 'critico' ? 'bg-rose-100 text-rose-700' : riverSensor?.status === 'alerta' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {riverSensor?.status}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">Cota Crítica: {riverSensor?.thresholdCritical}m</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Chuva Registrada
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {rainSensor?.currentValue} <span className="text-sm font-semibold text-slate-500">{rainSensor?.unit}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
                Moderada
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">Acumulado últimas 3 horas</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Abrigos Disponíveis
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                {shelters.filter(s => s.status === 'aberto').length}
              </span>
              <span className="text-xs font-semibold text-slate-600">Pontos Seguros</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block font-medium">100% com Acessibilidade PcD</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Ocorrências Ativas
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {reports.filter(r => r.status !== 'resolvido').length}
              </span>
              <span className="text-xs text-slate-500 font-medium">em andamento</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block font-medium">Triagem Técnica Integrada</span>
          </div>
        </div>
      </div>

      {/* Modern Sub-Tabs Selector */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/70 shadow-xs">
        <button
          onClick={() => setActiveSubTab('alerts')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'alerts'
              ? isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
              : isHighContrast
                ? 'text-yellow-300 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-civic-600" />
          <span>Alertas Oficiais</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeSubTab === 'alerts' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
          }`}>
            {alerts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('routes')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'routes'
              ? isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
              : isHighContrast
                ? 'text-yellow-300 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>Rotas Seguras & Abrigos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'reports'
              ? isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
              : isHighContrast
                ? 'text-yellow-300 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Camera className="w-4 h-4 text-blue-600" />
          <span>Ocorrências da População</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeSubTab === 'reports' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
          }`}>
            {reports.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('mutual_aid')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'mutual_aid'
              ? isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
              : isHighContrast
                ? 'text-yellow-300 hover:bg-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-amber-600" />
          <span>Rede Solidária</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeSubTab === 'mutual_aid' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
          }`}>
            {mutualAid.length}
          </span>
        </button>
      </div>

      {/* Sub Tab Content */}
      <div>
        {activeSubTab === 'alerts' && (
          <AlertsFeed alerts={alerts} settings={settings} />
        )}

        {activeSubTab === 'routes' && (
          <SafeRoutesMap shelters={shelters} settings={settings} />
        )}

        {activeSubTab === 'mutual_aid' && (
          <MutualAidBoard items={mutualAid} onAddItem={onAddMutualAid} settings={settings} />
        )}

        {activeSubTab === 'reports' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ocorrências Reportadas pela População</h3>
                <p className="text-xs text-slate-500">Relatos colaborativos com geolocalização e triagem preditiva</p>
              </div>
              <button
                onClick={onOpenReportModal}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Enviar Novo Relato</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reports.map(report => (
                <div
                  key={report.id}
                  className={`p-5 sm:p-6 rounded-2xl transition-all flex flex-col justify-between ${
                    isHighContrast 
                      ? 'bg-black text-yellow-300 border-2 border-yellow-400' 
                      : 'bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        report.severity === 'critico' 
                          ? 'bg-rose-100 text-rose-700' 
                          : report.severity === 'alto' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-100 text-blue-700'
                      }`}>
                        {report.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {report.createdAt}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {report.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {report.description}
                    </p>

                    {report.photoUrl && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 shadow-xs h-40">
                        <img
                          src={report.photoUrl}
                          alt="Evidência fotográfica"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {report.neighborhood}
                    </span>

                    <button
                      onClick={() => onUpvoteReport(report.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      title="Confirmar veracidade do relato"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>Confirmar ({report.upvotes})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
