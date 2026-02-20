import Completessvg from "../../assets/Completessvg";
import Processsvg from "../../assets/Processsvg";
import Waitsvg from "../../assets/Waitsvg";

const STATUS = {
  wait: [Waitsvg, 'Pendientes'],
  process: [Processsvg, 'En Proceso'],
  complete: [Completessvg, 'Completadas']
} as const; 

type Props = {
  status: keyof typeof STATUS;
  cantidad: number
}

export default function StatusItem({ status, cantidad }: Props) {
  const [IconComponent, title] = STATUS[status];

  return (
    <div className="glass-panel p-4 rounded-xl bg-[#192436] flex items-center  justify-between
      transition-all duration-300 ease 
      hover:-translate-y-0.5 
      hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] 
      hover:border-blue-400/30 
      border border-slate-700/50">

      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <IconComponent />
        </div>
      </div>

      <p className="text-2xl font-bold text-white">{cantidad}</p>
      <p className="text-sm text-slate-400">{title}</p>

    </div>
  );
}