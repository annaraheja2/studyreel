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
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center space-y-3">
        <div className={`mx-auto grid place-items-center w-12 h-12 rounded-full ${passed ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-slate-300'}`}>
          {passed ? <Check className="w-6 h-6" /> : <Rewind className="w-6 h-6" />}
        </div>
        <div className="text-lg font-bold text-white">{passed ? 'Check-in passed' : 'Almost there'}</div>
        <div className="text-slate-400 text-sm">You got {state.correct} of {total} correct.</div>
        {!passed && (
          <>
            <div className="text-sm text-slate-500">You need {PASS_THRESHOLD} correct. Rewatch and try again.</div>
            <button onClick={onRewatch} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-white/15 hover:bg-white/[0.05] text-sm text-slate-200 transition">
              <Rewind className="w-4 h-4" /> Rewatch lesson
            </button>
          </>
        )}
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Question {state.answered + 1} of {total}
        </span>
        <DifficultyDots level={q.difficulty} />
      </div>
      <div className="font-semibold text-lg text-white">{q.text}</div>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls = 'border-white/10 bg-white/[0.02] text-slate-200 hover:border-white/25 hover:bg-white/[0.05]'
          if (showFeedback) {
            if (idx === q.correct) cls = 'border-emerald-400/50 bg-emerald-500/10 text-white'
            else if (idx === selected) cls = 'border-red-400/50 bg-red-500/10 text-white'
            else cls = 'border-white/10 text-slate-500 opacity-60'
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
                {showFeedback && idx === q.correct && <Check className="w-4 h-4 text-emerald-400" />}
                {showFeedback && idx === selected && idx !== q.correct && <span className="text-red-400 font-semibold">×</span>}
              </span>
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div className="space-y-3 pt-1">
          <div className={`text-sm font-semibold ${selected === q.correct ? 'text-emerald-400' : 'text-amber-400'}`}>
            {selected === q.correct ? 'Correct' : 'Not quite'}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
          {selected !== q.correct && (
            <button onClick={onRewatch} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-white/15 hover:bg-white/[0.05] text-slate-200 transition">
              <Rewind className="w-4 h-4" /> Rewatch this lesson
            </button>
          )}
          <button
            onClick={advance}
            className="w-full py-2.5 rounded-md bg-white text-[#06070b] font-semibold hover:bg-slate-200 transition"
          >
            {state.answered + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
