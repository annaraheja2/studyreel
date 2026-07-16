import { type Course, SAMPLE as S } from '../types'

// Geometry course. Each unit has a starter lesson + quiz — add more lessons anytime.
export const geometry: Course = {
  id: 'geometry',
  name: 'Geometry',
  description: 'Proofs, shapes, transformations, trig, circles, and more — 10 units.',
  emoji: '📐',
  units: [
    {
      id: 'geo-foundations', name: 'Foundations & Logic', emoji: '🧠',
      description: 'Points, lines, and the basics of proofs.',
      lessons: [{
        id: 'geo-foundations-l1', title: 'Points, Lines & Logic',
        description: 'Undefined terms and how conditional statements work.',
        videoURL: S.a, difficulty: 1, tags: ['proofs', 'logic'],
        questions: [
          { text: 'Two points determine exactly one:', options: ['Line', 'Plane', 'Circle', 'Angle'], correct: 0, explanation: 'Any two distinct points define a unique line.', difficulty: 1 },
          { text: 'An "if–then" statement is called a:', options: ['Conditional', 'Ratio', 'Vector', 'Chord'], correct: 0, explanation: 'If–then statements are conditionals.', difficulty: 2 },
          { text: 'The part after "then" in a conditional is the:', options: ['Conclusion', 'Hypothesis', 'Converse', 'Inverse'], correct: 0, explanation: '"If" = hypothesis, "then" = conclusion.', difficulty: 3 },
          { text: 'A statement proven true using logic is a:', options: ['Theorem', 'Guess', 'Assumption', 'Ratio'], correct: 0, explanation: 'A theorem is a proven statement; a postulate is assumed.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-transformations', name: 'Transformations', emoji: '🔄',
      description: 'Reflections, rotations, translations, and dilations.',
      lessons: [{
        id: 'geo-transformations-l1', title: 'The Four Transformations',
        description: 'Slides, flips, turns, and resizes.',
        videoURL: S.b, difficulty: 2, tags: ['transformations'],
        questions: [
          { text: 'A transformation that slides a figure is a:', options: ['Translation', 'Rotation', 'Reflection', 'Dilation'], correct: 0, explanation: 'A translation slides without turning or flipping.', difficulty: 1 },
          { text: 'A transformation that flips a figure over a line is a:', options: ['Reflection', 'Translation', 'Rotation', 'Dilation'], correct: 0, explanation: 'A reflection mirrors across a line.', difficulty: 2 },
          { text: 'A transformation that turns a figure around a point is a:', options: ['Rotation', 'Reflection', 'Translation', 'Dilation'], correct: 0, explanation: 'A rotation spins around a center point.', difficulty: 2 },
          { text: 'Which transformation changes the SIZE of a figure?', options: ['Dilation', 'Translation', 'Rotation', 'Reflection'], correct: 0, explanation: 'A dilation scales a figure bigger or smaller.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-congruence', name: 'Congruence', emoji: '🟰',
      description: 'Triangle congruence: SSS, SAS, ASA, AAS, HL.',
      lessons: [{
        id: 'geo-congruence-l1', title: 'Triangle Congruence',
        description: 'The shortcuts that prove two triangles are identical.',
        videoURL: S.c, difficulty: 3, tags: ['congruence', 'triangles'],
        questions: [
          { text: 'Congruent figures have the same:', options: ['Size and shape', 'Color', 'Area only', 'Perimeter only'], correct: 0, explanation: 'Congruent = same size and shape.', difficulty: 2 },
          { text: 'SSS congruence uses three pairs of equal:', options: ['Sides', 'Angles', 'Vertices', 'Areas'], correct: 0, explanation: 'SSS = Side-Side-Side.', difficulty: 3 },
          { text: 'SAS stands for:', options: ['Side-Angle-Side', 'Side-Area-Side', 'Same-Angle-Sum', 'Slope-Angle-Slope'], correct: 0, explanation: 'Two sides and the included angle.', difficulty: 3 },
          { text: 'HL congruence applies only to which triangles?', options: ['Right triangles', 'Equilateral', 'Obtuse', 'Any triangle'], correct: 0, explanation: 'Hypotenuse-Leg works only for right triangles.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'geo-similarity', name: 'Similarity', emoji: '🔺',
      description: 'Proportionality and scale factors.',
      lessons: [{
        id: 'geo-similarity-l1', title: 'Similarity & Scale',
        description: 'Same shape, different size.',
        videoURL: S.d, difficulty: 2, tags: ['similarity', 'scale'],
        questions: [
          { text: 'Similar figures have the same shape but possibly different:', options: ['Size', 'Angles', 'Number of sides', 'Type'], correct: 0, explanation: 'Similar figures share shape; size can differ.', difficulty: 2 },
          { text: 'In similar figures, corresponding angles are:', options: ['Equal', 'Supplementary', 'Doubled', 'Halved'], correct: 0, explanation: 'Corresponding angles stay equal.', difficulty: 2 },
          { text: 'If the scale factor is 3, each side is multiplied by:', options: ['3', '1/3', '9', '6'], correct: 0, explanation: 'The scale factor multiplies each length.', difficulty: 3 },
          { text: 'A triangle with sides 2, 3, 4 scaled by 2 has sides:', options: ['4, 6, 8', '2, 3, 4', '1, 1.5, 2', '6, 9, 12'], correct: 0, explanation: 'Multiply each side by 2.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-trig', name: 'Right Triangles & Trigonometry', emoji: '📏',
      description: 'SOH-CAH-TOA and special right triangles.',
      lessons: [{
        id: 'geo-trig-l1', title: 'Right-Triangle Trig',
        description: 'Sine, cosine, tangent, and 45-45-90 / 30-60-90 triangles.',
        videoURL: S.e, difficulty: 3, tags: ['trigonometry', 'right-triangles'],
        questions: [
          { text: 'In SOH-CAH-TOA, sine equals:', options: ['Opposite / Hypotenuse', 'Adjacent / Hypotenuse', 'Opposite / Adjacent', 'Hypotenuse / Opposite'], correct: 0, explanation: 'SOH: Sine = Opposite / Hypotenuse.', difficulty: 2 },
          { text: 'Cosine equals:', options: ['Adjacent / Hypotenuse', 'Opposite / Hypotenuse', 'Opposite / Adjacent', 'Adjacent / Opposite'], correct: 0, explanation: 'CAH: Cosine = Adjacent / Hypotenuse.', difficulty: 3 },
          { text: 'Tangent equals:', options: ['Opposite / Adjacent', 'Adjacent / Opposite', 'Opposite / Hypotenuse', 'Adjacent / Hypotenuse'], correct: 0, explanation: 'TOA: Tangent = Opposite / Adjacent.', difficulty: 3 },
          { text: 'In a 45-45-90 triangle, the hypotenuse is a leg times:', options: ['√2', '2', '√3', '1/2'], correct: 0, explanation: 'Legs are equal; hypotenuse = leg × √2.', difficulty: 4 },
        ],
      }],
    },
    {
      id: 'geo-quadrilaterals', name: 'Quadrilaterals', emoji: '🔷',
      description: 'Parallelograms, rectangles, and rhombi.',
      lessons: [{
        id: 'geo-quadrilaterals-l1', title: 'Quadrilaterals',
        description: 'The family of four-sided shapes.',
        videoURL: S.f, difficulty: 2, tags: ['quadrilaterals'],
        questions: [
          { text: 'A quadrilateral has how many sides?', options: ['4', '3', '5', '6'], correct: 0, explanation: '"Quad" = four sides.', difficulty: 1 },
          { text: 'A parallelogram has both pairs of opposite sides:', options: ['Parallel', 'Perpendicular', 'Curved', 'Unequal'], correct: 0, explanation: 'Opposite sides are parallel (and equal).', difficulty: 2 },
          { text: 'A rectangle is a parallelogram with four:', options: ['Right angles', 'Equal sides', 'Curved sides', 'Diagonals'], correct: 0, explanation: 'A rectangle has four 90° angles.', difficulty: 3 },
          { text: 'A rhombus is a parallelogram with four:', options: ['Equal sides', 'Right angles', 'Parallel diagonals', 'Vertices only'], correct: 0, explanation: 'A rhombus has four equal-length sides.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-circles', name: 'Circles', emoji: '⭕',
      description: 'Arcs, chords, angles, and sectors.',
      lessons: [{
        id: 'geo-circles-l1', title: 'Circle Basics',
        description: 'Radius, diameter, chords, and arcs.',
        videoURL: S.a, difficulty: 2, tags: ['circles'],
        questions: [
          { text: 'A segment from the center to the circle is the:', options: ['Radius', 'Diameter', 'Chord', 'Arc'], correct: 0, explanation: 'The radius goes from center to edge.', difficulty: 1 },
          { text: 'The diameter is ___ the radius.', options: ['Twice', 'Half', 'Equal to', 'Three times'], correct: 0, explanation: 'Diameter = 2 × radius.', difficulty: 2 },
          { text: 'A full circle measures how many degrees?', options: ['360', '180', '90', '270'], correct: 0, explanation: 'A circle is 360°.', difficulty: 3 },
          { text: 'A chord that passes through the center is the:', options: ['Diameter', 'Radius', 'Arc', 'Tangent'], correct: 0, explanation: 'The longest chord through the center is the diameter.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-coordinate', name: 'Coordinate Geometry', emoji: '📊',
      description: 'Distance, midpoint, and slope proofs.',
      lessons: [{
        id: 'geo-coordinate-l1', title: 'Coordinate Geometry',
        description: 'Using the coordinate plane to measure and prove.',
        videoURL: S.b, difficulty: 3, tags: ['coordinate', 'distance', 'midpoint'],
        questions: [
          { text: 'Midpoint of (0,0) and (4,6) is:', options: ['(2, 3)', '(4, 6)', '(2, 6)', '(1, 3)'], correct: 0, explanation: 'Average the x’s and y’s: (2, 3).', difficulty: 2 },
          { text: 'Distance between (0,0) and (3,4) is:', options: ['5', '7', '1', '25'], correct: 0, explanation: '√(3² + 4²) = √25 = 5.', difficulty: 3 },
          { text: 'The midpoint formula averages the:', options: ["x's and y's", 'slopes', 'areas', 'angles'], correct: 0, explanation: 'Midpoint = average of coordinates.', difficulty: 3 },
          { text: 'Two lines are parallel if their slopes are:', options: ['Equal', 'Opposite', 'Reciprocal', 'Zero'], correct: 0, explanation: 'Parallel lines have equal slopes.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-area-volume', name: 'Area & Volume', emoji: '📦',
      description: '2D area and 3D volume of shapes.',
      lessons: [{
        id: 'geo-area-volume-l1', title: 'Area & Volume',
        description: 'Formulas for flat and solid figures.',
        videoURL: S.c, difficulty: 2, tags: ['area', 'volume'],
        questions: [
          { text: 'Area of a rectangle is:', options: ['length × width', '2(l + w)', '½bh', 'πr²'], correct: 0, explanation: 'Area = length × width.', difficulty: 1 },
          { text: 'Area of a triangle is:', options: ['½ × base × height', 'base × height', 'πr²', 'l × w'], correct: 0, explanation: 'Area = ½ base × height.', difficulty: 2 },
          { text: 'Volume of a cube with side 3 is:', options: ['27', '9', '6', '18'], correct: 0, explanation: '3 × 3 × 3 = 27.', difficulty: 3 },
          { text: 'Volume of a rectangular box is:', options: ['length × width × height', 'l × w', '2lw', 'πr²h'], correct: 0, explanation: 'V = l × w × h.', difficulty: 3 },
        ],
      }],
    },
    {
      id: 'geo-probability', name: 'Probability', emoji: '🎲',
      description: 'Geometric probability.',
      lessons: [{
        id: 'geo-probability-l1', title: 'Geometric Probability',
        description: 'Probability from lengths and areas.',
        videoURL: S.d, difficulty: 2, tags: ['probability'],
        questions: [
          { text: 'Probability ranges from:', options: ['0 to 1', '1 to 10', '0 to 100 only', '−1 to 1'], correct: 0, explanation: 'Probabilities are between 0 and 1.', difficulty: 2 },
          { text: 'A probability of 0 means an event is:', options: ['Impossible', 'Certain', 'Likely', 'Random'], correct: 0, explanation: '0 = impossible; 1 = certain.', difficulty: 2 },
          { text: 'Geometric probability often uses a ratio of:', options: ['Areas or lengths', 'Angles only', 'Colors', 'Names'], correct: 0, explanation: 'It compares favorable area/length to the total.', difficulty: 3 },
          { text: "If a dartboard's target is 1/4 of the area, P(hit) =:", options: ['1/4', '4', '1/2', '3/4'], correct: 0, explanation: 'P = target area / total area = 1/4.', difficulty: 3 },
        ],
      }],
    },
  ],
}
