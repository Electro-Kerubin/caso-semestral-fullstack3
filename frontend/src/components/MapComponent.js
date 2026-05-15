import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

// Para mobile usamos react-native-maps; para web usamos un iframe simple (Google Maps) como fallback.
// Si prefieres Leaflet/React-Leaflet, instala 'react-leaflet' y 'leaflet' y reemplaza el bloque web.

export default function MapComponent({ markers = [], onMarkerPress }) {
  if (Platform.OS === 'web') {
    // muestra un mapa básico centrado en Lima por defecto; ajustar según necesidad
    const center = markers[0] ? `${markers[0].lat},${markers[0].lng}` : '-12.0464,-77.0428';
    const src = `https://www.google.com/maps?q=${center}&z=13&output=embed`;
    return (
      <iframe title="map" src={src} style={{ width: '100%', height: '100%', border: 0 }} />
    );
  }

  // mobile/native
  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;

  return (
    <MapView style={styles.map} initialRegion={{ latitude: -12.0464, longitude: -77.0428, latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
      {markers.map(m => (
        <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lng }} onPress={() => onMarkerPress && onMarkerPress(m)} />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});