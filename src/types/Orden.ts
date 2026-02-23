export type OrderStatus = 'Pendiente' | 'En Proceso' | 'Completado';

export type Orden = {
  id?: number
  cliente: string
  descripcion: string
  fecha?: Date
  estado: OrderStatus
  asignadoA: string
}

export type ItemOrden = {
  id?: number;
  cliente: string;
  fecha?: Date;
  estado: string;
  action: (action: string) => void;
}
