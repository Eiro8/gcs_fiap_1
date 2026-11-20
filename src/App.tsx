import React, { useState } from 'react';
import {
  Sensor,
  Report,
  OfficialAlert,
  Shelter,
  MutualAidItem,
  AccessibilitySettings
} from './types/citizen';
import {
  INITIAL_SENSORS,
  INITIAL_REPORTS,
  OFFICIAL_ALERTS,
  SHELTERS,
  MUTUAL_AID_LIST
} from './data/mockData';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Header, CitizenSubTab } from './components/Header';
import { CitizenHome } from './components/CitizenPortal/CitizenHome';
import { QuickReportModal } from './components/CitizenPortal/QuickReportModal';
import { EmergencySOSModal } from './components/CitizenPortal/EmergencySOSModal';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<CitizenSubTab>('alerts');

  // Acessibilidade
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'normal',
    dyslexicFont: false,
    simplifiedLanguage: false,
    screenReaderSpeaking: false
  });

  const [sensors] = useState<Sensor[]>(INITIAL_SENSORS);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [alerts] = useState<OfficialAlert[]>(OFFICIAL_ALERTS);
  const [shelters] = useState<Shelter[]>(SHELTERS);
  const [mutualAid, setMutualAid] = useState<MutualAidItem[]>(MUTUAL_AID_LIST);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);

  const handleUpdateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleCreateReport = (newReportData: Omit<Report, 'id' | 'createdAt' | 'upvotes' | 'status'>) => {
    const createdReport: Report = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      createdAt: 'Agora mesmo',
      upvotes: 1,
      status: 'aberto'
    };
    setReports(prev => [createdReport, ...prev]);
    setActiveTab('reports');
  };

  const handleConfirmSOS = (sosData: Partial<Report>) => {
    const newReport: Report = {
      id: `sos-${Date.now()}`,
      title: sosData.title || 'SOS EMERGÊNCIA ATIVADO',
      description: sosData.description || 'Pedido de socorro prioritário emitido via plataforma.',
      category: 'sos_emergencia',
      severity: 'critico',
      status: 'equipe_despachada',
      lat: -23.5512 + (Math.random() - 0.5) * 0.003,
      lng: -46.6345 + (Math.random() - 0.5) * 0.003,
      address: sosData.address || 'Localização enviada via GPS',
      neighborhood: sosData.neighborhood || 'Vila Esperança',
      createdAt: 'Agora mesmo',
      reportedBy: sosData.reportedBy || 'Cidadão em Risco',
      upvotes: 5,
      aiTriageScore: 99,
      aiSummary: 'RESGATE IMEDIATO: Protocolo SOS ativado pelo cidadão com geolocalização e envio automático para as equipes de campo.',
      accessibilityNeed: sosData.accessibilityNeed || 'Idoso com mobilidade reduzida'
    };

    setReports(prev => [newReport, ...prev]);
    setActiveTab('reports');
  };

  const handleUpvoteReport = (reportId: string) => {
    setReports(prev => prev.map(rep => rep.id === reportId ? { ...rep, upvotes: rep.upvotes + 1 } : rep));
  };

  const handleAddMutualAid = (newItem: Omit<MutualAidItem, 'id' | 'createdAt' | 'status'>) => {
    const created: MutualAidItem = {
      ...newItem,
      id: `aid-${Date.now()}`,
      createdAt: 'Agora mesmo',
      status: 'ativo'
    };
    setMutualAid(prev => [created, ...prev]);
    setActiveTab('mutual_aid');
  };

  // Font Size
  const getFontSizeClass = () => {
    if (accessibilitySettings.fontSize === 'large') return 'text-[17px]';
    if (accessibilitySettings.fontSize === 'extra-large') return 'text-[19px]';
    return 'text-base';
  };

  const getFontFamilyClass = () => {
    if (accessibilitySettings.dyslexicFont) return 'font-["Lexend",sans-serif] tracking-wide';
    return 'font-sans';
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      accessibilitySettings.highContrast
        ? 'bg-black text-yellow-300'
        : 'bg-slate-50 text-slate-900'
    } ${getFontSizeClass()} ${getFontFamilyClass()}`}>

      {/* Acessibilidade  */}
      <AccessibilityBar
        settings={accessibilitySettings}
        onUpdateSettings={handleUpdateAccessibility}
        currentPageTitle="Portal do Cidadão - ResiliaTech"
      />

      {/* Header  */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={accessibilitySettings}
        activeAlertsCount={alerts.length}
        openReportsCount={reports.filter(r => r.status !== 'resolvido').length}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
      />

      {/* main*/}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <CitizenHome
          reports={reports}
          alerts={alerts}
          shelters={shelters}
          mutualAid={mutualAid}
          sensors={sensors}
          settings={accessibilitySettings}
          activeSubTab={activeTab}
          setActiveSubTab={setActiveTab}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenSOSModal={() => setIsSOSModalOpen(true)}
          onUpvoteReport={handleUpvoteReport}
          onAddMutualAid={handleAddMutualAid}
        />
      </main>

      {/* Footer */}
      <Footer settings={accessibilitySettings} />

      {/* modais */}
      <QuickReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleCreateReport}
        highContrast={accessibilitySettings.highContrast}
      />

      <EmergencySOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onConfirmSOS={handleConfirmSOS}
        highContrast={accessibilitySettings.highContrast}
      />

    </div>
  );
}

export default App;
