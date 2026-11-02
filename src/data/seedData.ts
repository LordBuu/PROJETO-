import { 
  UserProfile, 
  PatientAssessment, 
  BodyPoint, 
  MedicalDocument, 
  AiSuggestionReview, 
  PatientProfessionalLink, 
  RoutineActivity, 
  SymptomLog, 
  ChatMessage,
  AuditLog
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-patient-01',
    name: 'Mariana Silva',
    email: 'mariana.silva@reavita.med.br',
    role: 'patient',
    phone: '(11) 98451-2033',
    cpf: '349.812.908-11',
    passwordHash: 'senha123',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    themePreference: 'light',
    mfaEnabled: false,
    createdAt: '2024-05-10T10:00:00Z'
  },
  {
    id: 'user-patient-02',
    name: 'Roberto Mendonça (Paciente 2)',
    email: 'roberto.mendonca@gmail.com',
    role: 'patient',
    phone: '(11) 97722-1100',
    cpf: '882.119.456-02',
    passwordHash: 'senha123',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    themePreference: 'light',
    mfaEnabled: false,
    createdAt: '2024-05-11T14:00:00Z'
  },
  {
    id: 'user-physio-01',
    name: 'Dr. Patrick Alencar',
    email: 'patrickjr2004@gmail.com',
    role: 'physiotherapist',
    phone: '(11) 97120-4491',
    cpf: '192.831.092-44',
    passwordHash: 'senha123',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    crefito: {
      number: '184920-F',
      region: 'CREFITO-3 (SP)',
      category: 'Fisioterapeuta Especialista em Ortopedia',
      status: 'approved',
      verifiedAt: '2024-01-15T14:30:00Z',
      verificationNotes: 'Registro ativo e regular no COFFITO/CREFITO-3.'
    },
    clinicId: 'clinic-01',
    clinicName: 'Clínica VitaMove Reabilitação Integrada',
    themePreference: 'light',
    mfaEnabled: true,
    createdAt: '2024-01-12T08:00:00Z'
  },
  {
    id: 'user-physio-pending',
    name: 'Dra. Larissa Mendes',
    email: 'larissa.mendes@reavita.med.br',
    role: 'physiotherapist',
    phone: '(41) 99201-1188',
    cpf: '449.123.882-00',
    passwordHash: 'senha123',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    crefito: {
      number: '291834-F',
      region: 'CREFITO-8 (PR)',
      category: 'Fisioterapeuta',
      status: 'under_review',
      verificationNotes: 'Comprovante anexado aguardando checagem cadastral na base COFFITO.'
    },
    themePreference: 'light',
    createdAt: '2024-10-28T11:20:00Z'
  },
  {
    id: 'user-clinic-admin-01',
    name: 'Dra. Beatriz Mattos',
    email: 'beatriz.mattos@vitamove.com.br',
    role: 'clinic_admin',
    phone: '(11) 3450-8900',
    cpf: '210.984.112-99',
    passwordHash: 'senha123',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813583-05452e805565?w=150&auto=format&fit=crop&q=80',
    crefito: {
      number: '110294-F',
      region: 'CREFITO-3 (SP)',
      category: 'Responsável Técnica / Fisioterapeuta',
      status: 'approved',
      verifiedAt: '2023-11-20T09:00:00Z'
    },
    clinicId: 'clinic-01',
    clinicName: 'Clínica VitaMove Reabilitação Integrada',
    themePreference: 'light',
    mfaEnabled: true,
    createdAt: '2023-11-10T14:00:00Z'
  },
  {
    id: 'user-platform-admin-01',
    name: 'Carlos Eduardo Nogueira',
    email: 'admin@reavita.med.br',
    role: 'platform_admin',
    phone: '(11) 99000-0001',
    cpf: '001.002.003-04',
    passwordHash: 'admin123',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    themePreference: 'dark',
    mfaEnabled: true,
    createdAt: '2023-01-01T00:00:00Z'
  }
];

export const INITIAL_ASSESSMENT: PatientAssessment = {
  id: 'assess-01',
  patientId: 'user-patient-01',
  completedAt: '2024-05-12T16:00:00Z',
  isDraft: false,
  currentStep: 4,
  totalSteps: 4,
  primaryComplaint: 'Dor em queimação e pontada na região lombar baixa com irradiação para a face posterior da coxa direita até a panturrilha.',
  affectedRegions: ['Coluna lombar', 'Pelve', 'Coxa direita', 'Perna direita'],
  painOnset: 'insidioso',
  onsetDateApprox: 'Há cerca de 6 meses, com piora expressiva nas últimas 3 semanas após viagem longa.',
  traumaDescription: 'Sem trauma automobilístico direto. Trabalho sentado por mais de 8 horas diárias.',
  previousInjuries: 'Episódio leve de lombalgia há 3 anos que cedeu com anti-inflamatórios.',
  priorDiagnoses: 'Diagnóstico médico de Protrusão Discal L5-S1 com radiculopatia L5 direita (CID M54.1).',
  priorSurgeries: 'Nenhuma cirurgia espinhal prévia.',
  functionalLimitations: [
    'Dificuldade para permanecer sentada por mais de 30 minutos',
    'Dor ao amarrar os sapatos e flexionar o tronco',
    'Interrupção da prática de caminhadas'
  ],
  aggravatingFactors: 'Sentar em cadeiras baixas, tosse, flexão anterior do tronco prolongada.',
  relievingFactors: 'Deitar de barriga para cima com joelhos apoiados em travesseiro, caminhada leve em ritmo lento.',
  pastTreatments: 'Uso de analgésicos e anti-inflamatórios orais por 14 dias com alívio transitório.',
  patientGoals: 'Retomar caminhadas no parque de 40 minutos sem dor e conseguir trabalhar sentada sem crises agudas.',
  redFlagsScreening: {
    unexplainedWeightLoss: false,
    unremittingNightPain: false,
    feverWithSpinalPain: false,
    saddleAnesthesia: false,
    bowelBladderIncontinence: false,
    progressiveMotorDeficit: false,
    priorCancerHistory: false,
    recentMajorTrauma: false
  },
  redFlagNotes: 'Triagem de sinais de alerta negativa. Sem sintomas de compressão de cauda equina ou perda de força súbita no pé direito.'
};

export const INITIAL_BODY_POINTS: BodyPoint[] = [
  {
    id: 'pt-01',
    zone: 'lumbar_spine',
    zoneNamePt: 'Coluna lombar (L4-L5-S1)',
    view: 'posterior',
    tissueTypes: ['joint', 'nerve', 'muscle'],
    painIntensity: 6,
    sensationType: 'queimação',
    notes: 'Epicentro da dor lombar, rigidez matinal de 15 minutos.',
    createdAt: '2024-05-12T16:10:00Z'
  },
  {
    id: 'pt-02',
    zone: 'thigh_right',
    zoneNamePt: 'Face posterior da coxa direita',
    view: 'posterior',
    tissueTypes: ['nerve', 'fascia'],
    painIntensity: 5,
    sensationType: 'irradiada',
    notes: 'Sensação de repuxamento ao esticar a perna ou calçar meias.',
    createdAt: '2024-05-12T16:12:00Z'
  },
  {
    id: 'pt-03',
    zone: 'leg_right',
    zoneNamePt: 'Panturrilha direita',
    view: 'posterior',
    tissueTypes: ['nerve'],
    painIntensity: 3,
    sensationType: 'dormência/formigamento',
    notes: 'Parestesia leve intermitente no trajeto de S1 sem perda motora de flexão plantar.',
    createdAt: '2024-05-12T16:15:00Z'
  }
];

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-01',
    patientId: 'user-patient-01',
    patientName: 'Mariana Silva',
    fileName: 'Ressonancia_Lombossacra_Abril2024.pdf',
    fileType: 'pdf',
    documentCategory: 'ressonancia',
    fileSizeFormatted: '3.4 MB',
    uploadedAt: '2024-05-12T15:30:00Z',
    processingStatus: 'completed',
    confirmedByPatient: true,
    extractedContent: {
      rawDocumentText: 'LAUDO DE RESSONÂNCIA MAGNÉTICA DA COLUNA LOMBOSSACRA: Alinhamento sagital preservado. Discopatia degenerativa moderada em L5-S1 caracterizada por desidratação discal e redução da altura do espaço intersomático. Presença de abaulamento discal focal póstero-lateral direito em L5-S1 em contato com a raiz nervosa S1 ipsilateral no recesso lateral. Canais neurais sem estenose severa. Cono medular em nível habitual.',
      patientReportedSummary: 'Exame de ressonância feito no mês passado mostrando hérnia discal L5-S1 do lado direito pegando a raiz nervosa S1.',
      aiClinicalExplanation: 'O laudo descreve um abaulamento no disco entre a 5ª vértebra lombar e o osso sacro (L5-S1), tocando a raiz nervosa do lado direito. Isso explica a sensação de dor e formigamento descrita na coxa e panturrilha. Nota importante: a presença de abaulamento é comum e não significa necessidade de cirurgia, correlacionando-se bem com melhora via fisioterapia orientada.',
      keyFindings: [
        'Desidratação discal e redução de altura em L5-S1',
        'Abaulamento focal póstero-lateral direito comprimindo/tocando a raiz S1',
        'Canal vertebral amplo sem compressão cauda equina'
      ],
      suggestedPrecautions: [
        'Evitar cargas axiais com flexão de tronco desprotegida',
        'Priorizar descompressão posicional e mobilização neurodinâmica suave',
        'Revisar sinais de alerta (força do pé e controle urinário)'
      ],
      confidenceScore: 0.94
    }
  },
  {
    id: 'doc-02',
    patientId: 'user-patient-01',
    patientName: 'Mariana Silva',
    fileName: 'RaioX_Coluna_Lombar_Dinamica.jpg',
    fileType: 'jpg',
    documentCategory: 'raio_x',
    fileSizeFormatted: '1.8 MB',
    uploadedAt: '2024-05-12T15:35:00Z',
    processingStatus: 'completed',
    confirmedByPatient: true,
    extractedContent: {
      rawDocumentText: 'RADIOGRAFIA DINÂMICA DA COLUNA LOMBAR (FLEXÃO/EXTENSÃO): Não se evidenciam espondilolisteses ou instabilidades mecânicas angulares patológicas nas incidências dinâmicas. Densidade óssea preservada.',
      patientReportedSummary: 'Raio-x dinâmico descartando vértebra escorregada (espondilolistese).',
      aiClinicalExplanation: 'O exame comprova que a coluna possui estabilidade óssea normal em movimentos de dobra e extensão, sendo um sinal prognóstico muito favorável para reabilitação por exercícios terapêuticos.',
      keyFindings: [
        'Ausência de espondilolistese',
        'Estabilidade segmentar dinâmica preservada'
      ],
      suggestedPrecautions: [
        'Indicação segura para fortalecimento do complexo do core e estabilizadores locais'
      ],
      confidenceScore: 0.97
    }
  }
];

export const INITIAL_AI_REVIEWS: AiSuggestionReview[] = [
  {
    id: 'rev-01',
    patientId: 'user-patient-01',
    patientName: 'Mariana Silva',
    patientCondition: 'Lombalgia crônica com radiculopatia L5-S1 em fase subaguda',
    generatedAt: '2024-05-13T09:15:00Z',
    aiProposalTitle: 'Protocolo de Descompressão Posicional e Deslizamento Neurodinâmico do Nervo Ciático',
    aiProposalText: 'Orientar o paciente a realizar 3 séries de 10 repetições de mobilização do nervo ciático (slider ciático em decúbito dorsal ou sentado) associado a respiração diafragmática e extensão lombar suave (Mckenzie prono apoiado nos antebraços por 2 minutos, caso haja centralização dos sintomas). Manter tolerância de dor <= 3/10 sem agravar sintomas distais.',
    clinicalRationale: 'Baseado na evidência de mobilização neural (Sterling et al. 2020) e diretriz JOSPT para dor lombar (Delitto et al. 2012), o deslizamento sem tensão excessiva auxilia no aporte sanguíneo do axônio comprimido sem provocar inflamação rebote.',
    scientificCitations: [
      {
        articleId: 'art-001',
        articleTitle: 'Clinical Guidance for Low Back Pain: Systematic Review and Clinical Practice Guidelines',
        authors: 'Delitto A et al.',
        year: 2012,
        doi: '10.2519/jospt.2012.42.4.A1'
      },
      {
        articleId: 'art-010',
        articleTitle: 'Lumbar Spine Radicular Syndrome: Diagnostic Accuracy of Physical Examination Tests and Imaging',
        authors: 'van der Windt DA et al.',
        year: 2010,
        doi: '10.1002/14651858.CD007431.pub2'
      }
    ],
    potentialAlerts: [
      'Se houver periferização (dor irradiando mais longe na perna), interromper a manobra imediatamente.',
      'Monitorar reflexo e força dos dedos dos pés.'
    ],
    status: 'approved',
    reviewedBy: {
      physioId: 'user-physio-01',
      physioName: 'Dr. Patrick Alencar',
      crefito: 'CREFITO-3/184920-F',
      reviewedAt: '2024-05-13T10:45:00Z',
      originalContent: 'Orientar o paciente a realizar 3 séries de 10 repetições de mobilização do nervo ciático...',
      modifiedContent: 'Protocolo validado clinicamente. Adicionei instrução específica para Mariana realizar apenas na posição de decúbito dorsal nas primeiras 48 horas para evitar sobrecarga de flexão de quadril.',
      decisionNotes: 'Aprovado com recomendação posicional adaptada ao limiar álgico atual da paciente.'
    }
  },
  {
    id: 'rev-02',
    patientId: 'user-patient-01',
    patientName: 'Mariana Silva',
    patientCondition: 'Evolução da semana 3 - Transição para fortalecimento isométrico do Core',
    generatedAt: '2024-05-16T14:20:00Z',
    aiProposalTitle: 'Progressão: Ponte de Glúteo Bipodal e Bird-Dog com Manutenção Neutra',
    aiProposalText: 'Introduzir 2 séries de 8 repetições sustentadas de 5 segundos de ponte bipodal e ativação de transverso do abdômen em 4 apoios (Bird-dog com movimento apenas de braços inicialmente). Manter velocidade controlada.',
    clinicalRationale: 'De acordo com Saragiotto et al. 2016 (Cochrane) e Rice et al. 2019, o fortalecimento do glúteo máximo e controle motor lombo-pélvico reduz as forças de cisalhamento em L5-S1.',
    scientificCitations: [
      {
        articleId: 'art-021',
        articleTitle: 'Non-Specific Chronic Low Back Pain: Motor Control Exercise Versus General Exercise',
        authors: 'Saragiotto BT et al.',
        year: 2016,
        doi: '10.1002/14651858.CD012004'
      }
    ],
    potentialAlerts: [
      'Garantir ausência de hiperextensão lombar na subida da pelve.'
    ],
    status: 'pending'
  }
];

export const INITIAL_LINKS: PatientProfessionalLink[] = [
  {
    id: 'link-01',
    patientId: 'user-patient-01',
    patientName: 'Mariana Silva',
    patientEmail: 'mariana.silva@reavita.med.br',
    physioId: 'user-physio-01',
    physioName: 'Dr. Patrick Alencar',
    physioCrefito: 'CREFITO-3/184920-F',
    clinicId: 'clinic-01',
    clinicName: 'Clínica VitaMove Reabilitação Integrada',
    status: 'active',
    permissions: {
      shareAnamnese: true,
      shareDocuments: true,
      shareSymptomDiary: true,
      shareAiConversations: true
    },
    linkedAt: '2024-05-12T17:00:00Z'
  }
];

export const INITIAL_ROUTINE: RoutineActivity[] = [
  {
    id: 'act-01',
    patientId: 'user-patient-01',
    title: 'Deslizamento do Nervo Ciático em Decúbito Dorsal',
    category: 'controle_motor',
    targetRegion: 'Coluna lombar e Membro Inferior',
    frequency: '2 vezes ao dia (Manhã e Tarde)',
    dosageDescription: '3 séries de 10 movimentos lentos e fluidos com apoio de travesseiro',
    completedToday: true,
    precautions: 'Não forçar além do limiar de desconforto leve (máximo 3/10). Pare se a dor irradiar mais longe.',
    isPrescribedByProfessional: true
  },
  {
    id: 'act-02',
    patientId: 'user-patient-01',
    title: 'Extensão Lombar Suave em Decúbito Ventral (Esfinge)',
    category: 'mobilidade',
    targetRegion: 'Coluna lombar',
    frequency: '1 a 2 vezes ao dia',
    dosageDescription: 'Sustentar 2 minutos com respiração tranquila',
    completedToday: true,
    precautions: 'Realizar apenas se sentir alívio e centralização da dor na lombar.',
    isPrescribedByProfessional: true
  },
  {
    id: 'act-03',
    patientId: 'user-patient-01',
    title: 'Ativação Diafragmática e Respiração 3D',
    category: 'educativo',
    targetRegion: 'Tórax e Abdômen',
    frequency: 'Diário à noite antes de dormir',
    dosageDescription: '10 ciclos respiratórios profundos expandindo costelas inferiores',
    completedToday: false,
    precautions: 'Promove regulação do sistema nervoso autônomo e relaxamento muscular paravertebral.',
    isPrescribedByProfessional: true
  }
];

export const INITIAL_SYMPTOM_LOGS: SymptomLog[] = [
  {
    id: 'sym-01',
    patientId: 'user-patient-01',
    date: '2024-05-10',
    evaPainLevel: 7,
    mobilityLevel: 4,
    functionalImpact: 'severo',
    activitiesDoneCount: 1,
    userNotes: 'Primeiro dia com muita dor ao levantar da cama. Dificuldade para caminhar até a cozinha.'
  },
  {
    id: 'sym-02',
    patientId: 'user-patient-01',
    date: '2024-05-11',
    evaPainLevel: 6,
    mobilityLevel: 5,
    functionalImpact: 'moderado',
    activitiesDoneCount: 2,
    userNotes: 'Consegui deitar com travesseiro nos joelhos. Alívio temporário.'
  },
  {
    id: 'sym-03',
    patientId: 'user-patient-01',
    date: '2024-05-12',
    evaPainLevel: 5,
    mobilityLevel: 6,
    functionalImpact: 'moderado',
    activitiesDoneCount: 3,
    userNotes: 'Fiz a avaliação no REAVITA CARE e enviei a ressonância para o Dr. Patrick.'
  },
  {
    id: 'sym-04',
    patientId: 'user-patient-01',
    date: '2024-05-13',
    evaPainLevel: 4,
    mobilityLevel: 7,
    functionalImpact: 'leve',
    activitiesDoneCount: 3,
    userNotes: 'Iniciei o deslizamento aprovado pelo Dr. Patrick. A queimação na panturrilha diminuiu bastante!'
  },
  {
    id: 'sym-05',
    patientId: 'user-patient-01',
    date: '2024-05-14',
    evaPainLevel: 4,
    mobilityLevel: 7,
    functionalImpact: 'leve',
    activitiesDoneCount: 3,
    userNotes: 'Trabalhei 3 horas com pausas a cada 45 minutos. Muito melhor que semana passada.'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-01',
    conversationId: 'conv-01',
    sender: 'user',
    content: 'Olá assistente, comecei a sentir uma queimação na coxa direita hoje de manhã ao sentar para trabalhar. Meu laudo de ressonância diz que tenho protrusão em L5-S1. Isso é perigoso? O que posso fazer agora de forma segura?',
    timestamp: '2024-05-13T08:30:00Z'
  },
  {
    id: 'msg-02',
    conversationId: 'conv-01',
    sender: 'assistant',
    content: 'Olá Mariana. Compreendo seu desconforto e a preocupação gerada pela sensação de queimação. \n\nPrimeiramente, de acordo com as evidências clínicas consolidadas (Delitto et al. 2012 / JOSPT e van der Windt et al. 2010), uma protrusão discal em L5-S1 em contato com a raiz nervosa frequentemente causa essa sensação referida na coxa, mas na grande maioria dos casos responde muito favoravelmente ao tratamento conservador e exercícios orientados, sem indicação cirúrgica imediata.\n\n### Limites Clínicos e Segurança\nAntes de qualquer orientação, verifiquei que você não apresenta nenhum sinal de alerta (perda de força para levantar o pé, anestesia na virilha ou perda de controle da bexiga/intestino). Caso perceba qualquer desses sintomas súbitos, procure atendimento médico de emergência imediatamente.\n\n### O que você pode fazer com segurança agora:\n1. **Pausa Posicional:** Evite ficar sentada continuamente. A cada 30-40 minutos, levante-se e caminhe alguns passos leves.\n2. **Alívio em Descarga de Peso:** Se a dor incomodar, deite-se de barriga para cima com os joelhos dobrados e apoiados sobre almofadas altas por 10 minutos para reduzir a tensão sobre a raiz nervosa.\n3. **Seu Fisioterapeuta:** O Dr. Patrick Alencar já revisou seu caso e adicionou à sua rotina o exercício de deslizamento neurodinâmico suave.\n\n*Lembre-se: Esta orientação educacional não substitui o diagnóstico ou a consulta presencial do seu fisioterapeuta responsável.*',
    timestamp: '2024-05-13T08:30:15Z',
    scientificReferences: [
      {
        title: 'Clinical Guidance for Low Back Pain: Systematic Review and Clinical Practice Guidelines',
        authors: 'Delitto A et al.',
        year: 2012,
        journal: 'JOSPT',
        doi: '10.2519/jospt.2012.42.4.A1'
      },
      {
        title: 'Lumbar Spine Radicular Syndrome: Diagnostic Accuracy of Physical Examination Tests and Imaging',
        authors: 'van der Windt DA et al.',
        year: 2010,
        journal: 'Cochrane Database',
        doi: '10.1002/14651858.CD007431.pub2'
      }
    ],
    confidenceNote: 'Resposta fundamentada nos documentos confirmados de Mariana Silva e em 2 artigos da base científica REAVITA.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    timestamp: '2024-05-12T15:30:00Z',
    actorId: 'user-patient-01',
    actorName: 'Mariana Silva',
    actorRole: 'patient',
    action: 'UPLOAD_SENSITIVE_HEALTH_DOCUMENT',
    resourceType: 'MedicalDocument',
    resourceId: 'doc-01',
    details: 'Upload de arquivo criptografado Ressonancia_Lombossacra_Abril2024.pdf sob termo de consentimento LGPD Art. 11.'
  },
  {
    id: 'aud-02',
    timestamp: '2024-05-12T17:00:00Z',
    actorId: 'user-patient-01',
    actorName: 'Mariana Silva',
    actorRole: 'patient',
    action: 'GRANT_PROFESSIONAL_ACCESS',
    resourceType: 'PatientProfessionalLink',
    resourceId: 'link-01',
    details: 'Autorização granular concedida ao Dr. Patrick Alencar (CREFITO-3/184920-F) para acesso a exames, sintomas e anamnese.'
  },
  {
    id: 'aud-03',
    timestamp: '2024-05-13T10:45:00Z',
    actorId: 'user-physio-01',
    actorName: 'Dr. Patrick Alencar',
    actorRole: 'physiotherapist',
    action: 'APPROVE_AI_CLINICAL_PROPOSAL',
    resourceType: 'AiSuggestionReview',
    resourceId: 'rev-01',
    details: 'Aprovação formal com adaptação posicional do protocolo de Deslizamento Neurodinâmico para a paciente Mariana Silva.'
  }
];
