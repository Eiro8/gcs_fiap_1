import React, { useState } from 'react';
import { Shelter, AccessibilitySettings } from '../../types/citizen';
import { 
  Navigation, 
  Home, 
  MapPin, 
  Volume2, 
  PhoneCall, 
  Accessibility, 
  Heart,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { speechService } from '../../services/speechService';

interface SafeRoutesMapProps {
  shelters: Shelter[];
  settings: AccessibilitySettings;
}

export const SafeRoutesMap: React.FC<SafeRoutesMapProps> = ({ shelters, settings }) => {
  const [selectedShelterId, setSelectedShelterId] = useState<string>(shelters[0]?.id || '');
  const isHighContrast = settings.highContrast;

  const currentShelter = shelters.find(s => s.id === selectedShelterId) || shelters[0];

  const listenRouteInstructions = () => {
    if (!currentShelter) return;
    const text = `Instruções de evacuação acessível até ${currentShelter.name}. Saia de sua residência pela rota sinalizada em verde. Siga pela calçada plana da Alameda Principal, evitando a baixada do Córrego Verde. O trajeto possui piso tátil contínuo e zero degraus até a entrada acessível do abrigo na ${currentShelter.address}. Telefone do abrigo: ${currentShelter.contactPhone}.`;
    speechService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl transition-all ${
        isHighContrast 
          ? 'bg-black text-yellow-300 border-2 border-yellow-400' 
          : 'bg-white border border-slate-200/80 text-slate-900 shadow-card'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              isHighContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/80'
            }`}>
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Rotas Urbanas Seguras e Acessíveis (SafeRoutes)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rotas planejadas para cadeirantes, idosos e pessoas com mobilidade reduzida, desviando de áreas alagadas e encostas instáveis.
              </p>
            </div>
          </div>

          <button
            onClick={listenRouteInstructions}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-xs ${
              isHighContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Ouvir Instruções de Fuga Acessível</span>
          </button>
        </div>
      </div>

      {/* Grid: Shelter Selector & Route Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Shelters List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 px-1">
            Pontos de Acolhimento Seguros Ativos ({shelters.length})
          </h4>

          <div className="space-y-3">
            {shelters.map(shelter => {
              const isSelected = shelter.id === selectedShelterId;
              const occupancyPct = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);

              return (
                <div
                  key={shelter.id}
                  onClick={() => setSelectedShelterId(shelter.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-yellow-400 text-black border-2 border-yellow-500 font-bold'
                        : 'bg-blue-50/70 border-2 border-blue-500/80 shadow-xs ring-2 ring-blue-100'
                      : 'bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{shelter.name}</span>
                    </h5>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      Aberto
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{shelter.address}</span>
                  </p>

                  {/* Progress bar of occupancy */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-600">
                      <span>Ocupação:</span>
                      <span>{shelter.currentOccupancy} / {shelter.capacity} vagas ({occupancyPct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${occupancyPct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {shelter.hasAccessibility && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100 flex items-center gap-1">
                        <Accessibility className="w-3 h-3" />
                        Rampas & PcD
                      </span>
                    )}
                    {shelter.acceptsPets && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-100 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Aceita Pets
                      </span>
                    )}
                    {shelter.hasMedicalSupport && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-100">
                        Enfermaria
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Step-by-Step Accessible Trajectory */}
        <div className="lg:col-span-2">
          {currentShelter ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Trajeto Seguro Recomendado
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                    Destino: {currentShelter.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Distância estimada: <strong>1.1 km</strong> • Tempo a pé: <strong>14 min</strong> (Ritmo adaptado para PcD)
                  </p>
                </div>

                <a
                  href={`tel:${currentShelter.contactPhone.replace(/\D/g, '')}`}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-200/80 shadow-xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>{currentShelter.contactPhone}</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50/70 border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Desníveis</span>
                  <strong className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    0 Degraus (Plano)
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Lâmina d'Água</span>
                  <strong className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    0 cm (Rota Seca)
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Iluminação</span>
                  <strong className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    LED Operante
                  </strong>
                </div>
              </div>

              {/* Step-by-Step Directions */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                  Etapas do Deslocamento Acessível:
                </h5>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Saída da residência e acesso à via principal</p>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Utilize a calçada norte da Alameda das Palmeiras. O piso tátil guia diretamente até a esquina sem obstruções de postes ou lixeiras.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Travessia segura na faixa elevada</p>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Atravesse a Av. dos Trabalhadores na faixa elevada (sem meio-fio) em frente à padaria comunitária. Agente de trânsito orientando pedestres.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/90 hover:bg-white hover:shadow-xs transition-all">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Entrada acessível no Ponto Seguro</p>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        Acesso principal pelo Portão B (rampa com corrimão duplo e piso antiderrapante). Triagem médica e acolhimento imediato na recepção.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-10 text-center text-slate-500 border border-slate-200/80 rounded-2xl bg-white shadow-card">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              Selecione um abrigo ao lado para ver o itinerário.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
