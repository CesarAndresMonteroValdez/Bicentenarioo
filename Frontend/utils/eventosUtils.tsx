export const obtenerEventosCercanos = async (
  lat: number,
  lng: number,
  radio = 500 
) => {
  try {
    const res = await fetch(
      `http://192.168.0.8:5000/api/eventos/cercanos?lat=${lat}&lng=${lng}&radio=${radio}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al obtener eventos: ${errorText}`);
    }

    const data = await res.json();
    return data.eventos || [];
  } catch (error) {
    console.error('❌ obtenerEventosCercanos:', error);
    throw error;
  }
};
