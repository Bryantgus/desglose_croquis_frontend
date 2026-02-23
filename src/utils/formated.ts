export const formatearFecha = (fechaISO: Date) => {
  const fecha = new Date(fechaISO);

  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};