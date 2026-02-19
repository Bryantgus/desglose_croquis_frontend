import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  ordenes: 'Ordenes de Trabajo',
  desglose: 'Desglose de Perfiles y Cristales',
  croquis: 'Croquis de Cristales'
}
export default function Header() {
  const location = useLocation();
  const route = location.pathname.split('/')[1]

  return (
    <div className="text-3xl font-bold text-white mb-1 pb-5">{titles[route]}</div>
  )
}
