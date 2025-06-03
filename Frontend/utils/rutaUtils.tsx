export const obtenerRutaConORS = async (
  origen: { lat: number; lng: number },
  destino: { lat: number; lng: number }
) => {
  if (!origen || !destino) {
    throw new Error('Origen o destino inválido');
  }

  const ORS_API_KEY = process.env.ORS_API_KEY;
  if (!ORS_API_KEY) {
    throw new Error('API key no definida');
  }

  try {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/foot-walking/geojson?api_key=${ORS_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coordinates: [
            [origen.lng, origen.lat],
            [destino.lng, destino.lat],
          ],
          instructions: false,
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al obtener ruta: ${errorText}`);
    }

    const data = await res.json();
    const duracion = data?.features?.[0]?.properties?.summary?.duration;
    const minutos = duracion ? Math.round(duracion / 60) : null;

    return {
      geojson: data,
      duracionMinutos: minutos,
    };
  } catch (error) {
    console.error('❌ obtenerRutaConORS:', error);
    throw error;
  }
};
