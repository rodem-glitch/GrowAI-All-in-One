// GrowAI 로고 — LearnForm SVG 스타일
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2 text-xl font-bold" style={{ color: '#14a1c8' }}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="logoBg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#107f9e" />
            <stop offset="100%" stopColor="#14a1c8" />
          </linearGradient>
          <radialGradient id="highlight" cx="75%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="34" height="34" rx="8" fill="url(#logoBg)" />
        <path d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z" fill="white" fillOpacity="0.85" />
        <path d="M30 2Q17 17 3 33" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
        <rect width="34" height="34" rx="8" fill="url(#highlight)" />
      </svg>
      GrowAI
    </Link>
  );
}
