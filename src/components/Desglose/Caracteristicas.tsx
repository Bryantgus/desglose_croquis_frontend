// Caracteristicas.tsx
import { useState } from "react";
import { TIPOS_CRISTAL_VALORES, type COLORES_PERFIL, type Features } from "../../types/ItemOrden";

type Props = {
  featuresP: Features;
  sendFeatures: (features: Features) => void;
}

export default function Caracteristicas({ sendFeatures, featuresP }: Props) {
  const [optionOpened, setOptionOpened] = useState<string | null>(null);
  const [features, setFeatures] = useState<Features>(featuresP);

  const openOptions = (option: string) => {
    if (option === optionOpened) {
      setOptionOpened(null);
      return;
    }
    setOptionOpened(option);
  };

  const setFeaturesFnc = (key: keyof Features, value: string | number) => {
    const newFeatures = {
      ...features,
      [key]: value,
    };
    setFeatures(newFeatures);
    setOptionOpened(null);
    sendFeatures(newFeatures);
  };

  return (
    <div className="flex flex-col gap-3 mt-2 p-3 bg-slate-900/30 rounded-lg border border-slate-700/50">

      {/* Color Perfil */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Color Perfil</span>

        <div className="relative">
          <button
            className="w-16 h-6 rounded border-2 border-slate-500 cursor-pointer
              hover:border-blue-400 transition-colors"
            onClick={() => {
              if (optionOpened === 'colorPerfil') {
                setOptionOpened(null);
                return;
              }
              openOptions('colorPerfil');
            }}
            style={{
              backgroundColor:
                features.colorPerfil === 'blanco' ? 'white' :
                  features.colorPerfil === 'negro' ? '#000000' :
                    features.colorPerfil === 'caoba' ? '#4C2F27' :
                      features.colorPerfil === 'roble' ? '#D8B589' :
                        ''
            }}
          />
          {optionOpened === 'colorPerfil' &&
            <div className="absolute -top-8 -left-29 w-40 
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 p-2
            flex flex-col gap-1">

              {[
                { label: 'Blanco', value: 'blanco' as COLORES_PERFIL, color: '#ffffff' },
                { label: 'Negro', value: 'negro' as COLORES_PERFIL, color: '#000000' },
                { label: 'Caoba', value: 'caoba' as COLORES_PERFIL, color: '#4C2F27' },
                { label: 'Roble', value: 'roble' as COLORES_PERFIL, color: '#D8B589' }
              ].map((option) => (
                <div key={option.label}
                  className="flex items-center gap-2 p-2 rounded hover:bg-slate-700 cursor-pointer"
                  onClick={() => setFeaturesFnc('colorPerfil', option.value)}>
                  <div
                    className="w-5 h-5 rounded border border-slate-500"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-sm text-slate-200">{option.label}</span>
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Color Cristal */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Color Cristal</span>

        <div className="relative">
          <button
            onClick={() => { openOptions('tipoCristal'); }}
            className="px-1 py-1.5 bg-slate-800 border border-slate-600 rounded cursor-pointer
            text-xs font-semibold text-slate-200 uppercase tracking-wide
            hover:border-blue-400 transition-colors">
            {
              features.tipoCristal === 'natural liso' ? 'Natural L.' :
                features.tipoCristal === 'natural martillado' ? 'Natural M.' :
                  features.tipoCristal === 'bronze liso' ? 'Bronze L.' :
                    features.tipoCristal === 'bronze martillado' ? 'Bronze M.' :
                      features.tipoCristal === 'azul liso' ? 'Azul L.' :
                        features.tipoCristal === 'azul martillado' ? 'Azul M.' :
                          ''
            }
          </button>

          {optionOpened === 'tipoCristal' &&
            <div className="absolute -top-35 -left-25 w-32
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 py-1">
              {TIPOS_CRISTAL_VALORES.map((tipo) => (
                <div key={tipo}
                  onClick={() => setFeaturesFnc('tipoCristal', tipo)}
                  className="px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer">
                  {tipo}
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      {/* Vías */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Vías</span>

        <div className="relative">
          <button
            onClick={() => openOptions('vias')}
            className="w-10 h-8 bg-slate-800 border border-slate-600 rounded cursor-pointer
            text-sm font-bold text-slate-200
            hover:border-blue-400 transition-colors">
            {features.vias}
          </button>

          {optionOpened === 'vias' &&
            <div className="absolute -top-25 right-10 w-12 cursor-pointer
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 py-1">
              {[1, 2, 3, 4, 5].map((via) => (
                <div key={via}
                  onClick={() => setFeaturesFnc('vias', via)}
                  className="px-3 py-2 text-sm text-center text-slate-200 hover:bg-slate-700 cursor-pointer">
                  {via}
                </div>
              ))}
            </div>
          }
        </div>
      </div>

    </div>
  );
}