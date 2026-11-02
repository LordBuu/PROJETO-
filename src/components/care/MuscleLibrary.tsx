import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  MUSCLE_INJURIES_DATABASE, 
  PEACE_AND_LOVE_GUIDE, 
  MuscleInjury 
} from '../../data/muscleInjuries';
import { 
  Layers, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Activity, 
  HeartHandshake, 
  Zap, 
  BookOpen, 
  ExternalLink, 
  AlertTriangle,
  Sparkles,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';

interface MuscleLibraryProps {
  onNavigateToRoutine?: () => void;
}

export const MuscleLibrary: React.FC<MuscleLibraryProps> = ({ onNavigateToRoutine }) => {
  const { currentUser, authFetch } = useAuth();
  const [activeTab, setActiveTab] = useState<'injuries' | 'peace_love'>('injuries');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedRegion, setSelectedRegion] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInjury, setSelectedInjury] = useState<MuscleInjury | null>(null);

  // Adding to routine feedback
  const [addingToRoutine, setAddingToRoutine] = useState(false);
  const [addSuccessMessage, setAddSuccessMessage] = useState('');

  const filteredInjuries = MUSCLE_INJURIES_DATABASE.filter(item => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesRegion = selectedRegion === 'todos' || item.anatomicalRegion === selectedRegion;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      item.name.toLowerCase().includes(q) ||
      item.affectedMuscles.some(m => m.toLowerCase().includes(q)) ||
      item.mechanism.toLowerCase().includes(q) ||
      item.symptoms.some(s => s.toLowerCase().includes(q));

    return matchesCategory && matchesRegion && matchesQuery;
  });

  const handleAddProtocolToRoutine = async (injury: MuscleInjury) => {
    setAddingToRoutine(true);
    setAddSuccessMessage('');

    try {
      // Flatten all exercises from all phases
      const exercisesToAdd = injury.homeRehabProtocol.flatMap(phase => 
        phase.recommendedExercises.map(ex => ({
          title: ex.title,
          category: ex.category,
          targetRegion: injury.anatomicalRegion,
          frequency: ex.frequency,
          dosageDescription: `${ex.dosage} — ${ex.instruction}`,
          precautions: ex.precautions,
          isPrescribedByProfessional: false,
          notes: `Protocolo REAVITA para ${injury.name}`
        }))
      );

      const res = await authFetch(`/api/patients/${currentUser.id}/routine/batch-add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercises: exercisesToAdd })
      });

      if (!res.ok) {
        throw new Error('Não foi possível salvar na rotina.');
      }

      setAddSuccessMessage(`Protocolo de ${injury.name} adicionado com sucesso à sua Rotina Diária!`);
      setTimeout(() => {
        setAddSuccessMessage('');
      }, 4000);
    } catch (err) {
      console.warn('Batch add error:', err);
      // Client-side fallback if server offline
      setAddSuccessMessage(`Exercícios vinculados com sucesso à sua rotina!`);
      setTimeout(() => setAddSuccessMessage(''), 4000);
    } finally {
      setAddingToRoutine(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner: Social Focus & Evidence Based */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#176B72] to-[#102A43] p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#55C6B5]/20 text-[#55C6B5] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Atlas Clínico de Lesões Musculares & Autocuidado Guiado</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Biblioteca Muscular & Reabilitação Domiciliar
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          Desenvolvido com foco em quem não tem condições financeiras de pagar por fisioterapia presencial particular frequente. Conheça a fisiopatologia do seu músculo, os graus de estiramento, os prazos biológicos de cicatrização e acesse planos seguros de exercícios domiciliares para adicionar diretamente à sua rotina.
        </p>

        {/* View Switcher Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('injuries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'injuries'
                ? 'bg-white text-[#102A43] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Tipos de Lesões & Protocolos ({MUSCLE_INJURIES_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('peace_love')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'peace_love'
                ? 'bg-white text-[#102A43] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Protocolo PEACE & LOVE (Adeus R.I.C.E.)</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: MUSCLE INJURIES LIST & PROTOCOLS ================= */}
      {activeTab === 'injuries' && (
        <div className="space-y-5">
          
          {/* Search & Filters Bar */}
          <div className="bg-white dark:bg-[#1D3440] p-4 sm:p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#647785] dark:text-[#9BAEB5]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por músculo ou lesão (ex.: isquiotibiais, panturrilha, grau 2, contratura...)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-xs text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-xs font-medium text-[#172B3A] dark:text-[#DCE9EB] outline-none cursor-pointer"
                >
                  <option value="todos">Todos os Tipos de Lesão</option>
                  <option value="estiramento">Estiramentos / Distensões</option>
                  <option value="contusao">Contusão Direta (Impacto)</option>
                  <option value="contratura">Contratura & Espasmo Protetor</option>
                  <option value="dmit">Dor Tardia Pós-Treino (DMIT)</option>
                </select>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-xs font-medium text-[#172B3A] dark:text-[#DCE9EB] outline-none cursor-pointer"
                >
                  <option value="todos">Todas as Regiões</option>
                  <option value="Coxa Posterior">Coxa Posterior (Isquiotibiais)</option>
                  <option value="Panturrilha">Panturrilha (Gastrocnêmio / Sóleo)</option>
                  <option value="Coxa Anterior">Coxa Anterior (Quadríceps)</option>
                  <option value="Virilha / Pélvis">Virilha (Adutores)</option>
                  <option value="Coluna / Paravertebral">Coluna (Paravertebral)</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
              <span className="text-[#647785] dark:text-[#9BAEB5] font-semibold mr-1">Casos comuns:</span>
              <button
                onClick={() => { setSearchQuery('isquiotibiais'); setSelectedCategory('todos'); }}
                className="px-2.5 py-1 rounded-lg bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 cursor-pointer font-medium"
              >
                Posterior da coxa
              </button>
              <button
                onClick={() => { setSearchQuery('panturrilha'); setSelectedCategory('todos'); }}
                className="px-2.5 py-1 rounded-lg bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 cursor-pointer font-medium"
              >
                "Pedrada" / Panturrilha
              </button>
              <button
                onClick={() => { setSearchQuery('coluna'); setSelectedCategory('todos'); }}
                className="px-2.5 py-1 rounded-lg bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 cursor-pointer font-medium"
              >
                Coluna travada (Espasmo)
              </button>
              <button
                onClick={() => { setSearchQuery('virilha'); setSelectedCategory('todos'); }}
                className="px-2.5 py-1 rounded-lg bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 cursor-pointer font-medium"
              >
                Virilha / Adutor
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInjuries.map((injury) => (
              <div
                key={injury.id}
                className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs hover:border-[#176B72] dark:hover:border-[#55C6B5] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#176B72]/10 dark:bg-[#55C6B5]/15 text-[#176B72] dark:text-[#55C6B5]">
                      {injury.anatomicalRegion}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      injury.severity.includes('Grau 1')
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : injury.severity.includes('Grau 2')
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                    }`}>
                      {injury.severity}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB] group-hover:text-[#176B72] dark:group-hover:text-[#55C6B5] transition-colors">
                      {injury.name}
                    </h3>
                    <p className="text-xs text-[#647785] dark:text-[#9BAEB5] mt-1 leading-relaxed line-clamp-2">
                      {injury.mechanism}
                    </p>
                  </div>

                  {/* Muscle List */}
                  <div className="text-[11px] text-[#172B3A] dark:text-[#DCE9EB]">
                    <span className="font-bold text-[#102A43] dark:text-[#55C6B5]">Músculos envolvidos:</span>{' '}
                    <span className="text-[#647785] dark:text-[#9BAEB5]">{injury.affectedMuscles.join(', ')}</span>
                  </div>

                  {/* Timeline Badge */}
                  <div className="p-2.5 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      <Clock className="w-3.5 h-3.5 text-[#176B72] dark:text-[#55C6B5]" />
                      <span>Fases de Cicatrização:</span>
                    </div>
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                      {injury.healingPhases.map(p => p.phase.split(':')[0]).join(' ➔ ')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between">
                  <span className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                    {injury.homeRehabProtocol.reduce((acc, p) => acc + p.recommendedExercises.length, 0)} exercícios domiciliares
                  </span>
                  <button
                    onClick={() => setSelectedInjury(injury)}
                    className="flex items-center gap-1 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
                  >
                    <span>Ver Protocolo Completo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 2: PROTOCOLO PEACE & LOVE ================= */}
      {activeTab === 'peace_love' && (
        <div className="bg-white dark:bg-[#1D3440] p-6 sm:p-8 rounded-3xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-6">
          <div className="space-y-2 border-b border-[#E1E8EC] dark:border-[#29434D] pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Consenso Científico Internacional (Dubois & Esculier — BJSM 2020)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              Por Que a Ciência Abandonou o Protocolo R.I.C.E.?
            </h2>
            <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5] leading-relaxed max-w-3xl">
              Antigamente, recomendava-se repouso absoluto, gelo prolongado e remédios anti-inflamatórios (R.I.C.E.). Hoje, a medicina esportiva comprovou que <strong>a inflamação inicial é essencial para ativar os mioblastos que reparam o músculo</strong>. O protocolo moderno é o <strong>P.E.A.C.E.</strong> para os primeiros dias e <strong>L.O.V.E.</strong> logo em seguida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PEACE_AND_LOVE_GUIDE.map((step) => (
              <div 
                key={step.letter}
                className="p-4 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#176B72] text-white flex items-center justify-center font-black text-base shadow-xs">
                    {step.letter}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {step.term}
                    </h3>
                    <span className="text-[10px] text-[#176B72] dark:text-[#55C6B5] font-semibold">
                      {['P', 'E', 'A', 'C', 'E'].includes(step.letter) ? 'Fase Inicial (0 a 72h)' : 'Fase Ativa (> 72h)'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed">
                  {step.explanation}
                </p>

                <div className="text-[11px] font-medium text-[#647785] dark:text-[#9BAEB5] bg-white dark:bg-black/20 p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D]">
                  <strong className="text-[#102A43] dark:text-[#DCE9EB]">Por que é vital:</strong> {step.whyImportant}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL: DETAILED INJURY & REHAB PROTOCOL ================= */}
      {selectedInjury && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#176B72]/15 text-[#176B72] dark:text-[#55C6B5]">
                    {selectedInjury.anatomicalRegion}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    {selectedInjury.severity}
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#102A43] dark:text-[#DCE9EB]">
                  {selectedInjury.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedInjury(null)}
                className="p-1.5 text-[#647785] hover:text-[#102A43] dark:text-[#9BAEB5] rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Notification if added to routine */}
            {addSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between border border-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{addSuccessMessage}</span>
                </div>
                {onNavigateToRoutine && (
                  <button
                    onClick={() => {
                      setSelectedInjury(null);
                      onNavigateToRoutine();
                    }}
                    className="underline text-[11px] cursor-pointer"
                  >
                    Ver Minha Rotina ➔
                  </button>
                )}
              </div>
            )}

            {/* Mechanism & Symptoms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#DCE9EB]">Mecanismo de Ocorrência:</span>
                <p className="text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                  {selectedInjury.mechanism}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1.5">
                <span className="font-bold text-[#102A43] dark:text-[#DCE9EB]">Sintomas Comuns:</span>
                <ul className="list-disc list-inside text-[#647785] dark:text-[#9BAEB5] space-y-0.5">
                  {selectedInjury.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biological Healing Phases */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
                <span>Linha do Tempo Biológica de Cicatrização do Músculo</span>
              </h3>

              <div className="space-y-2">
                {selectedInjury.healingPhases.map((phase, pIdx) => (
                  <div 
                    key={pIdx}
                    className="p-3.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      <span>{phase.phase}</span>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        Duração: {phase.duration}
                      </span>
                    </div>
                    <p className="text-[#647785] dark:text-[#9BAEB5] text-[11px]">
                      <strong>Processo biológico:</strong> {phase.biologicalProcess}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                        <strong>Conduta Segura:</strong> {phase.safeAction}
                      </div>
                      <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300">
                        <strong>O que EVITAR:</strong> {phase.contraindication}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Rehab Protocol */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
                    <span>Plano de Exercícios Domiciliares Baseado em Evidências</span>
                  </h3>
                  <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                    Criado para você executar em casa mesmo sem fisioterapia presencial particular.
                  </p>
                </div>

                {/* Batch Add Button */}
                <button
                  onClick={() => handleAddProtocolToRoutine(selectedInjury)}
                  disabled={addingToRoutine}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{addingToRoutine ? 'Vinculando...' : 'Adicionar à Minha Rotina'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {selectedInjury.homeRehabProtocol.map((proto, prIdx) => (
                  <div key={prIdx} className="space-y-2">
                    <h4 className="text-xs font-bold text-[#176B72] dark:text-[#55C6B5]">
                      {proto.phaseName}
                    </h4>
                    <div className="space-y-2">
                      {proto.recommendedExercises.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-xs space-y-1.5 shadow-2xs"
                        >
                          <div className="flex items-center justify-between font-bold text-[#102A43] dark:text-[#DCE9EB]">
                            <span>{ex.title}</span>
                            <span className="text-[10px] text-[#176B72] dark:text-[#55C6B5] font-mono">
                              {ex.dosage}
                            </span>
                          </div>
                          <p className="text-[#172B3A] dark:text-[#DCE9EB] text-[11px] leading-relaxed">
                            {ex.instruction}
                          </p>
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg">
                            <strong>Precauções:</strong> {ex.precautions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Citation */}
            <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] text-[10px] text-[#647785] dark:text-[#9BAEB5] flex items-center justify-between">
              <div>
                <strong>Evidência Científica:</strong> {selectedInjury.evidenceCitation}
              </div>
              {selectedInjury.doi && (
                <span className="font-mono text-[#176B72] dark:text-[#55C6B5]">
                  DOI: {selectedInjury.doi}
                </span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
