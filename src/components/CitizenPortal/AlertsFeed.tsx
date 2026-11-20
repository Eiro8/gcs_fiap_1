import React from 'react';
import { OfficialAlert, AccessibilitySettings } from '../../types/citizen';
import { 
  AlertTriangle, 
  Volume2, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  Info, 
  ChevronRight 
} from 'lucide-react';
import { speechService } from '../../services/speechService';

interface AlertsFeedProps {
  alerts: OfficialAlert[];
  settings: AccessibilitySettings;
}

export const AlertsFeed: React.FC<AlertsFeedProps> = ({ alerts, settings }) => {
  const isHighContrast = settings.highContrast;

  const playAlertAudio = (alert: OfficialAlert) => {
    const text = `Aviso Oficial: ${alert.title}. ${alert.message}. Ações imediatas recomendadas: ${alert.actionsRequired.join('. ')}.`;
    speechService.speak(text);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Avisos e Boletins Meteorológicos Oficiais</span>
          </h3>
          <p className="text-xs text-slate-500">
            Atualizado em tempo real pelo Centro Comunitário e Defesa Civil
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {alerts.length} {alerts.length === 1 ? 'alerta ativo' : 'alertas ativos'}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white border border-slate-200/80 shadow-card text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h4 className="font-bold text-slate-900 text-base">Nenhum alerta crítico ativo no momento</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Todos os sensores comunitários estão operando dentro dos limiares normais de segurança.
          </p>
        </div>
      ) : (
        alerts.map(alert => {
          const isRed = alert.severity === 'emergencia_vermelha' || alert.severity === 'alerta_laranja';
          return (
            <div
              key={alert.id}
              className={`rounded-2xl p-6 transition-all ${
                isHighContrast
                  ? 'bg-black text-yellow-300 border-2 border-yellow-400'
                  : `bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover border-l-4 ${
                      isRed ? 'border-l-rose-500' : 'border-l-blue-500'
                    }`
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isRed 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {alert.severity.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {alert.issuedAt}
                  </span>
                </div>

                <button
                  onClick={() => playAlertAudio(alert)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all border border-slate-200/60"
                  title="Ouvir alerta em voz alta"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ouvir Alerta</span>
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {alert.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {alert.message}
              </p>

              {/* Regiões afetadas */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Áreas Afetadas:
                </span>
                {alert.affectedAreas.map((area, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                    {area}
                  </span>
                ))}
              </div>

              {/* Checklist de Ações Recomendadas */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 text-xs">
                <div className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  Instruções Preventivas para os Moradores:
                </div>
                <ul className="space-y-1.5">
                  {alert.actionsRequired.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {alert.evacuationRecommended && (
                <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900 text-xs font-semibold flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Recomenda-se evacuação preventiva das residências em áreas baixas ou encostas.</span>
                  </div>
                  <span className="text-rose-700 underline font-bold cursor-pointer flex items-center gap-1">
                    Ver abrigos acessíveis <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
