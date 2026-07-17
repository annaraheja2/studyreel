export default function StarRating({ rating, onRate }: { rating: number; onRate?: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          className={`text-2xl leading-none transition ${star <= rating ? 'text-yellow-400' : 'text-slate-600'} ${onRate ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1 items-center" title={`Difficulty ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-brand-400' : 'bg-white/15'}`} />
      ))}
    </div>
  )
}
