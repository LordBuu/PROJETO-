import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ShieldAlert, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Layers
} from 'lucide-react';
import { SCIENTIFIC_ARTICLES } from '../../data/scientificArticles';

interface ExerciseItem {
  id: string;
  title: string;
  region: string;
  targetStructure: string;
  category: 'Mobilidade' | 'Controle Motor' | 'Fortalecimento Gradual' | 'Alongamento / Descompressão';
  purpose: string;
  instructions: string[];
  contraindications: string;
  evidenceRef: string;
  doi?: string;
}

export const EducationalLibrary: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const exercises: ExerciseItem[] = [
    {
      id: 'ex-01',
      title: 'Deslizamento Neurodinâmico do Nervo Ciático (Slider Ciático)',
      region: 'Coluna lombar',
      targetStructure: 'Nervos periféricos (Raiz L4-S1 e Nervo Isquiático)',
      category: 'Controle Motor',
      purpose: 'Melhorar o deslizamento do axônio no canal neural sem gerar tensão excessiva ou espasmo protetor.',
      instructions: [
        'Deite-se de barriga para cima com a cabeça confortavelmente apoiada.',
        'Ao dobrar o joelho direito em direção ao peito, aponte a ponta do pé para frente.',
        'Ao esticar suavemente o joelho para cima, dobre o pé para trás (dorsiflexão lenta).',
        'Repita de 8 a 10 vezes em ritmo suave e fluido, sem sentir dor aguda.'
      ],
      contraindications: 'Presença de dor irradiada aguda intensa (> 6/10) ou se a manobra provocar periferização dos sintomas para o pé.',
      evidenceRef: 'Delitto A et al. JOSPT Clinical Practice Guideline (2012) & Sterling M et al. (2020)',
      doi: '10.2519/jospt.2012.42.4.A1'
    },
    {
      id: 'ex-02',
      title: 'Extensão Suave em Decúbito Ventral (Posição da Esfinge)',
      region: 'Coluna lombar',
      targetStructure: 'Articulações facetárias e disco intervertebral',
      category: 'Mobilidade',
      purpose: 'Favorecer a centralização de sintomas discais posteriores e aliviar a pressão nas raízes neurais.',
      instructions: [
        'Deite-se de barriga para baixo sobre uma superfície firme ou colchonete.',
        'Apoie os antebraços no chão, mantendo os cotovelos alinhados com os ombros.',
        'Mantenha a respiração calma e o abdômen e glúteos relaxados por 1 a 2 minutos.',
        'Retorne lentamente à posição deitada.'
      ],
      contraindications: 'Dor que piora ao estender a coluna (suspeita de espondilolistese instável ou estenose de canal severa).',
      evidenceRef: 'Saragiotto BT et al. Cochrane Database of Systematic Reviews (2016)',
      doi: '10.1002/14651858.CD012004'
    },
    {
      id: 'ex-03',
      title: 'Rotação Externa de Ombro com Apoio de Toalha (Isometria do Manguito)',
      region: 'Ombro',
      targetStructure: 'Tendões (Músculo Infraespinhal e Redondo Menor)',
      category: 'Fortalecimento Gradual',
      purpose: 'Ativar os estabilizadores da cabeça umeral sem impactar a bursa subacromial.',
      instructions: [
        'Posicione uma pequena toalha enrolada entre o cotovelo e a lateral do tronco.',
        'Com o cotovelo dobrado a 90 graus, empurre o dorso da mão contra uma parede ou elástico leve.',
        'Sustente a contração suave por 15 segundos sem sentir dor pontual.',
        'Repita 3 vezes com intervalo de 30 segundos.'
      ],
      contraindications: 'Rotura traumática aguda transmural maciça recente do manguito rotador.',
      evidenceRef: 'Lewis J. British Journal of Sports Medicine (BJSM 2016)',
      doi: '10.1136/bjsports-2015-095728'
    },
    {
      id: 'ex-04',
      title: 'Ativação do Glúteo Médio em Decúbito Lateral (Clamshell / Ostra)',
      region: 'Joelho',
      targetStructure: 'Músculos estabilizadores da pelve e fáscia lata',
      category: 'Controle Motor',
      purpose: 'Reduzir o valgo dinâmico de joelho e sobrecarga de compressão patelofemoral.',
      instructions: [
        'Deite-se de lado com os quadris dobrados a 45 graus e joelhos a 90 graus.',
        'Mantendo os calcanhares juntos, abra o joelho de cima sem rodar a bacia para trás.',
        'Sinta a musculatura lateral do glúteo ativar e retorne devagar.',
        'Realize 2 séries de 10 a 12 repetições.'
      ],
      contraindications: 'Bursite trocantérica em fase inflamatória hiperálgica aguda.',
      evidenceRef: 'Collins NJ et al. Patellofemoral Pain Consensus Statement (BJSM 2018)',
      doi: '10.1136/bjsports-2018-099884'
    },
    {
      id: 'ex-05',
      title: 'Elevação de Calcanhares com Toalha sob os Dedos (Protocolo de Rathleff)',
      region: 'Tornozelo e Pé',
      targetStructure: 'Fáscia plantar e tendão de Aquiles',
      category: 'Fortalecimento Gradual',
      purpose: 'Alta carga mecânica controlada com mecanismo de Windlass para estímulo de síntese de colágeno.',
      instructions: [
        'Em um degrau, posicione uma toalha enrolada sob os dedos do pé para mantê-los estendidos.',
        'Suba na ponta dos pés em 3 segundos, pause 2 segundos no topo e desça em 3 segundos.',
        'Realize em dias alternados conforme orientação do fisioterapeuta.'
      ],
      contraindications: 'Fratura de estresse dos metatarsos ou fase aguda hiperálgica de gota.',
      evidenceRef: 'Rathleff MS et al. Scand J Med Sci Sports (2015)',
      doi: '10.1111/sms.12313'
    },
    {
      id: 'ex-06',
      title: 'Recuo Cervical Suave (Chin Tuck / Queixo Duplo)',
      region: 'Cervical',
      targetStructure: 'Músculos flexores profundos do pescoço (Longo do Colo)',
      category: 'Controle Motor',
      purpose: 'Restaurar o alinhamento da lordose cervical e diminuir a tensão sobre a musculatura suboccipital.',
      instructions: [
        'Sentado com a postura alinhada, olhe para o horizonte.',
        'Recue a cabeça em linha reta para trás como se fizesse um queixo duplo suave.',
        'Sustente por 5 segundos respirando calmamente e retorne à posição neutra.',
        'Faça 5 repetições ao longo do dia durante pausas no trabalho.'
      ],
      contraindications: 'Sensação de tontura, vertigem súbita, perda de visão ou náusea durante o movimento.',
      evidenceRef: 'Sterling M et al. Musculoskeletal Science and Practice (2020)',
      doi: '10.1016/j.msksp.2020.102220'
    }
  ];

  const filteredExercises = exercises.filter((ex) => {
    const matchesRegion = selectedRegion === 'todos' || ex.region.toLowerCase() === selectedRegion.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || (
      ex.title.toLowerCase().includes(q) ||
      ex.targetStructure.toLowerCase().includes(q) ||
      ex.purpose.toLowerCase().includes(q) ||
      ex.evidenceRef.toLowerCase().includes(q)
    );
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Educação em Saúde e Movimento Baseado em Evidências</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Biblioteca Educativa de Movimento
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Conteúdo estritamente educacional para compreensão das mecânicas corporais. Não é uma prescrição individual autônoma.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Supervisão Profissional Obrigatória</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1D3440] p-4 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#647785] dark:text-[#9BAEB5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por exercício, estrutura anatômica ou condição clínica..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
          {[
            { id: 'todos', label: 'Todas as Regiões' },
            { id: 'coluna lombar', label: 'Coluna Lombar' },
            { id: 'cervical', label: 'Cervical' },
            { id: 'ombro', label: 'Ombro' },
            { id: 'joelho', label: 'Joelho' },
            { id: 'tornozelo e pé', label: 'Tornozelo e Pé' }
          ].map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-[#176B72] text-white dark:bg-[#55C6B5] dark:text-[#0B1720]'
                  : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#647785] dark:text-[#9BAEB5] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] uppercase">
                      {ex.region}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {ex.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB] mt-1.5 leading-snug">
                    {ex.title}
                  </h3>
                </div>
              </div>

              <div className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                <strong>Estrutura Foco:</strong> {ex.targetStructure}
              </div>

              <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] text-xs text-[#172B3A] dark:text-[#DCE9EB] space-y-1">
                <div className="font-bold text-[#102A43] dark:text-[#55C6B5] text-[11px] uppercase tracking-wider">
                  Objetivo Terapêutico:
                </div>
                <p className="leading-relaxed opacity-90">{ex.purpose}</p>
              </div>

              <div className="space-y-1.5 text-xs text-[#172B3A] dark:text-[#DCE9EB]">
                <div className="font-bold text-[#102A43] dark:text-[#DCE9EB] text-xs">
                  Passo a Passo Educativo:
                </div>
                <ol className="list-decimal pl-4 space-y-1 text-[#647785] dark:text-[#9BAEB5] leading-relaxed">
                  {ex.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200">
                <strong>Contraindicações conhecidas:</strong> {ex.contraindications}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1E8EC] dark:border-[#29434D] text-[11px] text-[#647785] dark:text-[#9BAEB5] flex items-center justify-between">
              <span className="truncate mr-2">
                Ref: {ex.evidenceRef}
              </span>
              {ex.doi && (
                <span className="font-mono text-[10px] text-[#176B72] dark:text-[#55C6B5] shrink-0">
                  DOI: {ex.doi}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
