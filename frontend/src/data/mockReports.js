function svgDataUri(title, background, foreground = '#ffffff') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" rx="40" fill="${background}" />
      <circle cx="990" cy="150" r="86" fill="rgba(255,255,255,0.18)" />
      <circle cx="180" cy="760" r="120" fill="rgba(255,255,255,0.14)" />
      <text x="80" y="170" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="${foreground}">${title}</text>
      <text x="80" y="270" font-family="Arial, sans-serif" font-size="34" fill="${foreground}">Reporte de mascota</text>
      <rect x="80" y="330" width="460" height="18" rx="9" fill="rgba(255,255,255,0.75)" />
      <rect x="80" y="372" width="390" height="18" rx="9" fill="rgba(255,255,255,0.65)" />
      <rect x="80" y="414" width="320" height="18" rx="9" fill="rgba(255,255,255,0.55)" />
      <text x="80" y="804" font-family="Arial, sans-serif" font-size="28" fill="${foreground}" opacity="0.95">Sano y Salvo</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const MOCK_REPORTS = [
  {
    id: 'r-1',
    name: 'Luna',
    species: 'Perro',
    breed: 'Mestiza',
    description: 'Luna fue vista por última vez cerca del parque principal, lleva un collar rojo y responde a su nombre.',
    status: 'Buscando',
    lat: -12.0464,
    lng: -77.0428,
    media: [svgDataUri('Luna', '#f59e0b'), svgDataUri('Luna 2', '#0f766e')],
    contact: 'María Torres',
    contactPhone: '+51 999 111 222',
    isMine: true,
    createdAt: '2026-05-15T10:20:00Z',
    nearby: true
  },
  {
    id: 'r-2',
    name: 'Toby',
    species: 'Gato',
    breed: 'Angora',
    description: 'Toby apareció en una azotea del barrio y ya fue entregado a su familia.',
    status: 'Encontrado',
    lat: -12.0508,
    lng: -77.0369,
    media: [svgDataUri('Toby', '#2563eb')],
    contact: 'Carlos Pérez',
    contactPhone: '+51 977 222 333',
    isMine: false,
    createdAt: '2026-05-15T09:10:00Z',
    nearby: true
  },
  {
    id: 'r-3',
    name: 'Milo',
    species: 'Perro',
    breed: 'Golden Retriever',
    description: 'Milo está siendo buscado desde ayer en la zona de San Isidro.',
    status: 'Buscando',
    lat: -12.096,
    lng: -77.0365,
    media: [svgDataUri('Milo', '#ef4444')],
    contact: 'Lucía Ramos',
    contactPhone: '+51 988 333 444',
    isMine: true,
    createdAt: '2026-05-14T18:00:00Z',
    nearby: false
  },
  {
    id: 'r-4',
    name: 'Nala',
    species: 'Perro',
    breed: 'Poodle',
    description: 'Nala fue encontrada cerca de una veterinaria y está a salvo.',
    status: 'Encontrado',
    lat: -12.062,
    lng: -77.03,
    media: [svgDataUri('Nala', '#16a34a')],
    contact: 'Equipo Rescate',
    contactPhone: '+51 900 444 555',
    isMine: false,
    createdAt: '2026-05-13T14:00:00Z',
    nearby: false
  }
];

export const MOCK_NOTIFICATIONS = [
  'Nuevo comentario en tu reporte de Luna.',
  'Toby fue marcado como encontrado por un usuario cercano.',
  'Tu reporte de Milo recibió una coincidencia cercana.'
];
