import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Activity, 
  CreditCard, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export const ClinicManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newPhysioName, setNewPhysioName] = useState('');
  const [newPhysioEmail, setNewPhysioEmail] = useState('');
  const [newPhysioCrefito, setNewPhysioCrefito] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Clinic Team Members Roster
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 'm-01',
      name: 'Dra. Beatriz Mattos',
      email: 'beatriz.mattos@vitamove.com.br',
      crefito: 'CREFITO-3/110294-F',
      role: 'Responsável Técnica / Sócia',
      activePatients: 18,
      status: 'approved'
    },
    {
      id: 'm-02',
      name: 'Dr. Patrick Alencar',
      email: 'patrick.fisio@reavita.med.br',
      crefito: 'CREFITO-3/184920-F',
      role: 'Fisioterapeuta Especialista em Ortopedia',
      activePatients: 16,
      status: 'approved'
    },
    {
      id: 'm-03',
      name: 'Dra. Larissa Mendes',
      email: 'larissa.mendes@reavita.med.br',
      crefito: 'CREFITO-8/291834-F',
      role: 'Fisioterapeuta Associada',
      activePatients: 11,
      status: 'under_review'
    }
  ]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhysioName.trim() || !newPhysioEmail.trim()) return;

    setTeamMembers([
      ...teamMembers,
      {
        id: `m-${Date.now()}`,
        name: newPhysioName.trim(),
        email: newPhysioEmail.trim(),
        crefito: newPhysioCrefito.trim() || 'CREFITO-3/000000-F',
        role: 'Fisioterapeuta Convidado',
        activePatients: 0,
        status: 'under_review'
      }
    ]);
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setShowInviteModal(false);
      setNewPhysioName('');
      setNewPhysioEmail('');
      setNewPhysioCrefito('');
    }, 2000);
  };

  const totalPatients = teamMembers.reduce((acc, m) => acc + m.activePatients, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Gestão Institucional de Clínica</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Clínica VitaMove Reabilitação Integrada
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Administração de profissionais vinculados, permissões clínicas e indicadores organizacionais.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Convidar Fisioterapeuta para a Equipe</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Fisioterapeutas na Equipe</span>
            <Users className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            {teamMembers.length}
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            2 registros validados
          </div>
        </div>

        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Total de Pacientes Ativos</span>
            <Activity className="w-4 h-4 text-[#35A69A]" />
          </div>
          <div className="mt-3 text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            {totalPatients}
          </div>
          <div className="mt-1 text-xs text-[#647785] dark:text-[#9BAEB5]">
            Distribuídos na equipe
          </div>
        </div>

        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Taxa de Adesão Geral</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            94%
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Alta conformidade às rotinas
          </div>
        </div>

        <div className="bg-white dark:bg-[#1D3440] p-5 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs">
          <div className="flex items-center justify-between text-[#647785] dark:text-[#9BAEB5] text-xs font-semibold">
            <span>Plano Institucional</span>
            <CreditCard className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          </div>
          <div className="mt-3 text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            PRO Clínica
          </div>
          <div className="mt-1 text-xs text-[#647785] dark:text-[#9BAEB5]">
            Até 10 profissionais
          </div>
        </div>
      </div>

      {/* Team Roster Table Card */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
          <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
            Relação de Profissionais da Clínica
          </h3>
          <span className="text-xs text-[#647785] dark:text-[#9BAEB5]">
            Isolamento de dados por organização garantido
          </span>
        </div>

        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                    {member.name}
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    member.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {member.status === 'approved' ? 'CREFITO Homologado' : 'Em Análise Cadastral'}
                  </span>
                </div>
                <div className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                  {member.role} • <span className="font-mono">{member.crefito}</span>
                </div>
                <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                  {member.email}
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-[#E1E8EC] sm:dark:border-[#29434D] sm:pl-4">
                <div className="text-lg font-black text-[#102A43] dark:text-[#DCE9EB]">
                  {member.activePatients}
                </div>
                <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] uppercase font-semibold">
                  Pacientes Ativos
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
              <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Convidar Fisioterapeuta para a Clínica
              </h3>
              <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                O profissional receberá o link e precisará ter seu CREFITO regular.
              </p>
            </div>

            {inviteSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Convite institucional enviado com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleAddMember} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    Nome Completo do Fisioterapeuta
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhysioName}
                    onChange={(e) => setNewPhysioName(e.target.value)}
                    placeholder="Ex.: Dra. Fernanda Ribeiro"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    required
                    value={newPhysioEmail}
                    onChange={(e) => setNewPhysioEmail(e.target.value)}
                    placeholder="fernanda.fisio@vitamove.com.br"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    Número do Registro CREFITO
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhysioCrefito}
                    onChange={(e) => setNewPhysioCrefito(e.target.value)}
                    placeholder="CREFITO-3/219481-F"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 font-semibold text-[#647785]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold bg-[#176B72] hover:bg-[#102A43] text-white rounded-xl"
                  >
                    Enviar Convite
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
