import { type Course, SAMPLE as S } from '../types'

// Pre-Calculus course. One starter lesson + quiz per unit — expand anytime.
export const precalc: Course = {
  id: 'pre-calc',
  name: 'Pre-Calculus',
  description: 'Functions, trig, vectors, and a bridge to calculus — 10 units.',
  emoji: '🧮',
  units: [
    {
      id: 'pc-functions', name: 'Functions & Their Graphs', emoji: '📈',
      description: 'Domain, range, symmetry, and the vertical line test.',
      lessons: [{
        id: 'pc-functions-l1', title: 'Functions & Graphs',
        description: 'What makes a graph a function.',
        videoURL: S.a, difficulty: 2, tags: ['functions', 'graphs'],
        questions: [
          { text: 'The vertical line test checks if a graph is a:', options: ['Function', 'Line', 'Circle', 'Parabola'], correct: 0, explanation: 'If no vertical line hits it twice, it is a function.', difficulty: 2 },
          { text: 'f(x) = x². Find f(−3).', options: ['9', '−9', '6', '−6'], correct: 0, explanation: '(−3)² = 9.', difficulty: 2 },
          { text: 'The set of all outputs of a function is its:', options: ['Range', 'Domain', 'Slope', 'Vertex'], correct: 0, explanation: 'Outputs = range; inputs = domain.', difficulty: 3 },
          { text: 'An even function is symmetric about the:', options: ['y-axis', 'x-axis', 'origin', 'line y = x'], correct: 0, explanation: 'Even functions mirror across the y-axis.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-polyrational', name: 'Polynomial & Rational Functions', emoji: '➗',
      description: 'End behavior, roots, and asymptotes.',
      lessons: [{
        id: 'pc-polyrational-l1', title: 'Polynomials & Asymptotes',
        description: 'Degree, roots, and vertical asymptotes.',
        videoURL: S.b, difficulty: 3, tags: ['polynomials', 'rational'],
        questions: [
          { text: 'The degree of a polynomial is its:', options: ['Highest exponent', 'Constant term', 'Number of terms', 'Leading coefficient'], correct: 0, explanation: 'Degree = the largest exponent.', difficulty: 2 },
          { text: 'A vertical asymptote of a rational function occurs where the denominator is:', options: ['Zero', 'One', 'Negative', 'Largest'], correct: 0, explanation: 'Undefined points (denominator = 0) give vertical asymptotes.', difficulty: 3 },
          { text: 'The end behavior of a polynomial is set by its:', options: ['Leading term', 'Constant', 'Middle term', 'x-intercept'], correct: 0, explanation: 'The highest-degree term dominates for large x.', difficulty: 3 },
          { text: 'How many roots (with multiplicity) does a degree-3 polynomial have?', options: ['3', '1', '2', '6'], correct: 0, explanation: 'A degree-n polynomial has n roots.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-explog', name: 'Exponential & Logarithmic Functions', emoji: '⚡',
      description: 'e, natural logs, and log rules.',
      lessons: [{
        id: 'pc-explog-l1', title: 'Exponentials & Logs',
        description: 'The number e and logarithm rules.',
        videoURL: S.c, difficulty: 3, tags: ['exponential', 'logarithms'],
        questions: [
          { text: 'log_b(1) =', options: ['0', '1', 'b', 'undefined'], correct: 0, explanation: 'Any base to the 0 power is 1, so log_b(1) = 0.', difficulty: 2 },
          { text: 'e is approximately:', options: ['2.718', '3.14', '1.618', '2.0'], correct: 0, explanation: "Euler's number e ≈ 2.718.", difficulty: 3 },
          { text: 'ln(x) is a logarithm with base:', options: ['e', '10', '2', '1'], correct: 0, explanation: 'ln = natural log, base e.', difficulty: 3 },
          { text: 'log(ab) = log a + log b is the ___ rule.', options: ['Product', 'Quotient', 'Power', 'Chain'], correct: 0, explanation: 'The product rule turns multiplication into addition.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'pc-trig', name: 'Trigonometric Functions', emoji: '📐',
      description: 'The unit circle and identities.',
      lessons: [{
        id: 'pc-trig-l1', title: 'Unit Circle & Trig',
        description: 'Radians, key values, and periods.',
        videoURL: S.d, difficulty: 3, tags: ['trigonometry', 'unit-circle'],
        questions: [
          { text: 'A full revolution is ___ radians.', options: ['2π', 'π', 'π/2', '360'], correct: 0, explanation: 'One full circle = 2π radians.', difficulty: 2 },
          { text: 'cos(0) =', options: ['1', '0', '−1', 'π'], correct: 0, explanation: 'At angle 0, the x-coordinate is 1.', difficulty: 3 },
          { text: '180° in radians is:', options: ['π', '2π', 'π/2', '90'], correct: 0, explanation: '180° = π radians.', difficulty: 3 },
          { text: 'The period of sin(x) is:', options: ['2π', 'π', 'π/2', '1'], correct: 0, explanation: 'Sine repeats every 2π.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'pc-identities', name: 'Trigonometric Identities & Equations', emoji: '🔺',
      description: 'Pythagorean and other identities.',
      lessons: [{
        id: 'pc-identities-l1', title: 'Trig Identities',
        description: 'The identities that simplify trig expressions.',
        videoURL: S.e, difficulty: 4, tags: ['trigonometry', 'identities'],
        questions: [
          { text: 'The Pythagorean identity is:', options: ['sin²θ + cos²θ = 1', 'sin θ + cos θ = 1', 'tan²θ = 1', 'sin θ = cos θ'], correct: 0, explanation: 'sin²θ + cos²θ = 1 for all θ.', difficulty: 3 },
          { text: 'tan θ = ___ ÷ cos θ', options: ['sin θ', '1', 'cos θ', 'sec θ'], correct: 0, explanation: 'tan θ = sin θ / cos θ.', difficulty: 3 },
          { text: '1 + tan²θ =', options: ['sec²θ', 'csc²θ', 'cos²θ', '1'], correct: 0, explanation: 'A Pythagorean identity: 1 + tan²θ = sec²θ.', difficulty: 4 },
          { text: 'sin(−θ) =', options: ['−sin θ', 'sin θ', 'cos θ', '−cos θ'], correct: 0, explanation: 'Sine is an odd function.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-matrices', name: 'Systems & Matrices', emoji: '🔢',
      description: 'Determinants and matrix operations.',
      lessons: [{
        id: 'pc-matrices-l1', title: 'Matrices & Determinants',
        description: 'Determinants and the identity matrix.',
        videoURL: S.f, difficulty: 3, tags: ['matrices', 'systems'],
        questions: [
          { text: 'The determinant of [[a, b], [c, d]] is:', options: ['ad − bc', 'ab − cd', 'a + d', 'ac − bd'], correct: 0, explanation: 'For a 2×2 matrix, det = ad − bc.', difficulty: 3 },
          { text: 'The identity matrix has 1’s on the:', options: ['Main diagonal', 'First row', 'Last column', 'Corners'], correct: 0, explanation: '1’s down the diagonal, 0’s elsewhere.', difficulty: 3 },
          { text: 'Multiplying a matrix by the identity matrix gives:', options: ['The same matrix', 'Zero', 'The inverse', 'The transpose'], correct: 0, explanation: 'The identity leaves a matrix unchanged.', difficulty: 3 },
          { text: 'A system with more equations than unknowns may be:', options: ['Overdetermined', 'Underdetermined', 'Always solvable', 'Linear only'], correct: 0, explanation: 'More equations than unknowns = overdetermined.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'pc-sequences', name: 'Sequences, Series & Sigma Notation', emoji: '➕',
      description: 'Summation and convergence.',
      lessons: [{
        id: 'pc-sequences-l1', title: 'Series & Sigma Notation',
        description: 'The summation symbol and convergence.',
        videoURL: S.a, difficulty: 3, tags: ['series', 'sigma'],
        questions: [
          { text: 'The symbol Σ (sigma) means:', options: ['Sum', 'Product', 'Difference', 'Ratio'], correct: 0, explanation: 'Sigma denotes a sum.', difficulty: 2 },
          { text: 'Σ from i=1 to 3 of i =', options: ['6', '3', '9', '1'], correct: 0, explanation: '1 + 2 + 3 = 6.', difficulty: 3 },
          { text: 'An infinite geometric series converges when |r| is:', options: ['< 1', '> 1', '= 1', '> 0'], correct: 0, explanation: 'It converges only when the ratio is between −1 and 1.', difficulty: 4 },
          { text: 'The sum of an arithmetic series uses the ___ of the first and last terms.', options: ['Average × count', 'Product', 'Ratio', 'Max'], correct: 0, explanation: 'Sum = (average of endpoints) × number of terms.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-vectors', name: 'Vectors', emoji: '➡️',
      description: 'Magnitude, direction, and operations.',
      lessons: [{
        id: 'pc-vectors-l1', title: 'Vectors',
        description: 'Adding vectors and finding magnitude.',
        videoURL: S.b, difficulty: 3, tags: ['vectors'],
        questions: [
          { text: 'A vector has both magnitude and:', options: ['Direction', 'Color', 'Area', 'Mass only'], correct: 0, explanation: 'Vectors have size and direction.', difficulty: 2 },
          { text: 'The magnitude of vector ⟨3, 4⟩ is:', options: ['5', '7', '12', '1'], correct: 0, explanation: '√(3² + 4²) = √25 = 5.', difficulty: 3 },
          { text: 'Adding vectors ⟨1, 2⟩ + ⟨3, 4⟩ gives:', options: ['⟨4, 6⟩', '⟨3, 8⟩', '⟨4, 8⟩', '⟨2, 2⟩'], correct: 0, explanation: 'Add components: ⟨1+3, 2+4⟩ = ⟨4, 6⟩.', difficulty: 3 },
          { text: "A scalar multiplies a vector's:", options: ['Magnitude', 'Direction only', 'Angle', 'Name'], correct: 0, explanation: 'A scalar stretches/shrinks the magnitude.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-polar', name: 'Parametric & Polar Equations', emoji: '🌀',
      description: 'Polar coordinates and parameters.',
      lessons: [{
        id: 'pc-polar-l1', title: 'Parametric & Polar',
        description: 'Describing curves with (r, θ) and a parameter.',
        videoURL: S.c, difficulty: 3, tags: ['polar', 'parametric'],
        questions: [
          { text: 'Polar coordinates use (r, θ) where r is the:', options: ['Distance from origin', 'x-value', 'Slope', 'Area'], correct: 0, explanation: 'r is the distance from the origin.', difficulty: 2 },
          { text: 'In parametric equations, x and y are both functions of a:', options: ['Parameter (like t)', 'Constant', 'Slope', 'Vector'], correct: 0, explanation: 'A parameter (often t) drives both x and y.', difficulty: 3 },
          { text: 'To convert polar to rectangular, x =:', options: ['r cos θ', 'r sin θ', 'r + θ', 'r ÷ θ'], correct: 0, explanation: 'x = r cos θ.', difficulty: 3 },
          { text: 'y = r ___ θ', options: ['sin', 'cos', 'tan', 'sec'], correct: 0, explanation: 'y = r sin θ.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'pc-limits', name: 'Limits & Intro to Calculus', emoji: '📉',
      description: 'Limits and the idea of a derivative (optional).',
      lessons: [{
        id: 'pc-limits-l1', title: 'Limits',
        description: 'The foundation of calculus.',
        videoURL: S.d, difficulty: 4, tags: ['limits', 'calculus'],
        questions: [
          { text: 'A limit describes the value a function ___ as x approaches a point.', options: ['Approaches', 'Equals exactly', 'Skips', 'Multiplies'], correct: 0, explanation: 'A limit is the value the function heads toward.', difficulty: 2 },
          { text: 'lim(x→2) of (x + 3) =', options: ['5', '2', '3', '6'], correct: 0, explanation: 'Substitute: 2 + 3 = 5.', difficulty: 3 },
          { text: 'The slope of a curve at a point is found using the:', options: ['Derivative', 'Integral', 'Midpoint', 'Area'], correct: 0, explanation: 'The derivative gives instantaneous slope.', difficulty: 3 },
          { text: 'lim(x→0) of x² =', options: ['0', '1', '∞', 'undefined'], correct: 0, explanation: '0² = 0.', difficulty: 4 },
        ],
      }],
    },
  ],
}
