import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Check, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Building2, 
  User, 
  CheckCircle2 
} from 'lucide-react';

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlansPricingModal: React.FC<PlansModalProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanSuccess, setSelectedPlanSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateSelect = (planName: string) => {
    setSelectedPlanSuccess(planName);
    setTimeout(() => {
      setSelectedPlanSuccess(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
              <CreditCard className="w-4 h-4" />
              <span>Planos e Assinaturas REAVITA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
              Tecnologia e Ciência a Favor da Reabilitação
            </h2>
            <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
              Planos transparentes desenhados tanto para o paciente quanto para o profissional.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#647785] hover:text-[#102A43] dark:text-[#9BAEB5] dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedPlanSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Plano {selectedPlanSuccess} selecionado com sucesso! Simulação de gateway concluída.</span>
          </div>
        )}

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* 1. CARE (Paciente) */}
          <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
            role === 'patient'
              ? 'border-[#176B72] dark:border-[#55C6B5] ring-2 ring-[#35A69A]/30 bg-[#E8F2F0]/40 dark:bg-[#142733]'
              : 'border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440]'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] uppercase">
                  Para Pacientes
                </span>
                {role === 'patient' && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Seu Plano Atual
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-[#102A43] dark:text-[#DCE9EB]">
                REAVITA CARE
              </h3>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
                  R$ 29,90
                </span>
                <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">/ mês</span>
              </div>

              <p className="text-xs text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                Acesso completo para organizar sua recuperação física diária.
              </p>

              <ul className="space-y-2 text-xs text-[#172B3A] dark:text-[#DCE9EB] pt-2 border-t border-[#E1E8EC] dark:border-[#29434D]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Anamnese e mapa corporal interativo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Envio e OCR de exames e laudos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Assistente IA com evidências científicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Vínculo direto com seu fisioterapeuta</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSimulateSelect('REAVITA CARE')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer"
            >
              {role === 'patient' ? 'Manter Plano Ativo' : 'Escolher CARE'}
            </button>
          </div>

          {/* 2. PRO Individual (Fisioterapeuta) */}
          <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 relative ${
            role === 'physiotherapist'
              ? 'border-[#176B72] dark:border-[#55C6B5] ring-2 ring-[#35A69A]/30 bg-[#E8F2F0]/40 dark:bg-[#142733]'
              : 'border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440]'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#102A43] text-white dark:bg-[#55C6B5] dark:text-[#0B1720] uppercase">
                  Para Fisioterapeutas
                </span>
                {role === 'physiotherapist' && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Seu Plano Atual
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-[#102A43] dark:text-[#DCE9EB]">
                REAVITA PRO Individual
              </h3>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
                  R$ 99,90
                </span>
                <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">/ mês</span>
              </div>

              <p className="text-xs text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                Gestão completa de pacientes, prontuários SOAP e validação de IA.
              </p>

              <ul className="space-y-2 text-xs text-[#172B3A] dark:text-[#DCE9EB] pt-2 border-t border-[#E1E8EC] dark:border-[#29434D]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Até 30 pacientes vinculados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Fila de revisão e edição de propostas IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Prontuário SOAP e histórico auditado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Acesso completo à base científica RAG</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSimulateSelect('REAVITA PRO Individual')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#102A43] hover:bg-[#176B72] text-white transition-colors cursor-pointer"
            >
              {role === 'physiotherapist' ? 'Plano Ativo' : 'Escolher PRO Individual'}
            </button>
          </div>

          {/* 3. PRO Clínica */}
          <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
            role === 'clinic_admin'
              ? 'border-[#176B72] dark:border-[#55C6B5] ring-2 ring-[#35A69A]/30 bg-[#E8F2F0]/40 dark:bg-[#142733]'
              : 'border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440]'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 uppercase">
                  Para Clínicas
                </span>
                {role === 'clinic_admin' && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Seu Plano Atual
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-[#102A43] dark:text-[#DCE9EB]">
                REAVITA PRO Clínica
              </h3>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
                  R$ 199,90
                </span>
                <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">/ mês inicial</span>
              </div>

              <p className="text-xs text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                Gestão integrada de equipe multiprofissional e indicadores globais.
              </p>

              <ul className="space-y-2 text-xs text-[#172B3A] dark:text-[#DCE9EB] pt-2 border-t border-[#E1E8EC] dark:border-[#29434D]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Múltiplos fisioterapeutas vinculados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Painel do Administrador Técnico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Distribuição e transferência de prontuários</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#35A69A] shrink-0" />
                  <span>Suporte prioritário e auditoria avançada</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSimulateSelect('REAVITA PRO Clínica')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white transition-colors cursor-pointer"
            >
              {role === 'clinic_admin' ? 'Plano Ativo' : 'Escolher PRO Clínica'}
            </button>
          </div>

        </div>

        <div className="pt-2 text-center text-[11px] text-[#647785] dark:text-[#9BAEB5]">
          Pagamento seguro via cartão de crédito ou PIX recorrente. Cancelamento a qualquer momento sem fidelidade.
        </div>
      </div>
    </div>
  );
};
