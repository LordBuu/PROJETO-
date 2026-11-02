export type UserRole = 'patient' | 'physiotherapist' | 'clinic_admin' | 'platform_admin';

export type CrefitoStatus = 'pending_verification' | 'under_review' | 'approved' | 'rejected' | 'suspended';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  cpf?: string;
  passwordHash?: string;
  avatarUrl?: string;
  crefito?: {
    number: string;
    region: string; // e.g. "CREFITO-3 (SP)"
    category: string; // "Fisioterapeuta"
    status: CrefitoStatus;
    verifiedAt?: string;
    verificationNotes?: string;
  };
  clinicId?: string;
  clinicName?: string;
  themePreference: 'light' | 'dark' | 'system';
  mfaEnabled?: boolean;
  createdAt: string;
}

export interface SecurityTestResult {
  id: string;
  name: string;
  attackVector: string;
  expectedStatus: number;
  actualStatus: number;
  passed: boolean;
  details: string;
  timestamp: string;
}

export type BodyZone = 
  | 'head_neck'
  | 'cervical'
  | 'shoulder_left'
  | 'shoulder_right'
  | 'elbow_left'
  | 'elbow_right'
  | 'wrist_hand_left'
  | 'wrist_hand_right'
  | 'thoracic_spine'
  | 'lumbar_spine'
  | 'hip_pelvis'
  | 'thigh_left'
  | 'thigh_right'
  | 'knee_left'
  | 'knee_right'
  | 'leg_left'
  | 'leg_right'
  | 'ankle_foot_left'
  | 'ankle_foot_right';

export type TissueType = 
  | 'muscle' 
  | 'tendon' 
  | 'ligament' 
  | 'joint' 
  | 'nerve' 
  | 'fascia' 
  | 'bone';

export interface BodyPoint {
  id: string;
  zone: BodyZone;
  zoneNamePt: string;
  view: 'anterior' | 'posterior';
  tissueTypes: TissueType[];
  painIntensity: number; // 0-10 EVA
  sensationType: 'queimação' | 'pontada' | 'peso/pressão' | 'dormência/formigamento' | 'irradiada';
  notes?: string;
  createdAt: string;
}

export interface PatientAssessment {
  id: string;
  patientId: string;
  completedAt?: string;
  isDraft: boolean;
  currentStep: number;
  totalSteps: number;
  // Step 1: Queixa Principal & Região
  primaryComplaint: string;
  affectedRegions: string[];
  painOnset: 'insidioso' | 'súbito' | 'após_trauma' | 'pós_cirúrgico' | 'sobrecarga_repetitiva';
  onsetDateApprox: string;
  traumaDescription?: string;
  // Step 2: Histórico Clínico & Cirúrgico
  previousInjuries: string;
  priorDiagnoses: string;
  priorSurgeries: string;
  // Step 3: Limitações Funcionais & Fatores Agravantes
  functionalLimitations: string[];
  aggravatingFactors: string;
  relievingFactors: string;
  pastTreatments: string;
  patientGoals: string;
  // Step 4: Red Flags & Triagem de Segurança
  redFlagsScreening: {
    unexplainedWeightLoss: boolean;
    unremittingNightPain: boolean;
    feverWithSpinalPain: boolean;
    saddleAnesthesia: boolean; // perda de sensibilidade em sela
    bowelBladderIncontinence: boolean; // perda de controle esfincteriano
    progressiveMotorDeficit: boolean; // fraqueza motora súbita/progressiva
    priorCancerHistory: boolean;
    recentMajorTrauma: boolean;
  };
  redFlagNotes?: string;
}

export interface MedicalDocument {
  id: string;
  patientId: string;
  patientName?: string;
  fileName: string;
  fileType: 'pdf' | 'jpg' | 'jpeg' | 'png';
  documentCategory: 'ressonancia' | 'raio_x' | 'tomografia' | 'ultrassom' | 'laudo_medico' | 'receita';
  fileSizeFormatted: string;
  uploadedAt: string;
  processingStatus: 'queued' | 'processing' | 'completed' | 'error';
  // 3-layer extracted information
  extractedContent?: {
    rawDocumentText: string;
    patientReportedSummary: string;
    aiClinicalExplanation: string;
    keyFindings: string[];
    suggestedPrecautions: string[];
    confidenceScore: number;
  };
  confirmedByPatient: boolean;
}

export interface ScientificArticle {
  id: string;
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  pmid?: string;
  journal: string;
  studyType: 'Ensaio Clínico Randomizado' | 'Revisão Sistemática / Meta-análise' | 'Diretriz de Prática Clínica (CPG)' | 'Estudo de Coorte' | 'Estudo Biomecânico';
  population: string;
  keyOutcomes: string;
  clinicalLimitations: string;
  relatedConditions: string[];
  bodyRegions: string[];
  lastReviewedDate: string;
  evidenceLevel: 'Nível I' | 'Nível II' | 'Nível III';
}

export interface AiSuggestionReview {
  id: string;
  patientId: string;
  patientName: string;
  patientCondition: string;
  generatedAt: string;
  aiProposalTitle: string;
  aiProposalText: string;
  clinicalRationale: string;
  scientificCitations: {
    articleId: string;
    articleTitle: string;
    authors: string;
    year: number;
    doi?: string;
  }[];
  potentialAlerts: string[];
  status: 'pending' | 'approved' | 'edited_approved' | 'rejected';
  reviewedBy?: {
    physioId: string;
    physioName: string;
    crefito: string;
    reviewedAt: string;
    originalContent: string;
    modifiedContent?: string;
    decisionNotes?: string;
  };
}

export interface PatientProfessionalLink {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  physioId: string;
  physioName: string;
  physioCrefito: string;
  clinicId?: string;
  clinicName?: string;
  status: 'active' | 'pending' | 'revoked';
  permissions: {
    shareAnamnese: boolean;
    shareDocuments: boolean;
    shareSymptomDiary: boolean;
    shareAiConversations: boolean;
  };
  linkedAt: string;
  revokedAt?: string;
}

export interface RoutineActivity {
  id: string;
  patientId: string;
  title: string;
  category: 'mobilidade' | 'fortalecimento' | 'educativo' | 'alongamento' | 'controle_motor';
  targetRegion: string;
  frequency: string;
  dosageDescription: string;
  completedToday: boolean;
  notes?: string;
  precautions?: string;
  isPrescribedByProfessional: boolean;
}

export interface SymptomLog {
  id: string;
  patientId: string;
  date: string; // YYYY-MM-DD
  evaPainLevel: number; // 0-10
  mobilityLevel: number; // 0-10
  functionalImpact: 'nenhum' | 'leve' | 'moderado' | 'severo';
  activitiesDoneCount: number;
  userNotes?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isRedFlagWarning?: boolean;
  scientificReferences?: {
    title: string;
    authors: string;
    year: number;
    journal: string;
    doi?: string;
  }[];
  confidenceNote?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
  ipAddress?: string;
}

export interface SubscriptionPlan {
  id: 'care_monthly' | 'pro_monthly' | 'pro_clinic_monthly';
  name: string;
  targetRole: UserRole;
  priceFormatted: string;
  priceCents: number;
  period: string;
  features: string[];
  limits: {
    maxPatients?: number;
    aiQueriesPerMonth: number;
    storageGb: number;
  };
}

export interface SecurityTestResult {
  id: string;
  name: string;
  description?: string;
  expectedStatus: number;
  actualStatus: number;
  passed: boolean;
  details: string;
  timestamp: string;
}
