import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Activity, 
  Bot, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  TrendingDown, 
  UserCheck, 
  Crosshair,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { RoutineActivity, SymptomLog, PatientProfessionalLink, MedicalDocument } from '../../types';

interface CareDashboardProps {
  onNavigate: (tabId: string) => void;
}

export const CareDashboard: React.FC<CareDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [routine, setRoutine] = useState<RoutineActivity[]>([]);
  const [latestSymptom, setLatestSymptom] = useState<SymptomLog | null>(null);
  const [activeLink, setActiveLink] = useState<PatientProfessionalLink | null>(null);
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [routineRes, symptomRes, linkRes, docRes] = await Promise.all([
          fetch(`/api/patients/${currentUser.id}/routine`),
          fetch(`/api/patients/${currentUser.id}/symptoms`),
          fetch(`/api/links`),
          fetch(`/api/patients/${currentUser.id}/documents`)
        ]);

        const routineData = await routineRes.json();
        const symptomData = await symptomRes.json();
        const linkData = await linkRes.json();
        const docData = await docRes.json();

        if (routineData.routine) setRoutine(routineData.routine);
        if (symptomData.symptoms && symptomData.symptoms.length > 0) {
          setLatestSymptom(symptomData.symptoms[symptomData.symptoms.length - 1]);
        }
        if (linkData.links) {
          const userLink = linkData.links.find((l: PatientProfessionalLink) => l.patientId === currentUser.id && l.status === 'active');
          if (userLink) setActiveLink(userLink);
        }
        if (docData.documents) setDocuments(docData.documents);
      } catch (err) {
        console.warn('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentUser.id]);

  const toggleActivity = async (activityId: string) => {
    try {
      const res = await fetch(`/api/patients/${currentUser.id}/routine/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId })
      });
      const data = await res.json();
      if (data.routine) setRoutine(data.routine);
    } catch (err) {
      console.warn('Toggle failed:', err);
    }
  };

  const completedCount = routine.filter(r => r.completedToday).length;
  const progressPercent = routine.length > 0 ? Math.round((completedCount / routine.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Welcome Hero Header */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#176B72] to-[#35A69A] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#55C6B5]" />
            <span>REAVITA CARE • Reabilitação Baseada em Evidências</span>
          </div>
          <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
            Bem-vindo(a) ao seu espaço de movimento e reabilitação. Desenvolvido para você ter acesso à melhor ciência de recuperação física, com planos domiciliares práticos mesmo sem condições financeiras para consultas particulares frequentes.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('muscles')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#102A43] hover:bg-[#E8F2F0] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#176B72]" />
              <span>Biblioteca Muscular de Lesões</span>
            </button>
            <button
              onClick={() => onNavigate('assistant')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#102A43]/40 hover:bg-[#102A43]/60 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#55C6B5]" />
              <span>Prescrever Reabilitação com IA</span>
            </button>
            <button
              onClick={() => onNavigate('routine')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Minha Rotina</span>
            </button>
          </div>
        </div>

        {/* Abstract decorative background circle */}
        <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* 2. Key Metrics & Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pain Index (EVA) */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Escala de Dor Atual (EVA)</span>
            <Activity className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              {latestSymptom ? `${latestSymptom.evaPainLevel}/10` : '4/10'}
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              -3 pts desde o início
            </span>
          </div>
          <div className="mt-2 text-xs text-[#647785] dark:text-[#9BAEB5]">
            Relatada como intensidade leve a moderada na lombar.
          </div>
        </div>

        {/* Daily Routine Progress */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Atividades de Hoje</span>
            <CheckCircle2 className="w-4 h-4 text-[#35A69A]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              {completedCount} / {routine.length}
            </span>
            <span className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5]">
              {progressPercent}% concluído
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-[#35A69A] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Linked Professional Status */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Fisioterapeuta Vinculado</span>
            <HeartHandshake className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-2.5">
            <div className="font-bold text-sm text-[#102A43] dark:text-[#DCE9EB] truncate">
              {activeLink ? activeLink.physioName : 'Dr. Patrick Alencar'}
            </div>
            <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5] font-mono mt-0.5">
              {activeLink ? activeLink.physioCrefito : 'CREFITO-3/184920-F'}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Acompanhamento Ativo</span>
            </div>
          </div>
        </div>

        {/* Processed Medical Exams */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Exames & Documentos</span>
            <FileText className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              {documents.length}
            </span>
            <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">
              laudos analisados por OCR
            </span>
          </div>
          <button
            onClick={() => onNavigate('documents')}
            className="mt-2 text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver detalhes extraídos</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 3. Main Content Split: Today's Routine vs Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Today's Prescribed Routine Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1D3440] rounded-2xl p-6 border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Atividades Recomendadas Para Hoje
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Orientações validadas pelo seu fisioterapeuta responsável
              </p>
            </div>
            <button
              onClick={() => onNavigate('routine')}
              className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline"
            >
              Ver Todas
            </button>
          </div>

          <div className="space-y-3">
            {routine.map((act) => (
              <div 
                key={act.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  act.completedToday 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40' 
                    : 'bg-[#F6F8FA] dark:bg-[#142733] border-[#E1E8EC] dark:border-[#29434D] hover:border-[#35A69A]/40'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] uppercase">
                      {act.category}
                    </span>
                    <span className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {act.frequency}
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold ${act.completedToday ? 'line-through text-[#647785] dark:text-[#9BAEB5]' : 'text-[#102A43] dark:text-[#DCE9EB]'}`}>
                    {act.title}
                  </h3>
                  <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                    {act.dosageDescription}
                  </p>
                  {act.precautions && (
                    <div className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/30 px-2 py-1 rounded-md border border-amber-200/50">
                      <strong>Atenção:</strong> {act.precautions}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleActivity(act.id)}
                  className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                    act.completedToday
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white dark:bg-[#1D3440] text-[#647785] hover:text-[#176B72] border border-[#E1E8EC] dark:border-[#29434D]'
                  }`}
                  title={act.completedToday ? 'Marcar como não concluído' : 'Concluir atividade'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/30 text-xs text-[#172B3A] dark:text-[#DCE9EB] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5] shrink-0 mt-0.5" />
            <p>
              <strong>Critério Clínico:</strong> Nenhum exercício deve provocar dor aguda acima de 3/10 ou irradiar para além do joelho. Se sentir piora, faça uma pausa e registre no diário de sintomas.
            </p>
          </div>
        </div>

        {/* Right Column: Fast Shortcuts & Scientific Insight */}
        <div className="space-y-6">
          
          {/* Quick Access Card */}
          <div className="bg-white dark:bg-[#1D3440] rounded-2xl p-6 border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB] uppercase tracking-wider">
              Acesso Rápido
            </h3>

            <button
              onClick={() => onNavigate('muscles')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#176B72]/15 to-teal-500/10 hover:bg-[#176B72]/20 border border-[#35A69A]/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#176B72] text-white">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-1.5">
                    <span>Biblioteca Muscular</span>
                    <span className="text-[9px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded">NOVO</span>
                  </div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">Estiramentos, PEACE & LOVE e protocolos</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#176B72] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('bodymap')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] hover:bg-[#E8F2F0] dark:hover:bg-slate-800 border border-[#E1E8EC] dark:border-[#29434D] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#176B72]/10 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5]">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">Mapa Corporal Interativo</div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">Indicar pontos de desconforto</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#647785] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('documents')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] hover:bg-[#E8F2F0] dark:hover:bg-slate-800 border border-[#E1E8EC] dark:border-[#29434D] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#35A69A]/15 text-[#35A69A]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">Enviar Novo Exame</div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">Extração de laudo via OCR seguro</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#647785] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('library')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] hover:bg-[#E8F2F0] dark:hover:bg-slate-800 border border-[#E1E8EC] dark:border-[#29434D] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">Biblioteca Educativa</div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">Exercícios com referências científicas</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#647785] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Evidence Highlight Card */}
          <div className="bg-gradient-to-br from-[#102A43] to-[#176B72] text-white rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#55C6B5]">
              <Sparkles className="w-4 h-4" />
              <span>Evidência da Semana</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold leading-snug">
              Diretriz JOSPT para Dor Lombar & Radiculopatia
            </h4>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Estudos comprovam que a manutenção de repouso no leito retarda a cicatrização dos tecidos. Movimentos de mobilização neural protegida e caminhadas leves reduzem em até 40% o tempo de incapacidade.
            </p>
            <div className="text-[10px] text-white/60 font-mono">
              Ref: Delitto A et al. JOSPT 2012 / DOI: 10.2519/jospt.2012.42.4.A1
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
