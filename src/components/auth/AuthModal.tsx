import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  X, 
  User, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Lock, 
  Mail, 
  Phone, 
  Sparkles,
  Zap,
  KeyRound,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'login' | 'register' | 'recover' | 'personas';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, recoverPassword, resetPassword, switchUserById } = useAuth();
  
  const [view, setView] = useState<ModalView>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCrefitoNumber, setRegCrefitoNumber] = useState('');
  const [regCrefitoRegion, setRegCrefitoRegion] = useState('CREFITO-3 (SP)');
  const [regClinicName, setRegClinicName] = useState('');

  // Recovery form state
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoveryStep, setRecoveryStep] = useState<'request' | 'confirm'>('request');

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const isPatrickEmail = (regEmail.trim().toLowerCase() === 'patrickjr2004@gmail.com') ||
                         (loginEmail.trim().toLowerCase() === 'patrickjr2004@gmail.com');

  const formatCpf = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const res = await login(loginEmail.trim(), loginPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMessage(`Bem-vindo(a), ${res.user?.name}!`);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 1000);
    } else {
      setErrorMessage(res.error || 'Credenciais inválidas.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const payload = {
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      cpf: regCpf.trim(),
      phone: regPhone.trim(),
      role: selectedRole,
      crefitoNumber: regCrefitoNumber.trim(),
      crefitoRegion: regCrefitoRegion.trim(),
      clinicName: regClinicName.trim()
    };

    const res = await register(payload);
    setLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Conta criada com sucesso!');
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 1200);
    } else {
      setErrorMessage(res.error || 'Erro ao realizar cadastro.');
    }
  };

  const handleRecoveryRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const res = await recoverPassword(recoveryEmail.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Código de redefinição gerado!');
      if (res.resetToken) {
        setResetToken(res.resetToken);
      }
      setRecoveryStep('confirm');
    } else {
      setErrorMessage(res.error || 'E-mail não encontrado.');
    }
  };

  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const res = await resetPassword(resetToken.trim(), newPassword);
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Senha atualizada com sucesso! Faça login com a nova senha.');
      setTimeout(() => {
        setView('login');
        setLoginEmail(recoveryEmail);
        setLoginPassword(newPassword);
        setSuccessMessage('');
        setRecoveryStep('request');
      }, 1500);
    } else {
      setErrorMessage(res.error || 'Erro ao redefinir senha.');
    }
  };

  const selectPersona = async (userId: string) => {
    await switchUserById(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] flex items-center justify-center font-black text-sm">
              R
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#176B72] dark:text-[#55C6B5]">
                REAVITA Authentication
              </span>
              <h2 className="text-lg font-black text-[#102A43] dark:text-[#DCE9EB]">
                {view === 'login' && 'Entrar na Plataforma'}
                {view === 'register' && (selectedRole === 'patient' ? 'Criar Conta no REAVITA CARE' : 'Cadastro Profissional REAVITA PRO')}
                {view === 'recover' && 'Recuperação de Senha'}
                {view === 'personas' && 'Troca Rápida de Usuários de Teste'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1.5 text-[#647785] hover:text-[#102A43] dark:text-[#9BAEB5] dark:hover:text-[#DCE9EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-[#F6F8FA] dark:bg-[#142733] p-1 border border-[#E1E8EC] dark:border-[#29434D] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setView('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              view === 'login'
                ? 'bg-white dark:bg-[#1D3440] text-[#102A43] dark:text-[#DCE9EB] shadow-xs font-bold'
                : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#102A43]'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setView('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
              view === 'register'
                ? 'bg-white dark:bg-[#1D3440] text-[#102A43] dark:text-[#DCE9EB] shadow-xs font-bold'
                : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#102A43]'
            }`}
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => { setView('personas'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
              view === 'personas'
                ? 'bg-[#176B72] text-white shadow-xs font-bold'
                : 'text-[#176B72] dark:text-[#55C6B5] hover:bg-[#E8F2F0]/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Personas</span>
          </button>
        </div>

        {/* Global Notifications */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-xs font-semibold flex items-start gap-2 border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-start gap-2 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ================= VIEW 1: LOGIN ================= */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#647785]" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>
            </div>

            {isPatrickEmail && (
              <div className="p-2.5 rounded-xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/40 text-[11px] text-[#176B72] dark:text-[#55C6B5] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Exceção de Teste Detectada:</strong> Este e-mail possui liberação profissional no REAVITA PRO sem exigência de CREFITO.
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => { setView('recover'); setRecoveryEmail(loginEmail); }}
                  className="text-[11px] text-[#176B72] dark:text-[#55C6B5] hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#647785]" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>
              <p className="text-[10px] text-[#647785] dark:text-[#9BAEB5] mt-1">
                Dica para testes rápidos de contas existentes: a senha padrão é <code>senha123</code>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs shadow-sm mt-2"
            >
              {loading ? 'Entrando...' : 'Acessar Conta'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] text-[#647785] dark:text-[#9BAEB5]">
              Não possui conta?{' '}
              <button
                type="button"
                onClick={() => setView('register')}
                className="font-bold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
              >
                Cadastre-se gratuitamente
              </button>
            </div>
          </form>
        )}

        {/* ================= VIEW 2: REGISTER ================= */}
        {view === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            {/* Choose Role Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F6F8FA] dark:bg-[#142733] rounded-xl border border-[#E1E8EC] dark:border-[#29434D]">
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  selectedRole === 'patient'
                    ? 'bg-[#176B72] text-white shadow-xs'
                    : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#102A43]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Sou Paciente (CARE)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('physiotherapist')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  selectedRole === 'physiotherapist'
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'text-[#647785] dark:text-[#9BAEB5] hover:text-[#102A43]'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Sou Fisioterapeuta (PRO)</span>
              </button>
            </div>

            {/* Test Exception Banner if Patrick */}
            {isPatrickEmail && selectedRole === 'physiotherapist' && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800 dark:text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Exceção Oficial de Teste (Regra Backend Ativa)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  O e-mail <strong>patrickjr2004@gmail.com</strong> possui autorização exclusiva no servidor para criar uma conta profissional de teste com aprovação imediata, sem necessidade de informar ou validar CREFITO.
                </p>
              </div>
            )}

            <div>
              <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Ex.: Mariana Silva"
                className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Senha * (mínimo 6 dígitos)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  CPF (Obrigatório) *
                </label>
                <input
                  type="text"
                  required
                  value={regCpf}
                  onChange={(e) => setRegCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72] font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                />
              </div>
            </div>

            {/* Professional Fields */}
            {selectedRole === 'physiotherapist' && (
              <div className="p-3.5 rounded-2xl bg-[#E8F2F0] dark:bg-[#142733] border border-[#35A69A]/30 space-y-3">
                <div className="text-[11px] font-bold text-[#176B72] dark:text-[#55C6B5] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Registro no Conselho Profissional (COFFITO/CREFITO)</span>
                  </div>
                  {isPatrickEmail && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                      Isento de CREFITO
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                      Número do CREFITO {isPatrickEmail ? '(Opcional para testes)' : '*'}
                    </label>
                    <input
                      type="text"
                      required={!isPatrickEmail}
                      value={regCrefitoNumber}
                      onChange={(e) => setRegCrefitoNumber(e.target.value)}
                      placeholder={isPatrickEmail ? "Dispensado para patrickjr2004" : "Ex.: 249182-F"}
                      className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                      Região do Conselho *
                    </label>
                    <select
                      value={regCrefitoRegion}
                      onChange={(e) => setRegCrefitoRegion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                    >
                      <option value="CREFITO-3 (SP)">CREFITO-3 (São Paulo)</option>
                      <option value="CREFITO-2 (RJ)">CREFITO-2 (Rio de Janeiro)</option>
                      <option value="CREFITO-4 (MG)">CREFITO-4 (Minas Gerais)</option>
                      <option value="CREFITO-8 (PR)">CREFITO-8 (Paraná)</option>
                      <option value="CREFITO-5 (RS)">CREFITO-5 (Rio Grande do Sul)</option>
                      <option value="CREFITO-1 (PE/AL/PB/RN)">CREFITO-1 (Nordeste 1)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    Nome da Clínica / Consultório (Opcional)
                  </label>
                  <input
                    type="text"
                    value={regClinicName}
                    onChange={(e) => setRegClinicName(e.target.value)}
                    placeholder="Ex.: Reab Fisio & Performance"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs shadow-sm mt-2"
            >
              {loading ? 'Cadastrando...' : 'Concluir Cadastro'}
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] text-[#647785] dark:text-[#9BAEB5]">
              Já possui conta?{' '}
              <button
                type="button"
                onClick={() => setView('login')}
                className="font-bold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
              >
                Fazer login
              </button>
            </div>
          </form>
        )}

        {/* ================= VIEW 3: PASSWORD RECOVERY ================= */}
        {view === 'recover' && (
          <div className="space-y-4 text-xs">
            {recoveryStep === 'request' ? (
              <form onSubmit={handleRecoveryRequest} className="space-y-3.5">
                <p className="text-[#647785] dark:text-[#9BAEB5] text-xs">
                  Informe o seu e-mail cadastrado. Enviaremos as instruções de recuperação com um código de redefinição de segurança.
                </p>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    E-mail Cadastrado
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#647785]" />
                    <input
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none focus:border-[#176B72]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-[#647785] hover:underline cursor-pointer"
                  >
                    Voltar ao login
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {loading ? 'Gerando Código...' : 'Enviar Código'}
                    <KeyRound className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetConfirm} className="space-y-3.5">
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-xs">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <KeyRound className="w-4 h-4 text-[#176B72]" />
                    <span>Código de Recuperação Seguro Gerado:</span>
                  </div>
                  <div className="font-mono bg-white dark:bg-[#102A43] p-1.5 rounded-lg border text-xs font-bold text-center">
                    {resetToken || 'TOKEN_SIMULADO'}
                  </div>
                  <p className="text-[10px] mt-1 text-[#647785] dark:text-[#9BAEB5]">
                    Em ambiente de teste, o token foi automaticamente preenchido abaixo para sua conveniência.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    Código / Token de Redefinição
                  </label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setRecoveryStep('request')}
                    className="text-[#647785] hover:underline cursor-pointer"
                  >
                    Alterar e-mail
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {loading ? 'Salvando...' : 'Salvar Nova Senha'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================= VIEW 4: QUICK PERSONAS SWITCHER ================= */}
        {view === 'personas' && (
          <div className="space-y-3 text-xs">
            <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
              Selecione qualquer perfil abaixo para testar instantaneamente a alternância de papéis e as regras de segurança e isolamento:
            </p>

            <div className="space-y-2">
              {/* Patrick Exception Persona */}
              <button
                type="button"
                onClick={() => selectPersona('user-physio-01')}
                className="w-full p-3 rounded-2xl border-2 border-[#176B72] bg-[#E8F2F0]/60 dark:bg-[#176B72]/20 hover:bg-[#E8F2F0] text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#176B72] text-white flex items-center justify-center font-bold text-xs">
                      PJ
                    </div>
                    <div>
                      <div className="font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-1.5">
                        <span>Dr. Patrick Alencar</span>
                        <span className="text-[9px] bg-amber-400 text-[#102A43] px-1.5 py-0.2 rounded font-black">
                          CONTA DO USUÁRIO
                        </span>
                      </div>
                      <div className="text-[10px] text-[#176B72] dark:text-[#55C6B5] font-mono">
                        patrickjr2004@gmail.com • Fisio PRO (Exceção Segura)
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#176B72] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Patient 1: Mariana */}
              <button
                type="button"
                onClick={() => selectPersona('user-patient-01')}
                className="w-full p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:border-[#176B72] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Mariana Silva
                    </div>
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                      Paciente (CARE) • Vinculada ao Dr. Patrick com consentimento ativo
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    CARE
                  </span>
                </div>
              </button>

              {/* Patient 2: Roberto (Isolation test) */}
              <button
                type="button"
                onClick={() => selectPersona('user-patient-02')}
                className="w-full p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:border-[#176B72] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Roberto Mendonça
                    </div>
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                      Paciente (CARE) • Conta não vinculada (Isolamento total de prontuário)
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">
                    CARE (Isolado)
                  </span>
                </div>
              </button>

              {/* Physio with Pending CREFITO */}
              <button
                type="button"
                onClick={() => selectPersona('user-physio-pending')}
                className="w-full p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:border-amber-400 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Dra. Larissa Mendes
                    </div>
                    <div className="text-[10px] text-amber-700 dark:text-amber-400">
                      Fisioterapeuta (PRO) • CREFITO 291834-F (Aguardando Validação)
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                    Bloqueado
                  </span>
                </div>
              </button>

              {/* Clinic Admin: Beatriz */}
              <button
                type="button"
                onClick={() => selectPersona('user-clinic-admin-01')}
                className="w-full p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:border-teal-400 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Dra. Beatriz Mattos
                    </div>
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                      Gestora Clínica (PRO) • VitaMove Reabilitação Integrada
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
                    PRO Clínica
                  </span>
                </div>
              </button>

              {/* Platform Admin: Carlos Eduardo */}
              <button
                type="button"
                onClick={() => selectPersona('user-platform-admin-01')}
                className="w-full p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] hover:border-indigo-400 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      Carlos Eduardo
                    </div>
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                      Auditoria de CREFITO, Logs LGPD e Painel de Segurança
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold">
                    Admin
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
