import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BodyPoint, BodyZone, TissueType } from '../../types';
import { 
  Crosshair, 
  RotateCw, 
  Layers, 
  Plus, 
  Trash2, 
  Check, 
  Info, 
  Save, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const BodyMap: React.FC = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState<BodyPoint[]>([]);
  const [activeView, setActiveView] = useState<'anterior' | 'posterior'>('posterior');
  const [selectedZone, setSelectedZone] = useState<BodyZone>('lumbar_spine');
  const [painLevel, setPainLevel] = useState<number>(6);
  const [sensation, setSensation] = useState<BodyPoint['sensationType']>('queimação');
  const [selectedTissues, setSelectedTissues] = useState<TissueType[]>(['joint', 'nerve', 'muscle']);
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Body zones definition with coordinates and titles
  const bodyZonesConfig: { id: BodyZone; namePt: string; view: 'anterior' | 'posterior' | 'both'; defaultTissues: TissueType[] }[] = [
    { id: 'head_neck', namePt: 'Cabeça e Face / Crânio', view: 'both', defaultTissues: ['joint', 'muscle'] },
    { id: 'cervical', namePt: 'Coluna Cervical (C1-C7)', view: 'both', defaultTissues: ['joint', 'nerve', 'muscle'] },
    { id: 'shoulder_left', namePt: 'Ombro Esquerdo', view: 'both', defaultTissues: ['tendon', 'joint', 'muscle'] },
    { id: 'shoulder_right', namePt: 'Ombro Direito', view: 'both', defaultTissues: ['tendon', 'joint', 'muscle'] },
    { id: 'thoracic_spine', namePt: 'Coluna Torácica', view: 'posterior', defaultTissues: ['joint', 'muscle', 'bone'] },
    { id: 'lumbar_spine', namePt: 'Coluna Lombar (L1-S1)', view: 'posterior', defaultTissues: ['joint', 'nerve', 'bone'] },
    { id: 'elbow_left', namePt: 'Cotovelo Esquerdo', view: 'both', defaultTissues: ['tendon', 'joint'] },
    { id: 'elbow_right', namePt: 'Cotovelo Direito', view: 'both', defaultTissues: ['tendon', 'joint'] },
    { id: 'wrist_hand_left', namePt: 'Punho e Mão Esquerda', view: 'both', defaultTissues: ['nerve', 'tendon', 'joint'] },
    { id: 'wrist_hand_right', namePt: 'Punho e Mão Direita', view: 'both', defaultTissues: ['nerve', 'tendon', 'joint'] },
    { id: 'hip_pelvis', namePt: 'Quadril e Pelve', view: 'both', defaultTissues: ['joint', 'muscle', 'fascia'] },
    { id: 'thigh_left', namePt: 'Coxa Esquerda', view: 'both', defaultTissues: ['muscle', 'nerve', 'fascia'] },
    { id: 'thigh_right', namePt: 'Coxa Direita', view: 'both', defaultTissues: ['muscle', 'nerve', 'fascia'] },
    { id: 'knee_left', namePt: 'Joelho Esquerdo', view: 'both', defaultTissues: ['ligament', 'joint', 'tendon'] },
    { id: 'knee_right', namePt: 'Joelho Direito', view: 'both', defaultTissues: ['ligament', 'joint', 'tendon'] },
    { id: 'leg_left', namePt: 'Perna / Panturrilha Esquerda', view: 'both', defaultTissues: ['muscle', 'nerve'] },
    { id: 'leg_right', namePt: 'Perna / Panturrilha Direita', view: 'both', defaultTissues: ['muscle', 'nerve'] },
    { id: 'ankle_foot_left', namePt: 'Tornozelo e Pé Esquerdo', view: 'both', defaultTissues: ['ligament', 'fascia', 'joint'] },
    { id: 'ankle_foot_right', namePt: 'Tornozelo e Pé Direito', view: 'both', defaultTissues: ['ligament', 'fascia', 'joint'] }
  ];

  const tissueOptions: { id: TissueType; label: string; color: string }[] = [
    { id: 'muscle', label: 'Músculos', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300' },
    { id: 'tendon', label: 'Tendões', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' },
    { id: 'ligament', label: 'Ligamentos', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300' },
    { id: 'joint', label: 'Articulações', color: 'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300' },
    { id: 'nerve', label: 'Nervos periféricos', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300' },
    { id: 'fascia', label: 'Fáscias', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300' },
    { id: 'bone', label: 'Estruturas ósseas', color: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' }
  ];

  useEffect(() => {
    async function loadPoints() {
      try {
        const res = await fetch(`/api/patients/${currentUser.id}/body-points`);
        const data = await res.json();
        if (data.points) setPoints(data.points);
      } catch (err) {
        console.warn('Load body points error:', err);
      }
    }
    loadPoints();
  }, [currentUser.id]);

  const toggleTissue = (tissue: TissueType) => {
    if (selectedTissues.includes(tissue)) {
      setSelectedTissues(selectedTissues.filter(t => t !== tissue));
    } else {
      setSelectedTissues([...selectedTissues, tissue]);
    }
  };

  const handleAddOrUpdatePoint = () => {
    const zoneCfg = bodyZonesConfig.find(z => z.id === selectedZone);
    const newPoint: BodyPoint = {
      id: `pt-${Date.now()}`,
      zone: selectedZone,
      zoneNamePt: zoneCfg ? zoneCfg.namePt : selectedZone,
      view: activeView,
      tissueTypes: selectedTissues.length > 0 ? selectedTissues : ['joint'],
      painIntensity: painLevel,
      sensationType: sensation,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const filtered = points.filter(p => !(p.zone === selectedZone && p.view === activeView));
    const updated = [newPoint, ...filtered];
    setPoints(updated);
    savePointsToServer(updated);
  };

  const handleRemovePoint = (id: string) => {
    const updated = points.filter(p => p.id !== id);
    setPoints(updated);
    savePointsToServer(updated);
  };

  const savePointsToServer = async (newPoints: BodyPoint[]) => {
    setSaving(true);
    try {
      await fetch(`/api/patients/${currentUser.id}/body-points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: newPoints })
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.warn('Error saving points:', err);
    } finally {
      setSaving(false);
    }
  };

  const isZoneMapped = (zoneId: BodyZone) => {
    return points.some(p => p.zone === zoneId);
  };

  const currentZoneData = bodyZonesConfig.find(z => z.id === selectedZone);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B72] dark:text-[#55C6B5] uppercase tracking-wider mb-1">
            <Crosshair className="w-4 h-4" />
            <span>Topografia e Registro de Sintomas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#102A43] dark:text-[#DCE9EB]">
            Mapa Corporal Interativo
          </h1>
          <p className="text-xs sm:text-sm text-[#647785] dark:text-[#9BAEB5]">
            Ferramenta estruturada de localização e caracterização dos tecidos envolvidos. Não substitui palpação presencial.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView(activeView === 'anterior' ? 'posterior' : 'anterior')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E8F2F0] hover:bg-[#176B72]/20 dark:bg-[#142733] text-[#176B72] dark:text-[#55C6B5] border border-[#35A69A]/30 transition-all cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span>Alternar: Vista {activeView === 'anterior' ? 'Posterior (Costas)' : 'Anterior (Frente)'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Body Vector + Hotspots & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Vector Body Map Visual Representation (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1D3440] rounded-2xl p-6 border border-[#E1E8EC] dark:border-[#29434D] shadow-xs flex flex-col items-center justify-center relative min-h-[460px]">
          
          <div className="text-xs font-bold text-[#647785] dark:text-[#9BAEB5] mb-2 uppercase tracking-wider">
            Vista Atual: <strong className="text-[#102A43] dark:text-[#DCE9EB]">{activeView === 'posterior' ? 'Posterior (Costas)' : 'Anterior (Frente)'}</strong>
          </div>

          {/* Interactive SVG Anatomical Silhouette with Hotspots */}
          <div className="relative w-64 h-[440px] flex items-center justify-center">
            <svg 
              viewBox="0 0 200 420" 
              className="w-full h-full drop-shadow-sm select-none"
            >
              {/* Head */}
              <circle cx="100" cy="35" r="22" className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
              
              {/* Neck */}
              <rect x="94" y="57" width="12" height="14" rx="3" className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
              
              {/* Torso */}
              <path 
                d="M 65 72 Q 100 68 135 72 L 126 190 Q 100 195 74 190 Z" 
                className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" 
                strokeWidth="2" 
              />
              {activeView === 'posterior' && (
                /* Spine outline */
                <line x1="100" y1="72" x2="100" y2="185" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
              )}

              {/* Arms */}
              <path d="M 64 78 Q 42 120 40 160 Q 36 190 32 215" fill="none" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="12" strokeLinecap="round" />
              <path d="M 136 78 Q 158 120 160 160 Q 164 190 168 215" fill="none" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="12" strokeLinecap="round" />

              {/* Pelvis & Legs */}
              <path d="M 78 190 L 74 290 Q 72 350 70 395" fill="none" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="16" strokeLinecap="round" />
              <path d="M 122 190 L 126 290 Q 128 350 130 395" fill="none" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="16" strokeLinecap="round" />
            </svg>

            {/* Clickable Hotspot Overlay Buttons */}
            {/* Cervical */}
            <button
              onClick={() => setSelectedZone('cervical')}
              className={`absolute top-[62px] left-[93px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'cervical'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('cervical')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Cervical"
            />

            {/* Shoulder Left & Right */}
            <button
              onClick={() => setSelectedZone('shoulder_left')}
              className={`absolute top-[78px] left-[52px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'shoulder_left'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('shoulder_left')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Ombro Esquerdo"
            />
            <button
              onClick={() => setSelectedZone('shoulder_right')}
              className={`absolute top-[78px] right-[52px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'shoulder_right'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('shoulder_right')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Ombro Direito"
            />

            {/* Thoracic (Posterior) */}
            {activeView === 'posterior' && (
              <button
                onClick={() => setSelectedZone('thoracic_spine')}
                className={`absolute top-[108px] left-[93px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                  selectedZone === 'thoracic_spine'
                    ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                    : isZoneMapped('thoracic_spine')
                      ? 'bg-red-500 border-white animate-pulse'
                      : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
                }`}
                title="Coluna Torácica"
              />
            )}

            {/* Lumbar Spine */}
            <button
              onClick={() => setSelectedZone('lumbar_spine')}
              className={`absolute top-[152px] left-[93px] w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'lumbar_spine'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('lumbar_spine')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Coluna Lombar"
            />

            {/* Thigh Right */}
            <button
              onClick={() => setSelectedZone('thigh_right')}
              className={`absolute top-[238px] right-[62px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'thigh_right'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('thigh_right')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Coxa Direita"
            />

            {/* Knee Right & Left */}
            <button
              onClick={() => setSelectedZone('knee_left')}
              className={`absolute top-[292px] left-[65px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'knee_left'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('knee_left')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Joelho Esquerdo"
            />
            <button
              onClick={() => setSelectedZone('knee_right')}
              className={`absolute top-[292px] right-[65px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'knee_right'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('knee_right')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Joelho Direito"
            />

            {/* Leg Right (Calf) */}
            <button
              onClick={() => setSelectedZone('leg_right')}
              className={`absolute top-[340px] right-[62px] w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                selectedZone === 'leg_right'
                  ? 'bg-[#176B72] border-white scale-125 ring-4 ring-[#35A69A]/30 z-20'
                  : isZoneMapped('leg_right')
                    ? 'bg-red-500 border-white animate-pulse'
                    : 'bg-white dark:bg-slate-700 border-slate-400 hover:scale-110'
              }`}
              title="Panturrilha / Perna Direita"
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-[#647785] dark:text-[#9BAEB5]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>Ponto Mapeado com Dor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#176B72]" />
              <span>Região Selecionada</span>
            </div>
          </div>
        </div>

        {/* Zone Characterization & Tissue Selector (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1D3440] rounded-2xl p-6 border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-5">
          
          <div className="border-b border-[#E1E8EC] dark:border-[#29434D] pb-3">
            <div className="text-[11px] font-bold text-[#176B72] dark:text-[#55C6B5] uppercase">
              Região em Edição
            </div>
            <h3 className="text-lg font-bold text-[#102A43] dark:text-[#DCE9EB]">
              {currentZoneData?.namePt || selectedZone}
            </h3>
          </div>

          {/* Tissue Type Multi-selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#176B72] dark:text-[#55C6B5]" />
              <span>Tecidos e Estruturas Anatômicas Suspeitas</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tissueOptions.map((tissue) => {
                const isSelected = selectedTissues.includes(tissue.id);
                return (
                  <button
                    key={tissue.id}
                    onClick={() => toggleTissue(tissue.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? `${tissue.color} border-current ring-1 ring-current`
                        : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#647785] dark:text-[#9BAEB5] border-[#E1E8EC] dark:border-[#29434D]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{tissue.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pain Slider (EVA 0-10) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                Intensidade da Dor (Escala EVA de 0 a 10)
              </label>
              <span className={`text-sm font-black px-2.5 py-0.5 rounded-lg ${
                painLevel <= 3 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : painLevel <= 6 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-red-100 text-red-800'
              }`}>
                {painLevel} / 10
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={10} 
              value={painLevel} 
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full accent-[#176B72] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#647785] dark:text-[#9BAEB5]">
              <span>0 (Sem dor)</span>
              <span>5 (Dor moderada)</span>
              <span>10 (Pior dor imaginável)</span>
            </div>
          </div>

          {/* Sensation Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
              Qual é a sensação predominante?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'queimação', label: 'Queimação / Calor' },
                { id: 'pontada', label: 'Pontada aguda' },
                { id: 'peso/pressão', label: 'Peso / Pressão' },
                { id: 'dormência/formigamento', label: 'Dormência / Choque' },
                { id: 'irradiada', label: 'Dor que desce (Irradiada)' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSensation(s.id as any)}
                  className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                    sensation === s.id
                      ? 'bg-[#176B72] text-white border-[#176B72]'
                      : 'bg-[#F6F8FA] dark:bg-[#142733] text-[#172B3A] dark:text-[#DCE9EB] border-[#E1E8EC] dark:border-[#29434D]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#102A43] dark:text-[#DCE9EB] mb-1">
              Observações específicas desta região
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex.: Piora ao esticar a perna ou sentar."
              className="w-full px-3 py-2 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] text-xs text-[#172B3A] dark:text-[#DCE9EB] outline-none"
            />
          </div>

          {/* Action button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleAddOrUpdatePoint}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#176B72] hover:bg-[#102A43] text-white transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Salvar Região no Mapa</span>
            </button>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Atualizado!
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Summary List of Mapped Points */}
      <div className="bg-white dark:bg-[#1D3440] p-6 rounded-2xl border border-[#E1E8EC] dark:border-[#29434D] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#102A43] dark:text-[#DCE9EB]">
          Regiões Atualmente Mapeadas ({points.length})
        </h3>

        {points.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#647785] dark:text-[#9BAEB5] bg-[#F6F8FA] dark:bg-[#142733] rounded-xl border border-dashed border-[#E1E8EC] dark:border-[#29434D]">
            Nenhum ponto registrado ainda. Clique em uma região do mapa acima para caracterizar seu desconforto.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {points.map((p) => (
              <div 
                key={p.id}
                className="p-3.5 rounded-xl border border-[#E1E8EC] dark:border-[#29434D] bg-[#F6F8FA] dark:bg-[#142733] space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#102A43] dark:text-[#DCE9EB]">
                      {p.zoneNamePt}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      p.painIntensity <= 3 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : p.painIntensity <= 6 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      EVA {p.painIntensity}/10
                    </span>
                  </div>

                  <div className="text-[11px] text-[#647785] dark:text-[#9BAEB5] mt-1 capitalize">
                    Sensação: <strong>{p.sensationType}</strong> • Vista {p.view}
                  </div>

                  {p.notes && (
                    <p className="text-[11px] text-[#172B3A] dark:text-[#DCE9EB] mt-1.5 italic bg-white/60 dark:bg-black/20 p-1.5 rounded-md">
                      "{p.notes}"
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tissueTypes.map(t => (
                      <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E1E8EC] dark:border-[#29434D] flex justify-end">
                  <button
                    onClick={() => handleRemovePoint(p.id)}
                    className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
