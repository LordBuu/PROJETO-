import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PatientAssessment } from '../../types';
import { 
  ClipboardCheck, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const InitialAssessment: React.FC = () => {
  const { currentUser } = useAuth();
  const [assessment, setAssessment] = useState<PatientAssessment | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadAssessment() {
      try {
        const res = await fetch(`/api/patients/${currentUser.id}/assessment`);
        const data = await res.json();
        if (data.assessment) {
          setAssessment(data.assessment);
          setCurrentStep(data.assessment.currentStep || 1);
        }
      } catch (err) {
        console.warn('Error loading assessment:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAssessment();
  }, [currentUser.id]);

  const handleSave = async (isFinal = false) => {
    if (!assessment) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      const payload = {
        ...assessment,
        currentStep,
        isDraft: !isFinal,
        completedAt: isFinal ? new Date().toISOString() : assessment.completedAt
      };

      const res = await fetch(`/api/patients/${currentUser.id}/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.assessment) {
        setAssessment(data.assessment);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.warn('Save assessment error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !assessment) {
    return (
      <div className="p-8 text-center text-sm text-[#647785] dark:text-[#9BAEB5]">
        Carregando formulário de avaliação clínica...
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Queixa e Início' },
    { number: 2, title: 'Histórico Clínico' },
    { number: 3, title: 'Limitações e Metas' },
    { number: 4, title: 'Sinais de Alerta' }
  ];

  const hasAnyRedFlag = Object.values(assessment.redFlagsScreening).some(Boolean);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header and Step Indicator */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
              <ClipboardCheck className="w-4 h-4" />
              <span>Anamnese Estruturada de Fisioterapia</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              Avaliação Inicial de Saúde
            </h1>
            <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
              As informações fornecidas estruturam o raciocínio clínico compartilhado com seu fisioterapeuta.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#172B3A] dark:text-[#DCE9EB] transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Salvando...' : 'Salvar Rascunho'}</span>
            </button>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Salvo!
              </span>
            )}
          </div>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {steps.map((s) => {
            const isCompleted = s.number < currentStep || !assessment.isDraft;
            const isCurrent = s.number === currentStep;
            return (
              <button
                key={s.number}
                onClick={() => setCurrentStep(s.number)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-[#176B72] bg-[#E8F2F0] dark:bg-[#142733] dark:border-[#55C6B5]'
                    : isCompleted
                      ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800'
                      : 'border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#1D3440] opacity-60'
                }`}
              >
                <div className="text-[10px] font-bold text-[#647785] dark:text-[#9BAEB5]">
                  Etapa 0{s.number}
                </div>
                <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] truncate">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Form Card */}
      <div className="bg-white dark:bg-[#1D3440] p-6 sm:p-8 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-6">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Etapa 1: Queixa Principal & Mecanismo de Início
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Descreva com suas palavras o que você está sentindo e como o desconforto começou.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                O que motivou sua busca por reabilitação? (Queixa principal)
              </label>
              <textarea
                rows={3}
                value={assessment.primaryComplaint}
                onChange={(e) => setAssessment({ ...assessment, primaryComplaint: e.target.value })}
                placeholder="Exemplo: Dor em queimação na lombar que começou após carregar caixas e agora irradia para a coxa direita."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Como a dor ou limitação começou?
                </label>
                <select
                  value={assessment.painOnset}
                  onChange={(e: any) => setAssessment({ ...assessment, painOnset: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                >
                  <option value="insidioso">Aos poucos, sem motivo aparente (Insidioso)</option>
                  <option value="súbito">De repente (Início súbito ao realizar movimento)</option>
                  <option value="após_trauma">Após queda, acidente ou trauma direto</option>
                  <option value="sobrecarga_repetitiva">Sobrecarga no trabalho ou esforço esportivo</option>
                  <option value="pós_cirúrgico">Período de recuperação pós-operatória</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Tempo aproximado de evolução
                </label>
                <input
                  type="text"
                  value={assessment.onsetDateApprox}
                  onChange={(e) => setAssessment({ ...assessment, onsetDateApprox: e.target.value })}
                  placeholder="Exemplo: Há cerca de 4 semanas / 6 meses..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                Detalhes do início ou histórico de trauma (se aplicável)
              </label>
              <input
                type="text"
                value={assessment.traumaDescription || ''}
                onChange={(e) => setAssessment({ ...assessment, traumaDescription: e.target.value })}
                placeholder="Exemplo: Trabalho 8 horas sentada, sem acidentes de trânsito ou quedas."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Etapa 2: Histórico Clínico & Cirúrgico
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Informações sobre lesões prévias, cirurgias e diagnósticos informados por outros médicos.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                Diagnósticos prévios informados por médicos ou exames
              </label>
              <textarea
                rows={2}
                value={assessment.priorDiagnoses}
                onChange={(e) => setAssessment({ ...assessment, priorDiagnoses: e.target.value })}
                placeholder="Exemplo: Hérnia de disco em L5-S1 informada pelo ortopedista após ressonância magnética."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Cirurgias anteriores em qualquer região corporal
                </label>
                <input
                  type="text"
                  value={assessment.priorSurgeries}
                  onChange={(e) => setAssessment({ ...assessment, priorSurgeries: e.target.value })}
                  placeholder="Exemplo: Nenhuma cirurgia prévia / Artroscopia de joelho em 2019."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Histórico de lesões ortopédicas anteriores
                </label>
                <input
                  type="text"
                  value={assessment.previousInjuries}
                  onChange={(e) => setAssessment({ ...assessment, previousInjuries: e.target.value })}
                  placeholder="Exemplo: Entorse de tornozelo direito há 2 anos."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Etapa 3: Limitações Funcionais & Objetivos Pessoais
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                O que o desconforto impede você de realizar no trabalho, esporte ou vida diária?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Fatores que PIORAM o desconforto (Agravantes)
                </label>
                <textarea
                  rows={2}
                  value={assessment.aggravatingFactors}
                  onChange={(e) => setAssessment({ ...assessment, aggravatingFactors: e.target.value })}
                  placeholder="Exemplo: Ficar sentada por mais de 30 minutos, inclinar o corpo para frente..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                  Fatores que ALIVIAM o desconforto (Atenuantes)
                </label>
                <textarea
                  rows={2}
                  value={assessment.relievingFactors}
                  onChange={(e) => setAssessment({ ...assessment, relievingFactors: e.target.value })}
                  placeholder="Exemplo: Deitar de barriga para cima com travesseiro nos joelhos, caminhar leve..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                Qual é a sua principal meta com a fisioterapia?
              </label>
              <input
                type="text"
                value={assessment.patientGoals}
                onChange={(e) => setAssessment({ ...assessment, patientGoals: e.target.value })}
                placeholder="Exemplo: Voltar a caminhar 45 minutos no parque sem dor e brincar com meus filhos."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-sm text-[#172B3A] dark:text-[#DCE9EB] focus:ring-2 focus:ring-[#176B72] outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: RED FLAGS SCREENING */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Protocolo de Triagem e Segurança Clínica (Finucane et al. 2020)</span>
              </div>
              <h2 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Etapa 4: Sinais de Alerta Vermelhos (Red Flags)
              </h2>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Essas perguntas garantem que condições clínicas graves que necessitam de pronto atendimento médico sejam prontamente identificadas.
              </p>
            </div>

            {hasAnyRedFlag && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs text-red-900 dark:text-red-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Sinal de Alerta Identificado</span>
                </div>
                <p>
                  Você marcou uma ou mais condições que exigem avaliação médica presencial com urgência antes de iniciar rotinas de exercícios automatizados. O sistema registrará esse alerta para o seu fisioterapeuta.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {[
                { 
                  key: 'bowelBladderIncontinence', 
                  title: 'Perda súbita de controle da urina ou fezes', 
                  desc: 'Incapacidade repentina de segurar urina ou evacuações.' 
                },
                { 
                  key: 'saddleAnesthesia', 
                  title: 'Dormência ou perda de sensibilidade em "sela"', 
                  desc: 'Perda de sensação na região genital, virilha ou ânus.' 
                },
                { 
                  key: 'progressiveMotorDeficit', 
                  title: 'Fraqueza muscular rápida ou pé caído', 
                  desc: 'Incapacidade de levantar a ponta do pé ou perda de força no braço/perna.' 
                },
                { 
                  key: 'feverWithSpinalPain', 
                  title: 'Dor na coluna acompanhada de febre alta inexplicada', 
                  desc: 'Sensação febril ou calafrios junto ao quadro de dor nas costas.' 
                },
                { 
                  key: 'unremittingNightPain', 
                  title: 'Dor noturna ininterrupta que impede qualquer posição de alívio', 
                  desc: 'Dor que não melhora deitado e desperta intensamente todas as noites.' 
                },
                { 
                  key: 'unexplainedWeightLoss', 
                  title: 'Perda de peso involuntária e significativa nos últimos meses', 
                  desc: 'Emagrecimento expressivo sem alteração de dieta ou exercícios.' 
                }
              ].map((rf) => {
                const isChecked = (assessment.redFlagsScreening as any)[rf.key];
                return (
                  <label
                    key={rf.key}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isChecked 
                        ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-800' 
                        : 'bg-[#F6F8FA] dark:bg-[#142733] border-[#E1E8EC] dark:border-[#29434D] hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setAssessment({
                        ...assessment,
                        redFlagsScreening: {
                          ...assessment.redFlagsScreening,
                          [rf.key]: e.target.checked
                        }
                      })}
                      className="mt-1 w-4 h-4 text-red-600 rounded-sm focus:ring-red-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                        {rf.title}
                      </div>
                      <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                        {rf.desc}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-4 border-t border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-[#647785]'
                : 'text-[#172B3A] dark:text-[#DCE9EB] hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => {
                handleSave(false);
                setCurrentStep(currentStep + 1);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
            >
              <span>Avançar para Etapa 0{currentStep + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#23865A] hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Concluir Avaliação Clínica</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
