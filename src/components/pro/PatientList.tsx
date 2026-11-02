import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PatientProfessionalLink } from '../../types';
import { 
  Users, 
  Search, 
  UserPlus, 
  ChevronRight, 
  FileText, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface PatientListProps {
  onSelectPatient: (patientId: string) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient }) => {
  const { currentUser } = useAuth();
  const [links, setLinks] = useState<PatientProfessionalLink[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function loadLinks() {
      try {
        const res = await fetch('/api/links');
        const data = await res.json();
        if (data.links) {
          setLinks(data.links);
        }
      } catch (err) {
        console.warn('Error loading links:', err);
      }
    }
    loadLinks();
  }, [currentUser.id]);

  const handleGenerateCode = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/links/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          physioId: currentUser.id,
          clinicId: currentUser.clinicId
        })
      });
      const data = await res.json();
      if (data.code) {
        setGeneratedCode(data.code);
        setShowInviteModal(true);
      }
    } catch (err) {
      console.warn('Error generating code:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Sample Patients roster for Dr. Patrick
  const patientRoster = [
    {
      id: 'user-patient-01',
      name: 'Mariana Silva',
      email: 'mariana.silva@reavita.med.br',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      condition: 'Protrusão Discal L5-S1 com Ciatalgia',
      status: 'active',
      evaPain: '4/10',
      lastUpdate: 'Hoje às 08:30',
      linkDate: '12/05/2024'
    },
    {
      id: 'patient-demo-02',
      name: 'Rodrigo Mendonça',
      email: 'rodrigo.mendonca@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      condition: 'Tendinopatia do Manguito Rotador (Supraespinhal)',
      status: 'active',
      evaPain: '3/10',
      lastUpdate: 'Ontem às 17:15',
      linkDate: '02/05/2024'
    },
    {
      id: 'patient-demo-03',
      name: 'Camila Guimarães',
      email: 'camila.guimaraes@uol.com.br',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      condition: 'Pós-operatório de Reconstrução de LCA (Semana 8)',
      status: 'active',
      evaPain: '2/10',
      lastUpdate: 'Há 3 dias',
      linkDate: '18/04/2024'
    }
  ];

  const filteredPatients = patientRoster.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    return !q || p.name.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Gestão Clínica & Relação de Prontuários</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Pacientes Vinculados
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Cada paciente possui ficha e prontuário independente conforme as autorizações concedidas no CARE.
          </p>
        </div>

        <button
          onClick={handleGenerateCode}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>{generating ? 'Gerando Código...' : 'Convidar Novo Paciente'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1D3440] p-4 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#647785] dark:text-[#9BAEB5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome do paciente ou condição clínica..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
          />
        </div>

        <span className="text-xs text-[#647785] dark:text-[#9BAEB5] font-semibold">
          {filteredPatients.length} pacientes ativos
        </span>
      </div>

      {/* Patient Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#176B72]/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={p.avatarUrl}
                    alt={p.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#35A69A]/30"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                      {p.email}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Ativo
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] space-y-1 text-xs">
                <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  {p.condition}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#647785] dark:text-[#9BAEB5] pt-1">
                  <span>Dor Atual: <strong className="text-[#102A43] dark:text-[#DCE9EB]">{p.evaPain}</strong></span>
                  <span>Atualizado: {p.lastUpdate}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between">
              <span className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                Vinculado em: {p.linkDate}
              </span>
              <button
                onClick={() => onSelectPatient(p.id)}
                className="flex items-center gap-1 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
              >
                <span>Acessar Prontuário</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Code Generator Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  Código de Vínculo Gerado
                </h3>
                <p className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                  Passe este código para o seu paciente inserir no REAVITA CARE.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/40 text-center space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#176B72] dark:text-[#55C6B5]">
                Código de Autorização Individual
              </div>
              <div className="text-2xl font-mono font-black text-[#102A43] dark:text-[#DCE9EB] tracking-wider select-all">
                {generatedCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
              O paciente precisará confirmar expressamente o compartilhamento de saúde no app antes que os dados apareçam no seu painel, em total cumprimento à LGPD.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-[#172B3A] dark:text-[#DCE9EB]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
