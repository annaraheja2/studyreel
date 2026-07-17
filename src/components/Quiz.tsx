import { useState } from 'react'
import {
  startQuiz, quizCurrent, quizAnswer, quizFinished, quizPassed, quizTotal, PASS_THRESHOLD,
  type QuizState,
} from '../lib/store'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { DifficultyDots } from './StarRating'
import { Check, Rewind } from './icons'

// Adaptive 3-question check-in with instant feedback.
export default function Quiz({ videoId, onRewatch }: { videoId: string; onRewatch: () => void }) {
  const { markCompleted } = useUser()
  const { getVideo } = useContent()
  const [state, setState] = useState<QuizState>(() => {
    const v = getVideo(videoId)
    return startQuiz(v?.questions ?? [], v?.difficulty ?? 2)
  })
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [finished, setFinished] = useState(false)

  const q = quizCurrent(state)
  const total = quizTotal(state)

  function choose(idx: number) {
    if (showFeedback) return
    setSelected(idx)
    setShowFeedback(true)
  }

  function advance() {
    if (!q) return
    const wasCorrect = selected === q.correct
    const next = quizAnswer(state, wasCorrect)
    setSelected(null)
    setShowFeedback(false)
    if (quizFinished(next)) {
      markCompleted(videoId, next.correct, quizTotal(next))
      setFinished(true)
    }
    setState(next)
  }

  if (finished) {
    const passed = quizPassed(state)
    return (
      <div className="rounded-xl border border-[#E1D8C8] bg-[#FBF8F2] p-8 text-center space-y-3">
        <div className={`mx-auto grid place-items-center w-12 h-12 rounded-full ${passed ? 'bg-emerald-500/15 text-emerald-700' : 'bg-[#E1D8C8] text-[#4A4136]'}`}>
          {passed ? <Check className="w-6 h-6" /> : <Rewind className="w-6 h-6" />}
        </div>
        <div className="text-lg font-bold text-[#2B2620]">{passed ? 'Check-in passed' : 'Almost there'}</div>
        <div className="text-[#6E6459] text-sm">You got {state.correct} of {total} correct.</div>
        {!passed && (
          <>
            <div className="text-sm text-[#8A8071]">You need {PASS_THRESHOLD} correct. Rewatch and try again.</div>
            <button onClick={onRewatch} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#D8CCB9] hover:bg-[#F1EBDF] text-sm text-[#3A332B] transition">
              <Rewind className="w-4 h-4" /> Rewatch lesson
            </button>
          </>
        )}
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="rounded-xl border border-[#E1D8C8] bg-[#FBF8F2] shadow-warmSm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-[#8A8071] uppercase">
          Question {state.answered + 1} of {total}
        </span>
        <DifficultyDots level={q.difficulty} />
      </div>
      <div className="font-semibold text-lg text-[#2B2620]">{q.text}</div>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls = 'border-[#E1D8C8] bg-[#FBF8F2] text-[#3A332B] hover:border-[#C7B9A2] hover:bg-[#F1EBDF]'
          if (showFeedback) {
            if (idx === q.correct) cls = 'border-emerald-400/50 bg-emerald-500/10 text-[#2B2620]'
            else if (idx === selected) cls = 'border-red-400/50 bg-red-500/10 text-[#2B2620]'
            else cls = 'border-[#E1D8C8] text-[#8A8071] opacity-60'
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              disabled={showFeedback}
              className={`w-full text-left px-4 py-3 rounded-lg border transition ${cls}`}
            >
              <span className="flex items-center justify-between">
                {opt}
                {showFeedback && idx === q.correct && <Check className="w-4 h-4 text-emerald-700" />}
                {showFeedback && idx === selected && idx !== q.correct && <span className="text-red-600 font-semibold">×</span>}
              </span>
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div className="space-y-3 pt-1">
          <div className={`text-sm font-semibold ${selected === q.correct ? 'text-emerald-700' : 'text-amber-400'}`}>
            {selected === q.correct ? 'Correct' : 'Not quite'}
          </div>
          <p className="text-[#4A4136] text-sm leading-relaxed">{q.explanation}</p>
          {selected !== q.correct && (
            <button onClick={onRewatch} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-[#D8CCB9] hover:bg-[#F1EBDF] text-[#3A332B] transition">
              <Rewind className="w-4 h-4" /> Rewatch this lesson
            </button>
          )}
          <button
            onClick={advance}
            className="w-full py-2.5 rounded-md bg-[#2B2620] text-[#F4EFE6] font-semibold hover:bg-[#3D352B] transition"
          >
            {state.answered + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
