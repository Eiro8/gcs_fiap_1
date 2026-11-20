import { IncidentCategory, SeverityLevel, Sensor, Report } from '../types/citizen';

interface AiTriageResult {
  score: number; // 0 to 100
  suggestedSeverity: SeverityLevel;
  summary: string;
  recommendedAction: string;
  detectedKeywords: string[];
  vulnerabilityFlag?: string;
}

export function performAiTriage(
  title: string,
  description: string,
  category: IncidentCategory,
  accessibilityNeed?: string
): AiTriageResult {
  const combinedText = `${title} ${description}`.toLowerCase();
  let score = 40;
  const detectedKeywords: string[] = [];

  // Critical indicators
  const criticalWords = ['ilhado', 'afogamento', 'estalo', 'rachadura', 'desmoron', 'correnteza', 'fio solto', 'choque', 'preso', 'soterra'];
  criticalWords.forEach(word => {
    if (combinedText.includes(word)) {
      score += 15;
      detectedKeywords.push(word);
    }
  });

  // Urgency modifiers
  if (category === 'sos_emergencia') score += 35;
  if (category === 'deslizamento') score += 25;
  if (category === 'alagamento') score += 15;
  if (category === 'arvore_fios') score += 15;

  // Accessibility flags
  let vulnerabilityFlag: string | undefined;
  if (accessibilityNeed && accessibilityNeed !== 'Nenhuma') {
    score += 25;
    vulnerabilityFlag = accessibilityNeed;
  } else if (combinedText.includes('cadeirante') || combinedText.includes('idoso') || combinedText.includes('cego') || combinedText.includes('criança') || combinedText.includes('bebê')) {
    score += 20;
    vulnerabilityFlag = 'Pessoa vulnerável identificada no texto';
  }

  score = Math.min(Math.max(score, 10), 99);

  let suggestedSeverity: SeverityLevel = 'baixo';
  let summary = '';
  let recommendedAction = '';

  if (score >= 85) {
    suggestedSeverity = 'critico';
    summary = 'PRIORIDADE MÁXIMA DE RESGATE: Alta probabilidade de risco à integridade física em área vulnerável.';
    recommendedAction = 'Despachar equipe da Defesa Civil e Corpo de Bombeiros com viatura de tração/bote imediatamente.';
  } else if (score >= 65) {
    suggestedSeverity = 'alto';
    summary = 'ALTO IMPACTO URBANO: Obstrução severa ou risco de evolução para colapso estrutural.';
    recommendedAction = 'Enviar equipe de fiscalização e agentes de trânsito para isolamento do perímetro em até 30 minutos.';
  } else if (score >= 40) {
    suggestedSeverity = 'medio';
    summary = 'ZELADORIA E MANUTENÇÃO PRIORITÁRIA: Barreira ou dano localizado sem risco iminente de colapso.';
    recommendedAction = 'Programar vistoria da Secretaria de Obras/Zeladoria em escala ordinária prioritária.';
  } else {
    suggestedSeverity = 'baixo';
    summary = 'OCORRÊNCIA LEVE: Registro comunitário preventivo ou informativo.';
    recommendedAction = 'Monitorar evolução por sensores próximos e incorporar no plano de zeladoria.';
  }

  return {
    score,
    suggestedSeverity,
    summary,
    recommendedAction,
    detectedKeywords,
    vulnerabilityFlag
  };
}

export function calculateCommunityRiskIndex(sensors: Sensor[], reports: Report[]): {
  overallIndex: number; // 0 - 100
  statusLevel: 'baixo' | 'moderado' | 'alto' | 'critico';
  description: string;
} {
  let sensorScoreSum = 0;
  sensors.forEach(s => {
    const ratio = s.currentValue / s.thresholdCritical;
    sensorScoreSum += Math.min(ratio * 100, 100);
  });
  const avgSensorScore = sensors.length > 0 ? sensorScoreSum / sensors.length : 20;

  const openCriticalReports = reports.filter(r => r.status !== 'resolvido' && (r.severity === 'critico' || r.severity === 'alto')).length;
  const reportPenalty = Math.min(openCriticalReports * 12, 40);

  const overall = Math.min(Math.round(avgSensorScore * 0.6 + reportPenalty), 100);

  if (overall >= 75) {
    return {
      overallIndex: overall,
      statusLevel: 'critico',
      description: 'Cenário Crítico de Emergência: Solos saturados e múltiplos pontos de retenção hídrica ativos.'
    };
  } else if (overall >= 55) {
    return {
      overallIndex: overall,
      statusLevel: 'alto',
      description: 'Alerta Ativo: Córregos em elevação acelerada e encostas em monitoramento preventivo.'
    };
  } else if (overall >= 30) {
    return {
      overallIndex: overall,
      statusLevel: 'moderado',
      description: 'Atenção Preventiva: Chuvas moderadas sem registro de transbordo generalizado.'
    };
  } else {
    return {
      overallIndex: overall,
      statusLevel: 'baixo',
      description: 'Condição Estável: Sensores em níveis de normalidade e vias acessíveis desobstruídas.'
    };
  }
}
