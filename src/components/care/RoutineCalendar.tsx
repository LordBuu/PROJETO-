import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoutineActivity, SymptomLog } from '../../types';
import { 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  Plus, 
  TrendingDown, 
  Activity, 
  Calendar, 
  ShieldAlert, 
  Sparkles,
  BarChart2
} from 'lucide-react';

export const RoutineCalendar: React.FC = () => {
  const { currentUser } = useAuth();
  const [routine, setRoutine] = useState<RoutineActivity[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form State for Symptom Logger
  const [evaPain, setEvaPain] = useState<number>(4);
  const [mobility, setMobility] = useState<number>(7);
  const [impact, setImpact] = useState<SymptomLog['functionalImpact']>('leve');
  const [userNotes, setUserNotes] = useState('');
  const [savingLog, setSavingLog] = useState(false);

  const loadData = async () => {
    try {
      const [routineRes, symptomRes] = await Promise.all([
        fetch(`/api/patients/${currentUser.id}/routine`),
        fetch(`/api/patients/${currentUser.id}/symptoms`)
      ]);
      const rData = await routineRes.json();
      const sData = await symptomRes.json();
      if (rData.routine) setRoutine(rData.routine);
      if (sData.symptoms) setSymptoms(sData.symptoms);
    } catch (err) {
      console.warn('Error fetching routine:', err);
    }
  };

  useEffect(() => {
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

  const handleSaveSymptomLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLog(true);
    try {
      const res = await fetch(`/api/patients/${currentUser.id}/symptoms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          evaPainLevel: evaPain,
          mobilityLevel: mobility,
          functionalImpact: impact,
          userNotes
        })
      });
      const data = await res.json();
      if (data.symptoms) {
        setSymptoms(data.symptoms);
        setShowLogModal(false);
        setUserNotes('');
      }
    } catch (err) {
      console.warn('Save symptom log error:', err);
    } finally {
      setSavingLog(false);
    }
  };

  const todayStr = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Planejamento & Diário de Sintomas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Minha Rotina de Atividades
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5] capitalize">
            Hoje: {todayStr}
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Sintomas de Hoje</span>
        </button>
      </div>

      {/* Main Grid: Today's Tasks vs Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Today's Routine List */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Orientações Validadas do Dia
            </h2>
            <span className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5]">
              {routine.filter(r => r.completedToday).length} de {routine.length} feitas
            </span>
          </div>

          <div className="space-y-3">
            {routine.map((act) => (
              <div 
                key={act.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  act.completedToday 
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
                    : 'bg-[#F6F8FA] dark:bg-[#142733] border-[#E1E8EC] dark:border-[#29434D]'
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
                    <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/50">
                      {act.precautions}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleActivity(act.id)}
                  className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                    act.completedToday
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-[#1D3440] text-[#647785] border border-[#E1E8EC] dark:border-[#29434D]'
                  }`}
                  title={act.completedToday ? 'Marcar como não concluído' : 'Concluir atividade'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Evolution Chart & Clinical Warning */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pain Evolution Visual Bar Chart */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  Evolução da Dor Autorrelatada (EVA)
                </h3>
                <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                  Histórico dos últimos registros do paciente
                </p>
              </div>
              <BarChart2 className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
            </div>

            {/* Visual Bar Graph */}
            <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-[#E1E8EC] dark:border-[#29434D]">
              {symptoms.map((log) => {
                const heightPercent = Math.max(15, (log.evaPainLevel / 10) * 100);
                return (
                  <div key={log.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-[#102A43] dark:text-[#DCE9EB] opacity-0 group-hover:opacity-100 transition-opacity">
                      {log.evaPainLevel}
                    </span>
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        log.evaPainLevel <= 3 
                          ? 'bg-emerald-500' 
                          : log.evaPainLevel <= 5 
                            ? 'bg-amber-500' 
                            : 'bg-red-500'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[9px] text-[#647785] dark:text-[#9BAEB5] font-mono">
                      {log.date.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-[#647785] dark:text-[#9BAEB5]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Dor Alta (6-10)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Moderada (4-5)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Leve (0-3)</span>
              </span>
            </div>

            {/* Scientific Caveat Warning as strictly required in Section 6.7 */}
            <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] text-[11px] text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
              <strong>Ressalva Metodológica:</strong> Os gráficos acima representam percepções autorrelatadas de dor e funcionalidade, e não devem ser interpretados isoladamente como melhora clínica biológica comprovada sem a reavaliação física do fisioterapeuta.
            </div>
          </div>

        </div>

      </div>

      {/* Symptom Logger Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Registro de Sintomas Diários
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Atualize sua escala de dor e sensação funcional de hoje.
              </p>
            </div>

            <form onSubmit={handleSaveSymptomLog} className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  <span>Nível de Dor Hoje (EVA):</span>
                  <span className="text-[#176B72] dark:text-[#55C6B5] font-black">{evaPain}/10</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={evaPain}
                  onChange={(e) => setEvaPain(Number(e.target.value))}
                  className="w-full accent-[#176B72]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  <span>Facilidade de Movimento / Mobilidade:</span>
                  <span className="text-[#176B72] dark:text-[#55C6B5] font-black">{mobility}/10</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={mobility}
                  onChange={(e) => setMobility(Number(e.target.value))}
                  className="w-full accent-[#35A69A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Impacto nas Atividades do Dia:
                </label>
                <select
                  value={impact}
                  onChange={(e: any) => setImpact(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                >
                  <option value="nenhum">Nenhum (fiz tudo normalmente)</option>
                  <option value="leve">Leve (pequeno incômodo tolerável)</option>
                  <option value="moderado">Moderado (precisei pausar tarefas)</option>
                  <option value="severo">Severo (impedido de trabalhar ou caminhar)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Observações adicionais:
                </label>
                <input
                  type="text"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Ex.: Dor menor pela manhã, aumentou ao carregar compras."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-[#647785] hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingLog}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#176B72] hover:bg-[#102A43] text-white"
                >
                  {savingLog ? 'Salvando...' : 'Salvar Registro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
