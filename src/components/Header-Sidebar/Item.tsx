import Croquissvg from "../../assets/Croquissvg"
import Desglosesvg from "../../assets/Desglosesvg"
import Ordenessvg from "../../assets/Ordenessvg"

const ICON_MAP = {
  ordenes: Ordenessvg,
  desglose: Desglosesvg,
  croquis: Croquissvg,
};


interface ItemProps {
  title: string;
  description: string;
  icon: keyof typeof ICON_MAP; 
  setActive: (module: string) => void
  isActive: boolean;
}

export default function Item({ title, description, icon, setActive, isActive }: ItemProps) {

  const IconComponent = ICON_MAP[icon];

  return (
    <button onClick={() => setActive(title)}
      className={`${isActive && 'active'} cursor-pointer w-full flex items-center gap-3 px-1 py-3 rounded-xl text-left transition-all group 
        ${isActive ? 'bg-[#3b82f626] text-[#60a5fa]' : 'hover:bg-slate-800/50'}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors 
        ${isActive ? 'bg-blue-500/20 text-blue-400' : ''}`}>
        
        {IconComponent ? <IconComponent /> : null}
        
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-sm text-slate-200">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </button>
  );
}