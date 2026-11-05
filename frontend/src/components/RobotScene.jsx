import React from 'react';

// Robot del hero SIN video: una imagen fija (48 KB) + capas animadas con CSS/SVG.
// Las animaciones viven en index.css (prefijo "rs-") y se apagan con "reducir movimiento".

const CodeLines = ({ count = 7 }) => (
  <div className="rs-code">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ width: `${45 + ((i * 37) % 50)}%`, animationDelay: `${i * 0.35}s` }} />
    ))}
  </div>
);

const RobotScene = ({ className = '' }) => (
  <div className={`rs-scene ${className}`} aria-hidden="true">
    {/* Pantallas holográficas */}
    <div className="rs-panel rs-panel-a">
      <div className="rs-panel-title" />
      <CodeLines count={8} />
      <div className="rs-scan" />
    </div>
    <div className="rs-panel rs-panel-b">
      <svg viewBox="0 0 120 60" className="rs-chart">
        {[8, 22, 14, 30, 20, 38, 28, 46, 36].map((h, i) => (
          <rect key={i} x={6 + i * 12} y={56 - h} width="8" height={h} rx="1.5" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </svg>
    </div>
    <div className="rs-panel rs-panel-c">
      <CodeLines count={4} />
    </div>

    {/* Anillo de luz bajo los pies */}
    <div className="rs-ring">
      <div className="rs-ring-inner" />
    </div>

    {/* Robot */}
    <div className="rs-robot">
      <img src="/img/robot-hero.webp" alt="" width="480" height="1000" decoding="async" fetchpriority="high" />
      <span className="rs-chest" />
    </div>

    {/* Partículas */}
    {Array.from({ length: 10 }).map((_, i) => (
      <span key={i} className="rs-particle" style={{ left: `${10 + i * 8.5}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${5 + (i % 4)}s` }} />
    ))}
  </div>
);

export default RobotScene;
