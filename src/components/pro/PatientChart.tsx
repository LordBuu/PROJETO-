import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  PatientAssessment, 
  MedicalDocument, 
  BodyPoint, 
  RoutineActivity, 
  SymptomLog, 
  AiSuggestionReview,
  ChatMessage
} from '../../types';
import { 
  ChevronLeft, 
  User, 
  FileText, 
  Crosshair, 
  Bot, 
  CheckSquare, 
  Activity, 
  Edit3, 
  Save, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Lock,
  Layers
} from 'lucide-react';

interface PatientChartProps {
  patientId: string;
  onBack: () => void;
}

export const PatientChart: React.FC<PatientChartProps> = ({ patientId, onBack }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'anamnese' | 'bodymap' | 'documents' | 'chat' | 'guidance' | 'evolution' | 'soap'>('anamnese');
  
  const [assessment, setAssessment] = useState<PatientAssessment | null>(null);
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [bodyPoints, setBodyPoints] = useState<BodyPoint[]>([]);
  const [reviews, setReviews] = useState<AiSuggestionReview[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // SOAP Clinical Notes State (Subjective, Objective, Assessment, Plan)
  const [soapS, setSoapS] = useState('Paciente relata melhora na queimação lombar após início do deslizamento neural (EVA caiu de 7 para 4). Refere dificuldade persistente ao permanecer sentada por > 40 minutos.');
  const [soapO] = useState('ADM de flexão anterior do tronco com dedos a 15cm do solo com dor no final do arco. Teste de Lasègue direito positivo a 55 graus com alívio em dorsiflexão neutra (diferenciação neural). Força de dorsiflexores (L4/L5) e flexores plantares (S1) grau V preservada.');
  const [soapA] = useState('Radiculopatia lombossacra L5-S1 mecânica em resolução favorável, respondendo bem a mobilização neurodinâmica sem sinais de alarme.');
  const [soapP, setSoapP] = useState('Manter deslizamento ciático 2x/dia. Introduzir ativação isométrica de glúteo e core (ponte e bird-dog) com tolerância de dor <= 3/10. Reavaliação presencial em 14 dias.');
  const [savedSoap, setSavedSoap] = useState(false);

  useEffect(() => {
    async function loadChartData() {
      try {
        const [assessRes, docRes, pointsRes, revRes, symRes] = await Promise.all([
          fetch(`/api/patients/${patientId}/assessment`),
          fetch(`/api/patients/${patientId}/documents`),
          fetch(`/api/patients/${patientId}/body-points`),
          fetch('/api/pro/reviews'),
          fetch(`/api/patients/${patientId}/symptoms`)
        ]);

        const aData = await assessRes.json();
        const dData = await docRes.json();
        const pData = await pointsRes.json();
        const rData = await revRes.json();
        const sData = await symRes.json();

        if (aData.assessment) setAssessment(aData.assessment);
        if (dData.documents) setDocuments(dData.documents);
        if (pData.points) setBodyPoints(pData.points);
        if (rData.reviews) setReviews(rData.reviews.filter((r: AiSuggestionReview) => r.patientId === patientId));
        if (sData.symptoms) setSymptoms(sData.symptoms);

        // Load chat history from localStorage or default
        const savedChat = localStorage.getItem(`reavita_chat_${patientId}`);
        if (savedChat) setChatMessages(JSON.parse(savedChat));
      } catch (err) {
        console.warn('Error loading chart:', err);
      } finally {
        setLoading(false);
      }
    }
    loadChartData();
  }, [patientId]);

  const handleSaveSoap = () => {
    setSavedSoap(true);
    setTimeout(() => setSavedSoap(false), 2500);
  };

  const tabs = [
    { id: 'anamnese', label: 'Resumo & Anamnese', icon: User },
    { id: 'bodymap', label: 'Mapa Corporal & Pontos', icon: Crosshair },
    { id: 'documents', label: 'Documentos & OCR', icon: FileText, count: documents.length },
    { id: 'chat', label: 'Conversas com IA', icon: Bot },
    { id: 'guidance', label: 'Condutas Aprovadas', icon: CheckSquare, count: reviews.filter(r => r.status === 'approved').length },
    { id: 'evolution', label: 'Evolução da Dor', icon: Activity },
    { id: 'soap', label: 'Evolução SOAP (Prontuário)', icon: Edit3 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Patient Header Banner */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:bg-slate-100 text-[#102A43] dark:text-[#DCE9EB] cursor-pointer"
              title="Voltar para a relação de pacientes"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Mariana Silva"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#35A69A]/30"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  Mariana Silva
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Prontuário Ativo #0492
                </span>
              </div>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                32 anos • Lombalgia Crônica com Radiculopatia L5-S1 Direita • Vinculada desde 12/05/2024
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Consentimento LGPD Concedido</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-[#E1E8EC] dark:border-[#29434D] pt-3 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#176B72] text-white dark:bg-[#55C6B5] dark:text-[#0B1720]'
                    : 'text-[#647785] dark:text-[#9BAEB5] hover:bg-[#F6F8FA] dark:hover:bg-[#142733]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-[#1D3440] p-6 sm:p-8 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
        
        {/* 1. Anamnese Tab */}
        {activeTab === 'anamnese' && (
          <div className="space-y-6">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Anamnese e Queixa Inicial Informada pelo Paciente
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Dados autorrelatados via questionário estruturado do REAVITA CARE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px]">
                  Queixa Principal
                </span>
                <p className="text-sm font-semibold text-[#172B3A] dark:text-[#DCE9EB]">
                  {assessment?.primaryComplaint || 'Dor em queimação lombar irradiando para a coxa e perna direita.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px]">
                  Mecanismo de Início & Duração
                </span>
                <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB]">
                  Início: <strong>{assessment?.painOnset || 'Insidioso'}</strong> • Duração: {assessment?.onsetDateApprox || 'Há 6 meses'}
                </p>
                <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                  {assessment?.traumaDescription}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px]">
                  Fatores Agravantes e de Alívio
                </span>
                <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB]">
                  <strong>Piora:</strong> {assessment?.aggravatingFactors || 'Sentar por muito tempo, flexão anterior.'}
                </p>
                <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB]">
                  <strong>Melhora:</strong> {assessment?.relievingFactors || 'Deitar de barriga para cima com joelhos apoiados.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px]">
                  Triagem de Sinais de Alerta (Red Flags)
                </span>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Negativa para todos os critérios de emergência</span>
                </div>
                <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                  Sem déficit motor progressivo agudo, sem anestesia em sela e sem incontinência de esfíncteres.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Body Map Points Tab */}
        {activeTab === 'bodymap' && (
          <div className="space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Topografia da Dor Mapeada pelo Paciente
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Pontos registrados com sensação mecânica e estruturas anatômicas suspeitas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bodyPoints.map((pt) => (
                <div 
                  key={pt.id}
                  className="p-4 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {pt.zoneNamePt}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      EVA {pt.painIntensity}/10
                    </span>
                  </div>
                  <div className="text-xs text-[#647785] dark:text-[#9BAEB5] capitalize">
                    Sensação: <strong>{pt.sensationType}</strong> • Vista {pt.view}
                  </div>
                  {pt.notes && (
                    <div className="text-[11px] italic text-[#172B3A] dark:text-[#DCE9EB] bg-white/60 dark:bg-black/20 p-2 rounded-lg">
                      "{pt.notes}"
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {pt.tissueTypes.map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Documents & OCR Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Laudos e Exames Processados via OCR Seguro
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Texto original do documento extraído e contextualizado para apoio à decisão clínica.
              </p>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 sm:p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
                      <h4 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                        {doc.fileName}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {doc.documentCategory}
                      </span>
                    </div>
                    <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                      Enviado em: {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] font-mono text-xs text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed">
                    {doc.extractedContent?.rawDocumentText}
                  </div>

                  {doc.extractedContent?.keyFindings && (
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-[#102A43] dark:text-[#55C6B5]">
                        Achados Estruturais Destacados:
                      </span>
                      <ul className="list-disc pl-5 text-[#647785] dark:text-[#9BAEB5] space-y-0.5">
                        {doc.extractedContent.keyFindings.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Chat History Shared Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Histórico de Conversas com o Assistente Clínico IA
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Interações autorizadas pelo paciente para acompanhamento do fisioterapeuta.
              </p>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto p-2">
              {chatMessages.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#647785] dark:text-[#9BAEB5]">
                  Nenhuma mensagem registrada.
                </div>
              ) : (
                chatMessages.map((m) => (
                  <div 
                    key={m.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1 ${
                      m.sender === 'user' 
                        ? 'bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/30 text-[#102A43] dark:text-[#DCE9EB]' 
                        : 'bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-slate-800 text-[#172B3A] dark:text-[#DCE9EB]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#647785] dark:text-[#9BAEB5]">
                      <span>{m.sender === 'user' ? 'Paciente (Mariana Silva)' : 'Assistente IA REAVITA'}</span>
                      <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 5. Approved Guidance Tab */}
        {activeTab === 'guidance' && (
          <div className="space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Condutas & Orientações Clínicas Liberadas
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Histórico auditado de propostas da IA validadas e liberadas para a rotina da paciente.
              </p>
            </div>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#102A43] dark:text-[#DCE9EB] text-sm">
                      {rev.aiProposalTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                      Aprovado pelo Profissional
                    </span>
                  </div>

                  <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed bg-white/80 dark:bg-black/30 p-3 rounded-lg border border-emerald-200/50">
                    {rev.reviewedBy?.modifiedContent || rev.aiProposalText}
                  </p>

                  {rev.reviewedBy && (
                    <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5] flex items-center justify-between pt-1">
                      <span>Validado por: <strong>{rev.reviewedBy.physioName} ({rev.reviewedBy.crefito})</strong></span>
                      <span>Em: {new Date(rev.reviewedBy.reviewedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Evolution Tab */}
        {activeTab === 'evolution' && (
          <div className="space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Registros de Evolução & Adesão à Rotina
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Histórico diário com escala EVA e anotações do paciente.
              </p>
            </div>

            <div className="space-y-2">
              {symptoms.map((log) => (
                <div 
                  key={log.id}
                  className="p-3 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Data: {log.date}
                    </span>
                    <span className="mx-2 text-[#647785]">•</span>
                    <span>Impacto: <strong className="capitalize">{log.functionalImpact}</strong></span>
                    {log.userNotes && (
                      <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5] mt-0.5">
                        "{log.userNotes}"
                      </p>
                    )}
                  </div>

                  <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                    log.evaPainLevel <= 3 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : log.evaPainLevel <= 5 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    EVA {log.evaPainLevel}/10
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SOAP Notes Tab */}
        {activeTab === 'soap' && (
          <div className="space-y-5">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  Prontuário Clínico Fisioterapêutico (Método SOAP)
                </h3>
                <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                  Anotações técnicas confidenciais protegidas pelo sigilo profissional (COFFITO).
                </p>
              </div>

              <button
                onClick={handleSaveSoap}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Prontuário SOAP</span>
              </button>
            </div>

            {savedSoap && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Evolução clínica gravada com sucesso no registro eletrônico!</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  S - Subjetivo (Relato do paciente sobre sintomas, dor e resposta ao repouso):
                </label>
                <textarea
                  rows={3}
                  value={soapS}
                  onChange={(e) => setSoapS(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  O - Objetivo (Testes ortopédicos, goniometria, força muscular, testes neurodinâmicos):
                </label>
                <textarea
                  rows={3}
                  value={soapO}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  A - Avaliação Clínica / Diagnóstico Funcional:
                </label>
                <textarea
                  rows={2}
                  value={soapA}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  P - Plano Terapêutico (Condutas prescritas, dosagem, data do retorno):
                </label>
                <textarea
                  rows={3}
                  value={soapP}
                  onChange={(e) => setSoapP(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
