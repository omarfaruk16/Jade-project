'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import styles from './WorldMap.module.css';

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ── Only these countries are filled ORANGE ────────────────────────────────────
// Reference clearly shows: Canada, Australia (USA continental is dark — Alaska
// appears orange only because it's adjacent to Canada on the projection)
const HIGHLIGHTED = new Set([
  '124', // Canada
  '036', // Australia
  '050', // Bangladesh
  '724', // Spain
  '792', // Turkey
  '784', // UAE
  '764', // Thailand
  '458', // Malaysia
]);

// ── Marker pins matching the reference exactly ────────────────────────────────
// Reference shows 8 markers: Canada, Spain, Turkey, UAE, India, Thailand, Malaysia, Australia
const MARKERS: { id: string; label: string; info: string; coordinates: [number, number] }[] = [
  { id: 'canada', label: 'Canada', info: 'Exporting for 5 years', coordinates: [-95, 57] },
  { id: 'spain', label: 'Spain', info: 'Exporting for 5 years', coordinates: [-4, 40] },
  { id: 'turkey', label: 'Turkey', info: 'Exporting for 5 years', coordinates: [32, 39] },
  { id: 'uae', label: 'UAE', info: 'Exporting for 4 years', coordinates: [55, 25] },
  { id: 'bangladesh', label: 'Bangladesh', info: 'Exporting for 3 years', coordinates: [90, 24] },
  { id: 'thailand', label: 'Thailand', info: 'Exporting for 5 years', coordinates: [101, 15] },
  { id: 'malaysia', label: 'Malaysia', info: 'Exporting for 5 years', coordinates: [110, 3] },
  { id: 'australia', label: 'Australia', info: 'Exporting for 5 years', coordinates: [134, -26] },
];

export default function WorldMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={styles.mapWrapper}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 127, center: [10, 30] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        viewBox="0 0 800 520"
      >
        {/* White map background */}
        <rect x="0" y="0" width="800" height="520" fill="#f5f5f5" />

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isSelected = HIGHLIGHTED.has(String(geo.id));
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSelected ? '#5abf61' : '#1a1a1a'}
                  stroke={isSelected ? 'rgba(255,255,255,0.5)' : '#333'}
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      outline: 'none',
                      fill: isSelected ? '#0f5c09' : '#242424',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

        {MARKERS.map((m) => {
          const isHovered = hoveredId === m.id;
          return (
            <Marker
              key={m.id}
              coordinates={m.coordinates}
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Outer translucent ring */}
              <circle
                r={isHovered ? 9 : 7}
                fill="rgba(19, 117, 11, 0.20)"
                stroke="rgba(19, 117, 11, 0.35)"
                strokeWidth={1}
                style={{ transition: 'r 0.2s ease', cursor: 'pointer' }}
              />
              {/* Centre dot */}
              <circle
                r={isHovered ? 4.5 : 3.5}
                fill="#13750B"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={1.2}
                style={{ transition: 'r 0.2s ease', cursor: 'pointer' }}
              />

              {/* Tooltip */}
              {isHovered && (
                <foreignObject
                  x={-72}
                  y={-64}
                  width={144}
                  height={56}
                  style={{ overflow: 'visible', pointerEvents: 'none' }}
                >
                  <div className={styles.svgTooltip}>
                    <span className={styles.tooltipCountry}>{m.label}</span>
                    <span className={styles.tooltipInfo}>{m.info}</span>
                    <span className={styles.tooltipArrow} />
                  </div>
                </foreignObject>
              )}
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
