import { useState } from "react";
import { TIPOS_CRISTAL_VALORES, type COLORES_PERFIL, type Features } from "../../types/ItemOrden";

type Props = {
  featuresP: Features;
  sendFeatures: (features: Features) => void;
}

type OpenPanel = 'colorPerfil' | 'tipoCristal' | 'vias' | null;

const COLOR_MAP: Record<string, string> = {
  blanco: '#ffffff', negro: '#000000', caoba: '#4C2F27', roble: '#D8B589'
};

const CRISTAL_SHORT: Record<string, string> = {
  'natural liso': 'Natural Liso', 'Natural Martillado': 'Natural Martillado',
  'bronze liso': 'Bronze Liso', 'Bronze Martillado': 'Bronze Martillado',
  'azul liso': 'Azul Liso', 'Azul Martillado': 'Azul Martillado',
};

const COLORES: { label: string; value: COLORES_PERFIL; color: string }[] = [
  { label: 'Blanco', value: 'blanco', color: '#ffffff' },
  { label: 'Negro', value: 'negro', color: '#000000' },
  { label: 'Caoba', value: 'caoba', color: '#4C2F27' },
  { label: 'Roble', value: 'roble', color: '#D8B589' },
];

export default function Caracteristicas({ sendFeatures, featuresP }: Props) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [features, setFeatures] = useState<Features>(featuresP);

  const setFeaturesFnc = (key: keyof Features, value: string | number) => {
    const newFeatures = { ...features, [key]: value };
    setFeatures(newFeatures);
    setOpenPanel(null);
    sendFeatures(newFeatures);
  };

  const rows: { key: OpenPanel; label: string; display: React.ReactNode }[] = [
    {
      key: 'colorPerfil',
      label: 'Color Perfil',
      display: (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-slate-500 shrink-0"
            style={{ backgroundColor: COLOR_MAP[features.colorPerfil] }} />
          <span className="text-sm text-slate-200 capitalize w-14 text-right">{features.colorPerfil}</span>
        </div>
      )
    },
    {
      key: 'tipoCristal',
      label: 'Cristal',
      display: <span className="text-sm text-slate-200 w-20 text-right">{CRISTAL_SHORT[features.tipoCristal]}</span>
    },
    {
      key: 'vias',
      label: 'Vías',
      display: <span className="text-sm text-slate-200 w-14 text-right">{features.vias} vías</span>
    },
  ];

  return (
    <div className="mt-2 rounded-xl border border-slate-700/50 bg-slate-900/30">

      {/* Vista principal */}
      {!openPanel && (
        <div>
          {rows.map((row, i) => (
            <button
              key={row.key!}
              onClick={() => setOpenPanel(row.key)}
              className="w-full flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(51,65,85,0.5)' : 'none' }}
            >
              <span className="text-sm font-medium text-slate-300">{row.label}</span>
              <div className="flex items-center gap-2">
                {row.display}
                <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Panel de opciones */}
      {openPanel && (
        <div>
          {/* Header */}
          <div className="flex items-center gap-10 px-3 py-3 border-b border-slate-700/50 bg-slate-900/30">
            <button
              onClick={() => setOpenPanel(null)}
              className="flex items-center gap-1 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Atrás</span>
            </button>
            <span className="text-sm font-semibold text-slate-200 mx-auto pr-10">
              {rows.find(r => r.key === openPanel)?.label}
            </span>
          </div>

          {/* Opciones */}
          <div className="flex flex-col gap-1 px-3 py-2 bg-slate-950/50">

            {openPanel === 'colorPerfil' && COLORES.map(option => (
              <div key={option.label}
                onClick={() => setFeaturesFnc('colorPerfil', option.value)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                  ${features.colorPerfil === option.value ? 'bg-blue-600/20 border border-blue-500/40' : 'hover:bg-slate-800'}`}
              >
                <div className="w-5 h-5 rounded-full border border-slate-500 shrink-0"
                  style={{ backgroundColor: option.color }} />
                <span className="text-sm text-slate-200">{option.label}</span>
                {features.colorPerfil === option.value &&
                  <svg className="w-4 h-4 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </div>
            ))}

            {openPanel === 'tipoCristal' && TIPOS_CRISTAL_VALORES.map(tipo => (
              <div key={tipo}
                onClick={() => setFeaturesFnc('tipoCristal', tipo)}
                className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                  ${features.tipoCristal === tipo ? 'bg-blue-600/20 border border-blue-500/40' : 'hover:bg-slate-800'}`}
              >
                <span className="text-sm text-slate-200 flex-1">{tipo}</span>
                {features.tipoCristal === tipo &&
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </div>
            ))}

            {openPanel === 'vias' && [2, 3, 4, 5].map(via => (
              <div key={via}
                onClick={() => setFeaturesFnc('vias', via)}
                className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                  ${features.vias === via ? 'bg-blue-600/20 border border-blue-500/40' : 'hover:bg-slate-800'}`}
              >
                <span className="text-sm text-slate-200 flex-1">{via} vías</span>
                {features.vias === via &&
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}