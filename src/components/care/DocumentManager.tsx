import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MedicalDocument } from '../../types';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  FileCheck2, 
  Trash2,
  Lock,
  Layers
} from 'lucide-react';

export const DocumentManager: React.FC = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Upload Form Modal/State
  const [fileName, setFileName] = useState('');
  const [documentCategory, setDocumentCategory] = useState<MedicalDocument['documentCategory']>('ressonancia');
  const [sampleText, setSampleText] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  const loadDocuments = async () => {
    try {
      const res = await fetch(`/api/patients/${currentUser.id}/documents`);
      const data = await res.json();
      if (data.documents) {
        setDocuments(data.documents);
        if (data.documents.length > 0 && !selectedDoc) {
          setSelectedDoc(data.documents[0]);
        }
      }
    } catch (err) {
      console.warn('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [currentUser.id]);

  const handleUploadAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    setUploading(true);
    try {
      const payload = {
        patientId: currentUser.id,
        fileName: fileName.endsWith('.pdf') || fileName.endsWith('.jpg') ? fileName : `${fileName}.pdf`,
        fileType: fileName.toLowerCase().endsWith('.jpg') ? 'jpg' : 'pdf',
        documentCategory,
        sampleText: sampleText.trim() || 'LAUDO MÉDICO: Alinhamento preservado. Presença de pequenas alterações osteofitárias marginais discretas e discreta redução de espaço articular compatível com histórico relatado.',
        patientNotes: patientNotes.trim() || 'Exame entregue pelo consultório para acompanhamento da fisioterapia.'
      };

      const res = await fetch('/api/documents/upload-and-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.document) {
        setDocuments([data.document, ...documents]);
        setSelectedDoc(data.document);
        setFileName('');
        setSampleText('');
        setPatientNotes('');
      }
    } catch (err) {
      console.warn('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handlePreloadSample = (type: 'ressonancia_lombar' | 'manguito_ombro' | 'joelho_menisco') => {
    if (type === 'ressonancia_lombar') {
      setFileName('Ressonancia_Coluna_Lombar_L5S1.pdf');
      setDocumentCategory('ressonancia');
      setSampleText('LAUDO DE RESSONÂNCIA MAGNÉTICA: Coluna lombar com curvatura preservada. Discopatia degenerativa moderada em L5-S1 com desidratação e pequena fissura anular posterior. Protrusão discal póstero-lateral tocando a raiz nervosa S1 direita. Ausência de estenose crítica do canal vertebral.');
      setPatientNotes('Sinto queimação na perna direita quando fico muito tempo sentada.');
    } else if (type === 'manguito_ombro') {
      setFileName('Ultrassom_Ombro_Direito.pdf');
      setDocumentCategory('ultrassom');
      setSampleText('ULTRASSONOGRAFIA DE OMBRO DIREITO: Tendão do supraespinhal com espessamento heterogêneo e sinais de tendinopatia sem rotura transmural completa. Presença de leve espessamento da bursa subacromial-subdeltoidea.');
      setPatientNotes('Dor ao erguer o braço acima da linha da cabeça para pegar objetos no armário.');
    } else {
      setFileName('Ressonancia_Joelho_Esquerdo.pdf');
      setDocumentCategory('ressonancia');
      setSampleText('RESSONÂNCIA MAGNÉTICA DO JOELHO ESQUERDO: Lesão longitudinal não deslocada do corno posterior do menisco medial, sem bloqueio mecânico. Ligamentos cruzados e colaterais contínuos e íntegros.');
      setPatientNotes('Senti estalo leve ao descer escadas, sem inchaço volumoso.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Repositório Clínico Privado & OCR</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Exames e Documentos de Imagem
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Armazenamento criptografado (LGPD). O motor de IA extrai os dados oficiais do laudo sem inferir diagnósticos fictícios.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Acesso Privado Restrito ao Paciente e Fisioterapeuta</span>
        </div>
      </div>

      {/* Main Grid: Upload Simulator (Left) and 3-Layer Document Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (5 cols): Upload form & Documents List */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upload Form Box */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5]" />
              <span>Enviar Novo Laudo ou Exame</span>
            </h2>

            {/* Quick pre-fill buttons for test convenience */}
            <div>
              <span className="text-[10px] font-bold text-[#647785] dark:text-[#9BAEB5] uppercase">
                Exemplos Pré-configurados para Demonstração:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <button
                  type="button"
                  onClick={() => handlePreloadSample('ressonancia_lombar')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 rounded-lg transition-colors cursor-pointer"
                >
                  RM Lombar (L5-S1)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreloadSample('manguito_ombro')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 rounded-lg transition-colors cursor-pointer"
                >
                  USG Ombro (Supraespinhal)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreloadSample('joelho_menisco')}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#E8F2F0] dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] hover:bg-[#35A69A]/20 rounded-lg transition-colors cursor-pointer"
                >
                  RM Joelho (Menisco)
                </button>
              </div>
            </div>

            <form onSubmit={handleUploadAndAnalyze} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Nome do Arquivo (PDF ou Imagem)
                </label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Ex.: Laudo_Ressonancia_2024.pdf"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Tipo de Exame
                </label>
                <select
                  value={documentCategory}
                  onChange={(e: any) => setDocumentCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                >
                  <option value="ressonancia">Ressonância Magnética (RM)</option>
                  <option value="raio_x">Radiografia (Raio-X)</option>
                  <option value="tomografia">Tomografia Computadorizada (TC)</option>
                  <option value="ultrassom">Ultrassonografia (USG)</option>
                  <option value="laudo_medico">Laudo / Parecer Médico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Texto do Laudo (Extração OCR Simulada)
                </label>
                <textarea
                  rows={3}
                  required
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Cole aqui o texto exato do laudo para conferência..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                  Comentário / Relato do Paciente
                </label>
                <input
                  type="text"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="Ex.: Fiz o exame semana passada porque a perna doía."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#55C6B5]" />
                <span>{uploading ? 'Processando Laudo com IA...' : 'Processar Documento com OCR & IA'}</span>
              </button>
            </form>
          </div>

          {/* List of Registered Documents */}
          <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#647785] dark:text-[#9BAEB5] uppercase tracking-wider">
              Documentos Anexados ({documents.length})
            </h3>

            <div className="space-y-2">
              {documents.map((doc) => {
                const isSelected = selectedDoc?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#176B72] bg-[#E8F2F0] dark:bg-[#142733] dark:border-[#55C6B5]'
                        : 'border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#1D3440] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-lg bg-white dark:bg-[#1D3440] text-[#176B72] dark:text-[#55C6B5] border border-[#E1E8EC] dark:border-[#29434D] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] truncate">
                          {doc.fileName}
                        </div>
                        <div className="text-[10px] text-[#647785] dark:text-[#9BAEB5] uppercase">
                          {doc.documentCategory} • {doc.fileSizeFormatted}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluído</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col (7 cols): The 3-Layer Document Breakdown View */}
        <div className="lg:col-span-7 space-y-5">
          {selectedDoc ? (
            <div className="bg-white dark:bg-[#1D3440] p-6 sm:p-8 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-6">
              
              <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#176B72] dark:text-[#55C6B5]">
                    Visualização Detalhada em 3 Camadas
                  </span>
                  <h3 className="text-lg font-bold text-[#102A43] dark:text-[#DCE9EB]">
                    {selectedDoc.fileName}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#647785] dark:text-[#9BAEB5]">
                    Data de Envio: {new Date(selectedDoc.uploadedAt).toLocaleDateString('pt-BR')}
                  </span>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Índice de Confiança: {Math.round((selectedDoc.extractedContent?.confidenceScore || 0.95) * 100)}%
                  </div>
                </div>
              </div>

              {/* Strict 3-Layer Visual Segregation */}
              <div className="space-y-4">
                
                {/* LAYER 1: Raw Document Text */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#142733] border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[10px]">
                      CAMADA 1
                    </span>
                    <span>Informação Escrita no Documento Oficial (Laudo Original)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-black/30 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                    {selectedDoc.extractedContent?.rawDocumentText || 'Texto original não disponível.'}
                  </p>
                </div>

                {/* LAYER 2: Patient Reported Info */}
                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                    <span className="px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-mono text-[10px]">
                      CAMADA 2
                    </span>
                    <span>Informação Relatada pelo Paciente</span>
                  </div>
                  <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed bg-white/70 dark:bg-black/20 p-3 rounded-lg border border-amber-200/40 dark:border-amber-900/40">
                    "{selectedDoc.extractedContent?.patientReportedSummary || 'Sem relato adicional registrado pelo paciente.'}"
                  </p>
                </div>

                {/* LAYER 3: AI Clinical Explanation & De-mystification */}
                <div className="p-4 rounded-xl bg-[#E8F2F0] dark:bg-[#176B72]/15 border border-[#35A69A]/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#176B72] dark:text-[#55C6B5]">
                    <span className="px-2 py-0.5 rounded-md bg-[#176B72] text-white dark:bg-[#55C6B5] dark:text-[#0B1720] font-mono text-[10px]">
                      CAMADA 3
                    </span>
                    <Sparkles className="w-4 h-4" />
                    <span>Explicação e Contextualização Gerada pela IA</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#172B3A] dark:text-[#DCE9EB] leading-relaxed">
                    {selectedDoc.extractedContent?.aiClinicalExplanation}
                  </p>

                  {/* Key Findings Chips */}
                  {selectedDoc.extractedContent?.keyFindings && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1.5">
                        Achados Anatômicos Chave:
                      </div>
                      <ul className="space-y-1">
                        {selectedDoc.extractedContent.keyFindings.map((finding, idx) => (
                          <li key={idx} className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#35A69A]" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Precautions for Physical Therapy */}
                  {selectedDoc.extractedContent?.suggestedPrecautions && (
                    <div className="pt-2 border-t border-[#35A69A]/20">
                      <div className="text-[11px] font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
                        Recomendações e Cuidados Gerais:
                      </div>
                      <ul className="space-y-1">
                        {selectedDoc.extractedContent.suggestedPrecautions.map((prec, idx) => (
                          <li key={idx} className="text-xs text-[#647785] dark:text-[#9BAEB5] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{prec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

              {/* Compliance Footer */}
              <div className="p-3 rounded-xl bg-[#F6F8FA] dark:bg-[#142733] border border-[#E1E8EC] dark:border-[#29434D] text-[11px] text-[#647785] dark:text-[#9BAEB5] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#176B72] dark:text-[#55C6B5] shrink-0" />
                <span>
                  <strong>Garantia de Integridade:</strong> A IA REAVITA atua somente sobre o texto comprovado pelo laudo, sem criar laudos ausentes ou prescrever diagnósticos médicos conclusivos.
                </span>
              </div>

            </div>
          ) : (
            <div className="bg-white dark:bg-[#1D3440] p-12 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] text-center text-xs text-[#647785] dark:text-[#9BAEB5]">
              Selecione um documento à esquerda para conferir a extração em 3 camadas.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
