import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SecurityTestResult } from '../../types';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  FileCheck2,
  AlertTriangle,
  Server,
  Database,
  ExternalLink
} from 'lucide-react';

interface SecuritySuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecuritySuiteModal: React.FC<SecuritySuiteModalProps> = ({ isOpen, onClose }) => {
  const { authFetch } = useAuth();
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<SecurityTestResult[]>([]);
  const [summary, setSummary] = useState<{ total: number; passed: number; allPassed: boolean } | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const runSecurityTests = async () => {
    setRunning(true);
    setError('');
    try {
      const res = await authFetch('/api/security/run-tests');
      if (!res.ok) {
        throw new Error(`Falha no servidor ao executar testes (${res.status})`);
      }
      const data = await res.json();
      setResults(data.results || []);
      setSummary({
        total: data.totalTests || 0,
        passed: data.passedTests || 0,
        allPassed: data.passed
      });
    } catch (err: any) {
      setError(err.message || 'Erro inesperado.');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Auditoria de Segurança & Zero-Trust
              </span>
              <h2 className="text-xl font-black text-[#102A43] dark:text-[#DCE9EB]">
                Suíte de Testes de Penetração e Isolamento LGPD
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#647785] hover:text-[#102A43] dark:text-[#9BAEB5] dark:hover:text-[#DCE9EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Description */}
        <div className="p-4 rounded-2xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] text-xs space-y-2 text-[#172B3A] dark:text-[#DCE9EB]">
          <p className="leading-relaxed">
            Esta ferramenta executa ataques simulados e verificações de autorização diretamente no servidor Express e nas regras de governança para atestar que:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-medium text-[11px] text-[#647785] dark:text-[#9BAEB5]">
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Paciente A não acessa exames de Paciente B (403)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Fisioterapeuta não acessa paciente desvinculado (403)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>CREFITO não homologado tem acesso bloqueado (403)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>patrickjr2004@gmail.com possui liberação segura</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Red Flags clínicas bloqueiam chat comum imediatamente</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Tentativa de auto-elevação de privilégio é impedida</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={runSecurityTests}
            disabled={running}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold bg-[#102A43] hover:bg-[#176B72] text-white transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs shadow-sm"
          >
            {running ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executando Bateria de Testes...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Executar 8 Testes de Penetração em Tempo Real</span>
              </>
            )}
          </button>

          {summary && (
            <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
              summary.allPassed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 text-red-800 border-red-300'
            }`}>
              {summary.allPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
              <span>
                {summary.passed} de {summary.total} Testes Passaram com Sucesso ({summary.allPassed ? '100% de Aprovação' : 'Falhas detectadas'})
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Results List */}
        {results.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#647785] dark:text-[#9BAEB5]">
              Relatório de Execução dos Vetores de Ataque:
            </h3>

            <div className="space-y-2.5">
              {results.map((test, idx) => (
                <div
                  key={test.id || idx}
                  className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1.5 ${
                    test.passed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {test.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                      <span>{test.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-black/30 border border-[#E1E8EC] dark:border-[#29434D]">
                        Status: <strong>{test.actualStatus}</strong> (Esp: {test.expectedStatus})
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        test.passed 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {test.passed ? 'APROVADO' : 'FALHOU'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#647785] dark:text-[#9BAEB5] text-[11px] leading-relaxed">
                    {test.description}
                  </p>

                  <div className="text-[11px] font-mono text-[#176B72] dark:text-[#55C6B5] bg-white/70 dark:bg-black/20 p-2 rounded-xl">
                    Detalhes do Backend: {test.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
