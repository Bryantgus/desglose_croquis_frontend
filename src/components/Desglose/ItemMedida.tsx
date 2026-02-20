interface ItemMedidaProps {
  label: string;
}

export default function ItemMedida({ label }: ItemMedidaProps) {
  return (
    <div className="flex flex-col gap-1 w-20">
      <label id={label} className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      <input 
      name={label}
        type="tel" 
        autoComplete="off"
        className="h-8 bg-slate-900/50 rounded-lg 
          text-white text-center font-semibold 
          border border-slate-600 
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none
          transition-all"
      />
    </div>
  );
}