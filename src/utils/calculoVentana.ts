import type { TIPO_PERFIL } from "../types/ItemOrden";

const mixtoToDecimal = (valorMixto: string): number => {
  if (!valorMixto) return 0;

  const partes = valorMixto.trim().split(' ');

  if (partes.length === 1) {
    if (partes[0].includes('/')) {
      return procesarFraccion(partes[0]);
    }
    return Number(partes[0]) || 0;
  }

  const entero = Number(partes[0]) || 0;
  const fraccionDecimal = procesarFraccion(partes[1]);

  return entero + fraccionDecimal;
};

const procesarFraccion = (fraccion: string): number => {
  const [numerador, denominador] = fraccion.split('/');
  const num = Number(numerador);
  const den = Number(denominador);

  return (den !== 0 && !isNaN(num) && !isNaN(den)) ? num / den : 0;
};

const decimalToMixto = (decimal: number): string => {
  if (decimal === 0) return "0";

  const entero = Math.floor(decimal);
  const residuo = decimal - entero;

  if (residuo < 0.001) return `${entero}`;

  const numerador = Math.round(residuo * 16);

  if (numerador === 16) return `${entero + 1}`;
  if (numerador === 0) return `${entero}`;

  const simplificar = (n: number, d: number): [number, number] => {
    const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
    const divisorComun = mcd(n, d);
    return [n / divisorComun, d / divisorComun];
  };

  const [numSimplificado, denSimplificado] = simplificar(numerador, 16);

  if (entero === 0) return `${numSimplificado}/${denSimplificado}`;

  return `${entero} ${numSimplificado}/${denSimplificado}`;
};

const p65: Record<string, string> = {
  rc: '1 3/8',
  lateral: '1/8',
  jamba: '2 1/8',
  ruleta: "1 1/8",
  can: "6 1/2",
  cal: "5"
}

const tradicional: Record<string, string> = {
  rc: '1/8',
  lateral: '1/2',
  jamba: "1",
  ruleta: '1/2',
  can: '4',
  cal: '4',
}

const p92: Record<string, string> = {
  rc: '1 5/8',
  lateral: '1/8',
  jamba: '2 1/2',
  ruleta: '1',
  can: '7 3/4',
  cal: '6 1/2'
}

const medidasPerPefil = {
  p65,
  tradicional,
  p92
}

export const calcularDesglose = (ancho: string, alto: string, vias: string, perfil: TIPO_PERFIL) => {

  const { rc, lateral, jamba, ruleta, can, cal } = medidasPerPefil[perfil]
  const rcDecimal = mixtoToDecimal(rc)
  const lateralDecimal = mixtoToDecimal(lateral)
  const jambaDecimal = mixtoToDecimal(jamba)
  const ruletaDecimal = mixtoToDecimal(ruleta)
  const canDecimal = mixtoToDecimal(can)
  const calDecimal = mixtoToDecimal(cal)

  const anchoDecimal = mixtoToDecimal(ancho)
  const altoDecimal = mixtoToDecimal(alto)

  const rcResto = decimalToMixto(anchoDecimal - rcDecimal)
  const ruletaResto = decimalToMixto(anchoDecimal - ruletaDecimal)
  const canResto = decimalToMixto(anchoDecimal - canDecimal)

  const lateralResto = decimalToMixto(altoDecimal - lateralDecimal)
  const jambaResto = decimalToMixto(altoDecimal - jambaDecimal)
  const calResto = decimalToMixto(altoDecimal - calDecimal)

  const desglose = {
    rc: rcResto,
    lateral: lateralResto,
    jamba: jambaResto,
    ruleta: ruletaResto,
    can: canResto,
    cal: calResto
  }
  return desglose
}