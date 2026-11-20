import React, { useState } from 'react';
import { MutualAidItem, AccessibilitySettings } from '../../types/citizen';
import { 
  HeartHandshake, 
  Plus, 
  PhoneCall, 
  MapPin, 
  Clock, 
  LifeBuoy,
  X,
  Send
} from 'lucide-react';

interface MutualAidBoardProps {
  items: MutualAidItem[];
  onAddItem: (newItem: Omit<MutualAidItem, 'id' | 'createdAt' | 'status'>) => void;
  settings: AccessibilitySettings;
}

export const MutualAidBoard: React.FC<MutualAidBoardProps> = ({
  items,
  onAddItem,
  settings
}) => {
  const [filterType, setFilterType] = useState<'todos' | 'oferta' | 'pedido'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [type, setType] = useState<'oferta' | 'pedido'>('oferta');
  const [category, setCategory] = useState<MutualAidItem['category']>('transporte_acessivel');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [neighborhood, setNeighborhood] = useState('Vila Esperança');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const isHighContrast = settings.highContrast;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contactName.trim() || !contactPhone.trim()) return;

    onAddItem({
      type,
      category,
      title,
      description,
      neighborhood,
      contactName,
      contactPhone
    });

    setTitle('');
    setDescription('');
    setContactName('');
    setContactPhone('');
    setIsModalOpen(false);
  };

  const filteredItems = items.filter(item => {
    if (filterType === 'todos') return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-5">
      
      {/* Header and Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-navy-800" />
            <span>Rede Solidária Comunitária (Apoio Mútuo entre Vizinhos)</span>
          </h3>
          <p className="text-xs text-slate-600">
            Mural cívico: transporte acessível para pessoas com deficiência, abrigo temporário, água potável e suporte a idosos.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 rounded bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs flex items-center gap-1.5 border border-navy-950 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Ajuda ou Pedido</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('todos')}
          className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${
            filterType === 'todos'
              ? 'bg-navy-900 text-white border-navy-950'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          Todos ({items.length})
        </button>
        <button
          onClick={() => setFilterType('oferta')}
          className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            filterType === 'oferta'
              ? 'bg-navy-900 text-white border-navy-950'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5 text-service-green" />
          <span>Ofertas de Apoio ({items.filter(i => i.type === 'oferta').length})</span>
        </button>
        <button
          onClick={() => setFilterType('pedido')}
          className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            filterType === 'pedido'
              ? 'bg-navy-900 text-white border-navy-950'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <LifeBuoy className="w-3.5 h-3.5 text-amber-600" />
          <span>Pedidos de Ajuda ({items.filter(i => i.type === 'pedido').length})</span>
        </button>
      </div>

      {/* Grid of Mutual Aid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => {
          const isOffer = item.type === 'oferta';

          return (
            <div
              key={item.id}
              className={`p-4 rounded border transition-colors ${
                isHighContrast
                  ? 'bg-black text-yellow-300 border-yellow-400'
                  : 'bg-white border-slate-300 hover:border-slate-400 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${
                  isOffer 
                    ? 'bg-green-50 text-service-green border-green-200' 
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {isOffer ? (
                    <>
                      <HeartHandshake className="w-3 h-3 text-service-green" />
                      Oferta Solidária
                    </>
                  ) : (
                    <>
                      <LifeBuoy className="w-3 h-3 text-amber-700" />
                      Pedido de Apoio
                    </>
                  )}
                </span>

                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {item.createdAt}
                </span>
              </div>

              <h4 className="text-sm font-bold text-navy-900 mb-1">
                {item.title}
              </h4>

              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{item.contactName}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.neighborhood}
                  </div>
                </div>

                <a
                  href={`tel:${item.contactPhone.replace(/\D/g, '')}`}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1.5 border border-slate-300 text-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-navy-800" />
                  <span>{item.contactPhone}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Add New Mutual Aid Offer/Request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80">
          <div className="w-full max-w-lg rounded bg-white p-5 border border-slate-300 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-sm text-navy-900">
                Cadastrar Ajuda ou Pedido Comunitário
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('oferta')}
                  className={`p-2 rounded text-xs font-bold border flex items-center justify-center gap-1.5 ${
                    type === 'oferta' 
                      ? 'bg-navy-900 text-white border-navy-950' 
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-service-green" />
                  <span>Quero Oferecer Ajuda</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('pedido')}
                  className={`p-2 rounded text-xs font-bold border flex items-center justify-center gap-1.5 ${
                    type === 'pedido' 
                      ? 'bg-navy-900 text-white border-navy-950' 
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preciso de Apoio</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2 rounded border border-slate-300 text-xs font-medium bg-white text-slate-900"
                >
                  <option value="transporte_acessivel">Transporte Acessível (Carro/Van adaptada para PcD)</option>
                  <option value="abrigo">Abrigo Temporário em Piso Seco</option>
                  <option value="agua_alimento">Água Potável ou Alimentação</option>
                  <option value="apoio_idoso">Apoio a Idoso / Cuidados de Saúde</option>
                  <option value="resgate_animal">Resgate de Animais Domésticos</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                  Título Resumido
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Disponho de carro alto para transporte de quem precisar"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                  Descrição
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explique o que pode fornecer ou de que apoio necessita..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou associação"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 9...."
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-slate-700 border border-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-navy-900 hover:bg-navy-950 text-white text-xs font-bold flex items-center gap-1.5 border border-navy-950"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar no Mural</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
