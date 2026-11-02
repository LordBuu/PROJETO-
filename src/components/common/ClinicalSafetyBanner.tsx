import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, X, ChevronRight, PhoneCall } from 'lucide-react';

export const ClinicalSafetyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-[#176B72]/10 dark:bg-[#142733] border-b border-[#176B72]/20 dark:border-[#29434D] px-4 py-2.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-[#172B3A] dark:text-[#DCE9EB]">
            <span className="p-1 rounded-md bg-[#176B72]/20 dark:bg-[#55C6B5]/20 text-[#176B72] dark:text-[#55C6B5] shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <p className="line-clamp-1 sm:line-clamp-none">
              <strong className="font-semibold text-[#102A43] dark:text-[#55C6B5]">Diretriz de Segurança Clínica REAVITA:</strong> As orientações e a inteligência artificial são de apoio educacional e não substituem o diagnóstico presencial ou a prescrição do fisioterapeuta responsável.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Sinais de Alerta</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-[#647785] hover:text-[#172B3A] dark:text-[#9BAEB5] dark:hover:text-[#DCE9EB] rounded-md transition-colors"
              title="Dispensar aviso por agora"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <div className="flex items-center gap-2.5 text-[#D65A5A]">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-bold text-lg text-[#102A43] dark:text-[#DCE9EB]">
                  Sinais de Alerta Vermelhos (Red Flags)
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#647785] hover:text-[#172B3A] dark:text-[#9BAEB5] dark:hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#647785] dark:text-[#9BAEB5]">
              Se você apresentar qualquer um dos seguintes sintomas de forma súbita ou progressiva, <strong>interrompa os exercícios</strong> e procure atendimento médico hospitalar imediato:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-[#172B3A] dark:text-[#DCE9EB]">
              <li className="flex items-start gap-2 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-100 dark:border-red-900/40">
                <span className="font-bold text-[#D65A5A]">•</span>
                <span><strong>Perda de controle esfincteriano:</strong> Dificuldade súbita para urinar, vazamento involuntário ou perda de controle fecal.</span>
              </li>
              <li className="flex items-start gap-2 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-100 dark:border-red-900/40">
                <span className="font-bold text-[#D65A5A]">•</span>
                <span><strong>Anestesia em sela:</strong> Perda completa de sensibilidade na região genital, virilha ou face interna das coxas.</span>
              </li>
              <li className="flex items-start gap-2 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-100 dark:border-red-900/40">
                <span className="font-bold text-[#D65A5A]">•</span>
                <span><strong>Déficit motor progressivo:</strong> Perda de força rápida na perna ou braço (ex.: tropeçar por não conseguir levantar a ponta do pé - pé caído).</span>
              </li>
              <li className="flex items-start gap-2 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg border border-red-100 dark:border-red-900/40">
                <span className="font-bold text-[#D65A5A]">•</span>
                <span><strong>Dor nas costas associada a febre alta inexplicada</strong> ou histórico oncológico recente com dor noturna ininterrupta em repouso.</span>
              </li>
            </ul>

            <div className="bg-[#E8F2F0] dark:bg-[#142733] p-3.5 rounded-xl border border-[#35A69A]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#102A43] dark:text-[#55C6B5]">
                <PhoneCall className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
                <span>Em emergências de saúde no Brasil: Ligue <strong>SAMU 192</strong></span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#176B72] hover:bg-[#102A43] text-white transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
