import React from 'react';

interface BrandLogoProps {
  variant?: 'care' | 'pro' | 'admin' | 'unified';
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'unified', 
  size = 'md',
  showSlogan = false 
}) => {
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12'
  };

  const badgeLabels = {
    care: { text: 'CARE', bg: 'bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] border-[#176B72]/30' },
    pro: { text: 'PRO', bg: 'bg-[#102A43]/15 text-[#102A43] dark:bg-sky-400/20 dark:text-sky-300 border-[#102A43]/30' },
    admin: { text: 'ADMIN', bg: 'bg-purple-500/15 text-purple-700 dark:bg-purple-500/25 dark:text-purple-300 border-purple-500/30' },
    unified: null
  };

  const badge = badgeLabels[variant];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        {/* Kinetic Loop Symbol: Biomechanical motion & continuous therapeutic recovery */}
        <div className="relative flex items-center justify-center">
          <svg 
            className={`${sizeClasses[size]} w-auto transition-transform duration-300 hover:rotate-6`}
            viewBox="0 0 44 44" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background glow circle */}
            <circle cx="22" cy="22" r="20" className="fill-[#176B72]/10 dark:fill-[#55C6B5]/10" />
            
            {/* Kinetic primary loop */}
            <path 
              d="M13 22C13 17.0294 17.0294 13 22 13C26.9706 13 31 17.0294 31 22C31 26.9706 26.9706 31 22 31C18.5 31 16 28.5 16 25" 
              stroke="url(#reavita-grad-primary)" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />
            {/* Dynamic ascending movement arc */}
            <path 
              d="M22 13C25 9.5 30 9.5 33 13C36 16.5 36 22 32 26" 
              stroke="url(#reavita-grad-accent)" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeDasharray="1 1"
            />
            {/* Central bio-active focus point */}
            <circle cx="22" cy="22" r="3.2" className="fill-[#35A69A] dark:fill-[#55C6B5]" />

            <defs>
              <linearGradient id="reavita-grad-primary" x1="13" y1="13" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                <stop stopColor="#102A43" />
                <stop offset="0.5" stopColor="#176B72" />
                <stop offset="1" stopColor="#35A69A" />
              </linearGradient>
              <linearGradient id="reavita-grad-accent" x1="22" y1="9" x2="36" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#35A69A" />
                <stop offset="1" stopColor="#55C6B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Typographic Wordmark */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-extrabold tracking-tight text-[#102A43] dark:text-[#DCE9EB] text-xl sm:text-2xl font-['Inter']">
            REA<span className="text-[#176B72] dark:text-[#55C6B5]">VITA</span>
          </span>
          {badge && (
            <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-md border ${badge.bg}`}>
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {showSlogan && (
        <span className="text-[11px] font-medium text-[#647785] dark:text-[#9BAEB5] tracking-wide mt-0.5">
          Tecnologia a favor do movimento.
        </span>
      )}
    </div>
  );
};
