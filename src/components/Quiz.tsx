import { useState } from 'react'
import {
  startQuiz, quizCurrent, quizAnswer, quizFinished, quizPassed, quizTotal, PASS_THRESHOLD,
  type QuizState,
} from '../lib/store'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { DifficultyDots } from './StarRating'

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
      <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6 text-center space-y-3">
        <div className="text-5xl">{passed ? '🎉' : '🔁'}</div>
        <div className="text-xl font-bold text-white">{passed ? 'Nice work — check-in passed!' : 'Almost there'}</div>
        <div className="text-slate-400">You got {state.correct} of {total} correct.</div>
        {!passed && (
          <>
            <div className="text-sm text-slate-400">You need {PASS_THRESHOLD} correct. Rewatch and try again!</div>
            <button onClick={onRewatch} className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/5 text-sm text-slate-200">
              ↺ Rewatch lesson
            </button>
          </>
        )}
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-brand-300">
          Check-in · Question {state.answered + 1} of {total}
        </span>
        <DifficultyDots level={q.difficulty} />
      </div>
      <div className="font-semibold text-lg text-white">{q.text}</div>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls = 'border-white/10 bg-white/[0.03] text-slate-100 hover:border-brand-400 hover:bg-white/[0.06]'
          if (showFeedback) {
            if (idx === q.correct) cls = 'border-emerald-400/60 bg-emerald-500/15 text-white'
            else if (idx === selected) cls = 'border-red-400/60 bg-red-500/15 text-white'
            else cls = 'border-white/10 text-slate-400 opacity-60'
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              disabled={showFeedback}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${cls}`}
            >
              <span className="flex items-center justify-between">
                {opt}
                {showFeedback && idx === q.correct && <span className="text-green-500">✓</span>}
                {showFeedback && idx === selected && idx !== q.correct && <span className="text-red-500">✕</span>}
              </span>
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div className="space-y-3 pt-1">
          <div className={`font-semibold ${selected === q.correct ? 'text-emerald-400' : 'text-orange-400'}`}>
            {selected === q.correct ? '✓ Correct!' : 'ⓘ Not quite'}
          </div>
          <p className="text-slate-300 text-sm">{q.explanation}</p>
          {selected !== q.correct && (
            <button onClick={onRewatch} className="text-sm px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5 text-slate-200">
              ↺ Rewatch this lesson
            </button>
          )}
          <button
            onClick={advance}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition"
          >
            {state.answered + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
