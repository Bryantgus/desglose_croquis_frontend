export type TIPO_PERFIL = 'p65' | 'tradicional' | 'p92' | 'p40';
export type COLORES_PERFIL = 'blanco' | 'negro' | 'roble'
export type TIPO_CRISTAL = 'natural liso' | 'natural martillado' | 'bronze liso' | 'bronze martillado' | 'azulado liso' | 'azulado martillado'


export type ItemOrden = {
    ancho: string
    alto: string
    colorPerfil: COLORES_PERFIL
    tipoCristal: TIPO_CRISTAL
    tipoPerfil: TIPO_PERFIL
    vias: number
    etiqueta: string
}