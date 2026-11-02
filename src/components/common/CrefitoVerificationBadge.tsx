import React from 'react';
import { CrefitoStatus } from '../../types';
import { ShieldCheck, Clock, AlertTriangle, XCircle, Ban } from 'lucide-react';

interface CrefitoBadgeProps {
  status: CrefitoStatus;
  region?: string;
  number?: string;
  showDetails?: boolean;
}

export const CrefitoVerificationBadge: React.FC<CrefitoBadgeProps> = ({
  status,
  region,
  number,
  showDetails = false
}) => {
  const configs = {
    approved: {
      label: 'CREFITO Regular',
      sublabel: 'Registro validado no COFFITO/CREFITO',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60',
      dot: 'bg-emerald-500'
    },
    under_review: {
      label: 'Em Análise Cadastral',
      sublabel: 'Documento anexado aguardando homologação',
      icon: Clock,
      color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60',
      dot: 'bg-amber-500 animate-pulse'
    },
    pending_verification: {
      label: 'Verificação Pendente',
      sublabel: 'Aguardando conferência com base oficial',
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/60',
      dot: 'bg-orange-500'
    },
    rejected: {
      label: 'Registro Rejeitado',
      sublabel: 'Inconsistência cadastral identificada',
      icon: XCircle,
      color: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60',
      dot: 'bg-red-500'
    },
    suspended: {
      label: 'Registro Suspenso',
      sublabel: 'Acesso às ferramentas clínicas bloqueado',
      icon: Ban,
      color: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      dot: 'bg-slate-500'
    }
  };

  const cfg = configs[status] || configs.pending_verification;
  const Icon = cfg.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{cfg.label}</span>
      {number && region && (
        <span className="opacity-80 font-mono text-[11px] ml-1">
          {number} ({region})
        </span>
      )}
    </div>
  );
};
