/**
 * Biblioteca Muscular de Lesões e Protocolos de Reabilitação Baseados em Evidências
 * REAVITA CARE & PRO - Diretrizes PBE (Dubois & Esculier BJSM 2020, JOSPT, Brukner & Khan)
 */

export interface MuscleInjury {
  id: string;
  name: string;
  category: 'estiramento' | 'contusao' | 'dmit' | 'contratura' | 'laceracao';
  severity: 'Grau 1 (Leve)' | 'Grau 2 (Moderado)' | 'Grau 3 (Grave / Ruptura)' | 'Grau 1 a 2' | 'Funcional / Autolimitada';
  affectedMuscles: string[];
  anatomicalRegion: 'Coxa Posterior' | 'Coxa Anterior' | 'Panturrilha' | 'Virilha / Pélvis' | 'Coluna / Paravertebral' | 'Ombro / Tronco';
  mechanism: string;
  symptoms: string[];
  healingPhases: {
    phase: string;
    duration: string;
    biologicalProcess: string;
    safeAction: string;
    contraindication: string;
  }[];
  peaceAndLoveStep: string;
  homeRehabProtocol: {
    phaseName: string;
    recommendedExercises: {
      title: string;
      category: 'mobilidade' | 'fortalecimento' | 'alongamento' | 'controle_motor' | 'educativo';
      frequency: string;
      dosage: string;
      instruction: string;
      precautions: string;
    }[];
  }[];
  evidenceCitation: string;
  doi?: string;
}

export const MUSCLE_INJURIES_DATABASE: MuscleInjury[] = [
  {
    id: 'lesao-isquiotibiais-g1',
    name: 'Estiramento de Isquiotibiais (Grau 1 - Microruptura)',
    category: 'estiramento',
    severity: 'Grau 1 (Leve)',
    affectedMuscles: ['Bíceps Femoral (cabeça longa)', 'Semitendíneo', 'Semimembranoso'],
    anatomicalRegion: 'Coxa Posterior',
    mechanism: 'Desaceleração rápida em corrida de velocidade ou chute forçado, onde o músculo sofre contração excêntrica com comprimento aumentado.',
    symptoms: [
      'Dor em pontada ou queimação localizada na parte de trás da coxa',
      'Desconforto ao caminhar em passadas longas ou subir escadas',
      'Sem perda estrutural palpável ou hematoma visível imediato',
      'Dor na contração isométrica contra resistência leve a moderada'
    ],
    healingPhases: [
      {
        phase: 'Fase 1: Aguda / Proteção (0 a 48h)',
        duration: '1 a 2 dias',
        biologicalProcess: 'Micro-hemorragia intrafascicular e resposta inflamatória inicial necessária para o reparo.',
        safeAction: 'Caminhada protegida sem dor, isometria submáxima em ângulo confortável, elevação se houver edema.',
        contraindication: 'Alongamento agressivo, massagem profunda precoce, anti-inflamatórios em excesso que inibem o reparo tecidual.'
      },
      {
        phase: 'Fase 2: Reparo e Carga Ativa (3 a 10 dias)',
        duration: 'Dia 3 ao 10',
        biologicalProcess: 'Proliferação de mioblastos e síntese de colágeno tipo III para fechar as microfissuras.',
        safeAction: 'Ponte de glúteo isométrica (bilateral), extensão ativa suave do joelho sentado, caminhada rápida.',
        contraindication: 'Sprint, tiros de corrida, esforço com dor acima de 3/10 na escala EVA.'
      },
      {
        phase: 'Fase 3: Remodelação e Retorno Funcional (> 10 dias)',
        duration: '10 a 21 dias',
        biologicalProcess: 'Alinhamento mecânico das novas fibras com a linha de tensão e conversão em colágeno tipo I.',
        safeAction: 'Exercício nórdico de isquiotibiais com amplitude reduzida, trote progressivo, flexão de joelho com caneleira.',
        contraindication: 'Retorno súbito à carga máxima sem teste prévio de sprint indolor.'
      }
    ],
    peaceAndLoveStep: 'P.E.A.C.E. nas primeiras 48h (Proteger, Elevar, Evitar gelo excessivo, Comprimir com faixa, Educar) seguido de L.O.V.E. (Load/Carga progressiva, Otimismo, Vascularização aeróbica, Exercício ativo).',
    homeRehabProtocol: [
      {
        phaseName: 'Fase Inicial (Dias 1 a 4) — Alívio e Isometria Suave',
        recommendedExercises: [
          {
            title: 'Isometria de Calcanhar no Chão (Isquiotibiais)',
            category: 'fortalecimento',
            frequency: '2 vezes ao dia',
            dosage: '3 séries de 15 segundos a 30% da força máxima',
            instruction: 'Deitado de barriga para cima, dobre os joelhos. Pressione os calcanhares suavemente contra o chão sem levantar o quadril, sentindo a parte posterior da coxa ativar sem dor pontual.',
            precautions: 'Interromper se provocar dor aguda > 3/10.'
          },
          {
            title: 'Deslizamento Neural Ciático Suave (Slider)',
            category: 'mobilidade',
            frequency: '1 a 2 vezes ao dia',
            dosage: '2 séries de 8 repetições fluidas',
            instruction: 'Sentado com a coluna neutra, estique lentamente o joelho da perna dolorida enquanto dobra a cabeça para trás, e dobre o joelho ao abaixar o queixo.',
            precautions: 'Não force se sentir puxão elétrico forte; movimento deve ser suave e confortável.'
          }
        ]
      },
      {
        phaseName: 'Fase Progressiva (Dias 5 a 14) — Controle e Força Ativa',
        recommendedExercises: [
          {
            title: 'Ponte Bipodal de Glúteo com Foco em Isquiotibiais',
            category: 'controle_motor',
            frequency: '1 vez ao dia (dias alternados)',
            dosage: '3 séries de 10 a 12 repetições',
            instruction: 'Deitado de costas, pés apoiados no chão na largura dos quadris. Eleve o quadril contraindo glúteos e posteriores da coxa, segure 2 segundos no topo e desça devagar.',
            precautions: 'Evite arquear a lombar; a força deve vir do quadril e da coxa.'
          },
          {
            title: 'Stiff Unilateral Apoiado (Deadlift com Peso do Corpo)',
            category: 'fortalecimento',
            frequency: '3 vezes por semana',
            dosage: '3 séries de 8 repetições por perna',
            instruction: 'Apoie uma mão na parede ou cadeira. Incline o tronco para a frente levando a outra perna esticada para trás, mantendo a coluna alinhada e o joelho de apoio levemente destravado.',
            precautions: 'Sinta um leve estiramento elástico controlado na descida, sem dor aguda.'
          }
        ]
      }
    ],
    evidenceCitation: 'Askling CM et al. Acute hamstring injuries in Swedish elite football. Br J Sports Med (BJSM 2013/2014); Dubois & Esculier BJSM 2020.',
    doi: '10.1136/bjsports-2013-092115'
  },
  {
    id: 'lesao-gastrocnemio-tennis-leg',
    name: 'Distensão de Panturrilha / "Tennis Leg" (Cabeça Medial do Gastrocnêmio)',
    category: 'estiramento',
    severity: 'Grau 2 (Moderado)',
    affectedMuscles: ['Gastrocnêmio Medial', 'Sóleo', 'Tendão Plantar Delgado'],
    anatomicalRegion: 'Panturrilha',
    mechanism: 'Extensão súbita do joelho associada à dorsiflexão do tornozelo (ex.: largada rápida no esporte ou pisar em falso), sensação clássica de "pedrada na panturrilha".',
    symptoms: [
      'Sensação súbita de estalo ou golpe na parte interna superior da panturrilha',
      'Incapacidade de ficar na ponta do pé ou colocar o calcanhar totalmente no chão nas primeiras 48h',
      'Edema moderado e equimose que desce em direção ao tornozelo após 48-72h',
      'Claudicação evidente ao caminhar'
    ],
    healingPhases: [
      {
        phase: 'Fase Aguda (Dias 0 a 3)',
        duration: '72 horas',
        biologicalProcess: 'Ruptura parcial na junção miotendínea com hematoma intramuscular.',
        safeAction: 'Faixa compressiva elástica, calcanhar levemente elevado com palmilha/sapato para encurtar o tendão, apoio com muleta ou bengala se claudicar.',
        contraindication: 'Alongar a panturrilha na parede, caminhar forçando o calcanhar sem apoio.'
      },
      {
        phase: 'Fase Subaguda (Dias 4 a 14)',
        duration: '2 semanas',
        biologicalProcess: 'Formação do tecido cicatricial inicial de colágeno e revascularização.',
        safeAction: 'Dorsiflexão e flexão plantar ativa sem carga no ar, isometria de panturrilha sentado.',
        contraindication: 'Saltos, corrida, impulsões com o antepé.'
      },
      {
        phase: 'Fase de Fortalecimento e Elasticidade (> 15 dias)',
        duration: '3 a 6 semanas',
        biologicalProcess: 'Remodelação das fibras colágenas com aumento da resistência tênsil à tração.',
        safeAction: 'Elevação de calcanhares em pé com dois pés, progressão para um pé só, bicicleta ergométrica leve.',
        contraindication: 'Atividades balísticas de impacto sem força prévia restaurada.'
      }
    ],
    peaceAndLoveStep: 'Compressão elástica com elevação para limitar o edema distal + Carga progressiva assim que tolerar a pisada.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase Inicial (Semana 1) — Mobilidade Livre e Isometria Sentado',
        recommendedExercises: [
          {
            title: 'Bomba de Tornozelo Ativa (Circulação e Drenagem)',
            category: 'mobilidade',
            frequency: '3 a 4 vezes ao dia',
            dosage: '20 repetições para cima e para baixo',
            instruction: 'Sentado ou deitado com a perna elevada, mova a ponta do pé apontando para a frente e depois puxando para você sem forçar o limite da dor.',
            precautions: 'Realizar em ritmo rítmico e constante.'
          },
          {
            title: 'Elevação de Calcanhares Sentado (Isometria de Sóleo)',
            category: 'fortalecimento',
            frequency: '2 vezes ao dia',
            dosage: '3 séries de 12 repetições com pausa de 3 segundos no topo',
            instruction: 'Sentado em uma cadeira com os joelhos a 90 graus, eleve os calcanhares empurrando os dedos contra o chão. Sinta a panturrilha contrair sem dor excessiva.',
            precautions: 'Se doer mais de 3/10, reduza a altura da elevação.'
          }
        ]
      },
      {
        phaseName: 'Fase Avançada (Semanas 2 a 4) — Carga Bipodal e Excêntrico Suave',
        recommendedExercises: [
          {
            title: 'Elevação de Panturrilha em Pé (Bipodal)',
            category: 'fortalecimento',
            frequency: '1 vez ao dia (dias alternados)',
            dosage: '3 séries de 10 a 15 repetições lentas',
            instruction: 'Em pé perto da parede para equilíbrio, apoie as duas mãos. Suba nos dois pés na ponta dos dedos em 2 segundos e desça lentamente em 3 segundos.',
            precautions: 'Não despenque na descida; controle excêntrico é a chave para o tendão.'
          },
          {
            title: 'Alongamento Suave de Gastrocnêmio na Toalha',
            category: 'alongamento',
            frequency: '1 a 2 vezes ao dia',
            dosage: '3 repetições de 20 segundos',
            instruction: 'Sentado com a perna estendida, passe uma toalha na sola do pé e puxe suavemente até sentir uma tensão agradável e indolor no ventre muscular.',
            precautions: 'Nunca faça puxões bruscos; apenas mantenha a tensão sustentada.'
          }
        ]
      }
    ],
    evidenceCitation: 'Kwak HS et al. "Tennis leg": clinical anatomy, imaging and rehabilitation. Radiographics (2014); Brukner & Khan Clinical Sports Medicine (5th ed).',
    doi: '10.1148/rg.341135061'
  },
  {
    id: 'lesao-reto-femoral-quadriceps',
    name: 'Distensão de Quadríceps / Reto Femoral',
    category: 'estiramento',
    severity: 'Grau 1 a 2',
    affectedMuscles: ['Reto Femoral', 'Vasto Medial', 'Vasto Lateral', 'Vasto Intermédio'],
    anatomicalRegion: 'Coxa Anterior',
    mechanism: 'Chute potente, extensão explosiva do joelho com quadril hiperestendido ou frenagem abrupta.',
    symptoms: [
      'Dor na parte frontal da coxa ao dobrar o joelho completamente para trás',
      'Desconforto ao chutar, correr ou descer ladeiras/escadas',
      'Ponto doloroso bem palpável no terço médio ou superior da coxa anterior'
    ],
    healingPhases: [
      {
        phase: 'Fase Inicial (0 a 72h)',
        duration: '3 dias',
        biologicalProcess: 'Repouso de movimentos explosivos e proteção.',
        safeAction: 'Compressão elástica com coxa levemente flexionada, contração isométrica de quadríceps com perna estendida.',
        contraindication: 'Alongamento forçado com o calcanhar colado no glúteo logo após a lesão.'
      },
      {
        phase: 'Fase Intermediária (4 a 14 dias)',
        duration: '10 dias',
        biologicalProcess: 'Crescimento de novos capilares e reforço do tecido conectivo.',
        safeAction: 'Elevação da perna esticada (Straight Leg Raise), agachamento curto isométrico na parede (Wall Sit suave).',
        contraindication: 'Chute com bola ou saltos verticais.'
      }
    ],
    peaceAndLoveStep: 'P.E.A.C.E. para evitar hematoma volumoso + L.O.V.E. com fortalecimento isométrico precoce.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase de Ativação Segura',
        recommendedExercises: [
          {
            title: 'Isometria de Quadríceps com Rolo / Toalha sob o Joelho',
            category: 'fortalecimento',
            frequency: '2 vezes ao dia',
            dosage: '3 séries de 10 repetições de 6 segundos de sustentação',
            instruction: 'Deitado com as pernas esticadas, coloque uma toalha enrolada embaixo do joelho dolorido. Aperte a toalha contra a cama ativando o quadríceps, levantando levemente o calcanhar.',
            precautions: 'Aperto firme e constante, sem solavancos.'
          },
          {
            title: 'Elevação da Perna Reta (Straight Leg Raise)',
            category: 'fortalecimento',
            frequency: '1 vez ao dia',
            dosage: '3 séries de 8 a 10 repetições',
            instruction: 'Com a outra perna dobrada, mantenha o joelho operado/lesionado bem reto e eleve a perna cerca de 30 cm do chão. Segure 1 segundo e desça com controle.',
            precautions: 'Não deixe o joelho dobrar durante a subida.'
          }
        ]
      }
    ],
    evidenceCitation: 'Mendiguchia J et al. Rectus femoris muscle injuries in sports. Clin Sports Med (2013).',
    doi: '10.1016/j.csm.2012.08.010'
  },
  {
    id: 'lesao-adutores-pubalgia',
    name: 'Estiramento de Adutores da Coxa / Virilha',
    category: 'estiramento',
    severity: 'Grau 1 a 2',
    affectedMuscles: ['Adutor Longo', 'Grácil', 'Adutor Magno', 'Pectíneo'],
    anatomicalRegion: 'Virilha / Pélvis',
    mechanism: 'Mudança súbita de direção, abertura excessiva das pernas em escorregão ou passe lateral no futebol.',
    symptoms: [
      'Dor na virilha e na face interna da coxa ao aproximar as pernas',
      'Dor ao tossir ou contrair o abdômen em casos com sobrecarga púbica associada',
      'Dificuldade para cruzar as pernas sentado'
    ],
    healingPhases: [
      {
        phase: 'Fase Aguda (1 a 5 dias)',
        duration: '5 dias',
        biologicalProcess: 'Proteção do ramo ósseo púbico e das fibras do adutor longo.',
        safeAction: 'Compressão pélvica, aperto suave de bola macia ou travesseiro entre os joelhos.',
        contraindication: 'Alongamento em "borboleta" forçado que estressa a sínfise púbica.'
      },
      {
        phase: 'Fase de Carga Progressiva (Semana 2 a 4)',
        duration: '3 semanas',
        biologicalProcess: 'Reorganização do tendão do adutor e estabilização pélvica cruzada com a fáscia abdominal.',
        safeAction: 'Protocolo de Copenhague modificado (nível 1 com apoio no chão), prancha lateral.',
        contraindication: 'Tiros de corrida com mudança de direção sem força adutora consolidada.'
      }
    ],
    peaceAndLoveStep: 'Fortalecimento isométrico com travesseiro precoce para manter a integridade da sínfise púbica sem dor.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase de Reativação Indolor',
        recommendedExercises: [
          {
            title: 'Aperto Isométrico de Almofada entre os Joelhos',
            category: 'fortalecimento',
            frequency: '2 vezes ao dia',
            dosage: '3 séries de 10 repetições de 5 segundos',
            instruction: 'Deitado de barriga para cima com os joelhos dobrados, coloque uma almofada ou bola macia entre os joelhos. Aperte suavemente com 40% da força, segure e relaxe.',
            precautions: 'Se provocar pontada na virilha, reduza a força do aperto.'
          },
          {
            title: 'Ponte Pélvica com Apoio Adutor',
            category: 'controle_motor',
            frequency: '1 vez ao dia',
            dosage: '3 séries de 10 repetições',
            instruction: 'Mantenha a almofada levemente pressionada entre os joelhos enquanto eleva e abaixa o quadril em ponte.',
            precautions: 'Trabalho sincronizado de glúteo e adutor protege a bacia.'
          }
        ]
      }
    ],
    evidenceCitation: 'Holmich P et al. Effectiveness of active physical training on groin pain. Lancet (1999); Haroy J et al. Copenhagen Adduction Exercise. BJSM (2019).',
    doi: '10.1136/bjsports-2017-098937'
  },
  {
    id: 'lesao-contratura-paravertebral',
    name: 'Contratura e Espasmo Protetor Paravertebral (Lombar / Cervical)',
    category: 'contratura',
    severity: 'Funcional / Autolimitada',
    affectedMuscles: ['Eretores da Espinha', 'Multífidos Lombares', 'Quadrado Lombar', 'Trapézio Superior'],
    anatomicalRegion: 'Coluna / Paravertebral',
    mechanism: 'Resposta neuromuscular reflexa a sobrecarga postural súbita, levantar peso em flexão ou mecanismo de defesa contra estresse articular.',
    symptoms: [
      'Sensação de "coluna travada" ou nódulo muscular endurecido',
      'Dificuldade para flexionar ou estender o tronco',
      'Dor surda e pesada que alivia na posição deitada de lado ou de barriga para cima com pernas apoiadas'
    ],
    healingPhases: [
      {
        phase: 'Fase de Dessensibilização (0 a 48h)',
        duration: '2 dias',
        biologicalProcess: 'Hiperatividade reflexa das fibras gama e isquemia local temporária no ventre muscular.',
        safeAction: 'Calor úmido superficial (bolsa morna por 15-20 min), respiração diafragmática lenta, caminhadas leves frequentes (5 min a cada hora).',
        contraindication: 'Repouso absoluto na cama por mais de 24 horas (o repouso piora a rigidez e prolonga a incapacidade).'
      },
      {
        phase: 'Fase de Movimentação Fluida (Dia 3 em diante)',
        duration: '1 a 2 semanas',
        biologicalProcess: 'Normalização do tônus e restabelecimento da vascularização local.',
        safeAction: 'Mobilização pélvica em decúbito (Gato-Camelo no chão), inclinações pélvicas suaves.',
        contraindication: 'Manobras bruscas de estalo forçado sem aquecimento prévio.'
      }
    ],
    peaceAndLoveStep: 'Educação em dor e desmistificação: a coluna é uma estrutura resistente e o espasmo é protetor, não uma quebra estrutural.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase de Desbloqueio e Conforto',
        recommendedExercises: [
          {
            title: 'Respiração Diafragmática com Pernas Apoiadas (Alívio Lombar)',
            category: 'mobilidade',
            frequency: '2 vezes ao dia',
            dosage: '5 a 8 minutos',
            instruction: 'Deite-se no chão ou colchonete com as pernas dobradas a 90 graus apoiadas em uma cadeira ou sofá. Coloque a mão no abdômen e respire enchendo a barriga e soltando o ar devagar.',
            precautions: 'Permite que a musculatura paravertebral desligue o tônus de alerta.'
          },
          {
            title: 'Mobilização do Gato-Camelo em 4 Apoios',
            category: 'mobilidade',
            frequency: '2 vezes ao dia',
            dosage: '2 séries de 8 a 10 ciclos suaves',
            instruction: 'Apoie mãos e joelhos no chão. Arredonde as costas para cima suavemente olhando para o umbigo, e depois desça o tronco suavemente olhando para a frente.',
            precautions: 'Movimento fluido, como uma massagem interna, sem forçar finais de curso dolorosos.'
          }
        ]
      }
    ],
    evidenceCitation: 'Foster NE et al. Prevention and treatment of low back pain: evidence, challenges, and promising directions. Lancet (2018); O’Sullivan P et al. BJSM (2020).',
    doi: '10.1016/S0140-6736(18)30489-6'
  },
  {
    id: 'lesao-dmit-doms',
    name: 'Dor Muscular de Início Tardio (DMIT / DOMS)',
    category: 'dmit',
    severity: 'Funcional / Autolimitada',
    affectedMuscles: ['Qualquer grupamento após exercício não habitual com componente excêntrico'],
    anatomicalRegion: 'Coxa Anterior',
    mechanism: 'Microrrupturas nas linhas Z dos sarcômeros após esforço físico novo ou desacelerações intensas, com liberação de creatina quinase (CK).',
    symptoms: [
      'Dor que surge entre 12h e 24h após o treino e atinge o pico entre 48h e 72h',
      'Sensação de rigidez e peso muscular difuso',
      'Sensibilidade aumentada à palpação profunda',
      'Desaparecimento espontâneo completo após 4 a 7 dias sem sequelas'
    ],
    healingPhases: [
      {
        phase: 'Fase de Adaptação Biológica (24h a 96h)',
        duration: '3 a 5 dias',
        biologicalProcess: 'Inflamação fisiológica asséptica necessária para a supercompensação muscular (efeito de repetição do estímulo - repeated bout effect).',
        safeAction: 'Recuperação ativa (caminhada leve, bicicleta sem carga), hidratação, banho morno, sono de qualidade.',
        contraindication: 'Tomar anti-inflamatórios não esteroidais (ibuprofeno, diclofenaco) que bloqueiam a hipertrofia e a cicatrização natural.'
      }
    ],
    peaceAndLoveStep: 'Otimismo e Movimento Leve: compreender que é uma resposta adaptativa saudável do músculo ao treino.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase de Recuperação Ativa',
        recommendedExercises: [
          {
            title: 'Recuperação Ativa de Baixa Intensidade (Caminhada ou Ciclismo Suave)',
            category: 'mobilidade',
            frequency: '1 vez ao dia',
            dosage: '15 a 20 minutos em ritmo leve (conversa confortável)',
            instruction: 'Faça uma caminhada ou pedalada leve sem resistência para aumentar o fluxo sanguíneo local e acelerar a drenagem de metabólitos.',
            precautions: 'Não realizar treinos pesados ou tiros até a dor regredir para nível < 2/10.'
          }
        ]
      }
    ],
    evidenceCitation: 'Cheung K, Hume P, Maxwell L. Delayed onset muscle soreness: treatment strategies and performance factors. Sports Med (2003).',
    doi: '10.2165/00007256-200333020-00005'
  },
  {
    id: 'lesao-contusao-muscular',
    name: 'Contusão Muscular Direta (Trauma Contuso / "Tostão / Paulistinha")',
    category: 'contusao',
    severity: 'Grau 1 a 2',
    affectedMuscles: ['Vasto Lateral', 'Vasto Intermédio', 'Glúteo Máximo', 'Bíceps Braquial'],
    anatomicalRegion: 'Coxa Anterior',
    mechanism: 'Impacto direto de objeto ou joelho de adversário contra a massa muscular, esmagando as fibras contra o osso subjacente.',
    symptoms: [
      'Dor localizada no ponto exato do impacto com edema e endurecimento imediato',
      'Restrição temporária de dobrar o joelho ou movimentar o membro',
      'Formação de hematoma intramuscular ou intermuscular'
    ],
    healingPhases: [
      {
        phase: 'Fase Crítica (Primeiras 48 a 72h)',
        duration: '72 horas',
        biologicalProcess: 'Estabilização do hematoma. Risco de miosite ossificante (calcificação ectópica) se houver calor excessivo ou massagem agressiva precoce.',
        safeAction: 'Gelo por 15 minutos em ciclos (se houver dor intensa) nas primeiras 24h, compressão com joelho levemente fletido (se coxa), proteção contra novos traumas.',
        contraindication: 'MASSAGEM FORTE, calor intenso imediato, alongamento agressivo.'
      },
      {
        phase: 'Fase de Reabsorção (> 72h)',
        duration: '1 a 3 semanas',
        biologicalProcess: 'Fagocitose do coágulo e regeneração das miofibrilas.',
        safeAction: 'Movimentação ativa sem carga, contrações isométricas suaves, retorno gradual à caminhada.',
        contraindication: 'Retorno ao esporte de contato antes da recuperação total da amplitude de movimento articular.'
      }
    ],
    peaceAndLoveStep: 'P.E.A.C.E. rigoroso nas primeiras 72 horas para prevenir complicações e hematomas expansivos.',
    homeRehabProtocol: [
      {
        phaseName: 'Fase de Proteção e Drenagem',
        recommendedExercises: [
          {
            title: 'Isometria Leve com Joelho em Flexão de Conforto',
            category: 'fortalecimento',
            frequency: '2 vezes ao dia',
            dosage: '3 séries de 10 segundos com pouca força',
            instruction: 'Com o joelho em posição de conforto (levemente dobrado), faça uma leve força para esticar sem movimentar a articulação.',
            precautions: 'Nunca massageie o local do impacto nas primeiras 72 horas.'
          }
        ]
      }
    ],
    evidenceCitation: 'Crisco JJ et al. Muscle contusion injury and repair. Clin Sports Med (2013).',
    doi: '10.1016/j.csm.2012.08.012'
  }
];

export const PEACE_AND_LOVE_GUIDE = [
  {
    letter: 'P',
    term: 'Protect (Proteger)',
    explanation: 'Nas primeiras 24h a 48h, reduza a sobrecarga e evite movimentos que provoquem dor aguda. Não imobilize completamente — apenas descarregue o peso excessivo.',
    whyImportant: 'Previne o aumento da lesão das fibras musculares sem os malefícios da atrofia por imobilização gessada.'
  },
  {
    letter: 'E',
    term: 'Elevate (Elevar)',
    explanation: 'Se a lesão for na perna ou braço, apoie o membro acima do nível do coração sempre que estiver descansando.',
    whyImportant: 'Facilita a drenagem do líquido intersticial e reduz o inchaço estagnado.'
  },
  {
    letter: 'A',
    term: 'Avoid Anti-inflammatory (Evitar Anti-inflamatórios)',
    explanation: 'Evite tomar anti-inflamatórios não esteroidais (ibuprofeno, cetoprofeno, diclofenaco) sem indicação médica formal. Também não use gelo por mais de 10-15 minutos.',
    whyImportant: 'A inflamação é a primeira fase biológica de cura! Sem inflamação, as células satélites não reconstroem o tecido muscular com a mesma força mecânica.'
  },
  {
    letter: 'C',
    term: 'Compress (Comprimir)',
    explanation: 'Aplique uma faixa elástica suave ou meia compressiva no membro atingido sem prender a circulação.',
    whyImportant: 'Limita o extravasamento de sangue intramuscular e a formação de hematomas volumosos.'
  },
  {
    letter: 'E',
    term: 'Educate (Educar-se)',
    explanation: 'Entenda que seu corpo tem grande capacidade de autocura ativa. Evite repouso absoluto prolongado e terapias passivas caras.',
    whyImportant: 'Pacientes que entendem a fisiologia da dor recuperam-se mais rápido e com menos medo do movimento.'
  },
  {
    letter: 'L',
    term: 'Load (Carga Progressiva)',
    explanation: 'Após as primeiras 48h-72h, comece a colocar carga e movimentos graduais sem dor excessiva (máximo 3/10).',
    whyImportant: 'O colágeno e as fibras musculares precisam de estímulo de tração mecânica para se alinharem na direção correta de força.'
  },
  {
    letter: 'O',
    term: 'Optimism (Otimismo e Confiança)',
    explanation: 'Mantenha atitude positiva. A esmagadora maioria das lesões musculares cicatriza perfeitamente com reabilitação ativa.',
    whyImportant: 'O cérebro modula os circuitos de dor; o medo excessivo (cinesiofobia) amplifica a dor no sistema nervoso central.'
  },
  {
    letter: 'V',
    term: 'Vascularisation (Vascularização Aeróbica)',
    explanation: 'Pratique exercícios aeróbicos sem impacto e sem dor (caminhada leve, pedalar leve na bicicleta) precocemente.',
    whyImportant: 'Aumenta o fluxo de oxigênio e nutrientes essenciais para a área lesionada, acelerando o metabolismo tecidual.'
  },
  {
    letter: 'E',
    term: 'Exercise (Exercícios de Força e Mobilidade)',
    explanation: 'Faça exercícios ativos de controle motor, isometria e fortalecimento excêntrico progressivo.',
    whyImportant: 'Restaura a força muscular, previne o encurtamento da cicatriz e blinda contra recidivas futuras.'
  }
];
