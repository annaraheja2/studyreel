import { Star } from './icons'

export default function StarRating({ rating, onRate }: { rating: number; onRate?: (n: number) => void }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          className={`transition ${star <= rating ? 'text-[#2B2620]' : 'text-[#A99E8D]'} ${onRate ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star filled={star <= rating} className="w-6 h-6" />
        </button>
      ))}
    </div>
  )
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1 items-center" title={`Difficulty ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`w-1 h-3 rounded-sm ${i <= level ? 'bg-[#5A5348]' : 'bg-[#E1D8C8]'}`} />
      ))}
    </div>
  )
}
