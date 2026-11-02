import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  CheckSquare, 
  AlertCircle, 
  Activity, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Search, 
  UserPlus, 
  Clock,
  Lock
} from 'lucide-react';
import { AiSuggestionReview, PatientProfessionalLink } from '../../types';

interface ProDashboardProps {
  onNavigate: (tabId: string, param?: string) => void;
}

export const ProDashboard: React.FC<ProDashboardProps> = ({ onNavigate }) => {
  const { currentUser, isCrefitoApproved } = useAuth();
  const [reviews, setReviews] = useState<AiSuggestionReview[]>([]);
  const [links, setLinks] = useState<PatientProfessionalLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [revRes, linkRes] = await Promise.all([
          fetch('/api/pro/reviews'),
          fetch('/api/links')
        ]);
        const revData = await revRes.json();
        const linkData = await linkRes.json();
        if (revData.reviews) setReviews(revData.reviews);
        if (linkData.links) {
          const physioLinks = linkData.links.filter((l: PatientProfessionalLink) => l.physioId === currentUser.id && l.status === 'active');
          setLinks(physioLinks);
        }
      } catch (err) {
        console.warn('Pro dashboard error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentUser.id]);

  const pendingReviews = reviews.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#176B72] to-[#102A43] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#55C6B5]" />
            <span>REAVITA PRO • Painel do Fisioterapeuta</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bem-vindo, {currentUser.name}!
          </h1>
          <p className="text-sm text-white/90 leading-relaxed">
            Acompanhamento clínico baseado em evidências. Todas as propostas terapêuticas geradas por IA exigem sua supervisão e aprovação formal antes de liberação ao paciente.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('reviews')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#102A43] hover:bg-[#E8F2F0] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-[#176B72]" />
              <span>Revisar Propostas Pendentes ({pendingReviews.length})</span>
            </button>
            <button
              onClick={() => onNavigate('invitations')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Gerar Convite de Paciente</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* CREFITO Warning if Under Review */}
      {!isCrefitoApproved && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">
              Registro CREFITO em Análise Cadastral ({currentUser.crefito?.number} - {currentUser.crefito?.region})
            </h4>
            <p className="text-xs leading-relaxed opacity-90">
              Conforme as normas do COFFITO e as diretrizes clínicas da REAVITA, você está no modo de demonstração restrito. A validação do registro pode ser simulada ou aprovada pelo Administrador da Plataforma na aba "Administração".
            </p>
          </div>
        </div>
      )}

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Linked Patients */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Pacientes Vinculados</span>
            <Users className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              {links.length > 0 ? links.length : 1}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Ativos
            </span>
          </div>
          <button
            onClick={() => onNavigate('patients')}
            className="mt-2 text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver prontuários</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Proposals Awaiting Review */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Propostas da IA na Fila</span>
            <CheckSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              {pendingReviews.length}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Aguardando Decisão
            </span>
          </div>
          <button
            onClick={() => onNavigate('reviews')}
            className="mt-2 text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Revisar agora</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Recent Updates */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Alertas de Sintomas</span>
            <Activity className="w-4 h-4 text-[#35A69A]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              0
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              Sem Red Flags no momento
            </span>
          </div>
          <div className="mt-2 text-xs text-[#647785] dark:text-[#9BAEB5]">
            Triagem negativa em todos os pacientes
          </div>
        </div>

        {/* Scientific Evidence In Use */}
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Base de Evidências RAG</span>
            <Sparkles className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              22
            </span>
            <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">
              artigos revisados
            </span>
          </div>
          <button
            onClick={() => onNavigate('science')}
            className="mt-2 text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Consultar acervo</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 3. Main Split: Pending Reviews Queue Preview vs Linked Patients Quick Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): AI Proposals Pending Decision */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Fila de Validação de Orientações da IA
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Supervisão obrigatória de condutas antes da entrega ao paciente
              </p>
            </div>
            <button
              onClick={() => onNavigate('reviews')}
              className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
            >
              Ver todas ({reviews.length})
            </button>
          </div>

          <div className="space-y-3">
            {pendingReviews.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#647785] dark:text-[#9BAEB5] bg-[#F6F8FA] dark:bg-[#142733] rounded-xl border border-dashed border-[#E1E8EC] dark:border-[#29434D]">
                Todas as propostas clínicas geradas pela IA foram avaliadas!
              </div>
            ) : (
              pendingReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 uppercase">
                        Aguardando Sua Validação
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-[#102A43] dark:text-[#DCE9EB] mt-1">
                        {rev.aiProposalTitle}
                      </h3>
                      <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                        Paciente: <strong>{rev.patientName}</strong> • {rev.patientCondition}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB] bg-white/70 dark:bg-black/20 p-2.5 rounded-lg border border-amber-200/50">
                    {rev.aiProposalText}
                  </p>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('reviews')}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer"
                    >
                      Avaliar e Liberar Conduta
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Roster of Linked Patients */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Meus Pacientes Vinculados
            </h3>
            <button
              onClick={() => onNavigate('patients')}
              className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
            >
              Ver Relação Completa
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
                  alt="Mariana Silva"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#35A69A]/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                    Mariana Silva
                  </h4>
                  <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                    Lombalgia crônica (L5-S1) • EVA: 4/10
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('patients', 'user-patient-01')}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#E8F2F0] dark:bg-[#1D3440] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#176B72] hover:text-white transition-all cursor-pointer"
              >
                Abrir Ficha
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/30 text-[11px] text-[#172B3A] dark:text-[#DCE9EB] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5] shrink-0" />
            <span>
              Você tem acesso aos dados clínicos autorizados pela paciente sob os termos da LGPD.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
