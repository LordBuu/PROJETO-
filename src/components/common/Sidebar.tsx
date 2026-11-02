import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Crosshair, 
  FileText, 
  Bot, 
  BookOpen, 
  CalendarDays, 
  TrendingUp, 
  User, 
  Users, 
  UserPlus, 
  CheckSquare, 
  MessageSquare, 
  BookMarked, 
  Building2, 
  Settings, 
  ShieldAlert, 
  History,
  Lock,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenSecurity?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile = false,
  onCloseMobile,
  onOpenSecurity
}) => {
  const { role, isCrefitoApproved, currentUser, logout } = useAuth();

  // Navigation items for CARE (Patient)
  const careItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'Minha Avaliação', icon: ClipboardList },
    { id: 'bodymap', label: 'Meu Corpo', icon: Crosshair },
    { id: 'documents', label: 'Documentos e Exames', icon: FileText },
    { id: 'assistant', label: 'Assistente IA Clínico', icon: Bot, badge: 'IA' },
    { id: 'muscles', label: 'Biblioteca Muscular', icon: Layers, badge: 'Lesões' },
    { id: 'library', label: 'Exercícios & Diretrizes', icon: BookOpen },
    { id: 'routine', label: 'Minha Rotina', icon: CalendarDays },
    { id: 'evolution', label: 'Minha Evolução', icon: TrendingUp },
    { id: 'profile', label: 'Meu Perfil & LGPD', icon: User }
  ];

  // Navigation items for PRO (Physiotherapist & Clinic)
  const proItems = [
    { id: 'dashboard', label: 'Dashboard Clínico', icon: LayoutDashboard },
    { id: 'patients', label: 'Gestão de Pacientes', icon: Users },
    { id: 'invitations', label: 'Convites & Vínculos', icon: UserPlus },
    { id: 'reviews', label: 'Revisão de Orientações IA', icon: CheckSquare, badge: 'Fila' },
    { id: 'chat', label: 'Comunicação Segura', icon: MessageSquare },
    { id: 'science', label: 'Base Científica RAG', icon: BookMarked },
    ...(role === 'clinic_admin' ? [{ id: 'clinic', label: 'Gestão da Clínica', icon: Building2 }] : []),
    { id: 'settings', label: 'Configurações & CREFITO', icon: Settings }
  ];

  // Navigation items for ADMIN
  const adminItems = [
    { id: 'dashboard', label: 'Visão Geral Plataforma', icon: LayoutDashboard },
    { id: 'crefito_validation', label: 'Validação de CREFITO', icon: ShieldAlert, badge: 'Pendente' },
    { id: 'science_management', label: 'Curadoria Científica', icon: BookMarked },
    { id: 'audit_logs', label: 'Auditoria & Logs LGPD', icon: History }
  ];

  const currentNav = role === 'patient' 
    ? careItems 
    : role === 'platform_admin' 
      ? adminItems 
      : proItems;

  const handleSelect = (id: string) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-[#142733] border-r border-[#E1E8EC] dark:border-[#29434D] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="p-3 space-y-1 overflow-y-auto">
          {/* CREFITO Warning if not approved */}
          {role === 'physiotherapist' && !isCrefitoApproved && (
            <div className="mb-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Modo Restrito</span>
              </div>
              <p className="text-[11px] leading-tight opacity-90">
                Seu registro CREFITO está em análise. O acesso aos prontuários clínicos completos será liberado após a validação.
              </p>
            </div>
          )}

          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#647785] dark:text-[#9BAEB5]">
            {role === 'patient' && 'Portal REAVITA CARE'}
            {role === 'physiotherapist' && 'Portal REAVITA PRO'}
            {role === 'clinic_admin' && 'Portal PRO Clínica'}
            {role === 'platform_admin' && 'Administração Geral'}
          </div>

          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#176B72] text-white shadow-sm dark:bg-[#55C6B5] dark:text-[#0B1720]'
                    : 'text-[#172B3A] dark:text-[#DCE9EB] hover:bg-[#F6F8FA] dark:hover:bg-[#1D3440] hover:text-[#176B72] dark:hover:text-[#55C6B5]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-[#0B1720]' : 'text-[#647785] dark:text-[#9BAEB5]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive 
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#0B1720]' 
                      : 'bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & compliance badge */}
        <div className="p-3 border-t border-[#E1E8EC] dark:border-[#29434D] space-y-2 text-[11px] text-[#647785] dark:text-[#9BAEB5]">
          <div className="bg-[#F6F8FA] dark:bg-[#1D3440] p-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D]">
            <div className="flex items-center justify-between font-semibold text-[#102A43] dark:text-[#DCE9EB]">
              <span>Plano Ativo</span>
              <span className="text-[#176B72] dark:text-[#55C6B5]">
                {role === 'patient' ? 'CARE Plus' : role === 'clinic_admin' ? 'PRO Clínica' : 'PRO Individual'}
              </span>
            </div>
            <div className="text-[10px] opacity-80 mt-0.5">
              Conformidade LGPD Art. 11 (Dados Sensíveis)
            </div>
          </div>

          {onOpenSecurity && (
            <button
              onClick={onOpenSecurity}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Testes de Penetração</span>
            </button>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] opacity-60">REAVITA v2.4</span>
            <button
              onClick={() => logout()}
              className="text-[11px] text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
            >
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
