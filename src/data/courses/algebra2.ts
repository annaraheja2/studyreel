import { type Course, SAMPLE as S } from '../types'

// Algebra 2 course. One starter lesson + quiz per unit — expand anytime.
export const algebra2: Course = {
  id: 'algebra-2',
  name: 'Algebra 2',
  description: 'Functions, polynomials, logs, sequences, and intro trig — 10 units.',
  emoji: '📘',
  units: [
    {
      id: 'a2-absvalue', name: 'Linear & Absolute Value Functions', emoji: '📉',
      description: 'Lines and V-shaped absolute value graphs.',
      lessons: [{
        id: 'a2-absvalue-l1', title: 'Absolute Value Functions',
        description: 'Distance from zero and V-shaped graphs.',
        videoURL: S.a, difficulty: 2, tags: ['absolute-value', 'functions'],
        questions: [
          { text: 'The graph of y = |x| looks like a:', options: ['V shape', 'Straight line', 'Parabola', 'Circle'], correct: 0, explanation: 'Absolute value graphs form a V.', difficulty: 2 },
          { text: '|−5| =', options: ['5', '−5', '0', '25'], correct: 0, explanation: 'Absolute value is distance from 0: 5.', difficulty: 1 },
          { text: 'The vertex of y = |x| is at:', options: ['(0, 0)', '(1, 1)', '(0, 1)', '(−1, 0)'], correct: 0, explanation: 'The V bottoms out at the origin.', difficulty: 3 },
          { text: 'y = |x| + 2 shifts the graph:', options: ['Up 2', 'Down 2', 'Right 2', 'Left 2'], correct: 0, explanation: 'Adding 2 outside shifts up.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-matrices', name: 'Systems & Matrices', emoji: '🔢',
      description: 'Solving systems using matrices.',
      lessons: [{
        id: 'a2-matrices-l1', title: 'Intro to Matrices',
        description: 'Rows, columns, and solving systems.',
        videoURL: S.b, difficulty: 3, tags: ['matrices', 'systems'],
        questions: [
          { text: 'A matrix is a rectangular array of:', options: ['Numbers', 'Lines', 'Angles', 'Points'], correct: 0, explanation: 'Matrices hold numbers in rows and columns.', difficulty: 2 },
          { text: 'The dimensions of a matrix are given as:', options: ['rows × columns', 'columns × rows', 'area', 'x × y'], correct: 0, explanation: 'Always rows first, then columns.', difficulty: 3 },
          { text: 'A 2×3 matrix has 2 rows and:', options: ['3 columns', '2 columns', '6 columns', '3 rows'], correct: 0, explanation: '2 rows, 3 columns.', difficulty: 3 },
          { text: 'Systems can be solved with matrices using:', options: ['Row operations', 'Guessing', 'Factoring', 'Slope'], correct: 0, explanation: 'Row reduction / operations solve systems.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-quadratics', name: 'Quadratic Functions', emoji: '🎢',
      description: 'Transformations and complex roots.',
      lessons: [{
        id: 'a2-quadratics-l1', title: 'Quadratics & Complex Roots',
        description: 'Shifting parabolas and imaginary numbers.',
        videoURL: S.c, difficulty: 3, tags: ['quadratics', 'complex'],
        questions: [
          { text: 'y = (x − 3)² shifts y = x²:', options: ['Right 3', 'Left 3', 'Up 3', 'Down 3'], correct: 0, explanation: '(x − 3) shifts right by 3.', difficulty: 2 },
          { text: '√(−1) is defined as:', options: ['i', '1', '−1', '0'], correct: 0, explanation: 'The imaginary unit i = √(−1).', difficulty: 3 },
          { text: 'i² =', options: ['−1', '1', 'i', '0'], correct: 0, explanation: 'By definition, i² = −1.', difficulty: 3 },
          { text: 'If the discriminant is negative, the roots are:', options: ['Complex', 'Two real', 'Rational', 'Zero'], correct: 0, explanation: 'A negative discriminant → complex roots.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'a2-polynomials', name: 'Polynomials', emoji: '➗',
      description: 'Division, synthetic division, and theorems.',
      lessons: [{
        id: 'a2-polynomials-l1', title: 'Polynomial Division & Theorems',
        description: 'The Remainder and Factor Theorems.',
        videoURL: S.d, difficulty: 3, tags: ['polynomials', 'division'],
        questions: [
          { text: 'The degree of 3x⁴ + x is:', options: ['4', '3', '1', '5'], correct: 0, explanation: 'Degree = highest exponent = 4.', difficulty: 2 },
          { text: 'The Remainder Theorem says the remainder of f(x) ÷ (x − 2) equals:', options: ['f(2)', 'f(0)', '2', '0'], correct: 0, explanation: 'Plug in x = 2 to get the remainder.', difficulty: 3 },
          { text: 'Synthetic division is a shortcut for dividing by:', options: ['x − a (a linear factor)', 'x²', 'a constant', 'two variables'], correct: 0, explanation: 'It works for linear divisors x − a.', difficulty: 3 },
          { text: 'If (x − 3) is a factor of f(x), then f(3) =:', options: ['0', '3', '1', '−3'], correct: 0, explanation: 'Factor Theorem: a factor gives a zero.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-rational', name: 'Rational Expressions & Functions', emoji: '➗',
      description: 'Fractions with polynomials.',
      lessons: [{
        id: 'a2-rational-l1', title: 'Rational Expressions',
        description: 'Simplifying and excluded values.',
        videoURL: S.e, difficulty: 3, tags: ['rational', 'expressions'],
        questions: [
          { text: 'A rational expression is a ratio of two:', options: ['Polynomials', 'Angles', 'Integers only', 'Lines'], correct: 0, explanation: 'It is one polynomial divided by another.', difficulty: 2 },
          { text: 'x / x simplifies to (x ≠ 0):', options: ['1', '0', 'x', 'x²'], correct: 0, explanation: 'Anything over itself is 1.', difficulty: 3 },
          { text: 'A value that makes the denominator 0 is:', options: ['Excluded (undefined)', 'The answer', 'The slope', 'A zero of the top'], correct: 0, explanation: 'You cannot divide by zero, so it is excluded.', difficulty: 3 },
          { text: '(x² − 1)/(x − 1) simplifies to (x ≠ 1):', options: ['x + 1', 'x − 1', 'x', '1'], correct: 0, explanation: '(x−1)(x+1)/(x−1) = x + 1.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'a2-radical', name: 'Radical Functions', emoji: '√',
      description: 'Square roots and radical graphs.',
      lessons: [{
        id: 'a2-radical-l1', title: 'Radical Functions',
        description: 'Graphs and solving radical equations.',
        videoURL: S.f, difficulty: 3, tags: ['radicals', 'functions'],
        questions: [
          { text: '√25 =', options: ['5', '25', '±5', '12.5'], correct: 0, explanation: 'The principal square root of 25 is 5.', difficulty: 1 },
          { text: 'The graph of y = √x starts at:', options: ['(0, 0)', '(1, 1)', '(0, 1)', '(−1, 0)'], correct: 0, explanation: 'It begins at the origin and curves right.', difficulty: 2 },
          { text: '√x is real only when x is:', options: ['≥ 0', '< 0', 'any number', '= 1'], correct: 0, explanation: 'You cannot take a real square root of a negative.', difficulty: 3 },
          { text: 'To solve √x = 4, you:', options: ['Square both sides → x = 16', 'Divide by 2', 'Add 4', 'Take √ again'], correct: 0, explanation: 'Squaring gives x = 16.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-explog', name: 'Exponential & Logarithmic Functions', emoji: '⚡',
      description: 'Growth, decay, and logarithms.',
      lessons: [{
        id: 'a2-explog-l1', title: 'Logarithms',
        description: 'Logs as the inverse of exponentials.',
        videoURL: S.a, difficulty: 3, tags: ['logarithms', 'exponential'],
        questions: [
          { text: 'A logarithm is the inverse of a(n):', options: ['Exponential', 'Line', 'Parabola', 'Radical'], correct: 0, explanation: 'Logs undo exponentials.', difficulty: 2 },
          { text: 'log₂ 8 =', options: ['3', '2', '8', '4'], correct: 0, explanation: '2³ = 8, so the log is 3.', difficulty: 3 },
          { text: 'log₁₀ 100 =', options: ['2', '10', '100', '3'], correct: 0, explanation: '10² = 100, so the log is 2.', difficulty: 3 },
          { text: 'If 10ˣ = 1000, then x =:', options: ['3', '2', '100', '10'], correct: 0, explanation: '10³ = 1000.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'a2-sequences', name: 'Sequences & Series', emoji: '🔢',
      description: 'Arithmetic and geometric patterns.',
      lessons: [{
        id: 'a2-sequences-l1', title: 'Arithmetic & Geometric',
        description: 'Common differences and common ratios.',
        videoURL: S.b, difficulty: 2, tags: ['sequences', 'series'],
        questions: [
          { text: 'In an arithmetic sequence, each term adds a constant:', options: ['Difference', 'Ratio', 'Square', 'Power'], correct: 0, explanation: 'Arithmetic = add a common difference.', difficulty: 2 },
          { text: '2, 5, 8, 11, … the common difference is:', options: ['3', '2', '5', '1'], correct: 0, explanation: 'Each term is 3 more than the last.', difficulty: 2 },
          { text: 'In a geometric sequence, each term multiplies by a common:', options: ['Ratio', 'Difference', 'Sum', 'Angle'], correct: 0, explanation: 'Geometric = multiply by a common ratio.', difficulty: 3 },
          { text: '3, 6, 12, 24, … the common ratio is:', options: ['2', '3', '6', '1/2'], correct: 0, explanation: 'Each term doubles: ratio 2.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-stats', name: 'Probability & Statistics', emoji: '📊',
      description: 'Center, spread, and probability.',
      lessons: [{
        id: 'a2-stats-l1', title: 'Center & Probability',
        description: 'Mean, median, mode, and basic probability.',
        videoURL: S.c, difficulty: 2, tags: ['statistics', 'probability'],
        questions: [
          { text: 'The mean is the:', options: ['Average', 'Middle value', 'Most frequent', 'Range'], correct: 0, explanation: 'Mean = sum ÷ count = average.', difficulty: 1 },
          { text: 'The median is the:', options: ['Middle value', 'Average', 'Most frequent', 'Largest'], correct: 0, explanation: 'The median is the middle of ordered data.', difficulty: 2 },
          { text: 'The mode is the:', options: ['Most frequent value', 'Average', 'Middle', 'Spread'], correct: 0, explanation: 'The mode appears most often.', difficulty: 2 },
          { text: 'Probability of rolling a 4 on a fair die is:', options: ['1/6', '1/4', '4/6', '1/2'], correct: 0, explanation: 'One favorable outcome out of six.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'a2-trig', name: 'Trigonometric Functions', emoji: '📐',
      description: 'Intro to the unit circle.',
      lessons: [{
        id: 'a2-trig-l1', title: 'Unit Circle Intro',
        description: 'Sine and cosine on the unit circle.',
        videoURL: S.d, difficulty: 3, tags: ['trigonometry', 'unit-circle'],
        questions: [
          { text: 'The unit circle has radius:', options: ['1', '2', 'π', '0'], correct: 0, explanation: 'A unit circle has radius 1.', difficulty: 2 },
          { text: 'On the unit circle, cos θ is the:', options: ['x-coordinate', 'y-coordinate', 'radius', 'angle'], correct: 0, explanation: 'cos θ = x, sin θ = y.', difficulty: 3 },
          { text: 'sin θ is the ___ on the unit circle.', options: ['y-coordinate', 'x-coordinate', 'slope', 'diameter'], correct: 0, explanation: 'sin θ is the y-coordinate.', difficulty: 3 },
          { text: 'sin(0°) =', options: ['0', '1', '−1', '90'], correct: 0, explanation: 'At 0°, the y-coordinate is 0.', difficulty: 3 },
        ],
      }],
    },
  ],
}
