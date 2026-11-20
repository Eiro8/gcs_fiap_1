import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  ShieldAlert,
  Droplets,
  Accessibility,
  Mountain,
  HeartPulse
} from 'lucide-react';
import { speechService } from '../../services/speechService';
import { Report } from '../../types/citizen';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSOS: (sosReport: Partial<Report>) => void;
  highContrast: boolean;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onConfirmSOS,
  highContrast
}) => {
  const [selectedEmergency, setSelectedEmergency] = useState<'agua' | 'encosta' | 'ferido' | 'pcd'>('agua');
  const [neighborhood, setNeighborhood] = useState('Vila Esperança');
  const [contactPhone, setContactPhone] = useState('(11) 98765-4321');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleTriggerSOS = () => {
    let title = 'SOS: Cidadão ilhado em área de inundação rápida';
    let accessibilityNeed: Report['accessibilityNeed'] = 'Nenhuma';

    if (selectedEmergency === 'agua') {
      title = 'SOS URGENTE: Família e moradores ilhados pela rápida subida das águas';
      accessibilityNeed = 'Idoso com mobilidade reduzida';
    } else if (selectedEmergency === 'encosta') {
      title = 'SOS URGENTE: Risco iminente de colapso de talude / encosta com moradores';
    } else if (selectedEmergency === 'pcd') {
      title = 'SOS URGENTE: Pessoa com deficiência / cadeirante necessitando remoção prioritária';
      accessibilityNeed = 'Cadeirante ilhado';
    } else {
      title = 'SOS MÉDICO: Vítima ferida ou pessoa acamada em área de risco climático';
    }

    onConfirmSOS({
      title,
      description: `CHAMADO DE SOCORRO IMEDIATO emitido via botão SOS do ResiliaTech. Contato direto: ${contactPhone}. Localização georreferenciada enviada à central integrada.`,
      category: 'sos_emergencia',
      severity: 'critico',
      neighborhood,
      address: `Área de Prioridade 1, ${neighborhood}`,
      reportedBy: `Cidadão SOS (${contactPhone})`,
      accessibilityNeed,
      aiTriageScore: 99,
      aiSummary: 'EMERGÊNCIA VITAL CONFIRMADA: Acionamento direto do protocolo SOS integrado com envio simultâneo para Defesa Civil, Bombeiros e Rede Solidária de Proximidade.'
    });

    speechService.speak('Alerta de socorro enviado com sucesso. Mantenha a calma. Sua localização e contato foram repassados para a equipe da Defesa Civil e voluntários próximos.');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  const emergencyOptions = [
    { 
      id: 'agua', 
      label: 'Água Subindo / Ilhado', 
      desc: 'Correnteza forte ou residência inundada',
      icon: <Droplets className="w-5 h-5 text-civic-600" />
    },
    { 
      id: 'pcd', 
      label: 'PcD / Idoso com Dificuldade de Locomoção', 
      desc: 'Impossibilitado de evacuar sem assistência',
      icon: <Accessibility className="w-5 h-5 text-service-green" />
    },
    { 
      id: 'encosta', 
      label: 'Encosta Cedendo / Trinca Estrutural', 
      desc: 'Muros trincando ou terra descendo',
      icon: <Mountain className="w-5 h-5 text-amber-600" />
    },
    { 
      id: 'ferido', 
      label: 'Vítima Ferida / Acamada', 
      desc: 'Necessidade de socorro pré-hospitalar imediato',
      icon: <HeartPulse className="w-5 h-5 text-service-red" />
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85">
      <div className={`relative w-full max-w-lg rounded border-2 shadow-xl p-6 transition-colors ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-900 border-red-700'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-slate-100 text-slate-600"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">SOS Transmitido com Sucesso</h3>
            <p className="text-xs text-slate-700 max-w-sm mx-auto mb-4">
              Sua solicitação de resgate prioritário foi recebida pelo Centro Integrado da Defesa Civil e pelas equipes volantes.
            </p>
            <div className="p-3 rounded bg-slate-100 border border-slate-300 text-xs text-slate-800 font-semibold">
              Mantenha o telefone desocupado. Permaneça no ponto mais alto e seguro do imóvel até a chegada da equipe.
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
              <div className="p-2.5 rounded bg-service-red text-white">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-service-red uppercase tracking-wide">
                  Acionamento de Socorro de Emergência
                </h3>
                <p className="text-xs text-slate-600">
                  Canal direto de envio de coordenadas para despacho prioritário.
                </p>
              </div>
            </div>

            {/* Select Danger Type */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold uppercase text-slate-700 block">
                Selecione o tipo de risco imediato:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {emergencyOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedEmergency(opt.id as any)}
                    className={`p-3 rounded text-left border transition-colors flex items-start gap-2.5 ${
                      selectedEmergency === opt.id
                        ? 'bg-red-50 border-red-700 text-slate-900 font-bold ring-1 ring-red-700'
                        : 'border-slate-300 hover:bg-slate-50 text-slate-800 bg-white'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">{opt.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Microterritory & Phone */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Local / Comunidade
                </label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs font-bold bg-white text-slate-900"
                >
                  <option value="Vila Esperança">Vila Esperança (Várzea)</option>
                  <option value="Morro Alto">Morro Alto (Encosta)</option>
                  <option value="Jardim das Flores">Jardim das Flores</option>
                  <option value="Centro Operacional">Centro Operacional</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Telefone de Contato
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs font-bold bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Giant Emergency Dispatch Button */}
            <button
              onClick={handleTriggerSOS}
              className="w-full py-3 rounded bg-service-red hover:bg-red-800 text-white font-bold text-sm flex items-center justify-center gap-2 border border-red-900 transition-colors uppercase tracking-wide"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Confirmar e Despachar Equipe de Socorro</span>
            </button>

            {/* Direct Dial numbers */}
            <div className="flex items-center justify-around mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 font-medium">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-service-red" />
                Defesa Civil: <strong>199</strong>
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-service-red" />
                Bombeiros: <strong>193</strong>
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-service-red" />
                SAMU: <strong>192</strong>
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
