import ItemDesglose from "../components/Desglose/ItemDesglose";

export default function Desglose() {
  return (
    <div className="grid grid-cols-5  gap-x-10 items-start justify-center gap-y-5" 
    style={{
      animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
      <ItemDesglose />
    </div>
  )
}
