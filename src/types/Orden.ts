export type Orden = {
  id: number
  cliente: string
  fecha: string
  estado: string
}

export type ItemOrden = {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
  action: (action: string) => void;
}
