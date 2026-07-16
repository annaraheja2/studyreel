import { useState } from 'react'
import {
  startQuiz, quizCurrent, quizAnswer, quizFinished, quizPassed, quizTotal, PASS_THRESHOLD,
  type QuizState,
} from '../lib/store'
import { useUser } from '../lib/UserContext'
import { DifficultyDots } from './StarRating'

// Adaptive 3-question check-in with instant feedback.
export default function Quiz({ videoId, onRewatch }: { videoId: string; onRewatch: () => void }) {
  const { markCompleted } = useUser()
  const [state, setState] = useState<QuizState>(() => startQuiz(videoId))
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
      <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center space-y-3">
        <div className="text-5xl">{passed ? '🎉' : '🔁'}</div>
        <div className="text-xl font-bold">{passed ? 'Nice work — check-in passed!' : 'Almost there'}</div>
        <div className="text-slate-500">You got {state.correct} of {total} correct.</div>
        {!passed && (
          <>
            <div className="text-sm text-slate-500">You need {PASS_THRESHOLD} correct. Rewatch and try again!</div>
            <button onClick={onRewatch} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm">
              ↺ Rewatch lesson
            </button>
          </>
        )}
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-brand-600">
          Check-in · Question {state.answered + 1} of {total}
        </span>
        <DifficultyDots level={q.difficulty} />
      </div>
      <div className="font-semibold text-lg">{q.text}</div>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let cls = 'border-slate-200 hover:border-brand-400'
          if (showFeedback) {
            if (idx === q.correct) cls = 'border-green-400 bg-green-50'
            else if (idx === selected) cls = 'border-red-400 bg-red-50'
            else cls = 'border-slate-200 opacity-60'
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
          <div className={`font-semibold ${selected === q.correct ? 'text-green-600' : 'text-orange-500'}`}>
            {selected === q.correct ? '✓ Correct!' : 'ⓘ Not quite'}
          </div>
          <p className="text-slate-600 text-sm">{q.explanation}</p>
          {selected !== q.correct && (
            <button onClick={onRewatch} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50">
              ↺ Rewatch this lesson
            </button>
          )}
          <button
            onClick={advance}
            className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700"
          >
            {state.answered + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
