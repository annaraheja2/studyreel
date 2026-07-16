// ============================================================
//   📼  HOW TO ADD YOUR OWN VIDEOS — edit only this file
// ============================================================
//
//   Content is grouped into UNITS. One unit = one topic with
//   its lessons. Everything the app shows comes from `UNITS`.
//
//   videoURL can be:
//    • a web link:  "https://.../lesson.mp4"
//    • a file in the "public/videos" folder: "videos/myfile.mp4"
//
//   To add a LESSON: copy a lesson object into a unit's `lessons`.
//   To add a UNIT: copy a whole unit object.
//   Give each lesson 3–5 quiz questions of mixed difficulty
//   (1 = easy … 5 = hard); the app serves 3 adaptively.
// ============================================================

export interface Question {
  text: string
  options: string[]
  correct: number // index of the correct option (0-based)
  explanation: string
  difficulty: number // 1..5
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoURL: string
  difficulty: number
  tags: string[]
  questions: Question[]
}

export interface Unit {
  id: string
  name: string
  description: string
  emoji: string
  lessons: Lesson[]
}

// Placeholder sample clips so the site works immediately.
// Replace each videoURL with your own link or a file in public/videos.
const S = {
  a: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  b: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  c: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  d: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  e: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  f: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
}

const ALGEBRA1_UNITS: Unit[] = [
  {
    id: 'u1-foundations', name: 'Foundations of Algebra', emoji: '🧮',
    description: 'Variables, expressions, and order of operations.',
    lessons: [
      {
        id: 'u1-variables', title: 'Variables & Expressions',
        description: 'Letters that stand in for numbers, and how to write expressions.',
        videoURL: S.a, difficulty: 1, tags: ['variables', 'expressions'],
        questions: [
          { text: 'Which is the variable in 3x + 5?', options: ['x', '3', '5', '+'], correct: 0, explanation: 'A variable is a letter that represents an unknown value — here it is x.', difficulty: 1 },
          { text: 'Write "a number n increased by 7" as an expression.', options: ['n + 7', '7n', 'n − 7', '7 − n'], correct: 0, explanation: '"Increased by" means add: n + 7.', difficulty: 1 },
          { text: 'What is the coefficient of x in 8x − 2?', options: ['8', 'x', '−2', '2'], correct: 0, explanation: 'The coefficient is the number multiplying the variable: 8.', difficulty: 2 },
          { text: '"The product of 4 and y" is written:', options: ['4y', '4 + y', 'y ÷ 4', 'y − 4'], correct: 0, explanation: '"Product" means multiply: 4 × y = 4y.', difficulty: 2 },
        ],
      },
      {
        id: 'u1-evaluate', title: 'Evaluating Expressions',
        description: 'Plug in a value for the variable and simplify.',
        videoURL: S.b, difficulty: 2, tags: ['expressions', 'substitution'],
        questions: [
          { text: 'Evaluate 2x when x = 5.', options: ['10', '7', '25', '2'], correct: 0, explanation: '2 × 5 = 10.', difficulty: 1 },
          { text: 'Evaluate 3a + 4 when a = 2.', options: ['10', '14', '9', '20'], correct: 0, explanation: '3 × 2 + 4 = 6 + 4 = 10.', difficulty: 2 },
          { text: 'Evaluate 5(n − 1) when n = 4.', options: ['15', '20', '19', '9'], correct: 0, explanation: '5 × (4 − 1) = 5 × 3 = 15.', difficulty: 3 },
          { text: 'Evaluate x² + 1 when x = 3.', options: ['10', '7', '9', '6'], correct: 0, explanation: '3² + 1 = 9 + 1 = 10.', difficulty: 3 },
        ],
      },
      {
        id: 'u1-order', title: 'Order of Operations (PEMDAS)',
        description: 'Parentheses, exponents, multiply/divide, add/subtract.',
        videoURL: S.c, difficulty: 2, tags: ['order-of-operations', 'pemdas'],
        questions: [
          { text: 'Simplify: 2 + 3 × 4', options: ['14', '20', '24', '9'], correct: 0, explanation: 'Multiply first: 3 × 4 = 12, then 2 + 12 = 14.', difficulty: 1 },
          { text: 'Simplify: (6 + 2) × 3', options: ['24', '12', '20', '18'], correct: 0, explanation: 'Parentheses first: 8 × 3 = 24.', difficulty: 2 },
          { text: 'Simplify: 10 − 2²', options: ['6', '64', '16', '8'], correct: 0, explanation: 'Exponent first: 2² = 4, then 10 − 4 = 6.', difficulty: 2 },
          { text: 'Simplify: 12 ÷ (2 + 4) × 3', options: ['6', '2', '18', '1'], correct: 0, explanation: '12 ÷ 6 = 2, then 2 × 3 = 6.', difficulty: 3 },
        ],
      },
    ],
  },
  {
    id: 'u2-linear-eq', name: 'Solving Linear Equations', emoji: '⚖️',
    description: 'From one-step to multi-step equations.',
    lessons: [
      {
        id: 'u2-onestep', title: 'One-Step Equations',
        description: 'Undo one operation to isolate the variable.',
        videoURL: S.d, difficulty: 1, tags: ['equations', 'one-step'],
        questions: [
          { text: 'Solve: x + 4 = 9', options: ['x = 5', 'x = 13', 'x = 4', 'x = 36'], correct: 0, explanation: 'Subtract 4 from both sides: x = 5.', difficulty: 1 },
          { text: 'Solve: x − 3 = 7', options: ['x = 10', 'x = 4', 'x = 21', 'x = −10'], correct: 0, explanation: 'Add 3 to both sides: x = 10.', difficulty: 1 },
          { text: 'Solve: 5x = 20', options: ['x = 4', 'x = 15', 'x = 100', 'x = 25'], correct: 0, explanation: 'Divide both sides by 5: x = 4.', difficulty: 2 },
          { text: 'Solve: x ÷ 2 = 6', options: ['x = 12', 'x = 3', 'x = 8', 'x = 4'], correct: 0, explanation: 'Multiply both sides by 2: x = 12.', difficulty: 2 },
        ],
      },
      {
        id: 'u2-twostep', title: 'Two-Step Equations',
        description: 'Undo two operations in the right order.',
        videoURL: S.e, difficulty: 2, tags: ['equations', 'two-step'],
        questions: [
          { text: 'Solve: 2x + 3 = 11', options: ['x = 4', 'x = 7', 'x = 5', 'x = 8'], correct: 0, explanation: 'Subtract 3 → 2x = 8, divide by 2 → x = 4.', difficulty: 2 },
          { text: 'Solve: 3x − 5 = 10', options: ['x = 5', 'x = 15', 'x = 3', 'x = 2'], correct: 0, explanation: 'Add 5 → 3x = 15, divide by 3 → x = 5.', difficulty: 2 },
          { text: 'Solve: x ÷ 3 + 2 = 6', options: ['x = 12', 'x = 4', 'x = 24', 'x = 8'], correct: 0, explanation: 'Subtract 2 → x/3 = 4, multiply by 3 → x = 12.', difficulty: 3 },
          { text: 'Solve: 4x + 7 = 7', options: ['x = 0', 'x = 3.5', 'x = 1', 'x = −3.5'], correct: 0, explanation: 'Subtract 7 → 4x = 0, so x = 0.', difficulty: 3 },
        ],
      },
      {
        id: 'u2-multistep', title: 'Multi-Step Equations',
        description: 'Distribute, combine like terms, variables on both sides.',
        videoURL: S.f, difficulty: 3, tags: ['equations', 'multi-step'],
        questions: [
          { text: 'Solve: 2(x + 3) = 14', options: ['x = 4', 'x = 7', 'x = 5', 'x = 10'], correct: 0, explanation: 'Divide by 2 → x + 3 = 7, subtract 3 → x = 4.', difficulty: 3 },
          { text: 'Solve: 5x − 2 = 3x + 8', options: ['x = 5', 'x = 3', 'x = 10', 'x = 6'], correct: 0, explanation: 'Subtract 3x → 2x − 2 = 8, add 2 → 2x = 10, x = 5.', difficulty: 3 },
          { text: 'Solve: 3(x − 1) = 2x + 4', options: ['x = 7', 'x = 1', 'x = 5', 'x = 3'], correct: 0, explanation: '3x − 3 = 2x + 4 → x = 7.', difficulty: 4 },
          { text: 'Solve: 4x + 2 = 2(x + 7)', options: ['x = 6', 'x = 3', 'x = 8', 'x = 4'], correct: 0, explanation: '4x + 2 = 2x + 14 → 2x = 12 → x = 6.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u3-inequalities', name: 'Linear Inequalities', emoji: '📉',
    description: 'Solving and graphing inequalities.',
    lessons: [
      {
        id: 'u3-solving', title: 'Solving Inequalities',
        description: 'Like equations — but flip the sign when you divide by a negative.',
        videoURL: S.a, difficulty: 2, tags: ['inequalities', 'solving'],
        questions: [
          { text: 'Solve: x + 3 > 5', options: ['x > 2', 'x < 2', 'x > 8', 'x < 8'], correct: 0, explanation: 'Subtract 3 from both sides: x > 2.', difficulty: 1 },
          { text: 'Solve: 2x < 10', options: ['x < 5', 'x > 5', 'x < 20', 'x > 20'], correct: 0, explanation: 'Divide by 2 (positive): x < 5.', difficulty: 2 },
          { text: 'Solve: −2x < 6', options: ['x > −3', 'x < −3', 'x > 3', 'x < 3'], correct: 0, explanation: 'Divide by −2 and FLIP the sign: x > −3.', difficulty: 3 },
          { text: 'Solve: 3x − 1 ≥ 8', options: ['x ≥ 3', 'x ≤ 3', 'x ≥ 9', 'x ≥ 2'], correct: 0, explanation: 'Add 1 → 3x ≥ 9, divide by 3 → x ≥ 3.', difficulty: 3 },
        ],
      },
      {
        id: 'u3-graphing', title: 'Graphing Inequalities',
        description: 'Open vs. closed circles and which way the arrow points.',
        videoURL: S.b, difficulty: 2, tags: ['inequalities', 'graphing'],
        questions: [
          { text: 'On a number line, x > 2 is shown with:', options: ['An open circle at 2, arrow right', 'A closed circle at 2', 'Open circle, arrow left', 'A dot only'], correct: 0, explanation: '> uses an open circle (2 not included) and points right (greater).', difficulty: 1 },
          { text: 'x ≤ 5 is shown with:', options: ['A closed circle at 5, arrow left', 'An open circle at 5', 'Closed circle, arrow right', 'No circle'], correct: 0, explanation: '≤ uses a closed circle (5 included) and points left (less).', difficulty: 2 },
          { text: 'Which inequality means "x is at least 4"?', options: ['x ≥ 4', 'x > 4', 'x ≤ 4', 'x < 4'], correct: 0, explanation: '"At least" means 4 or more: x ≥ 4.', difficulty: 2 },
          { text: 'A closed dot at −1 with an arrow pointing right means:', options: ['x ≥ −1', 'x > −1', 'x ≤ −1', 'x < −1'], correct: 0, explanation: 'Closed dot = included (≥), arrow right = greater.', difficulty: 3 },
        ],
      },
    ],
  },
  {
    id: 'u4-functions', name: 'Functions & Relations', emoji: '🔗',
    description: 'Function notation, domain, and range.',
    lessons: [
      {
        id: 'u4-notation', title: 'Relations & Function Notation',
        description: 'What makes a relation a function, and how f(x) works.',
        videoURL: S.c, difficulty: 2, tags: ['functions', 'notation'],
        questions: [
          { text: 'If f(x) = 2x, what is f(3)?', options: ['6', '5', '2', '9'], correct: 0, explanation: 'Replace x with 3: 2 × 3 = 6.', difficulty: 1 },
          { text: 'f(x) = x + 4. Find f(0).', options: ['4', '0', '1', '−4'], correct: 0, explanation: '0 + 4 = 4.', difficulty: 2 },
          { text: 'A relation is a function if each input has:', options: ['Exactly one output', 'Many outputs', 'No output', 'Two outputs'], correct: 0, explanation: 'A function assigns exactly one output to each input.', difficulty: 2 },
          { text: 'f(x) = 3x − 1. Find f(2).', options: ['5', '6', '2', '7'], correct: 0, explanation: '3 × 2 − 1 = 6 − 1 = 5.', difficulty: 3 },
        ],
      },
      {
        id: 'u4-domain-range', title: 'Domain & Range',
        description: 'The set of inputs and the set of outputs.',
        videoURL: S.d, difficulty: 3, tags: ['functions', 'domain', 'range'],
        questions: [
          { text: 'The domain of a function is the set of all:', options: ['Inputs (x-values)', 'Outputs (y-values)', 'Slopes', 'Points'], correct: 0, explanation: 'Domain = all the input (x) values.', difficulty: 2 },
          { text: 'The range is the set of all:', options: ['Outputs (y-values)', 'Inputs (x-values)', 'Origins', 'Zeros'], correct: 0, explanation: 'Range = all the output (y) values.', difficulty: 2 },
          { text: 'For {(1,2), (3,4), (5,6)}, the domain is:', options: ['{1, 3, 5}', '{2, 4, 6}', '{1,2,3,4,5,6}', '{6}'], correct: 0, explanation: 'Domain is the first number of each pair: {1, 3, 5}.', difficulty: 3 },
          { text: 'For {(1,2), (3,4), (5,6)}, the range is:', options: ['{2, 4, 6}', '{1, 3, 5}', '{2}', '{1,3,5,2,4,6}'], correct: 0, explanation: 'Range is the second number of each pair: {2, 4, 6}.', difficulty: 3 },
        ],
      },
    ],
  },
  {
    id: 'u5-linear-fn', name: 'Linear Functions', emoji: '📈',
    description: 'Slope, intercepts, and graphing lines.',
    lessons: [
      {
        id: 'u5-slope', title: 'Slope',
        description: 'Rise over run — how steep a line is.',
        videoURL: S.e, difficulty: 2, tags: ['slope', 'linear'],
        questions: [
          { text: 'Slope between (0,0) and (2,4) is:', options: ['2', '1/2', '4', '−2'], correct: 0, explanation: 'Rise/run = 4/2 = 2.', difficulty: 2 },
          { text: 'The slope formula is:', options: ['(y₂ − y₁) / (x₂ − x₁)', '(x₂ − x₁) / (y₂ − y₁)', 'x / y', 'y · x'], correct: 0, explanation: 'Slope = change in y over change in x.', difficulty: 2 },
          { text: 'Slope between (1,3) and (4,9):', options: ['2', '3', '6', '1/2'], correct: 0, explanation: '(9 − 3)/(4 − 1) = 6/3 = 2.', difficulty: 3 },
          { text: 'A horizontal line has slope:', options: ['0', '1', 'Undefined', '−1'], correct: 0, explanation: 'No rise, so slope = 0.', difficulty: 3 },
        ],
      },
      {
        id: 'u5-intercepts', title: 'Intercepts',
        description: 'Where a line crosses the x- and y-axes.',
        videoURL: S.f, difficulty: 2, tags: ['intercepts', 'linear'],
        questions: [
          { text: 'In y = 2x + 5, the y-intercept is:', options: ['5', '2', '−5', '0'], correct: 0, explanation: 'In y = mx + b, b is the y-intercept: 5.', difficulty: 2 },
          { text: 'The y-intercept is where the line crosses the:', options: ['y-axis', 'x-axis', 'origin only', 'slope'], correct: 0, explanation: 'y-intercept is on the y-axis (where x = 0).', difficulty: 2 },
          { text: 'In y = 3x − 6, the x-intercept (set y = 0) is x =:', options: ['2', '−6', '6', '−2'], correct: 0, explanation: '0 = 3x − 6 → 3x = 6 → x = 2.', difficulty: 3 },
          { text: 'y = −x + 4. The y-intercept is:', options: ['4', '−1', '−4', '1'], correct: 0, explanation: 'b = 4.', difficulty: 3 },
        ],
      },
      {
        id: 'u5-graphing', title: 'Graphing Lines',
        description: 'Using slope-intercept form to draw a line.',
        videoURL: S.a, difficulty: 3, tags: ['graphing', 'linear'],
        questions: [
          { text: 'Slope-intercept form is:', options: ['y = mx + b', 'y = b + mx²', 'x = my + b', 'y = m ÷ x'], correct: 0, explanation: 'y = mx + b, where m is slope and b is the y-intercept.', difficulty: 2 },
          { text: 'In y = mx + b, m is the:', options: ['Slope', 'y-intercept', 'x-intercept', 'constant only'], correct: 0, explanation: 'm is the slope.', difficulty: 3 },
          { text: 'To graph y = 2x + 1, start at (0,1) then go:', options: ['Up 2, right 1', 'Up 1, right 2', 'Down 2, right 1', 'Right only'], correct: 0, explanation: 'Slope 2 = 2/1 → up 2, right 1.', difficulty: 3 },
          { text: 'A line through (0,3) with slope −1 is:', options: ['y = −x + 3', 'y = x + 3', 'y = −x − 3', 'y = 3x'], correct: 0, explanation: 'm = −1, b = 3 → y = −x + 3.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u6-systems', name: 'Systems of Equations', emoji: '🔀',
    description: 'Graphing, substitution, and elimination.',
    lessons: [
      {
        id: 'u6-graphing', title: 'Solving by Graphing',
        description: 'The solution is where the lines cross.',
        videoURL: S.b, difficulty: 2, tags: ['systems', 'graphing'],
        questions: [
          { text: 'The solution to a system is where the lines:', options: ['Intersect', 'Are parallel', 'Start', 'Have the same slope'], correct: 0, explanation: 'The intersection point satisfies both equations.', difficulty: 2 },
          { text: 'If two lines are parallel, the system has:', options: ['No solution', 'One solution', 'Infinite solutions', 'x = 0'], correct: 0, explanation: 'Parallel lines never cross → no solution.', difficulty: 3 },
          { text: 'If both equations are the same line, there are:', options: ['Infinite solutions', 'No solution', 'One solution', 'Two solutions'], correct: 0, explanation: 'Every point is shared → infinitely many solutions.', difficulty: 3 },
          { text: 'A system with exactly one intersection point has:', options: ['One solution', 'No solution', 'Infinite solutions', 'Zero'], correct: 0, explanation: 'One crossing point = one solution.', difficulty: 2 },
        ],
      },
      {
        id: 'u6-substitution', title: 'Substitution',
        description: 'Solve for one variable, then plug it in.',
        videoURL: S.c, difficulty: 3, tags: ['systems', 'substitution'],
        questions: [
          { text: 'If y = x and x + y = 8, then x =:', options: ['4', '8', '0', '2'], correct: 0, explanation: 'x + x = 8 → 2x = 8 → x = 4.', difficulty: 3 },
          { text: 'If y = 2x and x + y = 9, then x =:', options: ['3', '9', '4.5', '6'], correct: 0, explanation: 'x + 2x = 9 → 3x = 9 → x = 3.', difficulty: 3 },
          { text: 'If y = x + 1 and x + y = 5, then x =:', options: ['2', '3', '1', '4'], correct: 0, explanation: 'x + (x + 1) = 5 → 2x + 1 = 5 → x = 2.', difficulty: 4 },
          { text: 'Substitution works best when:', options: ['One variable is already isolated', 'Both are squared', 'There are no variables', 'Lines are parallel'], correct: 0, explanation: 'It is easiest when a variable is alone on one side.', difficulty: 3 },
        ],
      },
      {
        id: 'u6-elimination', title: 'Elimination',
        description: 'Add or subtract equations to cancel a variable.',
        videoURL: S.d, difficulty: 3, tags: ['systems', 'elimination'],
        questions: [
          { text: 'x + y = 10 and x − y = 2. Add them: 2x = 12, so x =:', options: ['6', '12', '5', '4'], correct: 0, explanation: '2x = 12 → x = 6.', difficulty: 3 },
          { text: 'Using x = 6 above, y =:', options: ['4', '6', '2', '8'], correct: 0, explanation: '6 + y = 10 → y = 4.', difficulty: 4 },
          { text: 'Elimination adds/subtracts equations to cancel:', options: ['One variable', 'Both variables', 'The constants only', 'Nothing'], correct: 0, explanation: 'You line them up so one variable cancels.', difficulty: 3 },
          { text: '2x + y = 7 and x − y = 2. Add them: 3x = 9, x =:', options: ['3', '9', '2', '1'], correct: 0, explanation: '3x = 9 → x = 3.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u7-exponents', name: 'Exponents & Exponential Functions', emoji: '⚡',
    description: 'Exponent rules and exponential growth.',
    lessons: [
      {
        id: 'u7-rules', title: 'Exponent Rules',
        description: 'Multiplying, dividing, and powers of powers.',
        videoURL: S.e, difficulty: 2, tags: ['exponents', 'rules'],
        questions: [
          { text: 'What is 2³?', options: ['8', '6', '9', '23'], correct: 0, explanation: '2 × 2 × 2 = 8.', difficulty: 1 },
          { text: 'x² · x³ =', options: ['x⁵', 'x⁶', 'x¹', '2x⁵'], correct: 0, explanation: 'When multiplying, add exponents: 2 + 3 = 5.', difficulty: 2 },
          { text: 'x⁵ ÷ x² =', options: ['x³', 'x⁷', 'x²·⁵', 'x¹⁰'], correct: 0, explanation: 'When dividing, subtract exponents: 5 − 2 = 3.', difficulty: 3 },
          { text: '(x²)³ =', options: ['x⁶', 'x⁵', 'x⁸', 'x²'], correct: 0, explanation: 'Power of a power: multiply exponents 2 × 3 = 6.', difficulty: 3 },
          { text: 'Anything to the 0 power (x⁰) equals:', options: ['1', '0', 'x', 'Undefined'], correct: 0, explanation: 'Any nonzero number to the 0 power is 1.', difficulty: 2 },
        ],
      },
      {
        id: 'u7-exponential', title: 'Exponential Functions',
        description: 'Repeated multiplication and growth curves.',
        videoURL: S.f, difficulty: 3, tags: ['exponential', 'growth'],
        questions: [
          { text: 'In y = 2ˣ, when x = 3, y =:', options: ['8', '6', '9', '23'], correct: 0, explanation: '2³ = 8.', difficulty: 2 },
          { text: 'y = 3ˣ multiplies by ___ each time x goes up by 1.', options: ['3', '1', 'x', '0'], correct: 0, explanation: 'The base 3 is the growth factor.', difficulty: 3 },
          { text: 'An exponential growth graph curves:', options: ['Upward, getting steeper', 'In a straight line', 'Downward always', 'Flat'], correct: 0, explanation: 'It rises slowly then faster and faster.', difficulty: 3 },
          { text: 'y = 2ˣ, when x = 0, y =:', options: ['1', '0', '2', 'Undefined'], correct: 0, explanation: '2⁰ = 1.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u8-polynomials', name: 'Polynomials', emoji: '➕',
    description: 'Adding, subtracting, and multiplying polynomials.',
    lessons: [
      {
        id: 'u8-addsub', title: 'Adding & Subtracting Polynomials',
        description: 'Combine like terms carefully with signs.',
        videoURL: S.a, difficulty: 2, tags: ['polynomials', 'like-terms'],
        questions: [
          { text: '(2x + 3) + (x + 4) =', options: ['3x + 7', '3x + 12', '2x + 7', 'x + 7'], correct: 0, explanation: 'Combine like terms: 2x + x = 3x; 3 + 4 = 7.', difficulty: 2 },
          { text: '(5x − 2) − (2x + 1) =', options: ['3x − 3', '3x − 1', '7x − 3', '3x + 3'], correct: 0, explanation: 'Distribute the minus: 5x − 2 − 2x − 1 = 3x − 3.', difficulty: 3 },
          { text: 'Combine: 4x² + 2x²', options: ['6x²', '6x⁴', '8x²', '6x'], correct: 0, explanation: 'Add coefficients of like terms: 6x².', difficulty: 2 },
          { text: '(x² + 3x) + (2x² − x) =', options: ['3x² + 2x', '3x² + 4x', 'x² + 2x', '3x⁴ + 2x'], correct: 0, explanation: 'x² + 2x² = 3x²; 3x − x = 2x.', difficulty: 3 },
        ],
      },
      {
        id: 'u8-multiply', title: 'Multiplying Polynomials',
        description: 'Distributing and FOIL.',
        videoURL: S.b, difficulty: 3, tags: ['polynomials', 'foil'],
        questions: [
          { text: '2x · 3x =', options: ['6x²', '6x', '5x²', '6x³'], correct: 0, explanation: 'Multiply coefficients and add exponents: 6x².', difficulty: 2 },
          { text: 'x(x + 4) =', options: ['x² + 4x', 'x + 4', '2x + 4', 'x² + 4'], correct: 0, explanation: 'Distribute x: x·x + x·4 = x² + 4x.', difficulty: 3 },
          { text: '(x + 2)(x + 3) =', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 6', 'x² + 5x + 5'], correct: 0, explanation: 'FOIL: x² + 3x + 2x + 6 = x² + 5x + 6.', difficulty: 3 },
          { text: '(x + 1)(x − 1) =', options: ['x² − 1', 'x² + 1', 'x² − 2x − 1', 'x² − x'], correct: 0, explanation: 'Difference of squares: x² − 1.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u9-factoring', name: 'Factoring', emoji: '🧩',
    description: 'Factoring trinomials and special products.',
    lessons: [
      {
        id: 'u9-trinomials', title: 'Factoring Trinomials',
        description: 'Find two numbers that multiply and add correctly.',
        videoURL: S.c, difficulty: 3, tags: ['factoring', 'trinomials'],
        questions: [
          { text: 'Factor x² + 5x + 6:', options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x + 5)(x + 1)', '(x + 2)(x + 4)'], correct: 0, explanation: '2 and 3 multiply to 6 and add to 5.', difficulty: 3 },
          { text: 'Factor x² + 7x + 12:', options: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x + 1)(x + 12)', '(x + 5)(x + 7)'], correct: 0, explanation: '3 and 4 multiply to 12 and add to 7.', difficulty: 3 },
          { text: 'Factor x² − 5x + 6:', options: ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x − 5)(x − 1)'], correct: 0, explanation: '−2 and −3 multiply to 6 and add to −5.', difficulty: 4 },
          { text: 'Factor x² + 2x − 8:', options: ['(x + 4)(x − 2)', '(x − 4)(x + 2)', '(x + 8)(x − 1)', '(x + 4)(x + 2)'], correct: 0, explanation: '+4 and −2 multiply to −8 and add to +2.', difficulty: 4 },
        ],
      },
      {
        id: 'u9-special', title: 'Special Products',
        description: 'Difference of squares and perfect square trinomials.',
        videoURL: S.d, difficulty: 3, tags: ['factoring', 'special-products'],
        questions: [
          { text: 'Factor x² − 9 (difference of squares):', options: ['(x + 3)(x − 3)', '(x − 3)(x − 3)', '(x + 9)(x − 1)', '(x + 3)(x + 3)'], correct: 0, explanation: 'a² − b² = (a + b)(a − b); here (x + 3)(x − 3).', difficulty: 3 },
          { text: 'x² − 16 =', options: ['(x + 4)(x − 4)', '(x − 4)²', '(x + 8)(x − 2)', '(x + 16)(x − 1)'], correct: 0, explanation: 'Difference of squares: (x + 4)(x − 4).', difficulty: 3 },
          { text: 'Factor x² + 6x + 9 (perfect square):', options: ['(x + 3)²', '(x − 3)²', '(x + 9)(x + 1)', '(x + 6)(x + 3)'], correct: 0, explanation: '(x + 3)(x + 3) = (x + 3)².', difficulty: 4 },
          { text: 'x² − 25 =', options: ['(x + 5)(x − 5)', '(x − 5)²', '(x + 25)(x − 1)', '(x + 5)²'], correct: 0, explanation: 'Difference of squares: (x + 5)(x − 5).', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u10-quadratic-fn', name: 'Quadratic Functions', emoji: '🎢',
    description: 'Graphing, vertex form, and standard form.',
    lessons: [
      {
        id: 'u10-graphing', title: 'Graphing Quadratics',
        description: 'Parabolas, vertex, and axis of symmetry.',
        videoURL: S.e, difficulty: 3, tags: ['quadratics', 'parabola'],
        questions: [
          { text: 'The graph of a quadratic is a:', options: ['Parabola', 'Straight line', 'Circle', 'Zigzag'], correct: 0, explanation: 'Quadratics graph as U-shaped parabolas.', difficulty: 2 },
          { text: 'In y = x², the vertex is at:', options: ['(0, 0)', '(1, 1)', '(0, 1)', '(2, 0)'], correct: 0, explanation: 'The lowest point of y = x² is the origin (0, 0).', difficulty: 3 },
          { text: 'If a > 0 in y = ax², the parabola opens:', options: ['Up', 'Down', 'Left', 'Right'], correct: 0, explanation: 'Positive a → opens upward.', difficulty: 3 },
          { text: 'The line that splits a parabola into mirror halves is the:', options: ['Axis of symmetry', 'x-axis', 'Slope', 'Radius'], correct: 0, explanation: 'It passes vertically through the vertex.', difficulty: 3 },
        ],
      },
      {
        id: 'u10-forms', title: 'Vertex & Standard Form',
        description: 'Reading the vertex straight off the equation.',
        videoURL: S.f, difficulty: 3, tags: ['quadratics', 'vertex-form'],
        questions: [
          { text: 'Standard form of a quadratic is:', options: ['y = ax² + bx + c', 'y = mx + b', 'y = a(x − h) + k', 'y = ax³'], correct: 0, explanation: 'Standard form: y = ax² + bx + c.', difficulty: 3 },
          { text: 'Vertex form is y = a(x − h)² + k. The vertex is:', options: ['(h, k)', '(a, k)', '(h, a)', '(0, k)'], correct: 0, explanation: 'The vertex is (h, k).', difficulty: 3 },
          { text: 'In y = (x − 2)² + 3, the vertex is:', options: ['(2, 3)', '(−2, 3)', '(2, −3)', '(3, 2)'], correct: 0, explanation: 'h = 2, k = 3 → (2, 3).', difficulty: 4 },
          { text: 'In y = (x + 1)² − 4, the vertex is:', options: ['(−1, −4)', '(1, −4)', '(−1, 4)', '(1, 4)'], correct: 0, explanation: '(x + 1) means h = −1; k = −4 → (−1, −4).', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'u11-solving-quad', name: 'Solving Quadratics', emoji: '🔑',
    description: 'Factoring, completing the square, and the quadratic formula.',
    lessons: [
      {
        id: 'u11-factoring', title: 'Solving by Factoring',
        description: 'Set each factor to zero (the zero-product rule).',
        videoURL: S.a, difficulty: 3, tags: ['quadratics', 'factoring'],
        questions: [
          { text: 'Solve x² = 9:', options: ['x = 3 or −3', 'x = 3', 'x = 9', 'x = 81'], correct: 0, explanation: 'Both 3² and (−3)² equal 9.', difficulty: 3 },
          { text: 'If (x − 4)(x + 2) = 0, then x =:', options: ['4 or −2', '−4 or 2', '4 or 2', '−4 or −2'], correct: 0, explanation: 'Set each factor to 0: x = 4 or x = −2.', difficulty: 3 },
          { text: 'Solve x² + 5x + 6 = 0:', options: ['x = −2 or −3', 'x = 2 or 3', 'x = −1 or −6', 'x = 5 or 6'], correct: 0, explanation: 'Factors to (x + 2)(x + 3) = 0 → x = −2 or −3.', difficulty: 4 },
          { text: 'Solve x² − x − 6 = 0:', options: ['x = 3 or −2', 'x = −3 or 2', 'x = 6 or 1', 'x = 3 or 2'], correct: 0, explanation: 'Factors to (x − 3)(x + 2) = 0 → x = 3 or −2.', difficulty: 4 },
        ],
      },
      {
        id: 'u11-completing', title: 'Completing the Square',
        description: 'Add (b/2)² to build a perfect square.',
        videoURL: S.b, difficulty: 4, tags: ['quadratics', 'completing-square'],
        questions: [
          { text: 'To complete the square for x² + 6x, add:', options: ['9', '6', '3', '36'], correct: 0, explanation: '(6 ÷ 2)² = 3² = 9.', difficulty: 3 },
          { text: 'x² + 6x + 9 = (x + __)²', options: ['3', '6', '9', '2'], correct: 0, explanation: 'It becomes (x + 3)².', difficulty: 4 },
          { text: 'To complete the square for x² + 8x, add:', options: ['16', '8', '4', '64'], correct: 0, explanation: '(8 ÷ 2)² = 4² = 16.', difficulty: 4 },
          { text: 'x² + 4x + 4 factors to:', options: ['(x + 2)²', '(x + 4)²', '(x + 1)²', '(x − 2)²'], correct: 0, explanation: '(x + 2)(x + 2) = (x + 2)².', difficulty: 4 },
        ],
      },
      {
        id: 'u11-formula', title: 'The Quadratic Formula',
        description: 'The formula that solves any quadratic.',
        videoURL: S.c, difficulty: 4, tags: ['quadratics', 'formula'],
        questions: [
          { text: 'The quadratic formula is x =:', options: ['(−b ± √(b² − 4ac)) / 2a', '−b / 2a only', 'b² − 4ac', '(−b ± √(b² + 4ac)) / a'], correct: 0, explanation: 'x = (−b ± √(b² − 4ac)) / 2a.', difficulty: 3 },
          { text: 'The discriminant is:', options: ['b² − 4ac', '2a', '−b', '√(4ac)'], correct: 0, explanation: 'The part under the square root: b² − 4ac.', difficulty: 4 },
          { text: 'If the discriminant is negative, there are:', options: ['No real solutions', 'Two real solutions', 'One solution', 'Infinite solutions'], correct: 0, explanation: 'A negative under the root means no real answers.', difficulty: 4 },
          { text: 'For x² − 3x + 2 = 0, the values a, b, c are:', options: ['1, −3, 2', '1, 3, 2', '−1, 3, 2', '1, −3, −2'], correct: 0, explanation: 'Match ax² + bx + c: a = 1, b = −3, c = 2.', difficulty: 5 },
        ],
      },
    ],
  },
  {
    id: 'u12-stats', name: 'Data & Statistics', emoji: '📊',
    description: 'Scatter plots and lines of best fit.',
    lessons: [
      {
        id: 'u12-scatter', title: 'Scatter Plots',
        description: 'Plotting two variables and reading correlation.',
        videoURL: S.d, difficulty: 2, tags: ['statistics', 'scatter-plots'],
        questions: [
          { text: 'A scatter plot shows the relationship between:', options: ['Two variables', 'One number', 'Colors', 'Shapes'], correct: 0, explanation: 'Each point pairs an x-value with a y-value.', difficulty: 1 },
          { text: 'If points rise from left to right, the correlation is:', options: ['Positive', 'Negative', 'None', 'Zero always'], correct: 0, explanation: 'Both variables increase together → positive.', difficulty: 2 },
          { text: 'If points fall from left to right, correlation is:', options: ['Negative', 'Positive', 'None', 'Curved'], correct: 0, explanation: 'As x rises, y falls → negative.', difficulty: 2 },
          { text: 'Points scattered with no pattern show:', options: ['No correlation', 'Strong positive', 'Strong negative', 'A perfect fit'], correct: 0, explanation: 'No clear direction means no correlation.', difficulty: 3 },
        ],
      },
      {
        id: 'u12-bestfit', title: 'Line of Best Fit',
        description: 'Modeling the trend to make predictions.',
        videoURL: S.e, difficulty: 3, tags: ['statistics', 'best-fit'],
        questions: [
          { text: 'A line of best fit is used to:', options: ['Model the trend and predict', 'Connect every point', 'Measure area', 'Find the mean only'], correct: 0, explanation: 'It summarizes the trend so you can estimate values.', difficulty: 2 },
          { text: 'A good line of best fit should be:', options: ['As close to all points as possible', 'Through only two points', 'Vertical', 'Ignoring the data'], correct: 0, explanation: 'It balances the distance to all the points.', difficulty: 3 },
          { text: 'Using a best-fit line to estimate beyond the data is called:', options: ['Extrapolation', 'Rounding', 'Factoring', 'Slope'], correct: 0, explanation: 'Predicting outside the known range is extrapolation.', difficulty: 3 },
          { text: 'A best-fit line with positive slope predicts y will ___ as x increases.', options: ['Increase', 'Decrease', 'Stay the same', 'Disappear'], correct: 0, explanation: 'Positive slope means y goes up as x goes up.', difficulty: 3 },
        ],
      },
    ],
  },
]

// ============================================================
//   COURSES — the top level. Each course holds its units.
//   To add another course (e.g. Geometry), copy this block.
// ============================================================

export interface Course {
  id: string
  name: string
  description: string
  emoji: string
  units: Unit[]
}

export const COURSES: Course[] = [
  {
    id: 'algebra-1',
    name: 'Algebra 1',
    description: 'A full Algebra 1 course — 12 units from foundations to quadratics and statistics.',
    emoji: '🎓',
    units: ALGEBRA1_UNITS,
  },
]

// ---- Derived flat lookups (the app uses these; no need to edit) ----

export interface UnitWithCourse extends Unit {
  courseId: string
  courseName: string
}

export const UNITS: UnitWithCourse[] = COURSES.flatMap((c) =>
  c.units.map((u) => ({ ...u, courseId: c.id, courseName: c.name }))
)

export interface FlatVideo extends Lesson {
  courseId: string
  courseName: string
  unitId: string
  unitName: string
  unitEmoji: string
}

export const VIDEOS: FlatVideo[] = COURSES.flatMap((c) =>
  c.units.flatMap((u) =>
    u.lessons.map((l) => ({
      ...l,
      courseId: c.id, courseName: c.name,
      unitId: u.id, unitName: u.name, unitEmoji: u.emoji,
    }))
  )
)

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}

export function getUnit(id: string): UnitWithCourse | undefined {
  return UNITS.find((u) => u.id === id)
}

export function getVideo(id: string): FlatVideo | undefined {
  return VIDEOS.find((v) => v.id === id)
}

export function courseLessonCount(course: Course): number {
  return course.units.reduce((n, u) => n + u.lessons.length, 0)
}

export function searchVideos(query: string): FlatVideo[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return VIDEOS.filter((v) =>
    [v.title, v.description, v.unitName, v.courseName, ...v.tags].join(' ').toLowerCase().includes(q)
  )
}
