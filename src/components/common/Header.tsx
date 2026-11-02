import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { CrefitoVerificationBadge } from './CrefitoVerificationBadge';
import { 
  Sun, 
  Moon, 
  UserCheck, 
  Sparkles, 
  CreditCard, 
  LogOut, 
  ChevronDown, 
  Building2, 
  ShieldCheck, 
  Menu,
  Activity,
  UserPlus,
  Lock,
  Shield,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  onOpenPlans: () => void;
  onOpenAuth: () => void;
  onOpenSecurity?: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenPlans, 
  onOpenAuth,
  onOpenSecurity,
  onToggleSidebar 
}) => {
  const { currentUser, role, theme, toggleTheme, allUsers, switchUserById, logout } = useAuth();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getProductVariant = () => {
    if (role === 'patient') return 'care';
    if (role === 'physiotherapist' || role === 'clinic_admin') return 'pro';
    if (role === 'platform_admin') return 'admin';
    return 'unified';
  };

  const isPatrick = currentUser.email.toLowerCase() === 'patrickjr2004@gmail.com';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#142733]/95 backdrop-blur-md border-b border-[#E1E8EC] dark:border-[#29434D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Mobile menu toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg text-[#647785] hover:text-[#172B3A] dark:text-[#9BAEB5] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <BrandLogo variant={getProductVariant()} size="md" />
        </div>

        {/* Center: Context Pill / Environment Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-[#F6F8FA] dark:bg-[#1D3440] px-3 py-1.5 rounded-full border border-[#E1E8EC] dark:border-[#29434D] text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35A69A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#176B72] dark:bg-[#55C6B5]"></span>
          </span>
          <span className="text-[#647785] dark:text-[#9BAEB5]">Ambiente Ativo:</span>
          <strong className="font-semibold text-[#102A43] dark:text-[#DCE9EB]">
            {role === 'patient' && 'REAVITA CARE (Paciente)'}
            {role === 'physiotherapist' && 'REAVITA PRO (Fisioterapeuta)'}
            {role === 'clinic_admin' && 'REAVITA PRO (Gestão de Clínica)'}
            {role === 'platform_admin' && 'REAVITA ADMIN (Plataforma)'}
          </strong>
          {isPatrick && (
            <span className="ml-1 text-[10px] bg-amber-400 text-[#102A43] font-black px-2 py-0.5 rounded-full">
              Exceção Ativa
            </span>
          )}
        </div>

        {/* Right Actions: Security Suite, Personas, Plans, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Security & Penetration Tests Trigger */}
          {onOpenSecurity && (
            <button
              onClick={onOpenSecurity}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all cursor-pointer shadow-2xs"
              title="Abrir suíte de testes de penetração e isolamento LGPD"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Auditoria & Testes</span>
            </button>
          )}

          {/* Quick Persona Switcher for Evaluation */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#E8F2F0] dark:bg-[#1D3440] text-[#176B72] dark:text-[#55C6B5] border border-[#35A69A]/30 hover:border-[#35A69A] transition-all cursor-pointer"
              title="Alternar entre perfis de teste (Paciente, Fisioterapeuta, Clínica, Admin)"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Trocar Perfil</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {showPersonaMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowPersonaMenu(false)}
              >
                <div className="px-2.5 py-1.5 text-[11px] font-bold text-[#647785] dark:text-[#9BAEB5] uppercase tracking-wider border-b border-[#E1E8EC] dark:border-[#29434D]">
                  Perfis Rápidos para Avaliação:
                </div>

                {allUsers.map((u) => {
                  const isSelected = u.id === currentUser.id;
                  const isUserPatrick = u.email === 'patrickjr2004@gmail.com';
                  return (
                    <button
                      key={u.id}
                      onClick={() => switchUserById(u.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-[#176B72]/15 text-[#176B72] dark:text-[#55C6B5] font-semibold' 
                          : 'hover:bg-slate-50 dark:hover:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80'} 
                          alt={u.name} 
                          className="w-7 h-7 rounded-full object-cover border border-[#E1E8EC] dark:border-[#29434D]" 
                        />
                        <div>
                          <div className="font-bold text-xs leading-tight flex items-center gap-1">
                            <span>{u.name}</span>
                            {isUserPatrick && (
                              <span className="text-[9px] bg-amber-400 text-black px-1 rounded font-black">
                                SUA CONTA
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                            {u.role === 'patient' && (u.id === 'user-patient-01' ? 'Paciente Vinculado' : 'Paciente Não Vinculado')}
                            {u.role === 'physiotherapist' && (u.crefito?.status === 'under_review' ? 'Fisio (CREFITO Pendente)' : 'Fisioterapeuta (PRO)')}
                            {u.role === 'clinic_admin' && 'Admin de Clínica'}
                            {u.role === 'platform_admin' && 'Admin da Plataforma'}
                          </div>
                        </div>
                      </div>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#176B72] dark:bg-[#55C6B5]" />}
                    </button>
                  );
                })}

                <div className="pt-1.5 border-t border-[#E1E8EC] dark:border-[#29434D]">
                  <button
                    onClick={onOpenAuth}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-center text-xs font-bold text-[#176B72] dark:text-[#55C6B5] hover:bg-[#E8F2F0]/50 dark:hover:bg-[#142733] rounded-xl"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Entrar / Cadastrar Nova Conta</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CREFITO Badge if Professional */}
          {currentUser.crefito && (
            <div className="hidden lg:block">
              <CrefitoVerificationBadge 
                status={currentUser.crefito.status} 
                number={currentUser.crefito.number} 
                region={currentUser.crefito.region} 
              />
            </div>
          )}

          {/* Pricing Plans Trigger */}
          <button
            onClick={onOpenPlans}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#102A43] dark:text-[#DCE9EB] hover:bg-slate-100 dark:hover:bg-[#1D3440] rounded-lg transition-colors border border-transparent hover:border-[#E1E8EC] dark:hover:border-[#29434D] cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#176B72] dark:text-[#55C6B5]" />
            <span className="hidden sm:inline">Planos</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#647785] hover:text-[#172B3A] dark:text-[#9BAEB5] dark:hover:text-[#DCE9EB] rounded-lg hover:bg-slate-100 dark:hover:bg-[#1D3440] transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            aria-label="Alternar tema claro e escuro"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#102A43]" />
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 pl-2 border-l border-[#E1E8EC] dark:border-[#29434D] cursor-pointer"
            >
              <img 
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#35A69A]/30"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] leading-none">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] leading-tight">
                  {role === 'patient' && 'Paciente (CARE)'}
                  {role === 'physiotherapist' && 'Fisio (PRO)'}
                  {role === 'clinic_admin' && 'Gestora Clínica'}
                  {role === 'platform_admin' && 'Admin Geral'}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-[#647785] hidden sm:block" />
            </button>

            {showUserDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1D3440] border border-[#E1E8EC] dark:border-[#29434D] rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowUserDropdown(false)}
              >
                <div className="px-3 py-2 border-b border-[#E1E8EC] dark:border-[#29434D]">
                  <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">{currentUser.name}</div>
                  <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] font-mono truncate">{currentUser.email}</div>
                  {currentUser.cpf && (
                    <div className="text-[10px] text-[#176B72] dark:text-[#55C6B5] font-mono mt-0.5">CPF: {currentUser.cpf}</div>
                  )}
                </div>

                <button
                  onClick={onOpenAuth}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-xl hover:bg-slate-50 dark:hover:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#176B72] dark:text-[#55C6B5]" />
                  <span>Cadastrar / Entrar</span>
                </button>

                {onOpenSecurity && (
                  <button
                    onClick={onOpenSecurity}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-xl hover:bg-slate-50 dark:hover:bg-[#142733] text-indigo-700 dark:text-indigo-300 font-semibold cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Testes de Penetração LGPD</span>
                  </button>
                )}

                <div className="border-t border-[#E1E8EC] dark:border-[#29434D] pt-1">
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-bold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair da Conta (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
