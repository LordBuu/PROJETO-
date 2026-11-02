import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Lock, 
  User, 
  CheckCheck,
  Clock,
  PhoneCall
} from 'lucide-react';

export const ClinicalChat: React.FC = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'patient',
      senderName: 'Mariana Silva',
      content: 'Boa tarde Dr. Patrick! Consegui realizar o exercício de deslizamento neural hoje pela manhã. A queimação que descia para a panturrilha diminuiu consideravelmente, agora sinto mais uma dor localizada na lombar baixa.',
      timestamp: 'Hoje às 11:20'
    },
    {
      id: 'm2',
      sender: 'physio',
      senderName: 'Dr. Patrick Alencar',
      content: 'Excelente notícia, Mariana! Esse fenômeno é conhecido como "centralização" dos sintomas. Quando a dor se recolhe da perna em direção à coluna, é um sinal clássico de resposta positiva e descompressão da raiz nervosa. Continue com a dosagem prescrita.',
      timestamp: 'Hoje às 11:45'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages([
      ...messages,
      {
        id: `m-${Date.now()}`,
        sender: 'physio',
        senderName: currentUser.name,
        content: inputMsg.trim(),
        timestamp: 'Agora'
      }
    ]);
    setInputMsg('');
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white dark:bg-[#1D3440] rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs overflow-hidden animate-in fade-in duration-300">
      
      {/* Chat Header */}
      <div className="p-4 sm:px-6 border-b border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between bg-[#F6F8FA] dark:bg-[#142733]">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80"
            alt="Mariana Silva"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#35A69A]/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Mariana Silva
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                Canal Criptografado
              </span>
            </div>
            <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
              Prontuário #0492 • Protrusão Discal L5-S1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#647785] dark:text-[#9BAEB5]">
          <ShieldCheck className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
          <span className="hidden sm:inline">Sigilo Profissional COFFITO</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isPhysio = m.sender === 'physio';
          return (
            <div 
              key={m.id}
              className={`flex gap-3 ${isPhysio ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1 ${
                isPhysio
                  ? 'bg-[#176B72] text-white rounded-tr-xs'
                  : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] border border-[#E1E8EC] dark:border-[#29434D] rounded-tl-xs'
              }`}>
                <div className={`text-[10px] font-bold ${isPhysio ? 'text-white/80' : 'text-[#647785] dark:text-[#9BAEB5]'}`}>
                  {m.senderName}
                </div>
                <p>{m.content}</p>
                <div className={`text-[9px] text-right flex items-center justify-end gap-1 ${isPhysio ? 'text-white/70' : 'text-[#647785] dark:text-[#9BAEB5]'}`}>
                  <span>{m.timestamp}</span>
                  {isPhysio && <CheckCheck className="w-3 h-3 text-[#55C6B5]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Send Input */}
      <div className="p-3 sm:p-4 border-t border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733]">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Digite sua orientação técnica para o paciente..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className={`p-3 rounded-xl transition-all cursor-pointer ${
              !inputMsg.trim() 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-[#176B72] hover:bg-[#102A43] text-white shadow-sm'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
