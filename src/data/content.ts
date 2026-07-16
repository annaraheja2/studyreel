// ============================================================
//   📼  HOW TO ADD YOUR OWN VIDEOS — edit only this file
// ============================================================
//
//   Content is grouped into UNITS. One unit = one math topic
//   with its lessons. Everything the app shows comes from
//   the `UNITS` list below.
//
//   videoURL can be:
//    • a web link:  "https://.../lesson.mp4"  (or a YouTube EMBED url)
//    • a file you put in the "public/videos" folder: "videos/myfile.mp4"
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

export const UNITS: Unit[] = [
  {
    id: 'lvl-basics',
    name: 'Number Basics',
    description: 'Fractions, decimals, and percentages — the foundation.',
    emoji: '🔢',
    lessons: [
      {
        id: 'v-frac', title: 'Understanding Fractions',
        description: 'What a fraction really means and how to compare them.',
        videoURL: S.a, difficulty: 1, tags: ['fractions', 'numbers'],
        questions: [
          { text: 'Which fraction is larger?', options: ['1/2', '1/4', '1/8', '1/16'], correct: 0, explanation: 'With the same numerator (1), a smaller denominator means a bigger piece. 1/2 is largest.', difficulty: 1 },
          { text: 'What is 1/2 equal to?', options: ['0.2', '0.5', '0.25', '2.0'], correct: 1, explanation: '1 divided by 2 equals 0.5.', difficulty: 1 },
          { text: 'Which is equivalent to 2/4?', options: ['1/2', '2/3', '3/4', '1/4'], correct: 0, explanation: 'Divide top and bottom by 2: 2/4 = 1/2.', difficulty: 2 },
          { text: 'What is 1/3 + 1/6?', options: ['2/9', '1/2', '2/6', '1/9'], correct: 1, explanation: 'Common denominator 6: 2/6 + 1/6 = 3/6 = 1/2.', difficulty: 3 },
          { text: 'What is 3/4 of 20?', options: ['12', '15', '18', '5'], correct: 1, explanation: '20 ÷ 4 = 5, then 5 × 3 = 15.', difficulty: 4 },
        ],
      },
      {
        id: 'v-dec', title: 'Decimals Demystified',
        description: 'Place value and converting fractions to decimals.',
        videoURL: S.b, difficulty: 2, tags: ['decimals', 'numbers'],
        questions: [
          { text: 'What is the value of the 7 in 0.7?', options: ['7 ones', '7 tenths', '7 hundredths', '7 tens'], correct: 1, explanation: 'The first digit after the decimal point is the tenths place.', difficulty: 1 },
          { text: '3/10 as a decimal is:', options: ['0.03', '0.3', '3.0', '0.13'], correct: 1, explanation: 'Tenths → one decimal place: 3/10 = 0.3.', difficulty: 2 },
          { text: 'Which is larger, 0.45 or 0.5?', options: ['0.45', '0.5', 'They are equal', 'Cannot tell'], correct: 1, explanation: '0.5 = 0.50, and 0.50 > 0.45.', difficulty: 3 },
          { text: 'What is 0.25 + 0.4?', options: ['0.29', '0.65', '0.15', '0.045'], correct: 1, explanation: 'Line up decimals: 0.25 + 0.40 = 0.65.', difficulty: 4 },
        ],
      },
      {
        id: 'v-pct', title: 'Percentages in Real Life',
        description: 'Discounts, tips, and what "percent" means.',
        videoURL: S.c, difficulty: 2, tags: ['percentages', 'numbers'],
        questions: [
          { text: '50% means:', options: ['Half', 'A quarter', 'All of it', 'Double'], correct: 0, explanation: 'Percent means "per hundred"; 50/100 = 1/2 = half.', difficulty: 1 },
          { text: 'What is 10% of 200?', options: ['2', '20', '10', '200'], correct: 1, explanation: '10% = 0.1, and 0.1 × 200 = 20.', difficulty: 2 },
          { text: 'A $80 item is 25% off. New price?', options: ['$60', '$55', '$20', '$75'], correct: 0, explanation: '25% of 80 = 20; 80 − 20 = 60.', difficulty: 3 },
          { text: '15 is what percent of 60?', options: ['15%', '25%', '40%', '4%'], correct: 1, explanation: '15/60 = 0.25 = 25%.', difficulty: 4 },
        ],
      },
    ],
  },
  {
    id: 'lvl-algebra',
    name: 'Algebra 1',
    description: 'Variables, expressions, and solving linear equations.',
    emoji: '📐',
    lessons: [
      {
        id: 'v-var', title: 'Meet the Variable',
        description: 'Using letters to stand in for numbers.',
        videoURL: S.d, difficulty: 2, tags: ['algebra', 'variables'],
        questions: [
          { text: 'In 3x, if x = 4, what is 3x?', options: ['7', '12', '34', '1'], correct: 1, explanation: '3x means 3 × x = 3 × 4 = 12.', difficulty: 1 },
          { text: 'What does a variable represent?', options: ['A fixed number', 'An unknown value', 'Only zero', 'A shape'], correct: 1, explanation: 'A variable is a letter standing in for an unknown or changing value.', difficulty: 2 },
          { text: 'If y = 2x + 1 and x = 3, find y.', options: ['6', '7', '5', '9'], correct: 1, explanation: '2×3 + 1 = 6 + 1 = 7.', difficulty: 3 },
          { text: 'Which expression means "5 more than n"?', options: ['5n', 'n − 5', 'n + 5', '5 − n'], correct: 2, explanation: '"More than" adds: n + 5.', difficulty: 4 },
        ],
      },
      {
        id: 'v-expr', title: 'Simplifying Expressions',
        description: 'Combining like terms and the distributive property.',
        videoURL: S.e, difficulty: 3, tags: ['algebra', 'expressions'],
        questions: [
          { text: 'Simplify: 2x + 3x', options: ['5x', '6x', '5', '23x'], correct: 0, explanation: 'Like terms add: 2x + 3x = 5x.', difficulty: 2 },
          { text: 'Simplify: 4x + 2 + x', options: ['5x + 2', '6x', '4x + 2', '7x'], correct: 0, explanation: 'Combine x terms: 4x + x = 5x, keep + 2.', difficulty: 3 },
          { text: 'Expand: 3(x + 2)', options: ['3x + 2', '3x + 6', 'x + 6', '3x + 5'], correct: 1, explanation: 'Distribute 3: 3·x + 3·2 = 3x + 6.', difficulty: 4 },
          { text: 'Simplify: 2(x + 3) + 4x', options: ['6x + 6', '6x + 3', '2x + 6', '8x'], correct: 0, explanation: '2x + 6 + 4x = 6x + 6.', difficulty: 5 },
        ],
      },
      {
        id: 'v-eqn', title: 'Solving Linear Equations',
        description: 'Isolate x and keep both sides balanced.',
        videoURL: S.f, difficulty: 3, tags: ['algebra', 'equations'],
        questions: [
          { text: 'Solve: x + 5 = 12', options: ['x = 7', 'x = 17', 'x = 5', 'x = 60'], correct: 0, explanation: 'Subtract 5 from both sides: x = 7.', difficulty: 2 },
          { text: 'Solve: 3x = 15', options: ['x = 45', 'x = 5', 'x = 12', 'x = 18'], correct: 1, explanation: 'Divide both sides by 3: x = 5.', difficulty: 3 },
          { text: 'Solve: 2x + 4 = 10', options: ['x = 3', 'x = 7', 'x = 2', 'x = 5'], correct: 0, explanation: 'Subtract 4 → 2x = 6, divide by 2 → x = 3.', difficulty: 4 },
          { text: 'Solve: 5x − 3 = 2x + 9', options: ['x = 4', 'x = 3', 'x = 6', 'x = 2'], correct: 0, explanation: '5x − 2x = 9 + 3 → 3x = 12 → x = 4.', difficulty: 5 },
        ],
      },
    ],
  },
  {
    id: 'lvl-geometry',
    name: 'Geometry',
    description: 'Angles, area, and the Pythagorean theorem.',
    emoji: '📏',
    lessons: [
      {
        id: 'v-ang', title: 'Angles & Lines',
        description: 'Acute, obtuse, complementary, and supplementary angles.',
        videoURL: S.a, difficulty: 2, tags: ['geometry', 'angles'],
        questions: [
          { text: 'A right angle measures:', options: ['45°', '90°', '180°', '360°'], correct: 1, explanation: 'A right angle is exactly 90°.', difficulty: 1 },
          { text: 'An angle less than 90° is called:', options: ['Obtuse', 'Acute', 'Straight', 'Reflex'], correct: 1, explanation: 'Acute angles are smaller than 90°.', difficulty: 2 },
          { text: 'Two angles that sum to 90° are:', options: ['Supplementary', 'Complementary', 'Vertical', 'Equal'], correct: 1, explanation: 'Complementary angles add to 90°.', difficulty: 3 },
          { text: 'If one angle is 65°, its supplement is:', options: ['25°', '115°', '35°', '90°'], correct: 1, explanation: 'Supplements add to 180°: 180 − 65 = 115°.', difficulty: 4 },
        ],
      },
      {
        id: 'v-area', title: 'Area of Shapes',
        description: 'Rectangles, triangles, and circles.',
        videoURL: S.b, difficulty: 3, tags: ['geometry', 'area'],
        questions: [
          { text: 'Area of a 4×5 rectangle?', options: ['9', '20', '18', '40'], correct: 1, explanation: 'Area = length × width = 4 × 5 = 20.', difficulty: 2 },
          { text: 'Area of a triangle, base 6, height 4?', options: ['24', '12', '10', '48'], correct: 1, explanation: 'Area = ½ × base × height = ½ × 6 × 4 = 12.', difficulty: 3 },
          { text: 'Area of a circle with radius 3 (π≈3.14)?', options: ['28.26', '18.84', '9.42', '6.28'], correct: 0, explanation: 'Area = πr² = 3.14 × 9 = 28.26.', difficulty: 4 },
        ],
      },
      {
        id: 'v-pyth', title: 'The Pythagorean Theorem',
        description: 'a² + b² = c² and why it works.',
        videoURL: S.c, difficulty: 4, tags: ['geometry', 'triangles'],
        questions: [
          { text: 'The Pythagorean theorem is:', options: ['a + b = c', 'a² + b² = c²', 'a² − b² = c²', 'abc = 0'], correct: 1, explanation: 'For a right triangle, a² + b² = c², where c is the hypotenuse.', difficulty: 3 },
          { text: 'Legs 3 and 4. Hypotenuse?', options: ['5', '7', '6', '12'], correct: 0, explanation: '3² + 4² = 9 + 16 = 25, and √25 = 5.', difficulty: 4 },
          { text: 'Legs 6 and 8. Hypotenuse?', options: ['10', '14', '12', '48'], correct: 0, explanation: '6² + 8² = 36 + 64 = 100, and √100 = 10.', difficulty: 5 },
        ],
      },
    ],
  },
]

// ---- Derived flat lookups (the app uses these; no need to edit) ----

export interface FlatVideo extends Lesson {
  unitId: string
  unitName: string
  unitEmoji: string
}

export const VIDEOS: FlatVideo[] = UNITS.flatMap((u) =>
  u.lessons.map((l) => ({ ...l, unitId: u.id, unitName: u.name, unitEmoji: u.emoji }))
)

export function getVideo(id: string): FlatVideo | undefined {
  return VIDEOS.find((v) => v.id === id)
}

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id)
}

export function searchVideos(query: string): FlatVideo[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return VIDEOS.filter((v) =>
    [v.title, v.description, v.unitName, ...v.tags].join(' ').toLowerCase().includes(q)
  )
}
