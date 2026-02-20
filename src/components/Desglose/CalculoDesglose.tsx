export default function CalculoDesglose() {
  const items = [
    { label: 'RC', value: '1200' },
    { label: 'Lateral', value: '2400' },
    { label: 'Jamba', value: '1500' },
    { label: 'Ruleta', value: '4' },
    { label: 'Can', value: '2' },
    { label: 'Cal', value: '1.5' }
  ];

  return (
    <div className="w-full flex flex-col gap-1 p-2 bg-slate-900/30 rounded-lg border border-slate-700/50">

      {items.map((item) => (
        <div
          key={item.label}
          className="flex justify-between items-center py-0.5 px-1 border-b border-slate-700/30 last:border-0"
        >
          <div className="w-16 h-6 flex items-center justify-center bg-slate-800 rounded border border-slate-600">
            <span className="text-[13px] font-bold text-slate-300 uppercase tracking-wide">
              {item.label}
            </span>
          </div>

          {/* Value - más compacto */}
          <div className="w-16 h-6 flex items-center justify-center bg-blue-500/10 rounded border border-blue-500/30">
            <span className="text-[18px] text-blue-400">
              {item.value}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}