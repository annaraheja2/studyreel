// Clean, sharp line icons (stroke = currentColor). No emojis anywhere.
import type { SVGProps } from 'react'

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  ...p,
})

export const Check = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>)
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>)
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 12h14M13 5l7 7-7 7" /></svg>)
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M19 12H5M11 5l-7 7 7 7" /></svg>)
export const Play = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></svg>)
export const Search = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>)
export const Lock = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="4" y="11" width="16" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>)
export const Plus = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>)
export const Trash = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></svg>)
export const Upload = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>)
export const Rewind = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>)

export const Bookmark = ({ filled, ...p }: SVGProps<SVGSVGElement> & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}><path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4.5L5 21V5a1 1 0 0 1 1-1z" /></svg>
)
export const Star = ({ filled, ...p }: SVGProps<SVGSVGElement> & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}><path d="m12 3 2.7 5.9 6.3.6-4.8 4.2 1.5 6.3L12 17.8 6.3 20.2l1.5-6.3L3 9.5l6.3-.6z" /></svg>
)
