export const PerfilType = ['p65', 'tradicional', 'p92'] as const;
export type TIPO_PERFIL = (typeof PerfilType)[number];

export const COLORES_PERFIL_VALORES = ['blanco', 'negro', 'roble', 'caoba'] as const;
export type COLORES_PERFIL = (typeof COLORES_PERFIL_VALORES)[number];

export const TIPOS_CRISTAL_VALORES = [
    'natural liso',
    'natural martillado',
    'bronze liso',
    'bronze martillado',
    'azul liso',
    'azul martillado'
] as const;
export type TIPO_CRISTAL = (typeof TIPOS_CRISTAL_VALORES)[number];

export type ItemOrden = {
    id: number
    ancho: string
    alto: string
    colorPerfil: COLORES_PERFIL
    tipoCristal: TIPO_CRISTAL
    tipoPerfil: TIPO_PERFIL
    vias: number
    etiqueta: string
}

export type Desglose = {
    rc: string
    lateral: string
    jamba: string
    ruleta: (string | number)[]
    can: string
    cal: string
}

export type Features = {
    colorPerfil: COLORES_PERFIL,
    tipoCristal: TIPO_CRISTAL,
    vias: number
}