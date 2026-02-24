import { useState } from "react";
// import ItemDesglose from "../components/Desglose/ItemDesglose";
import SetupDesglose from "../components/Desglose/SetupDesglose";

export default function Desglose() {

  const [showSetup, setShowSetup] = useState(true);
  const [perfiles, setPerfiles] = useState<string[]>([]);

  const handleSave = (perfiles: string[]) => {
    setPerfiles(perfiles);
    setShowSetup(false);
    console.log('Perfiles seleccionados:', perfiles);
  };


  return (
    <div>
      {showSetup && (
        <SetupDesglose
          onSave={handleSave}
        />
      )}

      {/* Resto de tu app */}
      <div className="text-white">
        Cambiar Perfil: 
        {perfiles}
      </div>
    
    </div>

    // <div className="grid grid-cols-5  gap-x-10 items-start justify-center gap-y-5" 
    // style={{
    //   animation: 'slideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
    // }}>
    //   <ItemDesglose />
    // </div>
  )
}
