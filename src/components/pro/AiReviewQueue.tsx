import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AiSuggestionReview } from '../../types';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  BookMarked, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AiReviewQueue: React.FC = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<AiSuggestionReview[]>([]);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending');
  const [loading, setLoading] = useState(true);

  // Edit & Approve Modal state
  const [editingReview, setEditingReview] = useState<AiSuggestionReview | null>(null);
  const [modifiedText, setModifiedText] = useState('');
  const [decisionNotes, setDecisionNotes] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/pro/reviews');
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.warn('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDecision = async (
    reviewId: string, 
    decision: 'approved' | 'edited_approved' | 'rejected', 
    customText?: string, 
    notes?: string
  ) => {
    setActionInProgress(true);
    try {
      const res = await fetch(`/api/pro/reviews/${reviewId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          physioId: currentUser.id,
          physioName: currentUser.name,
          crefito: currentUser.crefito?.number ? `${currentUser.crefito.region} / ${currentUser.crefito.number}` : 'CREFITO-3',
          decision,
          modifiedContent: customText,
          decisionNotes: notes
        })
      });

      const data = await res.json();
      if (data.review) {
        setReviews(reviews.map(r => r.id === reviewId ? data.review : r));
        setEditingReview(null);
      }
    } catch (err) {
      console.warn('Error saving decision:', err);
    } finally {
      setActionInProgress(false);
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'pending') return r.status === 'pending';
    if (filter === 'approved') return r.status === 'approved' || r.status === 'edited_approved';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Controle Clínico Human-in-the-Loop</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Revisão de Orientações da IA
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Nenhuma sugestão individualizada gerada pela IA chega ao paciente sem sua aprovação ou edição profissional expressa.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#F6F8FA] dark:bg-[#142733] p-1.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] text-xs">
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-[#176B72] text-white'
                : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#172B3A]'
            }`}
          >
            Pendentes ({reviews.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'approved'
                ? 'bg-[#176B72] text-white'
                : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#172B3A]'
            }`}
          >
            Aprovadas
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#176B72] text-white'
                : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#172B3A]'
            }`}
          >
            Todas ({reviews.length})
          </button>
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-[#1D3440] p-12 rounded-2xl border border-dashed border-[#E1E8EC] dark:border-[#29434D] text-center text-xs text-[#647785] dark:text-[#9BAEB5] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Nenhuma proposta pendente na fila no momento!
            </h3>
            <p>
              Novas sugestões de progressão de exercícios e descompressão neural aparecerão aqui para sua validação.
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const isPending = rev.status === 'pending';
            const isApproved = rev.status === 'approved' || rev.status === 'edited_approved';

            return (
              <div
                key={rev.id}
                className={`p-6 rounded-2xl border transition-all space-y-4 ${
                  isPending
                    ? 'bg-white dark:bg-[#1D3440] border-amber-300 dark:border-amber-800/60 shadow-md ring-1 ring-amber-400/20'
                    : 'bg-[#F6F8FA] dark:bg-[#142733] border-[#E1E8EC] dark:border-[#29434D]'
                }`}
              >
                {/* Proposal Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        isPending 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200' 
                          : isApproved 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {rev.status === 'pending' && 'Aguardando Decisão'}
                        {rev.status === 'approved' && 'Aprovado Integralmente'}
                        {rev.status === 'edited_approved' && 'Editado e Aprovado'}
                        {rev.status === 'rejected' && 'Rejeitado'}
                      </span>
                      <span className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(rev.generatedAt).toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {rev.aiProposalTitle}
                    </h3>

                    <div className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#176B72] dark:text-[#55C6B5]" />
                      <span>Paciente: <strong className="text-[#102A43] dark:text-[#DCE9EB]">{rev.patientName}</strong> ({rev.patientCondition})</span>
                    </div>
                  </div>

                  {/* Actions for Pending Proposals */}
                  {isPending && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDecision(rev.id, 'approved')}
                        disabled={actionInProgress}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aprovar</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingReview(rev);
                          setModifiedText(rev.aiProposalText);
                          setDecisionNotes('');
                        }}
                        disabled={actionInProgress}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Editar e Aprovar</span>
                      </button>

                      <button
                        onClick={() => {
                          const reason = prompt('Informe a justificativa técnica para rejeição desta proposta:');
                          if (reason) handleDecision(rev.id, 'rejected', undefined, reason);
                        }}
                        disabled={actionInProgress}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Sections */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[#102A43] dark:text-[#DCE9EB] block mb-1">
                      {rev.status === 'edited_approved' ? 'Conteúdo Modificado Aprovado:' : 'Proposta Gerada pelo Motor de IA:'}
                    </span>
                    <p className="p-3.5 rounded-xl bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed">
                      {rev.reviewedBy?.modifiedContent || rev.aiProposalText}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#102A43] dark:text-[#55C6B5] block mb-1">
                      Racional Clínico & Mecanismo Biológico:
                    </span>
                    <p className="text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                      {rev.clinicalRationale}
                    </p>
                  </div>

                  {/* Scientific Citations */}
                  {rev.scientificCitations.length > 0 && (
                    <div className="p-3 rounded-xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#176B72] dark:text-[#55C6B5] text-[11px] uppercase tracking-wider">
                        <BookMarked className="w-3.5 h-3.5" />
                        <span>Artigos Científicos que embasam esta proposta:</span>
                      </div>
                      <div className="space-y-1">
                        {rev.scientificCitations.map((cit, idx) => (
                          <div key={idx} className="text-[11px] text-[#172B3A] dark:text-[#DCE9EB]">
                            • <strong>{cit.articleTitle}</strong> — {cit.authors} ({cit.year}) {cit.doi && <span className="font-mono opacity-80">(DOI: {cit.doi})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Potential Alerts */}
                  {rev.potentialAlerts.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Alertas para o fisioterapeuta monitorar:
                      </span>
                      <ul className="list-disc pl-5 text-[11px] space-y-0.5">
                        {rev.potentialAlerts.map((alt, i) => (
                          <li key={i}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Audit Trail Info if already evaluated */}
                  {rev.reviewedBy && (
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Trilha de Auditoria Clínica Registrada</span>
                      </div>
                      <p>
                        Profissional: <strong>{rev.reviewedBy.physioName}</strong> ({rev.reviewedBy.crefito}) às {new Date(rev.reviewedBy.reviewedAt).toLocaleString('pt-BR')}
                      </p>
                      {rev.reviewedBy.decisionNotes && (
                        <p className="italic">
                          Parecer: "{rev.reviewedBy.decisionNotes}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit & Approve Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Editar Orientação antes da Liberação ao Paciente
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Paciente: <strong>{editingReview.patientName}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Texto da Conduta / Exercício (Modifique conforme seu julgamento):
                </label>
                <textarea
                  rows={4}
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Justificativa Clínica da Modificação:
                </label>
                <input
                  type="text"
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Ex.: Adaptada dosagem para 5 repetições devido à sensibilidade do nervo ciático."
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-[#647785] hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={actionInProgress}
                onClick={() => handleDecision(editingReview.id, 'edited_approved', modifiedText, decisionNotes)}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#176B72] hover:bg-[#102A43] text-white"
              >
                {actionInProgress ? 'Gravando...' : 'Liberar Conduta Editada'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
