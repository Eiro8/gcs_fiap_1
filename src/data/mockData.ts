import { Report, Sensor, OfficialAlert, Shelter, MutualAidItem, RiskZone } from '../types/citizen';

export const INITIAL_SENSORS: Sensor[] = [
  {
    id: 'sensor-rio-01',
    name: 'Sensor Hidrológico Córrego Verde (Várzea)',
    type: 'nivel_rio',
    neighborhood: 'Vila Esperança',
    lat: -23.5505,
    lng: -46.6333,
    currentValue: 2.85,
    unit: 'm',
    thresholdWarning: 2.5,
    thresholdCritical: 3.5,
    status: 'alerta',
    batteryLevel: 94,
    lastReadingTime: 'Há 2 min',
    history: [
      { timestamp: '14:00', value: 1.2 },
      { timestamp: '15:00', value: 1.4 },
      { timestamp: '16:00', value: 1.9 },
      { timestamp: '17:00', value: 2.3 },
      { timestamp: '18:00', value: 2.85 },
    ]
  },
  {
    id: 'sensor-pluv-02',
    name: 'Pluviômetro IoT Escola Comunitária',
    type: 'pluviometro',
    neighborhood: 'Jardim das Flores',
    lat: -23.5420,
    lng: -46.6210,
    currentValue: 48.6,
    unit: 'mm/h',
    thresholdWarning: 35.0,
    thresholdCritical: 60.0,
    status: 'alerta',
    batteryLevel: 88,
    lastReadingTime: 'Há 1 min',
    history: [
      { timestamp: '14:00', value: 5.0 },
      { timestamp: '15:00', value: 12.0 },
      { timestamp: '16:00', value: 28.5 },
      { timestamp: '17:00', value: 39.0 },
      { timestamp: '18:00', value: 48.6 },
    ]
  },
  {
    id: 'sensor-solo-03',
    name: 'Inclinômetro & Umidade Encosta Norte',
    type: 'inclinometro_solo',
    neighborhood: 'Morro Alto',
    lat: -23.5650,
    lng: -46.6450,
    currentValue: 88.2,
    unit: '% saturação',
    thresholdWarning: 75.0,
    thresholdCritical: 90.0,
    status: 'critico',
    batteryLevel: 81,
    lastReadingTime: 'Agora',
    history: [
      { timestamp: '14:00', value: 45.0 },
      { timestamp: '15:00', value: 58.0 },
      { timestamp: '16:00', value: 72.0 },
      { timestamp: '17:00', value: 81.0 },
      { timestamp: '18:00', value: 88.2 },
    ]
  },
  {
    id: 'sensor-rio-04',
    name: 'Sensor Hidrológico Rio Central (Ponte)',
    type: 'nivel_rio',
    neighborhood: 'Centro Operacional',
    lat: -23.5380,
    lng: -46.6520,
    currentValue: 1.80,
    unit: 'm',
    thresholdWarning: 3.0,
    thresholdCritical: 4.5,
    status: 'normal',
    batteryLevel: 98,
    lastReadingTime: 'Há 5 min',
    history: [
      { timestamp: '14:00', value: 0.9 },
      { timestamp: '15:00', value: 1.1 },
      { timestamp: '16:00', value: 1.3 },
      { timestamp: '17:00', value: 1.5 },
      { timestamp: '18:00', value: 1.8 },
    ]
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'rep-01',
    title: 'Cadeirante ilhado com subida rápida de água na calçada',
    description: 'A água da chuva transbordou do córrego e atingiu 40cm. A rampa da esquina está submersa e com correnteza. Senhor João (72 anos, cadeirante) está isolado no portão de casa necessitando de auxílio imediato para remoção.',
    category: 'sos_emergencia',
    severity: 'critico',
    status: 'equipe_despachada',
    lat: -23.5512,
    lng: -46.6345,
    address: 'Rua das Camélias, 142',
    neighborhood: 'Vila Esperança',
    createdAt: 'Há 18 min',
    reportedBy: 'Marcos Silva (Vizinho / Agente Comunitário)',
    upvotes: 24,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    aiTriageScore: 98,
    aiSummary: 'ALERTA MÁXIMO: Risco iminente à vida, pessoa com deficiência e idosa ilhada em área com correnteza ativa. Equipe de resgate prioritária acionada.',
    accessibilityNeed: 'Cadeirante ilhado'
  },
  {
    id: 'rep-02',
    title: 'Fissura no solo e muro estalando no topo da encosta',
    description: 'Após as chuvas fortes das últimas 3 horas, apareceu uma rachadura de cerca de 4 dedos de largura no solo da servidão e o muro de contenção começou a estalar. Barulho de pedras rolando.',
    category: 'deslizamento',
    severity: 'critico',
    status: 'em_analise',
    lat: -23.5662,
    lng: -46.6438,
    address: 'Travessa da Colina, altura do nº 85',
    neighborhood: 'Morro Alto',
    createdAt: 'Há 32 min',
    reportedBy: 'Dona Helena (Moradora há 20 anos)',
    upvotes: 38,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    aiTriageScore: 94,
    aiSummary: 'INDÍCIO DE RUPTURA DE ENCOSTA: Trincas dinâmicas no terreno e ruído estrutural confirmam alerta do sensor de solo. Recomenda-se evacuação preventiva das 6 casas vizinhas.',
    accessibilityNeed: 'Idoso com mobilidade reduzida'
  },
  {
    id: 'rep-03',
    title: 'Alagamento impedindo passagem de pedestres e ônibus',
    description: 'Cruzamento com água cobrindo o meio-fio (cerca de 30cm). Bueiro totalmente entupido com galhos e resíduos plásticos.',
    category: 'alagamento',
    severity: 'alto',
    status: 'aberto',
    lat: -23.5435,
    lng: -46.6225,
    address: 'Av. dos Trabalhadores x Rua 4',
    neighborhood: 'Jardim das Flores',
    createdAt: 'Há 45 min',
    reportedBy: 'Lucas Mendonça',
    upvotes: 15,
    hasPhoto: false,
    aiTriageScore: 72,
    aiSummary: 'Ponto crítico de drenagem urbana interrompendo mobilidade de transporte coletivo e pedestres.',
    accessibilityNeed: 'Nenhuma'
  },
  {
    id: 'rep-04',
    title: 'Calçada acessível rompida por raízes e buraco aberto',
    description: 'Piso tátil interrompido e buraco de 1 metro na calçada em frente ao posto de saúde. Risco grave para pessoas com deficiência visual e idosos.',
    category: 'acessibilidade',
    severity: 'medio',
    status: 'aberto',
    lat: -23.5480,
    lng: -46.6390,
    address: 'Rua do Bem-Estar, 310',
    neighborhood: 'Centro Operacional',
    createdAt: 'Há 2 horas',
    reportedBy: 'Carla Beatriz (Conselho Comunitário PcD)',
    upvotes: 19,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80',
    aiTriageScore: 65,
    aiSummary: 'Barreira urbana arquitetônica que impede acesso autônomo à UBS por usuários com baixa visão e cadeirantes.',
    accessibilityNeed: 'Deficiente visual'
  },
  {
    id: 'rep-05',
    title: 'Galho de grande porte sobre a fiação elétrica com faíscas',
    description: 'Ventos fortes derrubaram um galho pesado nos cabos de média tensão. Rua sem luz e fios soltos a 1,5m do chão.',
    category: 'arvore_fios',
    severity: 'alto',
    status: 'equipe_despachada',
    lat: -23.5550,
    lng: -46.6290,
    address: 'Alameda dos Ipês, 78',
    neighborhood: 'Vila Esperança',
    createdAt: 'Há 50 min',
    reportedBy: 'Roberto Dias',
    upvotes: 27,
    hasPhoto: false,
    aiTriageScore: 84,
    aiSummary: 'Risco iminente de choque elétrico e incêndio. Despacho urgente para concessionária e Bombeiros.',
    accessibilityNeed: 'Nenhuma'
  }
];

export const OFFICIAL_ALERTS: OfficialAlert[] = [
  {
    id: 'alt-01',
    title: 'ALERTA LARANJA: Risco Alto de Inundação e Deslizamento nas Encostas',
    message: 'Previsão de precipitação acumulada superior a 70mm nas próximas 3 horas. Solos saturados na região do Morro Alto e elevação rápida do Córrego Verde. Evite transitar por vias alagadas. Moradores de encostas devem observar estalos ou rachaduras e se dirigir aos pontos de acolhimento seguro.',
    severity: 'alerta_laranja',
    affectedAreas: ['Morro Alto', 'Vila Esperança', 'Jardim das Flores'],
    issuedAt: 'Hoje às 17:30',
    expiresAt: 'Hoje às 22:00',
    issuer: 'Defesa Civil Municipal & Cemaden Local',
    actionsRequired: [
      'Desconecte aparelhos elétricos da tomada se a água subir',
      'Auxilie vizinhos idosos e pessoas com deficiência a buscar abrigo seguro',
      'Não atravesse enxurradas nem passeios submersos a pé ou de carro',
      'Acesse o mapa de rotas acessíveis no ResiliaTech para encontrar o ponto de apoio mais próximo'
    ],
    evacuationRecommended: true
  },
  {
    id: 'alt-02',
    title: 'Aviso Hidrológico: Córrego Verde atingiu Cota de Atenção',
    message: 'Sensor IoT registrou 2,85 metros de lâmina d\'água (cota crítica em 3,50m). Bombeamento e comportas comunitárias ativadas preventivamente.',
    severity: 'atencao',
    affectedAreas: ['Vila Esperança'],
    issuedAt: 'Hoje às 18:05',
    expiresAt: 'Hoje às 21:00',
    issuer: 'Centro de Monitoramento Hidrológico Comunitário',
    actionsRequired: [
      'Elevar móveis e documentos importantes para pisos superiores',
      'Manter canais de drenagem livres de sacos de lixo'
    ],
    evacuationRecommended: false
  }
];

export const SHELTERS: Shelter[] = [
  {
    id: 'sh-01',
    name: 'Ponto Seguro 01 - EMEF Paulo Freire',
    address: 'Av. da Cidadania, 550 - Bairro das Palmeiras',
    capacity: 250,
    currentOccupancy: 42,
    hasAccessibility: true,
    hasMedicalSupport: true,
    acceptsPets: true,
    contactPhone: '(11) 98765-4321',
    lat: -23.5410,
    lng: -46.6280,
    status: 'aberto'
  },
  {
    id: 'sh-02',
    name: 'Ponto Seguro 02 - Centro Comunitário São Francisco',
    address: 'Rua do Solidarismo, 102 - Vila Esperança Alta',
    capacity: 120,
    currentOccupancy: 18,
    hasAccessibility: true,
    hasMedicalSupport: false,
    acceptsPets: true,
    contactPhone: '(11) 97654-3210',
    lat: -23.5470,
    lng: -46.6380,
    status: 'aberto'
  },
  {
    id: 'sh-03',
    name: 'Ponto Seguro 03 - Ginásio Poliesportivo Central',
    address: 'Praça dos Esportes, 10 - Centro Operacional',
    capacity: 500,
    currentOccupancy: 85,
    hasAccessibility: true,
    hasMedicalSupport: true,
    acceptsPets: false,
    contactPhone: '(11) 96543-2109',
    lat: -23.5350,
    lng: -46.6490,
    status: 'aberto'
  }
];

export const MUTUAL_AID_LIST: MutualAidItem[] = [
  {
    id: 'aid-01',
    type: 'oferta',
    category: 'transporte_acessivel',
    title: 'Van com elevador hidráulico para transporte de PcD e idosos',
    description: 'Estou com minha van adaptada disponível no Jardim das Palmeiras para transportar com segurança quem precisar ir aos abrigos ou postos de saúde.',
    neighborhood: 'Jardim das Palmeiras / Vila Esperança',
    contactName: 'Tiago Mecânico & Voluntário',
    contactPhone: '(11) 99123-4567',
    createdAt: 'Há 25 min',
    status: 'ativo'
  },
  {
    id: 'aid-02',
    type: 'pedido',
    category: 'apoio_idoso',
    title: 'Preciso de auxílio para descer escadaria com senhora de 84 anos',
    description: 'Minha mãe tem dificuldade de locomoção e a rampa da nossa vila está interditada por lama. Precisamos de apoio de 2 voluntários para conduzi-la até a van.',
    neighborhood: 'Morro Alto',
    contactName: 'Clara Nogueira',
    contactPhone: '(11) 98234-5678',
    createdAt: 'Há 12 min',
    status: 'ativo'
  },
  {
    id: 'aid-03',
    type: 'oferta',
    category: 'abrigo',
    title: 'Acolhimento temporário para 1 família com animais de estimação',
    description: 'Espaço em piso superior seguro com água potável, comida e estrutura para cães/gatos até a tempestade passar.',
    neighborhood: 'Centro Operacional',
    contactName: 'Padaria Comunitária Sol Nascente',
    contactPhone: '(11) 97345-6789',
    createdAt: 'Há 40 min',
    status: 'ativo'
  },
  {
    id: 'aid-04',
    type: 'pedido',
    category: 'agua_alimento',
    title: 'Galões de água potável para o Centro Comunitário',
    description: 'Estamos abrigando 18 pessoas no momento e a rede pública de abastecimento da rua sofreu contaminação por enxurrada.',
    neighborhood: 'Vila Esperança',
    contactName: 'Pastor Samuel (Líder Local)',
    contactPhone: '(11) 96456-7890',
    createdAt: 'Há 1 hora',
    status: 'ativo'
  }
];

export const RISK_ZONES: RiskZone[] = [
  {
    id: 'rz-01',
    name: 'Área de Risco Geológico R4 - Morro Alto (Encosta Leste)',
    type: 'deslizamento',
    riskLevel: 'muito_alto',
    populationAtRisk: 1420,
    coordinates: [
      [-23.5620, -46.6480],
      [-23.5680, -46.6490],
      [-23.5700, -46.6420],
      [-23.5630, -46.6410],
    ]
  },
  {
    id: 'rz-02',
    name: 'Várzea Alagável do Córrego Verde',
    type: 'inundacao',
    riskLevel: 'alto',
    populationAtRisk: 3100,
    coordinates: [
      [-23.5480, -46.6380],
      [-23.5530, -46.6360],
      [-23.5560, -46.6290],
      [-23.5510, -46.6270],
    ]
  },
  {
    id: 'rz-03',
    name: 'Bacia de Retenção e Entroncamento Drenagem',
    type: 'alagamento_rapido',
    riskLevel: 'medio',
    populationAtRisk: 850,
    coordinates: [
      [-23.5400, -46.6250],
      [-23.5450, -46.6260],
      [-23.5460, -46.6190],
      [-23.5410, -46.6180],
    ]
  }
];
