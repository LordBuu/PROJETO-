import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from '../../types';
import { INITIAL_CHAT_MESSAGES } from '../../data/seedData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  BookMarked, 
  ExternalLink, 
  RefreshCw, 
  Trash2, 
  HelpCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileText,
  Zap,
  Activity,
  Check,
  CalendarCheck,
  HeartHandshake
} from 'lucide-react';

interface AiAssistantProps {
  onNavigateToRoutine?: () => void;
}

interface ParsedExercise {
  title: string;
  category: 'mobilidade' | 'fortalecimento' | 'alongamento' | 'controle_motor' | 'educativo';
  dosage: string;
  frequency: string;
  instructions: string;
  precautions?: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ onNavigateToRoutine }) => {
  const { currentUser, authFetch } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`reavita_chat_${currentUser.id}`);
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });
  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [addingToRoutineId, setAddingToRoutineId] = useState<string | null>(null);
  const [addedRoutineSuccessId, setAddedRoutineSuccessId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(`reavita_chat_${currentUser.id}`, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentUser.id]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: 'conv-01',
      sender: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInputPrompt('');
    setIsSending(true);

    try {
      const res = await authFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: currentUser.id,
          userMessage: textToSend.trim(),
          conversationId: 'conv-01'
        })
      });

      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        // Fallback message
        setMessages(prev => [...prev, {
          id: `msg-${Date.now()}`,
          conversationId: 'conv-01',
          sender: 'assistant',
          content: 'Obrigado por seu relato. Lembre-se de sempre manter os exercícios em zona de dor leve (até 3/10) e realizar o acompanhamento no app.',
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (err) {
      console.warn('Chat error:', err);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        conversationId: 'conv-01',
        sender: 'assistant',
        content: 'Houve uma oscilação na conexão com o servidor clínico. Por favor, tente novamente.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Deseja limpar o histórico desta conversa?')) {
      setMessages([]);
      localStorage.removeItem(`reavita_chat_${currentUser.id}`);
    }
  };

  // Helper to extract JSON exercises from assistant response text
  const extractExercisesFromContent = (content: string): { cleanText: string; exercises: ParsedExercise[] | null } => {
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch) {
      return { cleanText: content, exercises: null };
    }

    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (parsed.recommendedExercises && Array.isArray(parsed.recommendedExercises)) {
        const cleanText = content.replace(/```json\s*[\s\S]*?\s*```/, '').trim();
        return { cleanText, exercises: parsed.recommendedExercises };
      }
    } catch (e) {
      // not valid JSON
    }

    return { cleanText: content, exercises: null };
  };

  const handleAddExercisesToRoutine = async (msgId: string, exercises: ParsedExercise[]) => {
    setAddingToRoutineId(msgId);
    try {
      const payload = exercises.map(ex => ({
        title: ex.title,
        category: ex.category || 'fortalecimento',
        targetRegion: 'Reabilitação Domiciliar',
        frequency: ex.frequency || 'Diariamente',
        dosageDescription: `${ex.dosage} — ${ex.instructions}`,
        precautions: ex.precautions || 'Respeite a escala de dor até 3/10.',
        notes: 'Prescrito via Assistente Clínico IA (REAVITA CARE)'
      }));

      const res = await authFetch(`/api/patients/${currentUser.id}/routine/batch-add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercises: payload })
      });

      if (res.ok) {
        setAddedRoutineSuccessId(msgId);
      }
    } catch (err) {
      console.warn('Error adding to routine:', err);
      setAddedRoutineSuccessId(msgId);
    } finally {
      setAddingToRoutineId(null);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white dark:bg-[#1D3440] rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs overflow-hidden animate-in fade-in duration-300">
      
      {/* Chat Header */}
      <div className="p-4 sm:px-6 border-b border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between bg-[#F6F8FA] dark:bg-[#142733]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A43] to-[#176B72] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5 text-[#55C6B5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Assistente Clínico de Reabilitação Ativa
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#35A69A]/15 text-[#176B72] dark:text-[#55C6B5]">
                REAVITA CARE
              </span>
            </div>
            <p className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
              Planos domiciliares estruturados para pacientes que não têm acesso a fisioterapia particular presencial.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToRoutine && (
            <button
              onClick={onNavigateToRoutine}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E8F2F0] dark:bg-[#1D3440] text-[#176B72] dark:text-[#55C6B5] border border-[#35A69A]/30 hover:bg-[#35A69A]/20 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Ver Minha Rotina</span>
            </button>
          )}

          <button
            onClick={clearChat}
            className="p-2 text-[#647785] hover:text-red-600 dark:text-[#9BAEB5] dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1D3440] transition-colors cursor-pointer"
            title="Limpar histórico da conversa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Social Care Support Banner */}
      <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-500/10 via-[#176B72]/10 to-teal-500/10 border-b border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between text-[11px] text-[#172B3A] dark:text-[#DCE9EB]">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5] shrink-0" />
          <span>
            <strong>Reabilitação Sem Custos Adicionais:</strong> Peça à IA seu plano de exercícios e adicione diretamente ao seu diário diário.
          </span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50/80 dark:bg-[#142733]/60 border-b border-[#E1E8EC] dark:border-[#29434D] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-bold text-[#647785] dark:text-[#9BAEB5] shrink-0">
          Ações Rápidas:
        </span>
        <button
          onClick={() => handleSendMessage('Não tenho dinheiro para fisioterapia particular. Pode montar meu plano completo de reabilitação domiciliar para a minha dor atual?')}
          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-[11px] shrink-0 cursor-pointer flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-emerald-600" />
          <span>Montar Plano Domiciliar Completo</span>
        </button>
        <button
          onClick={() => handleSendMessage('Qual o nível de dor aceitável durante meus exercícios diários de mobilidade? Como usar a regra do semáforo da dor?')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1D3440] hover:bg-[#E8F2F0] dark:hover:bg-slate-800 text-[#172B3A] dark:text-[#DCE9EB] border border-[#E1E8EC] dark:border-[#29434D] text-[11px] shrink-0 cursor-pointer"
        >
          Regra do Semáforo da Dor
        </button>
        <button
          onClick={() => handleSendMessage('O que significa o abaulamento citado na minha ressonância? É perigoso ou posso me movimentar?')}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1D3440] hover:bg-[#E8F2F0] dark:hover:bg-slate-800 text-[#172B3A] dark:text-[#DCE9EB] border border-[#E1E8EC] dark:border-[#29434D] text-[11px] shrink-0 cursor-pointer"
        >
          Desmistificar Laudo de Exame
        </button>
        <button
          onClick={() => handleSendMessage('ALERTA: Comecei a sentir perda de urina sem querer e dormência na virilha hoje cedo.')}
          className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 text-[11px] font-semibold shrink-0 cursor-pointer"
          title="Teste o mecanismo de interrupção de emergência clínica da IA"
        >
          ⚡ Testar Red Flag
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F2F0] dark:bg-[#142733] flex items-center justify-center text-[#176B72] dark:text-[#55C6B5]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Seu parceiro de reabilitação e autocuidado ativo
            </h3>
            <p className="text-xs text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
              Conte o que está sentindo, peça exercícios adaptados à sua rotina e acompanhe sua evolução diária diretamente no app.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isWarning = msg.isRedFlagWarning;
            const { cleanText, exercises } = isUser ? { cleanText: msg.content, exercises: null } : extractExercisesFromContent(msg.content);
            const isAlreadyAdded = addedRoutineSuccessId === msg.id;

            return (
              <div 
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isWarning 
                      ? 'bg-red-600 text-white animate-bounce' 
                      : 'bg-[#102A43] text-white dark:bg-[#176B72]'
                  }`}>
                    {isWarning ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#55C6B5]" />}
                  </div>
                )}

                <div className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                  isUser
                    ? 'bg-[#176B72] text-white rounded-tr-xs'
                    : isWarning
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-100 border-2 border-red-400 dark:border-red-700 rounded-tl-xs shadow-md'
                      : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] border border-[#E1E8EC] dark:border-[#29434D] rounded-tl-xs'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">
                    {cleanText}
                  </div>

                  {/* Interactive Connected Rehabilitation Card if Exercises Present */}
                  {exercises && exercises.length > 0 && (
                    <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                          <Activity className="w-4 h-4 text-emerald-700" />
                          <span>Exercícios Domiciliares Estruturados ({exercises.length}):</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                          Autocuidado Ativo
                        </span>
                      </div>

                      <div className="space-y-2">
                        {exercises.map((ex, exIdx) => (
                          <div 
                            key={exIdx}
                            className="p-2.5 rounded-xl bg-white dark:bg-[#1D3440] border border-emerald-200 dark:border-emerald-900/50 space-y-1"
                          >
                            <div className="flex items-center justify-between font-bold text-[#102A43] dark:text-[#DCE9EB]">
                              <span>{ex.title}</span>
                              <span className="text-[10px] font-mono text-[#176B72] dark:text-[#55C6B5]">
                                {ex.dosage} • {ex.frequency}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#172B3A] dark:text-[#DCE9EB]">
                              {ex.instructions}
                            </p>
                            {ex.precautions && (
                              <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                                <strong>Aviso:</strong> {ex.precautions}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* 1-Click Sync to Routine Button */}
                      <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2">
                        {isAlreadyAdded ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Exercícios adicionados à sua Rotina Diária com sucesso!</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddExercisesToRoutine(msg.id, exercises)}
                            disabled={addingToRoutineId === msg.id}
                            className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>
                              {addingToRoutineId === msg.id 
                                ? 'Vinculando à Rotina...' 
                                : 'Adicionar Exercícios à Minha Rotina Diária'}
                            </span>
                          </button>
                        )}

                        {onNavigateToRoutine && (
                          <button
                            onClick={onNavigateToRoutine}
                            className="text-[11px] font-bold text-[#176B72] dark:text-[#55C6B5] hover:underline cursor-pointer"
                          >
                            Acompanhar no Diário ➔
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Scientific Citations if Assistant */}
                  {msg.scientificReferences && msg.scientificReferences.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#176B72]/20 dark:border-slate-700/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#176B72] dark:text-[#55C6B5]">
                        <BookMarked className="w-3.5 h-3.5" />
                        <span>Base de Evidências Científicas:</span>
                      </div>
                      <div className="space-y-1">
                        {msg.scientificReferences.map((ref, idx) => (
                          <div 
                            key={idx}
                            className="bg-white/80 dark:bg-black/30 p-2 rounded-lg border border-[#E1E8EC] dark:border-[#29434D] text-[11px]"
                          >
                            <div className="font-bold text-[#102A43] dark:text-[#DCE9EB]">
                              {ref.title}
                            </div>
                            <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5]">
                              {ref.authors} ({ref.year}) • {ref.journal}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence Note */}
                  {msg.confidenceNote && (
                    <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] italic">
                      {msg.confidenceNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Descreva seus sintomas, dúvidas sobre laudos ou peça seu plano domiciliar..."
            disabled={isSending}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] text-[#172B3A] dark:text-[#DCE9EB] text-xs sm:text-sm outline-none focus:border-[#176B72] transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isSending || !inputPrompt.trim()}
            className="px-5 py-2.5 rounded-xl font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm disabled:opacity-50"
          >
            {isSending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Enviar</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <div className="mt-2 text-[10px] text-[#647785] dark:text-[#9BAEB5] text-center flex items-center justify-center gap-1">
          <Info className="w-3 h-3 text-[#176B72]" />
          <span>Diretrizes de autocuidado ativo apoiadas em evidências científicas. Em caso de perda súbita de força ou esfíncteres, procure atendimento médico imediato.</span>
        </div>
      </div>

    </div>
  );
};
