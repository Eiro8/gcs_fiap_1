# ResiliaTech — Portal do Cidadão | Israel Ribeiro Ramos
## CitizenTech de Resiliência Urbana, Alerta Precoce e Inclusão Comunitária

> **FIAP Global Solution — Desafio CitizenTech**  
> *"Tecnologia cívica, design inclusivo e solidariedade conectadas para proteger vidas em microterritórios urbanos."*

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![WCAG 2.1 AAA](https://img.shields.io/badge/Acessibilidade-WCAG_2.1_AAA-22c55e)](#acessibilidade-universal-e-inclusão)
[![ODS ONU](https://img.shields.io/badge/ONU-ODS_11_•_13_•_10_•_03-0284c7)](#alinhamento-com-os-objetivos-de-desenvolvimento-sustentável-ods-da-onu)

---

## 1. Sumário do Projeto

O **ResiliaTech — Portal do Cidadão** é uma plataforma web inclusiva de **CitizenTech** concebida para empoderar comunidades periféricas e cidadãos vulneráveis diante do agravamento de eventos climáticos extremos (enchentes, inundações de várzea e deslizamentos de encostas).

A plataforma coloca a tecnologia diretamente a serviço da população local, garantindo acesso em tempo real a:
1. **Telemetria do Microterritório:** Leitura em tempo real de sensores locais (nível de córregos e chuva acumulada) com recurso sonoro de síntese de voz;
2. **Alertas Oficiais e Ações Preventivas:** Avisos meteorológicos e hidrológicos detalhados com linguagem simples e checklist imediato de autoproteção;
3. **SafeRoutes (Rotas Acessíveis & Pontos de Apoio):** Navegação de evacuação sem degraus para pessoas com deficiência (PcD), idosos e gestantes até abrigos adaptados com suporte médico;
4. **Relato Rápido e Colaborativo:** Canal para fotografar, descrever por texto ou comando de voz ocorrências territoriais com triagem automatizada por IA;
5. **Botão SOS Emergência 24h:** Acionamento de pedido urgente de socorro com geolocalização e identificação de necessidades especiais de mobilidade;
6. **Rede Solidária Comunitária:** Mural cívico para oferta e solicitação de ajuda mútua entre vizinhos (carona acessível, abrigo temporário, água potável e voluntariado).

---

## 2. Diagnóstico & A Dor do Cidadão

Mais de **10 milhões de brasileiros** residem em áreas com risco geológico ou hidrológico elevado (CEMADEN/IBGE). Em momentos de chuvas intensas, o cidadão comum enfrenta:

- **Avisos Tardios e Genéricos:** Alertas por SMS governamentais costumam ser vagos, impessoais e chegam após o início do transbordo das águas.
- **Inacessibilidade para Pessoas com Deficiência (PcD):** Cadeirantes, idosos e pessoas com deficiência visual ficam ilhados por falta de rotas de evacuação planas, desobstruídas e sem degraus.
- **Falta de Informação Hiperlocal:** Noticiários cobrem grandes avenidas, mas não mostram a situação do córrego da comunidade ou da encosta do bairro.
- **Desamparo Comunitário:** Vizinhos que possuem veículos adaptados ou mantimentos não contam com canal unificado para encontrar quem mais necessita de apoio imediato.

---

## 3. Personas do Ecossistema Cidadão

- **Dona Maria das Dores (68 anos, aposentada, moradora da Vila Esperança):**  
  *Contexto:* Possui mobilidade reduzida e mora próxima ao Córrego Verde. Tem receio de ser pega de surpresa à noite pela água.  
  *Uso do Portal:* Ouve a situação do bairro por áudio com 1 clique ("Ouvir Situação"), acompanha o nível do córrego e pode acionar o SOS com necessidade de idoso pré-marcada.

- **Lucas Ribeiro (29 anos, estudante e cadeirante, morador do Jardim das Flores):**  
  *Contexto:* Utiliza cadeira de rodas motorizada. Em temporais, poças de 15 cm e calçadas destruídas bloqueiam seu deslocamento.  
  *Uso do Portal:* Consulta o módulo **SafeRoutes**, encontrando o Ponto de Acolhimento Seguro com rampas, sem degraus e com trajeto plano verificado.

- **Tiago Martins (35 anos, motorista de van acessível, Morro Alto):**  
  *Contexto:* Líder voluntário que possui veículo com plataforma elevatória para cadeirantes.  
  *Uso do Portal:* Publica na **Rede Solidária** sua disponibilidade para evacuar moradores acamados ou idosos com segurança até os abrigos municipais.

- **Aline Souza (32 anos, mãe solo de 2 crianças, Vila Esperança):**  
  *Contexto:* Observa bueiro entupido e início de acúmulo de água na calçada da creche comunitária.  
  *Uso do Portal:* Envia um relato rápido por comando de voz com foto em menos de 1 minuto, recebendo pontuação imediata de urgência pela IA.

---

## 4. Módulos do Portal do Cidadão

A interface foi projetada em **React 18 + TypeScript + Tailwind CSS**, seguindo diretrizes rigorosas de design inclusivo e utilidade pública:

### 1. Monitoramento do Microterritório Local
- Exibição em tempo real do nível do córrego em metros e cota crítica.
- Registro pluviométrico acumulado das últimas 3 horas.
- Contador de abrigos abertos acessíveis e ocorrências ativas.
- **Botão "Ouvir Situação":** Síntese de voz em português que sintetiza as condições climáticas e hídricas do bairro para pessoas cegas ou com baixa alfabetização.

### 2. Alertas e Boletins Oficiais
- Feed cronológico de avisos meteorológicos (Atenção, Alerta Laranja, Emergência Vermelha).
- Identificação precisa dos bairros e vias afetadas.
- Checklist prático com orientações preventivas imediatas.
- Player sonoro para reprodução do boletim por voz.
- Indicador visual e sonoro de recomendação de evacuação com redirecionamento direto aos abrigos.

### 3. SafeRoutes: Rotas Seguras & Abrigos Acessíveis
- Catálogo de Pontos de Acolhimento Seguros com vagas em tempo real, estrutura médica, acessibilidade motora e acolhimento de pets.
- Trajeto de evacuação com garantias técnicas: desnível zero (sem degraus), lâmina d'água 0 cm e iluminação ativa.
- Guia passo a passo por etapas de deslocamento acessível com sintetizador de voz instruindo o caminho.
- Contato telefônico direto de emergência de cada abrigo.

### 4. Ocorrências Comunitárias Colaborativas
- Envio de chamados georreferenciados em categorias críticas: *Alagamento*, *Encosta / Trinca*, *Árvore / Fios*, *Calçada / Barreira PcD*, *Saneamento* e *SOS*.
- Opção de entrada por **comando de voz** com transcrição simulada.
- Anexo de evidências fotográficas.
- **Triagem em Tempo Real por IA:** Cálculo preditivo do grau de urgência (0 a 100) com base no texto, palavras-chave e vulnerabilidades declaradas (ex.: cadeirante ilhado, idoso, gestante).
- Mecanismo de confirmação comunitária (votos de veracidade).

### 5. Botão & Modal de SOS Emergência 24h
- Botão de destaque imediato no cabeçalho.
- Seleção simplificada do tipo de perigo (*Água Subindo*, *PcD/Idoso sem Locomoção*, *Encosta Cedendo*, *Vítima Ferida*).
- Disparo imediato com confirmação sonora de apoio, telefone de contato e orientação de segurança até a chegada do socorro.
- Discagem rápida para canais oficiais (199 Defesa Civil, 193 Bombeiros, 192 SAMU).

### 6. Rede Solidária (Ajuda Mútua entre Vizinhos)
- Mural comunitário com filtros entre **Ofertas de Apoio** e **Pedidos de Ajuda**.
- Categorias essenciais: transporte acessível, acolhimento temporário, água potável/alimentos, suporte a idosos e resgate animal.
- Conexão direta via telefone / WhatsApp entre vizinhos voluntários e moradores em necessidade.

---

## 5. Acessibilidade Universal (WCAG 2.1 AAA)

A barra superior de acessibilidade garante plena autonomia a todos os perfis de usuários:

| Recurso | Descrição Técnica | Benefício ao Cidadão |
|:---|:---|:---|
| **Modo Alto Contraste** | Paleta em preto absoluto (#000000) e amarelo tático (#FACC15) | Garante legibilidade máxima para pessoas com baixa visão, catarata ou daltonismo severo. |
| **Leitor de Tela Nativo** | Integração com Web Speech API (`SpeechSynthesis`) em pt-BR | Permite que qualquer pessoa ouça os alertas e instruções sem depender de softwares externos. |
| **Escala de Fonte** | Alternância dinâmica entre Padrão (16px), Grande (17px) e Máximo (19px) | Facilita a leitura para idosos e pessoas com fadiga visual. |
| **Fonte para Dislexia** | Aplicação de tipografia com peso inferior diferenciado e espaçamento otimizado | Reduz confusão visual de caracteres para pessoas no espectro disléxico. |
| **Linguagem Simples** | Modos alternáveis com substituição de jargões técnicos | Torna instruções de segurança compreensíveis para pessoas com baixa escolaridade. |

---

## 6. Estrutura do Código-Fonte

```
src/
├── components/
│   ├── AccessibilityBar.tsx           # Barra WCAG AAA (contraste, fontes, leitor de voz)
│   ├── Header.tsx                     # Cabeçalho com navegação do portal e botão SOS
│   ├── Footer.tsx                     # Rodapé com canais de emergência e diretrizes
│   └── CitizenPortal/
│       ├── CitizenHome.tsx            # Dashboard principal do Cidadão & Telemetria
│       ├── AlertsFeed.tsx             # Feed de avisos oficiais e recomendações
│       ├── SafeRoutesMap.tsx          # Rotas de fuga e abrigos com acessibilidade PcD
│       ├── MutualAidBoard.tsx         # Mural comunitário de apoio mútuo
│       ├── QuickReportModal.tsx       # Modal de relato com foto, voz e IA
│       └── EmergencySOSModal.tsx      # Modal de socorro urgente 24h
├── services/
│   ├── speechService.ts               # Síntese de voz pt-BR via Web Speech API
│   └── aiAnalysis.ts                  # Algoritmo de triagem semântica de ocorrências
├── types/
│   └── citizen.ts                     # Interfaces TypeScript (Relatos, Sensores, Abrigos)
├── data/
│   └── mockData.ts                    # Dados territoriais e comunitários simulados
├── App.tsx                            # Orquestração do Portal do Cidadão
├── main.tsx                           # Ponto de entrada React
└── index.css                          # Estilos base e classes Tailwind CSS
```

---

## 7. Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU

- **ODS 11 — Cidades e Comunidades Sustentáveis:** Proteção de microterritórios periféricos contra catástrofes climáticas e promoção de espaços públicos acessíveis.
- **ODS 13 — Ação Contra a Mudança Global do Clima:** Fortalecimento da capacidade adaptativa comunitária e alerta precoce perante eventos climáticos extremos.
- **ODS 10 — Redução das Desigualdades:** Inclusão ativa de pessoas com deficiência, idosos e famílias vulneráveis nos planos de contingência locais.
- **ODS 03 — Saúde e Bem-Estar:** Preservação de vidas, prevenção de afogamentos, soterramentos e apoio a pessoas com necessidades médicas especiais.

---

## 8. Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **NPM**

### Instalação e Execução

1. **Entrar no diretório do projeto:**
   ```bash
   cd /home/roses/projects/gcs_fiap
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

4. **Gerar a compilação de produção:**
   ```bash
   npm run build
   ```
   Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 9. Conclusão

O **ResiliaTech — Portal do Cidadão** prova que soluções de defesa civil e resiliência urbana só são verdadeiramente efetivas quando são **acessíveis**, **hiperlocais** e **centradas nas pessoas**. A plataforma transforma o cidadão de mero receptor passivo em protagonista da segurança do seu próprio bairro.
