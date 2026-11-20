export type SeverityLevel = 'baixo' | 'medio' | 'alto' | 'critico';

export type IncidentCategory =
  | 'alagamento'
  | 'deslizamento'
  | 'arvore_fios'
  | 'acessibilidade'
  | 'saneamento'
  | 'sos_emergencia';

export type IncidentStatus =
  | 'aberto'
  | 'em_analise'
  | 'equipe_despachada'
  | 'resolvido';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: SeverityLevel;
  status: IncidentStatus;
  lat: number;
  lng: number;
  address: string;
  neighborhood: string;
  createdAt: string;
  reportedBy: string;
  upvotes: number;
  hasPhoto?: boolean;
  photoUrl?: string;
  audioNotes?: string;
  aiTriageScore?: number; // 0 a 100 de urgencia
  aiSummary?: string;
  accessibilityNeed?: 'Cadeirante ilhado' | 'Idoso com mobilidade reduzida' | 'Deficiente visual' | 'Gestante/Bebê' | 'Nenhuma';
}

export type SensorType = 'nivel_rio' | 'pluviometro' | 'inclinometro_solo' | 'qualidade_ar';

export interface SensorTelemetryHistory {
  timestamp: string;
  value: number;
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  neighborhood: string;
  lat: number;
  lng: number;
  currentValue: number;
  unit: string;
  thresholdWarning: number;
  thresholdCritical: number;
  status: 'normal' | 'alerta' | 'critico';
  batteryLevel: number;
  lastReadingTime: string;
  history: SensorTelemetryHistory[];
}

export interface OfficialAlert {
  id: string;
  title: string;
  message: string;
  severity: 'informativo' | 'atencao' | 'alerta_laranja' | 'emergencia_vermelha';
  affectedAreas: string[];
  issuedAt: string;
  expiresAt: string;
  issuer: string;
  actionsRequired: string[];
  evacuationRecommended: boolean;
}

export interface Shelter {
  id: string;
  name: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
  hasAccessibility: boolean;
  hasMedicalSupport: boolean;
  acceptsPets: boolean;
  contactPhone: string;
  lat: number;
  lng: number;
  status: 'aberto' | 'lotado' | 'em_preparacao';
}

export interface MutualAidItem {
  id: string;
  type: 'oferta' | 'pedido';
  category: 'transporte_acessivel' | 'abrigo' | 'agua_alimento' | 'medicamentos' | 'resgate_animal' | 'apoio_idoso';
  title: string;
  description: string;
  neighborhood: string;
  contactName: string;
  contactPhone: string;
  createdAt: string;
  status: 'ativo' | 'atendido';
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  dyslexicFont: boolean;
  simplifiedLanguage: boolean;
  screenReaderSpeaking: boolean;
}

export interface RiskZone {
  id: string;
  name: string;
  type: 'inundacao' | 'deslizamento' | 'alagamento_rapido';
  riskLevel: 'baixo' | 'medio' | 'alto' | 'muito_alto';
  populationAtRisk: number;
  coordinates: [number, number][];
}
