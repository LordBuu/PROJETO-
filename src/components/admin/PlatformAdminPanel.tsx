import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile, AuditLog } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  History, 
  Users, 
  FileText, 
  Activity, 
  Check, 
  AlertTriangle,
  Building2,
  RefreshCw
} from 'lucide-react';

export const PlatformAdminPanel: React.FC = () => {
  const { currentUser, refreshUsers } = useAuth();
  const [pendingPhysios, setPendingPhysios] = useState<UserProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'crefito' | 'logs' | 'security'>('crefito');
  const [actionSuccess, setActionSuccess] = useState('');
  const [securityRunning, setSecurityRunning] = useState(false);
  const [securityResults, setSecurityResults] = useState<any[]>([]);
  const [securitySummary, setSecuritySummary] = useState<any>(null);

  const loadAdminData = async () => {
    try {
      const [pendRes, logRes] = await Promise.all([
        fetch('/api/admin/pending-physios'),
        fetch('/api/admin/audit-logs')
      ]);
      const pData = await pendRes.json();
      const lData = await logRes.json();
      if (pData.pending) setPendingPhysios(pData.pending);
      if (lData.logs) setAuditLogs(lData.logs);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleVerifyDecision = async (userId: string, decision: 'approved' | 'rejected', notes: string) => {
    try {
      const res = await fetch('/api/admin/verify-physio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          decision,
          notes,
          adminName: currentUser.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(`Profissional ${decision === 'approved' ? 'Aprovado' : 'Rejeitado'} com sucesso!`);
        setTimeout(() => setActionSuccess(''), 3000);
        loadAdminData();
        refreshUsers();
      }
    } catch (err) {
      console.warn('Verify error:', err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#102A43] via-purple-900 to-[#102A43] p-6 sm:p-8 rounded-2xl text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Administração Central REAVITA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Painel de Auditoria & Validação de CREFITO
        </h1>
        <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
          Conforme a legislação brasileira e normas do COFFITO, o acesso às ferramentas de prontuário e prescrição do REAVITA PRO é condicionado à conferência do registro profissional ativo.
        </p>

        <div className="pt-3 flex gap-2">
          <button
            onClick={() => setActiveTab('crefito')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'crefito'
                ? 'bg-white text-[#102A43]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Fila de CREFITOs ({pendingPhysios.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white text-[#102A43]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Logs de Auditoria & LGPD ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-white text-[#102A43]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Testes de Penetração & LGPD
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* CREFITO Validation Queue */}
      {activeTab === 'crefito' && (
        <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Cadastros Profissionais Aguardando Homologação ({pendingPhysios.length})
            </h3>
            <button
              onClick={loadAdminData}
              className="text-xs font-semibold text-[#176B72] dark:text-[#55C6B5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Atualizar</span>
            </button>
          </div>

          {pendingPhysios.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#647785] dark:text-[#9BAEB5] bg-[#F6F8FA] dark:bg-[#142733] rounded-xl border border-dashed border-[#E1E8EC] dark:border-[#29434D]">
              Nenhum fisioterapeuta aguardando validação no momento. Todos os cadastros estão regulares!
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPhysios.map((physio) => (
                <div
                  key={physio.id}
                  className="p-5 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-[#F6F8FA] dark:bg-[#142733] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 uppercase">
                          {physio.crefito?.status === 'under_review' ? 'Em Análise Cadastral' : 'Pendente de Conferência'}
                        </span>
                        <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                          Cadastrado em {new Date(physio.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                        {physio.name}
                      </h4>
                      <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                        E-mail: <strong>{physio.email}</strong> • Telefone: {physio.phone || 'Não informado'}
                      </p>
                      <div className="text-xs font-mono text-[#102A43] dark:text-[#55C6B5] bg-white dark:bg-black/30 px-3 py-1.5 rounded-lg border border-[#E1E8EC] dark:border-[#29434D] inline-block mt-1">
                        Inscrição: <strong>{physio.crefito?.number}</strong> ({physio.crefito?.region}) — {physio.crefito?.category}
                      </div>
                      {physio.clinicName && (
                        <div className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Clínica: {physio.clinicName}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleVerifyDecision(physio.id, 'approved', 'Homologado após checagem na base oficial do CREFITO/COFFITO.')}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aprovar CREFITO</span>
                      </button>

                      <button
                        onClick={() => {
                          const reason = prompt('Informe a inconsistência cadastral para indeferimento:');
                          if (reason) handleVerifyDecision(physio.id, 'rejected', reason);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 text-[#172B3A] dark:text-[#DCE9EB] transition-colors cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  </div>

                  {physio.crefito?.verificationNotes && (
                    <div className="text-xs text-[#647785] dark:text-[#9BAEB5] italic bg-white/70 dark:bg-black/20 p-2.5 rounded-lg">
                      Notas do Registro: "{physio.crefito.verificationNotes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LGPD Audit Trail Table */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Trilha de Auditoria e Conformidade LGPD (Art. 11)
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Registro imutável de acessos, uploads de dados sensíveis e liberações de condutas.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F8FA] dark:bg-[#142733] border-b border-[#E1E8EC] dark:border-[#29434D] text-[#647785] dark:text-[#9BAEB5]">
                <tr>
                  <th className="py-2.5 px-3">Horário</th>
                  <th className="py-2.5 px-3">Agente / Papel</th>
                  <th className="py-2.5 px-3">Ação Realizada</th>
                  <th className="py-2.5 px-3">Recurso</th>
                  <th className="py-2.5 px-3">Detalhes do Evento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E8EC] dark:divide-[#29434D]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono text-[11px] text-[#647785] dark:text-[#9BAEB5] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                        {log.actorName}
                      </div>
                      <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] uppercase">
                        {log.actorRole}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                      {log.resourceType}
                    </td>
                    <td className="py-3 px-3 text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Penetration & Zero-Trust Tab */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                <span>Central de Testes de Penetração & Isolamento de Dados</span>
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                Simulação programática de violações de permissão e checagem de conformidade com a LGPD (Art. 11).
              </p>
            </div>

            <button
              onClick={async () => {
                setSecurityRunning(true);
                try {
                  const res = await fetch('/api/security/run-tests');
                  const data = await res.json();
                  setSecurityResults(data.results || []);
                  setSecuritySummary({
                    total: data.totalTests,
                    passed: data.passedTests,
                    allPassed: data.passed
                  });
                } catch (e) {
                  console.warn(e);
                } finally {
                  setSecurityRunning(false);
                }
              }}
              disabled={securityRunning}
              className="px-5 py-2.5 rounded-xl font-bold bg-[#102A43] hover:bg-[#176B72] text-white text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${securityRunning ? 'animate-spin' : ''}`} />
              <span>{securityRunning ? 'Executando Testes...' : 'Executar Bateria de Testes'}</span>
            </button>
          </div>

          {securitySummary && (
            <div className={`p-4 rounded-xl text-xs font-bold border flex items-center justify-between ${
              securitySummary.allPassed 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-red-50 text-red-800 border-red-300'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Status da Governança: {securitySummary.passed} de {securitySummary.total} testes passaram com sucesso!</span>
              </div>
              <span className="font-mono uppercase bg-white px-2.5 py-1 rounded-md text-[10px]">
                {securitySummary.allPassed ? '100% Protegido' : 'Falhas Encontradas'}
              </span>
            </div>
          )}

          {securityResults.length > 0 ? (
            <div className="space-y-2.5 pt-2">
              {securityResults.map((test, i) => (
                <div 
                  key={test.id || i}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    test.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-[#102A43]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{test.name}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border">
                      HTTP {test.actualStatus} (Esperado: {test.expectedStatus})
                    </span>
                  </div>
                  <p className="text-[11px] text-[#647785]">{test.description}</p>
                  <div className="text-[10px] font-mono text-[#176B72] bg-white/80 p-1.5 rounded">
                    {test.details}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#647785] bg-[#F6F8FA] rounded-xl border border-dashed">
              Clique em "Executar Bateria de Testes" para validar os 8 vetores de isolamento no servidor.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
