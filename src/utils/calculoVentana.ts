import type { Desglose } from "../types/ItemOrden";

export const mixtoToDecimal = (valorMixto: string): number => {
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

export const procesarFraccion = (fraccion: string): number => {
  const [numerador, denominador] = fraccion.split('/');
  const num = Number(numerador);
  const den = Number(denominador);

  return (den !== 0 && !isNaN(num) && !isNaN(den)) ? num / den : 0;
};

export const decimalToMixto = (decimal: number): string => {
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

export const p65: Record<string, Desglose> = {
  2: {
    rc: '1 3/8',
    lateral: '1/8',
    jamba: '2 1/8',
    ruleta: ["1 1/8", 1],
    can: "6 1/2",
    cal: "5"
  },
  3: {
    rc: '1 3/8',
    lateral: '1/8',
    jamba: '2 1/8',
    ruleta: ["3/8", -1],
    can: "7 3/8",
    cal: "5"
  }
}

export const tradicional: Record<string, Desglose> = {
  2: {
    rc: '1/8',
    lateral: '1/2',
    jamba: '1',
    ruleta: ["1/2", 1],
    can: "4",
    cal: "4"
  },
  3: {
    rc: '1/8',
    lateral: '1/2',
    jamba: '1',
    ruleta: ["0", 1],
    can: "6",
    cal: "4"
  }
}

export const p92: Record<string, Desglose> = {
  2: {
    rc: '1 5/8',
    lateral: '1/8',
    jamba: '2 1/2',
    ruleta: ["1", 1],
    can: "7 3/4",
    cal: "6 1/2"
  },
  3: {
    rc: '1 5/8',
    lateral: '1/8',
    jamba: '1 1/8',
    ruleta: ["1 1/8", 1],
    can: "6 1/2",
    cal: "5"
  },
  4: {
    rc: '1 5/8',
    lateral: '1/8',
    jamba: '2 1/2',
    ruleta: ["1 1/8", 1],
    can: "6 1/2",
    cal: "5"
  }
}


const medidasPerPefil = {
  p65,
  tradicional,
  p92,
}

export const calcularDesgloseVentanas = (ancho: string, alto: string, vias: number, perfil: "p65" | 'tradicional' | 'p92') => {

  const perfilData = medidasPerPefil[perfil]
  const medidas = perfilData[vias]
  const { rc, lateral, jamba, ruleta, can, cal } = medidas

  const anchoDecimal = mixtoToDecimal(ancho)
  const altoDecimal = mixtoToDecimal(alto)

  const rcDecimal = mixtoToDecimal(rc)
  const lateralDecimal = mixtoToDecimal(lateral)
  const jambaDecimal = mixtoToDecimal(jamba)
  const ruletaValor = String(ruleta[0])
  const ruletaDecimal = mixtoToDecimal(ruletaValor)
  const canDecimal = mixtoToDecimal(can)
  const calDecimal = mixtoToDecimal(cal)


  const rcResto = decimalToMixto(anchoDecimal - rcDecimal)
  const jambaResto = decimalToMixto(altoDecimal - jambaDecimal)
  const calResto = decimalToMixto(altoDecimal - calDecimal)
  const lateralResto = decimalToMixto(altoDecimal - lateralDecimal)

  const ruletaOperacion = ruleta[1] as number

  const ruletaRaw = ruletaOperacion === 1
    ? (anchoDecimal - ruletaDecimal) / vias
    : (anchoDecimal + ruletaDecimal) / vias

  const ruletaRedondeado = Math.round(ruletaRaw * 16) / 16
  const ruletaResto = decimalToMixto(ruletaRedondeado)

  const canRaw = (anchoDecimal - canDecimal) / vias
  const canRedondeado = Math.round(canRaw * 16) / 16
  const canResto = decimalToMixto(canRedondeado)

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