export default function Caracteristicas() {
  return (
    <div className="flex flex-col gap-3 mt-2 p-3 bg-slate-900/30 rounded-lg border border-slate-700/50">
      
      {/* Color Perfil */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Color Perfil</span>
        
        <div className="relative">
          <button 
            className="w-16 h-6 rounded border-2 border-slate-500 cursor-pointer
              hover:border-blue-400 transition-colors"
            style={{ backgroundColor: '#3b82f6' }}
          />
          
          {/* Dropdown */}
          {/* <div className="absolute top-8 right-0 w-40 
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 p-2
            flex flex-col gap-1">
            
            {[
              { label: 'Blanco', color: '#ffffff' },
              { label: 'Negro', color: '#000000' },
              { label: 'Gris', color: '#6b7280' },
              { label: 'Azul', color: '#3b82f6' }
            ].map((option) => (
              <div key={option.label}
                className="flex items-center gap-2 p-2 rounded hover:bg-slate-700 cursor-pointer">
                <div 
                  className="w-5 h-5 rounded border border-slate-500"
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-sm text-slate-200">{option.label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Tipo Cristal */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Tipo Cristal</span>
        
        <div className="relative">
          <button className="px-1 py-1.5 bg-slate-800 border border-slate-600 rounded 
            text-xs font-semibold text-slate-200 uppercase tracking-wide
            hover:border-blue-400 transition-colors">
            Bronze M.
          </button>
          
          {/* Dropdown */}
          {/* <div className="absolute top-10 right-0 w-32
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 py-1">
            {['Transparente', 'Opaco', 'Esmerilado'].map((tipo) => (
              <div key={tipo}
                className="px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer">
                {tipo}
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Vías */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">Vías</span>
        
        <div className="relative">
          <button className="w-10 h-8 bg-slate-800 border border-slate-600 rounded 
            text-sm font-bold text-slate-200
            hover:border-blue-400 transition-colors">
            2
          </button>
          
          {/* Dropdown */}
          {/* <div className="absolute top-10 right-0 w-12
            bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-20 py-1">
            {[1, 2, 3, 4].map((via) => (
              <div key={via}
                className="px-3 py-2 text-sm text-center text-slate-200 hover:bg-slate-700 cursor-pointer">
                {via}
              </div>
            ))}
          </div> */}
        </div>
      </div>
      
    </div>
  );
}