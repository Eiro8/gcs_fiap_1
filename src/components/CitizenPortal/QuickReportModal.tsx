import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  Mic, 
  MapPin, 
  AlertTriangle, 
  Check, 
  Send,
  Accessibility,
  Droplets,
  Zap,
  Wrench,
  Flame,
  UserCheck,
  EyeOff,
  Heart
} from 'lucide-react';
import { IncidentCategory, Report } from '../../types/citizen';
import { performAiTriage } from '../../services/aiAnalysis';

interface QuickReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (newReport: Omit<Report, 'id' | 'createdAt' | 'upvotes' | 'status'>) => void;
  highContrast: boolean;
}

export const QuickReportModal: React.FC<QuickReportModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  highContrast
}) => {
  const [category, setCategory] = useState<IncidentCategory>('alagamento');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [neighborhood, setNeighborhood] = useState('Vila Esperança');
  const [address, setAddress] = useState('Rua Principal, próximo ao córrego');
  const [reportedBy] = useState('Cidadão(ã) Morador(a)');
  const [accessibilityNeed, setAccessibilityNeed] = useState<Report['accessibilityNeed']>('Nenhuma');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  if (!isOpen) return null;

  // Real-time AI triage preview
  const aiTriage = performAiTriage(title, description, category, accessibilityNeed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Determine coordinate based on chosen neighborhood
    let lat = -23.5510;
    let lng = -46.6340;
    if (neighborhood === 'Morro Alto') {
      lat = -23.5655;
      lng = -46.6440;
    } else if (neighborhood === 'Jardim das Flores') {
      lat = -23.5425;
      lng = -46.6215;
    } else if (neighborhood === 'Centro Operacional') {
      lat = -23.5390;
      lng = -46.6510;
    }

    onSubmitReport({
      title,
      description,
      category,
      severity: aiTriage.suggestedSeverity,
      lat: lat + (Math.random() - 0.5) * 0.005,
      lng: lng + (Math.random() - 0.5) * 0.005,
      address,
      neighborhood,
      reportedBy,
      hasPhoto,
      photoUrl: hasPhoto ? 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80' : undefined,
      aiTriageScore: aiTriage.score,
      aiSummary: aiTriage.summary,
      accessibilityNeed
    });

    onClose();
  };

  const simulateVoiceRecording = () => {
    setIsRecordingAudio(true);
    setTimeout(() => {
      setIsRecordingAudio(false);
      setTitle('Rua intransponível com água invadindo residências');
      setDescription('A água subiu rapidamente cobrindo a calçada e o meio-fio. Idoso vizinho não consegue sair de casa.');
      setCategory('alagamento');
      setAccessibilityNeed('Idoso com mobilidade reduzida');
    }, 2000);
  };

  const categoriesConfig: { id: IncidentCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'alagamento', label: 'Alagamento / Enchente', icon: <Droplets className="w-4 h-4 text-civic-600" /> },
    { id: 'deslizamento', label: 'Encosta / Trinca no Solo', icon: <AlertTriangle className="w-4 h-4 text-amber-600" /> },
    { id: 'arvore_fios', label: 'Árvore / Fiação Exposta', icon: <Zap className="w-4 h-4 text-yellow-600" /> },
    { id: 'acessibilidade', label: 'Calçada / Barreira PcD', icon: <Accessibility className="w-4 h-4 text-service-green" /> },
    { id: 'saneamento', label: 'Esgoto / Bueiro Entupido', icon: <Wrench className="w-4 h-4 text-slate-600" /> },
    { id: 'sos_emergencia', label: 'SOS Resgate Urgente', icon: <Flame className="w-4 h-4 text-service-red" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded border shadow-lg p-6 transition-colors ${
        highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-white text-slate-800 border-slate-300'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded border ${
              highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-slate-100 text-navy-900 border-slate-300'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy-900">Relatar Ocorrência ou Risco no Bairro</h3>
              <p className="text-xs text-slate-500">
                O chamado é encaminhado para triagem técnica e despacho da Defesa Civil Municipal.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Categoria */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tipo de Ocorrência:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoriesConfig.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded text-xs font-semibold text-left transition-colors border flex items-center gap-2 ${
                    category === cat.id
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                        : 'bg-navy-900 text-white border-navy-950 font-bold'
                      : 'border-slate-300 hover:bg-slate-100 text-slate-800 bg-white'
                  }`}
                >
                  <span className="shrink-0">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Título & Voz */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Título Resumido da Ocorrência
              </label>
              <button
                type="button"
                onClick={simulateVoiceRecording}
                className={`text-xs px-2.5 py-1 rounded flex items-center gap-1.5 font-medium border transition-colors ${
                  isRecordingAudio
                    ? 'bg-red-700 text-white border-red-800 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
                title="Gravar relato por comando de voz"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isRecordingAudio ? 'Gravando e Transcrevendo...' : 'Gravar por Voz'}</span>
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="Ex: Córrego transbordando e água invadindo calçada"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-navy-800 bg-white text-slate-900"
            />
          </div>

          {/* Descrição Detalhada */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Descrição Detalhada dos Fatos
            </label>
            <textarea
              required
              rows={3}
              placeholder="Descreva a altura da água, se há estalos de muros, bloqueio de vias ou pessoas isoladas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-navy-800 bg-white text-slate-900"
            />
          </div>

          {/* Bairro e Endereço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Bairro / Comunidade
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 text-xs font-medium bg-white text-slate-900"
              >
                <option value="Vila Esperança">Vila Esperança (Várzea)</option>
                <option value="Morro Alto">Morro Alto (Encosta)</option>
                <option value="Jardim das Flores">Jardim das Flores</option>
                <option value="Centro Operacional">Centro Operacional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Endereço / Ponto de Referência
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Mapeamento de Necessidades Especiais (Inclusão PcD) */}
          <div className="p-3.5 rounded border border-slate-300 bg-slate-50">
            <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs">
              <Accessibility className="w-4 h-4 text-civic-600" />
              <span>Há pessoa com necessidade de apoio especial ou mobilidade reduzida no local?</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'Nenhuma', label: 'Nenhuma', icon: <Check className="w-3.5 h-3.5 text-slate-500" /> },
                { id: 'Cadeirante ilhado', label: 'Cadeirante', icon: <Accessibility className="w-3.5 h-3.5 text-civic-600" /> },
                { id: 'Idoso com mobilidade reduzida', label: 'Idoso(a)', icon: <UserCheck className="w-3.5 h-3.5 text-civic-600" /> },
                { id: 'Deficiente visual', label: 'Deficiente Visual', icon: <EyeOff className="w-3.5 h-3.5 text-civic-600" /> },
                { id: 'Gestante/Bebê', label: 'Gestante / Bebê', icon: <Heart className="w-3.5 h-3.5 text-civic-600" /> },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setAccessibilityNeed(item.id as any)}
                  className={`p-2 rounded text-left font-medium border flex items-center gap-1.5 transition-colors ${
                    accessibilityNeed === item.id
                      ? 'bg-navy-900 text-white border-navy-950 font-bold'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Anexar Foto Simulada */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setHasPhoto(!hasPhoto)}
              className={`text-xs px-3 py-2 rounded flex items-center gap-2 font-medium border transition-colors ${
                hasPhoto
                  ? 'bg-slate-100 border-navy-700 text-navy-900 font-bold'
                  : 'border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Camera className="w-4 h-4 text-slate-700" />
              <span>
                {hasPhoto ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-service-green" />
                    Foto Anexada (Simulação)
                  </span>
                ) : (
                  '+ Anexar Foto da Ocorrência'
                )}
              </span>
            </button>

            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              Geolocalização GPS Ativa
            </span>
          </div>

          {/* AI Pre-triage Box */}
          <div className="p-3 rounded border border-slate-300 bg-slate-100 text-xs text-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-navy-900 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-navy-800" />
                Triagem Automatizada por IA:
              </span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-white text-navy-900 border border-slate-300 text-[11px]">
                Urgência: {aiTriage.score}/100 ({aiTriage.suggestedSeverity.toUpperCase()})
              </span>
            </div>
            <p className="text-slate-700">{aiTriage.summary}</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded text-xs font-bold text-white flex items-center gap-2 transition-colors border ${
                highContrast 
                  ? 'bg-yellow-400 text-black border-yellow-500' 
                  : 'bg-navy-900 hover:bg-navy-950 border-navy-950'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmitir Relato</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
