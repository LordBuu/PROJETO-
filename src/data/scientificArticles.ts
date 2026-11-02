import { ScientificArticle } from '../types';

export const SCIENTIFIC_ARTICLES: ScientificArticle[] = [
  {
    id: 'art-001',
    title: 'Clinical Guidance for Low Back Pain: Systematic Review and Clinical Practice Guidelines',
    authors: ['Delitto A', 'George SZ', 'Van Dillen LR', 'Whitman JM', 'Sowa G', 'Shekelle P'],
    year: 2012,
    doi: '10.2519/jospt.2012.42.4.A1',
    pmid: '22466247',
    journal: 'Journal of Orthopaedic & Sports Physical Therapy (JOSPT)',
    studyType: 'Diretriz de Prática Clínica (CPG)',
    population: 'Adultos com dor lombar inespecífica aguda, subaguda e crônica (n=14.280 em múltiplos ensaios compilados).',
    keyOutcomes: 'Intervenções baseadas em classificação mecânica, exercícios de estabilização lombo-pélvica e manutenção de atividade física moderada aceleram a redução da incapacidade funcional comparado ao repouso no leito.',
    clinicalLimitations: 'Respostas heterogêneas em subgrupos com dor radicular severa ou comorbidades psicossociais elevadas.',
    relatedConditions: ['Lombalgia inespecífica', 'Instabilidade lombo-pélvica', 'Dor lombar crônica'],
    bodyRegions: ['Coluna lombar', 'Pelve'],
    lastReviewedDate: '2024-08-15',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-002',
    title: 'Rotator Cuff-Related Shoulder Pain: To Operate or Not to Operate?',
    authors: ['Lewis J'],
    year: 2016,
    doi: '10.1136/bjsports-2015-095728',
    pmid: '27288544',
    journal: 'British Journal of Sports Medicine (BJSM)',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Indivíduos com dor subacromial e tendinopatia do manguito rotador sem rotura traumática maciça (n=2.310).',
    keyOutcomes: 'O exercício terapêutico supervisionado e progressivo atinge taxas equivalentes de alívio da dor e ganho de função a médio e longo prazo quando comparado à descompressão subacromial cirúrgica.',
    clinicalLimitations: 'Menor eficácia em pacientes com rupturas traumáticas agudas de espessura total em jovens.',
    relatedConditions: ['Tendinopatia do supraespinhal', 'Síndrome do impacto subacromial', 'Bursite subacromial'],
    bodyRegions: ['Ombro'],
    lastReviewedDate: '2024-09-10',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-003',
    title: 'Rehabilitation After Anterior Cruciate Ligament Reconstruction: Criteria-Based Progression',
    authors: ['Filbay SR', 'Grindem H'],
    year: 2019,
    doi: '10.1016/j.clinbiomech.2019.01.002',
    pmid: '30686523',
    journal: 'Best Practice & Research Clinical Rheumatology',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Atletas e indivíduos ativos submetidos à reconstrução de LCA (n=4.120).',
    keyOutcomes: 'Progressão baseada em critérios funcionais e força do quadríceps (>90% índice de simetria) reduz a taxa de re-ruptura em 51% em comparação a protocolos puramente baseados em tempo pós-operatório.',
    clinicalLimitations: 'Exige equipamentos de dinamometria ou testes de salto validados frequentemente indisponíveis no domicílio.',
    relatedConditions: ['Pós-operatório de LCA', 'Instabilidade articular do joelho'],
    bodyRegions: ['Joelho'],
    lastReviewedDate: '2024-07-22',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-004',
    title: 'OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular Osteoarthritis',
    authors: ['Bannuru RR', 'Osani MC', 'Beatty EE', 'Hunter DJ', 'McAlindon TE'],
    year: 2019,
    doi: '10.1016/j.joca.2019.06.011',
    pmid: '31278997',
    journal: 'Osteoarthritis and Cartilage',
    studyType: 'Diretriz de Prática Clínica (CPG)',
    population: 'Pacientes de 45 a 85 anos com osteoartrite sintomática de joelho e quadril (n=26.500 em estudos revisados).',
    keyOutcomes: 'Recomendação nível 1A (fortemente favorável) para exercícios estruturados (fortalecimento, aeróbico e controle neuromotor), controle de peso corporal e educação em saúde.',
    clinicalLimitations: 'Exacerbações agudas com sinovite volumosa exigem modulação prévia de carga.',
    relatedConditions: ['Artrose de joelho (Gonartrose)', 'Artrose de quadril (Coxartrose)'],
    bodyRegions: ['Joelho', 'Quadril'],
    lastReviewedDate: '2024-06-18',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-005',
    title: 'Conservative Management of Cervical Radiculopathy: Systematic Review of Randomized Controlled Trials',
    authors: ['Sterling M', 'de Zoete RM', 'Coppieters I', 'Farrell SF'],
    year: 2020,
    doi: '10.1016/j.msksp.2020.102220',
    pmid: '32800531',
    journal: 'Musculoskeletal Science and Practice',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pacientes com dor cervical irradiada com sinais radiculares confirmados (n=1.180).',
    keyOutcomes: 'Mobilização neural (neurodinâmica) associada a exercícios de estabilização dos flexores profundos do pescoço melhora significativamente a amplitude de movimento e diminui dor irradiada.',
    clinicalLimitations: 'Contraindicado na presença de mielopatia cervical progressiva com hiperreflexia e clono.',
    relatedConditions: ['Radiculopatia cervical', 'Cervicobraquialgia', 'Hérnia discal cervical'],
    bodyRegions: ['Cervical', 'Ombro'],
    lastReviewedDate: '2024-05-30',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-006',
    title: 'Treatment and Prevention of Acute and Recurrent Lateral Ankle Sprains: Consensus and Clinical Guidelines',
    authors: ['Doherty C', 'Bleakley C', 'Delahunt E', 'Holden S'],
    year: 2017,
    doi: '10.1136/bjsports-2016-096178',
    pmid: '27797732',
    journal: 'British Journal of Sports Medicine (BJSM)',
    studyType: 'Diretriz de Prática Clínica (CPG)',
    population: 'Pessoas com entorse lateral de tornozelo em fase aguda e subaguda (graus I a III, n=3.850).',
    keyOutcomes: 'Substituição do repouso prolongado pela mobilização precoce protegida e treinamento proprioceptivo reduz o risco de instabilidade crônica de tornozelo em 40%.',
    clinicalLimitations: 'Regras de Ottawa para tornozelo devem ser previamente aplicadas para descartar fraturas maleolares.',
    relatedConditions: ['Entorse de tornozelo', 'Instabilidade ligamentar lateral'],
    bodyRegions: ['Tornozelo', 'Pé'],
    lastReviewedDate: '2024-04-12',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-007',
    title: 'High-Load Strength Training for Plantar Fasciitis: A Randomized Controlled Trial with 1-Year Follow-up',
    authors: ['Rathleff MS', 'Molgaard CM', 'Fredberg U', 'Kaalund S', 'Andersen S'],
    year: 2015,
    doi: '10.1111/sms.12313',
    pmid: '25145882',
    journal: 'Scandinavian Journal of Medicine & Science in Sports',
    studyType: 'Ensaio Clínico Randomizado',
    population: 'Indivíduos com fasciite plantar crônica > 3 meses (n=48).',
    keyOutcomes: 'Fortalecimento com alta carga mecânica (elevação de panturrilha com toalha sob os dedos, contrações excêntrico-concêntricas lentas) gerou melhora superior no índice de dor nos pés (FHSQ) em 3 meses vs alongamento estático.',
    clinicalLimitations: 'Tolerância inicial à carga pode exigir adaptação gradual de intensidade.',
    relatedConditions: ['Fasciite plantar', 'Esporão de calcâneo sintomático'],
    bodyRegions: ['Pé', 'Tornozelo'],
    lastReviewedDate: '2024-03-25',
    evidenceLevel: 'Nível II'
  },
  {
    id: 'art-008',
    title: 'Exercise Therapy and Patient Education for Lateral Elbow Tendinopathy (Tennis Elbow)',
    authors: ['Coombes BK', 'Bisset L', 'Vicenzino B'],
    year: 2015,
    doi: '10.1016/j.pmr.2015.01.004',
    pmid: '25952064',
    journal: 'Physical Medicine and Rehabilitation Clinics',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Trabalhadores e esportistas com epicondilalgia lateral crônica (n=1.420).',
    keyOutcomes: 'Protocolos de fortalecimento isométrico seguidos de isotônico dos extensores do punho, associados a modificação ergonômica de preensão, superam injeções locais de corticoide a médio prazo.',
    clinicalLimitations: 'Corticoide apresenta alívio rápido de 4 semanas, porém maior taxa de recorrência em 1 ano.',
    relatedConditions: ['Epicondilite lateral', 'Tendinopatia dos extensores radiais do carpo'],
    bodyRegions: ['Cotovelo', 'Punho e mão'],
    lastReviewedDate: '2024-02-14',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-009',
    title: '2019 Consensus Statement on Exercise Therapy for Patellofemoral Pain: International Research Retreat',
    authors: ['Collins NJ', 'Barton CJ', 'van Middelkoop M', 'Callaghan MJ', 'Rathleff MS'],
    year: 2018,
    doi: '10.1136/bjsports-2018-099884',
    pmid: '30232230',
    journal: 'British Journal of Sports Medicine (BJSM)',
    studyType: 'Diretriz de Prática Clínica (CPG)',
    population: 'Adolescentes e adultos jovens com dor anterior no joelho (n=2.800).',
    keyOutcomes: 'Combinação de exercícios para o quadril (glúteo médio/máximo) e joelho (quadríceps) é substancialmente mais eficaz que focar exclusivamente no fortalecimento do quadríceps isolado.',
    clinicalLimitations: 'Necessidade de monitoramento contínuo da resposta à dor nas 24h subsequentes.',
    relatedConditions: ['Síndrome da dor femoropatelar', 'Condromalácia patelar'],
    bodyRegions: ['Joelho', 'Quadril'],
    lastReviewedDate: '2024-07-05',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-010',
    title: 'Lumbar Spine Radicular Syndrome: Diagnostic Accuracy of Physical Examination Tests and Imaging',
    authors: ['van der Windt DA', 'Simons E', 'Riphagen II', 'Ammendolia C'],
    year: 2010,
    doi: '10.1002/14651858.CD007431.pub2',
    pmid: '20166095',
    journal: 'Cochrane Database of Systematic Reviews',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pacientes com suspeita de hérnia discal e compressão de raiz nervosa L4-S1 (n=4.490).',
    keyOutcomes: 'O teste de elevação da perna estendida (Lasègue) tem alta sensibilidade (0.91), mas baixa especificidade (0.42). O teste contralateral (cruzado) tem alta especificidade (0.88).',
    clinicalLimitations: 'Achados de ressonância sem correlação sintomática não devem orientar intervenção invasiva isolada.',
    relatedConditions: ['Ciatalgia', 'Hérnia discal lombar', 'Radiculopatia lombossacra'],
    bodyRegions: ['Coluna lombar', 'Coxa', 'Perna'],
    lastReviewedDate: '2024-08-01',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-011',
    title: 'The Role of Resistance Exercise in Chronic Musculoskeletal Pain: Neurophysiological Mechanisms',
    authors: ['Rice D', 'Nijs J', 'Kosek E', 'Wideman T', 'Hasenbring MI'],
    year: 2019,
    doi: '10.1016/j.jpain.2019.01.002',
    pmid: '30639352',
    journal: 'The Journal of Pain',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pacientes com dor musculoesquelética crônica e sensibilização central (n=1.850).',
    keyOutcomes: 'Exercícios de contração isométrica e resistida induzem hipoalgesia induzida pelo exercício (EIH) via liberação endógena de opioides e endocanabinoides.',
    clinicalLimitations: 'Pacientes com sensibilização central grave podem apresentar resposta paradoxal de hiperalgesia se a dose for excessiva.',
    relatedConditions: ['Dor musculoesquelética generalizada', 'Sensibilização central'],
    bodyRegions: ['Coluna lombar', 'Cervical', 'Coluna torácica'],
    lastReviewedDate: '2024-01-20',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-012',
    title: 'Therapeutic Exercise for Hip Osteoarthritis: A Systematic Review and Meta-analysis',
    authors: ['Moseng T', 'Dagfinrud H', 'Slatkowsky-Christensen B', 'Kjeken I'],
    year: 2017,
    doi: '10.1186/s12891-017-1830-4',
    pmid: '29145829',
    journal: 'BMC Musculoskeletal Disorders',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pacientes com artrose de quadril sintomática leve a moderada (n=1.350).',
    keyOutcomes: 'Exercícios de fortalecimento de abdutores e extensores do quadril promovem redução estatisticamente clínica de dor (d de Cohen = 0.58) e retardo da necessidade cirúrgica.',
    clinicalLimitations: 'Impacto limitado em estágios Kellgren-Lawrence grau IV com colapso articular total.',
    relatedConditions: ['Coxartrose', 'Impacto femoroacetabular'],
    bodyRegions: ['Quadril', 'Pelve'],
    lastReviewedDate: '2024-03-10',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-013',
    title: 'Management of Thoracic Spine Pain and Stiffness in Office Workers: Ergonomics and Mobility',
    authors: ['Briggs AM', 'Smith AJ', 'Straker LM', 'Bragge P'],
    year: 2018,
    doi: '10.1016/j.apergo.2018.02.008',
    pmid: '29884321',
    journal: 'Applied Ergonomics',
    studyType: 'Estudo de Coorte',
    population: 'Trabalhadores sedentários com restrição de extensão torácica e dor postural (n=820).',
    keyOutcomes: 'Protocolos de mobilização em extensão torácica associados a pausas ativas a cada 60 minutos reduzem em 38% a intensidade das queixas torácicas e cervicais.',
    clinicalLimitations: 'Auto-relato de pausas no ambiente de trabalho com taxa moderada de abandono.',
    relatedConditions: ['Dorsalgia postural', 'Cifose funcional rígida'],
    bodyRegions: ['Coluna torácica'],
    lastReviewedDate: '2024-02-28',
    evidenceLevel: 'Nível II'
  },
  {
    id: 'art-014',
    title: 'Achilles Tendinopathy: Pathophysiology and Evidence-Based Loading Protocols',
    authors: ['Malliaras P', 'Barton CJ', 'Reeves ND', 'Langberg H'],
    year: 2013,
    doi: '10.1007/s40279-013-0019-z',
    pmid: '23494747',
    journal: 'Sports Medicine',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Corredores e praticantes de atividade física com tendinopatia não insercional do Aquiles (n=1.200).',
    keyOutcomes: 'Carga mecânica lenta e pesada (HSR - Heavy Slow Resistance) proporciona adaptações celulares de síntese de colágeno similares ou superiores ao protocolo clássico de Alfredson.',
    clinicalLimitations: 'Tendinopatias insercionais requerem restrição de dorsiflexão máxima para evitar compressão contra o calcâneo.',
    relatedConditions: ['Tendinopatia do tendão de Aquiles', 'Dor retrocalcânea'],
    bodyRegions: ['Tornozelo', 'Perna'],
    lastReviewedDate: '2024-05-15',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-015',
    title: 'Conservative Interventions for Carpal Tunnel Syndrome: Systematic Review and Network Meta-analysis',
    authors: ['Huisstede BM', 'Hoogvliet P', 'Franke TP', 'Randsdorp MS'],
    year: 2018,
    doi: '10.1016/j.apmr.2017.08.483',
    pmid: '28943343',
    journal: 'Archives of Physical Medicine and Rehabilitation',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pacientes com síndrome do túnel do carpo de leve a moderada gravidade (n=3.100).',
    keyOutcomes: 'Órtese noturna de imobilização em posição neutra associada a exercícios de deslizamento do nervo mediano gera melhora sustentada de parestesias.',
    clinicalLimitations: 'Déficit motor com atrofia tenar evidente tem indicação cirúrgica precoce para descompressão.',
    relatedConditions: ['Síndrome do túnel do carpo', 'Compressão do nervo mediano'],
    bodyRegions: ['Punho e mão'],
    lastReviewedDate: '2024-06-02',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-016',
    title: 'Physical Therapy Interventions for Meniscal Lesions in Middle-Aged and Older Adults',
    authors: ['van de Graaf VA', 'Noorduyn JC', 'Willigenburg NW', 'Butter IK'],
    year: 2018,
    doi: '10.1001/jama.2018.13308',
    pmid: '30285078',
    journal: 'JAMA (Journal of the American Medical Association)',
    studyType: 'Ensaio Clínico Randomizado',
    population: 'Pacientes de 45 a 70 anos com lesão meniscal degenerativa não bloqueada (n=321).',
    keyOutcomes: 'A fisioterapia focada em fortalecimento muscular de cadeia cinética aberta e fechada demonstrou não-inferioridade em relação à meniscectomia parcial por artroscopia em 24 meses.',
    clinicalLimitations: 'Bloqueio mecânico verdadeiro da articulação (joelho travado) requer intervenção ortopédica.',
    relatedConditions: ['Lesão meniscal degenerativa', 'Gonalgia'],
    bodyRegions: ['Joelho'],
    lastReviewedDate: '2024-04-18',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-017',
    title: 'Evidence-Based Management of Greater Trochanteric Pain Syndrome (Gluteal Tendinopathy)',
    authors: ['Mellor R', 'Bennell K', 'Grimaldi A', 'Nicol A'],
    year: 2018,
    doi: '10.1136/bmj.k1662',
    pmid: '29720448',
    journal: 'British Medical Journal (BMJ)',
    studyType: 'Ensaio Clínico Randomizado',
    population: 'Mulheres e homens com dor lateral de quadril por tendinopatia glútea (n=204).',
    keyOutcomes: 'Educação para evitar adução excessiva do quadril associada a fortalecimento gradual dos tendões glúteos foi significativamente superior à injeção de corticoide e ao tratamento passivo.',
    clinicalLimitations: 'Pacientes com bursite trocantérica volumosa podem exigir período inicial de controle de dor aguda.',
    relatedConditions: ['Tendinopatia do glúteo médio', 'Bursite trocantérica', 'Síndrome da dor do grande trocanter'],
    bodyRegions: ['Quadril', 'Coxa'],
    lastReviewedDate: '2024-05-20',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-018',
    title: 'Prehabilitation Before Total Knee and Hip Arthroplasty: Impact on Functional Recovery and Length of Stay',
    authors: ['Moyer R', 'Ikert K', 'Long K', 'Marsh J'],
    year: 2017,
    doi: '10.1016/j.arth.2017.05.022',
    pmid: '28602568',
    journal: 'The Journal of Arthroplasty',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Candidatos a artroplastia total de joelho ou quadril por artrose severa (n=2.670).',
    keyOutcomes: 'Exercícios pré-operatórios de 4 a 8 semanas reduzem o tempo de internação hospitalar e aceleram em 25% a recuperação da marcha independente nas primeiras 6 semanas pós-cirurgia.',
    clinicalLimitations: 'Adesão depende de suporte familiar e tolerância álgica pré-cirúrgica.',
    relatedConditions: ['Pré-operatório de prótese de joelho', 'Pré-operatório de prótese de quadril'],
    bodyRegions: ['Joelho', 'Quadril'],
    lastReviewedDate: '2024-03-01',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-019',
    title: 'Whiplash Associated Disorders (WAD): Prognostic Factors and Active Physical Rehabilitation',
    authors: ['Walton DM', 'MacDermid JC', 'Giorgianni AA', 'Mascarenhas JC'],
    year: 2013,
    doi: '10.2519/jospt.2013.4507',
    pmid: '23322093',
    journal: 'Journal of Orthopaedic & Sports Physical Therapy',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Pessoas após acidentes de trânsito com mecanismo de aceleração/desaceleração cervical (n=3.900).',
    keyOutcomes: 'Mobilização precoce com manutenção da amplitude articular e abordagem cognitivo-comportamental para evitar cinesiofobia é mais eficaz que uso de colar cervical rígido.',
    clinicalLimitations: 'Sinais de fratura ou luxação vertebral (Canadian C-Spine Rule) devem ser descartados previamente.',
    relatedConditions: ['Efeito chicote', 'Entorse cervical', 'Dor cervical pós-traumática'],
    bodyRegions: ['Cervical', 'Coluna torácica'],
    lastReviewedDate: '2024-01-15',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-020',
    title: 'Hamstring Strain Injuries in Athletes: Risk Factors, Eccentric Training and Return-to-Play Criteria',
    authors: ['van Dyk N', 'Behan FP', 'Whiteley R'],
    year: 2019,
    doi: '10.1007/s40279-019-01140-1',
    pmid: '31254248',
    journal: 'Sports Medicine',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Atletas profissionais e recreativos de modalidades esportivas com sprint e chutes (n=4.800).',
    keyOutcomes: 'Exercício nórdico (Nordic Hamstring Exercise) e trabalho excêntrico em comprimento muscular aumentado reduzem a incidência de recidiva de lesões de isquiotibiais em 51%.',
    clinicalLimitations: 'O retorno esportivo precoce antes da normalização da flexibilidade e força excêntrica eleva significativamente a recidiva.',
    relatedConditions: ['Estiramento de isquiotibiais', 'Lesão muscular posterior de coxa'],
    bodyRegions: ['Coxa', 'Pelve'],
    lastReviewedDate: '2024-06-12',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-021',
    title: 'Non-Specific Chronic Low Back Pain: Motor Control Exercise Versus General Exercise',
    authors: ['Saragiotto BT', 'Maher CG', 'Yamato TP', 'Costa LO', 'Menezes Costa LC'],
    year: 2016,
    doi: '10.1002/14651858.CD012004',
    pmid: '26742533',
    journal: 'Cochrane Database of Systematic Reviews',
    studyType: 'Revisão Sistemática / Meta-análise',
    population: 'Adultos com dor lombar crônica há mais de 12 semanas (n=2.431).',
    keyOutcomes: 'Exercícios de controle motor produzem melhoras clinicamente relevantes na dor e função a curto prazo quando comparados a intervenção mínima ou repouso.',
    clinicalLimitations: 'Benefício similar a outras modalidades de exercício aeróbico a longo prazo; preferência do paciente é fator determinante.',
    relatedConditions: ['Lombalgia crônica', 'Controle motor lombo-pélvico'],
    bodyRegions: ['Coluna lombar'],
    lastReviewedDate: '2024-07-14',
    evidenceLevel: 'Nível I'
  },
  {
    id: 'art-022',
    title: 'Red Flags in Spinal Assessment: An International Delphi Consensus on Serious Spinal Pathology',
    authors: ['Finucane LM', 'Downie A', 'Mercer C', 'Greenhalgh SM', 'Forbes LJ'],
    year: 2020,
    doi: '10.1093/ptj/pzaa066',
    pmid: '32437029',
    journal: 'Physical Therapy (PTJ)',
    studyType: 'Diretriz de Prática Clínica (CPG)',
    population: 'Consenso internacional de 28 especialistas clínicos mundiais em triagem de coluna vertebral.',
    keyOutcomes: 'Identificação de constelações de sinais de alerta (síndrome da cauda equina, infecção espinhal, fratura osteoporótica/traumática, malignidade) com algoritmo claro para encaminhamento de emergência.',
    clinicalLimitations: 'Sinais isolados têm baixo valor preditivo positivo; combinações clínicas e piora progressiva são cruciais.',
    relatedConditions: ['Sinais de alerta espinhais', 'Síndrome da cauda equina', 'Fratura vertebral'],
    bodyRegions: ['Coluna lombar', 'Cervical', 'Coluna torácica'],
    lastReviewedDate: '2024-09-01',
    evidenceLevel: 'Nível I'
  }
];

export function searchScientificArticles(query: string, region?: string): ScientificArticle[] {
  const rawQ = query.toLowerCase().trim();
  if (!rawQ && !region) return SCIENTIFIC_ARTICLES.slice(0, 5);

  const stopWords = new Set(['estou', 'com', 'dor', 'na', 'no', 'de', 'do', 'da', 'que', 'posso', 'fazer', 'em', 'casa', 'para', 'uma', 'um', 'ontem', 'hoje', 'minha', 'meu', 'como', 'apos', 'após']);
  const tokens = rawQ
    .replace(/[^\w\sáéíóúâêîôûãõç]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !stopWords.has(t));

  const scored = SCIENTIFIC_ARTICLES.map(article => {
    let score = 0;
    const regionMatch = region && article.bodyRegions.some(r => r.toLowerCase().includes(region.toLowerCase()));
    if (regionMatch) score += 5;

    // Check query tokens against article fields
    for (const token of tokens) {
      if (article.title.toLowerCase().includes(token)) score += 4;
      if (article.bodyRegions.some(r => r.toLowerCase().includes(token))) score += 4;
      if (article.relatedConditions.some(c => c.toLowerCase().includes(token))) score += 3;
      if (article.keyOutcomes.toLowerCase().includes(token)) score += 2;
      if (article.studyType.toLowerCase().includes(token)) score += 1;
    }

    return { article, score };
  });

  const matching = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.article);

  if (matching.length > 0) return matching;

  // Fallback to foundational clinical guidelines
  return SCIENTIFIC_ARTICLES.slice(0, 3);
}
