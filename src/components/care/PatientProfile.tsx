import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PatientProfessionalLink } from '../../types';
import { 
  User, 
  ShieldCheck, 
  Download, 
  Trash2, 
  HeartHandshake, 
  Lock, 
  CreditCard, 
  Check, 
  AlertTriangle,
  RefreshCw,
  UserPlus,
  KeyRound,
  FileText,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PatientProfile: React.FC = () => {
  const { currentUser, updateUserProfile, authFetch } = useAuth();
  const [links, setLinks] = useState<PatientProfessionalLink[]>([]);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [cpf, setCpf] = useState(currentUser.cpf || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Link Invitation Code Form State
  const [invitationCode, setInvitationCode] = useState('');
  const [linking, setLinking] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [linkSuccess, setLinkSuccess] = useState('');

  // Granular LGPD Consents State for Linking
  const [shareAnamnese, setShareAnamnese] = useState(true);
  const [shareDocuments, setShareDocuments] = useState(true);
  const [shareSymptomDiary, setShareSymptomDiary] = useState(true);
  const [shareAiConversations, setShareAiConversations] = useState(true);

  // General Platform Consents
  const [consentAi, setConsentAi] = useState(true);
  const [consentStorage, setConsentStorage] = useState(true);

  const loadLinks = async () => {
    try {
      const res = await authFetch('/api/links');
      const data = await res.json();
      if (data.links) {
        const userLinks = data.links.filter((l: PatientProfessionalLink) => l.patientId === currentUser.id);
        setLinks(userLinks);
      }
    } catch (err) {
      console.warn('Error loading links:', err);
    }
  };

  useEffect(() => {
    loadLinks();
  }, [currentUser.id]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateUserProfile({ name, phone, cpf });
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationCode.trim()) return;
    setLinking(true);
    setLinkError('');
    setLinkSuccess('');

    try {
      const res = await authFetch('/api/links/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationCode: invitationCode.trim(),
          permissions: {
            shareAnamnese,
            shareDocuments,
            shareSymptomDiary,
            shareAiConversations
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao vincular fisioterapeuta.');
      }

      setLinkSuccess(`Vínculo ativado com sucesso com ${data.link?.physioName || 'o fisioterapeuta'}!`);
      setInvitationCode('');
      await loadLinks();
    } catch (err: any) {
      setLinkError(err.message || 'Erro ao processar convite.');
    } finally {
      setLinking(false);
    }
  };

  const handleRevokeLink = async (linkId: string) => {
    if (window.confirm('Tem certeza de que deseja revogar o acesso do fisioterapeuta aos seus dados? Ele deixará de visualizar seus exames e diário.')) {
      try {
        const res = await authFetch('/api/links/revoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            linkId,
            actorId: currentUser.id,
            actorName: currentUser.name,
            actorRole: 'patient'
          })
        });
        const data = await res.json();
        if (data.link) {
          setLinks(links.map(l => l.id === linkId ? { ...l, status: 'revoked' } : l));
        }
      } catch (err) {
        console.warn('Error revoking link:', err);
      }
    }
  };

  const handleExportData = () => {
    const exportData = {
      platform: 'REAVITA HealthTech',
      exportedAt: new Date().toISOString(),
      patient: currentUser,
      activeConsents: {
        consentAi,
        consentStorage,
        shareAnamnese,
        shareDocuments,
        shareSymptomDiary,
        shareAiConversations
      },
      links,
      lgpdNotice: 'Exportação gerada nos termos do Art. 18, V da Lei 13.709/2018 (LGPD - Portabilidade de Dados Sensíveis).'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `REAVITA_Prontuario_${currentUser.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Minha Conta e Governança de Dados</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Perfil do Paciente & LGPD
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Gerencie seus dados pessoais, autorizações de consentimento e vínculos com profissionais.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E8F2F0] hover:bg-[#176B72]/20 dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] border border-[#35A69A]/30 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Prontuário (LGPD)</span>
        </button>
      </div>

      {/* Grid: Profile Info & Professional Link */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Personal Info & Consents */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Personal Info Form */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Dados Pessoais
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    CPF (LGPD Art. 11)
                  </label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Telefone de Contato
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer"
                >
                  Salvar Alterações
                </button>
                {saveSuccess && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Dados salvos!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Granular LGPD Consents */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
              <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Termos de Consentimento e Privacidade (LGPD)
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAi}
                  onChange={(e) => setConsentAi(e.target.checked)}
                  className="mt-0.5 text-[#176B72] rounded-sm"
                />
                <div>
                  <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                    Processamento por Inteligência Artificial Médica
                  </div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                    Autorizo o motor de IA a ler dados dos meus laudos e anamnese para estruturar explicações de saúde sob supervisão.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentStorage}
                  onChange={(e) => setConsentStorage(e.target.checked)}
                  className="mt-0.5 text-[#176B72] rounded-sm"
                />
                <div>
                  <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                    Guarda Segura Criptografada de Documentos
                  </div>
                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                    Armazenamento seguro em repositório privado com retenção conforme exigido pelo prontuário eletrônico de saúde.
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Linked Professional & Invitation Code Input */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Links / Link Invitation Form */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
              <span>Fisioterapeuta Vinculado</span>
            </h3>

            {/* List Active Links */}
            {links.filter(l => l.status === 'active').length > 0 ? (
              links.filter(l => l.status === 'active').map((link) => (
                <div 
                  key={link.id}
                  className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                        {link.physioName}
                      </h4>
                      <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5] font-mono">
                        {link.physioCrefito}
                      </p>
                      {link.clinicName && (
                        <p className="text-[11px] text-[#176B72] dark:text-[#55C6B5] mt-0.5 font-medium">
                          {link.clinicName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      Vínculo Ativo
                    </span>
                  </div>

                  <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] pt-1 border-t border-[#E1E8EC] dark:border-[#29434D]">
                    Vinculado em {new Date(link.linkedAt).toLocaleDateString('pt-BR')}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleRevokeLink(link.id)}
                      className="text-[11px] text-red-600 hover:underline font-semibold cursor-pointer"
                    >
                      Revogar Vínculo
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3.5 text-xs text-[#647785] dark:text-[#9BAEB5] text-center bg-[#F6F8FA] dark:bg-[#142733] rounded-xl border border-dashed border-[#E1E8EC] dark:border-[#29434D]">
                Você ainda não possui um fisioterapeuta vinculado. Insira o código de convite abaixo para conectar seu prontuário ao seu profissional de confiança.
              </div>
            )}

            {/* Input Form for Invitation Code */}
            <form onSubmit={handleAcceptInvite} className="p-4 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                <UserPlus className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
                <span>Inserir Código de Convite do Fisioterapeuta:</span>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                  placeholder="Ex.: PATRICK-2024 ou REAVITA-123456"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] outline-none font-mono tracking-wider font-bold"
                />
                <p className="text-[10px] text-[#647785] dark:text-[#9BAEB5] mt-1">
                  Dica de teste: use o código <strong>PATRICK-2024</strong> para se vincular ao Dr. Patrick Alencar.
                </p>
              </div>

              {/* Granular permissions checkboxes for the new link */}
              <div className="space-y-1.5 pt-1 text-[11px] text-[#172B3A] dark:text-[#DCE9EB]">
                <div className="font-bold text-[10px] text-[#647785] dark:text-[#9BAEB5] uppercase tracking-wider">
                  Permissões concedidas ao fisioterapeuta:
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareAnamnese}
                    onChange={(e) => setShareAnamnese(e.target.checked)}
                    className="rounded text-[#176B72]"
                  />
                  <span>Compartilhar Anamnese e Queixa Principal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareDocuments}
                    onChange={(e) => setShareDocuments(e.target.checked)}
                    className="rounded text-[#176B72]"
                  />
                  <span>Compartilhar Exames e Laudos Anexados</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareSymptomDiary}
                    onChange={(e) => setShareSymptomDiary(e.target.checked)}
                    className="rounded text-[#176B72]"
                  />
                  <span>Compartilhar Diário de Sintomas & Escala EVA</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareAiConversations}
                    onChange={(e) => setShareAiConversations(e.target.checked)}
                    className="rounded text-[#176B72]"
                  />
                  <span>Compartilhar Histórico de Conversas com IA</span>
                </label>
              </div>

              {linkError && (
                <div className="p-2 rounded-lg bg-red-50 text-red-700 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{linkError}</span>
                </div>
              )}

              {linkSuccess && (
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{linkSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={linking || !invitationCode.trim()}
                className="w-full py-2 text-xs font-bold rounded-xl bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {linking ? 'Vinculando...' : 'Aceitar e Autorizar Acesso'}
              </button>
            </form>
          </div>

          {/* Plan Subscription Status Card */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
              <span>Assinatura REAVITA CARE</span>
            </h3>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#102A43] to-[#176B72] text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Plano Paciente</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px]">
                  Ativo
                </span>
              </div>
              <div className="text-2xl font-black">
                R$ 29,90 <span className="text-xs font-normal opacity-80">/ mês</span>
              </div>
              <p className="text-[11px] opacity-80 leading-relaxed">
                Acesso completo a exames ilimitados, histórico de dor, IA baseada em evidências e integração com fisioterapeuta.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
