

export default function Ventanasvg() {
  return (
<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="70" y2="70">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
    
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <circle cx="35" cy="35" r="30" fill="url(#bgGrad)" filter="url(#shadow)"/>
  
  <rect x="20" y="22" width="30" height="24" rx="6" fill="rgba(255,255,255,0.9)"/>
  
  <rect x="20" y="22" width="30" height="6" rx="6" fill="rgba(255,255,255,0.6)"/>
  <rect x="20" y="22" width="30" height="6" rx="6" fill="rgba(255,255,255,0.4)"/>
  
  <circle cx="24" cy="25" r="1.2" fill="#ff5f57"/>
  <circle cx="28" cy="25" r="1.2" fill="#febc2e"/>
  <circle cx="32" cy="25" r="1.2" fill="#28c840"/>
  
  <rect x="24" y="32" width="16" height="2" rx="1" fill="#94a3b8"/>
  <rect x="24" y="36" width="22" height="2" rx="1" fill="#94a3b8"/>
  <rect x="24" y="40" width="18" height="2" rx="1" fill="#94a3b8"/>
  
  <path d="M20 28 Q35 28 50 28" stroke="rgba(255,255,255,0.3)" stroke-width="1" fill="none"/>
</svg>
  )
}
