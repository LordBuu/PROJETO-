import React, { useState } from 'react';
import { SCIENTIFIC_ARTICLES, searchScientificArticles } from '../../data/scientificArticles';
import { 
  BookMarked, 
  Search, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Award,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const ScientificExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('todos');
  const [selectedArticle, setSelectedArticle] = useState(SCIENTIFIC_ARTICLES[0]);

  const articles = searchScientificArticles(
    searchQuery, 
    selectedRegion === 'todos' ? undefined : selectedRegion
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <BookMarked className="w-4 h-4" />
            <span>Base de Evidências Científicas & RAG</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Acervo Científico REAVITA ({SCIENTIFIC_ARTICLES.length} Artigos Revisados)
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Diretrizes clínicas internacionais (CPGs), Ensaios Clínicos Randomizados e Revisões Sistemáticas indexadas no PubMed/Cochrane.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#176B72] dark:text-[#55C6B5] bg-[#E8F2F0] dark:bg-[#142733] px-3.5 py-1.5 rounded-xl border border-[#35A69A]/30 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Fonte da IA sem Alucinações</span>
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
            placeholder="Pesquisar por condição, título, autor, periódico ou termo RAG..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'lombar', label: 'Lombar' },
            { id: 'cervical', label: 'Cervical' },
            { id: 'ombro', label: 'Ombro' },
            { id: 'joelho', label: 'Joelho' },
            { id: 'quadril', label: 'Quadril' },
            { id: 'tornozelo', label: 'Tornozelo' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-[#176B72] text-white dark:bg-[#55C6B5] dark:text-[#0B1720]'
                  : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#647785] dark:text-[#9BAEB5] hover:bg-slate-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Articles Master-Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {articles.map((art) => {
            const isSelected = selectedArticle?.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-[#176B72] bg-[#E8F2F0] dark:bg-[#142733] dark:border-[#55C6B5] shadow-xs'
                    : 'border-[#E1E8EC] dark:border-[#29434D] bg-white dark:bg-[#1D3440] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#176B72]/15 text-[#176B72] dark:bg-[#55C6B5]/20 dark:text-[#55C6B5] uppercase">
                    {art.bodyRegions[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-[#647785] dark:text-[#9BAEB5]">
                    {art.year} • {art.evidenceLevel}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5] truncate">
                  {art.journal}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail (7 cols) */}
        <div className="lg:col-span-7">
          {selectedArticle ? (
            <div className="bg-white dark:bg-[#1D3440] p-6 sm:p-8 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-5">
              
              <div className="space-y-2 border-b border-[#E1E8EC] dark:border-[#29434D] pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#102A43] text-white dark:bg-[#55C6B5] dark:text-[#0B1720]">
                    {selectedArticle.studyType}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    {selectedArticle.evidenceLevel}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#102A43] dark:text-[#DCE9EB] leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="text-xs text-[#647785] dark:text-[#9BAEB5]">
                  <strong>Autores:</strong> {selectedArticle.authors.join(', ')} ({selectedArticle.year})
                </div>

                <div className="text-xs text-[#176B72] dark:text-[#55C6B5] font-semibold">
                  {selectedArticle.journal}
                </div>

                {selectedArticle.doi && (
                  <div className="text-[11px] font-mono text-[#647785] dark:text-[#9BAEB5]">
                    DOI: {selectedArticle.doi}
                  </div>
                )}
              </div>

              {/* Study Highlights */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px] tracking-wider block mb-1">
                    População Estudada:
                  </span>
                  <p className="text-[#172B3A] dark:text-[#DCE9EB] bg-[#F6F8FA] dark:bg-[#142733] p-3 rounded-xl border border-[#E1E8EC] dark:border-[#29434D]">
                    {selectedArticle.population}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#102A43] dark:text-[#55C6B5] uppercase text-[10px] tracking-wider block mb-1">
                    Principais Resultados Clínicos (Key Outcomes):
                  </span>
                  <p className="text-[#172B3A] dark:text-[#DCE9EB] bg-[#E8F2F0]/60 dark:bg-[#142733] p-3.5 rounded-xl border border-[#35A69A]/30 leading-relaxed font-medium">
                    {selectedArticle.keyOutcomes}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-amber-700 dark:text-amber-400 uppercase text-[10px] tracking-wider block mb-1">
                    Limitações Clínicas Conhecidas:
                  </span>
                  <p className="text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200 dark:border-amber-900/40">
                    {selectedArticle.clinicalLimitations}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#102A43] dark:text-[#DCE9EB] uppercase text-[10px] tracking-wider block mb-1">
                    Condições Clínicas Relacionadas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.relatedConditions.map((cond, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E1E8EC] dark:border-[#29434D] flex items-center justify-between text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                <span>Última revisão científica: {selectedArticle.lastReviewedDate}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Indexado para Busca Vetorial RAG
                </span>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#647785]">
              Selecione um artigo à esquerda para ver a ficha técnica.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
