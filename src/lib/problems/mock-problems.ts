import { Problem } from "@/types";

export const mockProblems: Problem[] = [
  {
    id: "prob-001",
    slug: "projectile-motion-basic",
    title: "Projectile Motion: Horizontal Launch",
    difficulty: "easy",
    description:
      "A ball is launched horizontally from the edge of a cliff with an initial velocity of 20 m/s. The cliff is 45 meters high. Analyze the projectile motion to find key parameters.",
    topic: "Mechanics",
    estimatedTime: 15,
    steps: [
      {
        id: "step-001",
        prompt: "Calculate the time (in seconds) it takes for the ball to reach the ground. Use g = 9.8 m/s².",
        type: "numeric",
        correctAnswer: 3.03,
        tolerance: 0.1,
        unit: "s",
        hint: "Use the kinematic equation h = ½gt². Solve for t.",
        explanation:
          "Since the ball is launched horizontally, the initial vertical velocity is 0. Using h = ½gt²: 45 = ½(9.8)t², t² = 9.18, t ≈ 3.03 s",
      },
      {
        id: "step-002",
        prompt: "What is the horizontal distance (range) traveled by the ball before it hits the ground?",
        type: "numeric",
        correctAnswer: 60.6,
        tolerance: 1,
        unit: "m",
        hint: "Use x = v₀ₓ × t. You already found t in the previous step.",
        explanation:
          "Horizontal distance = initial horizontal velocity × time = 20 m/s × 3.03 s ≈ 60.6 m",
      },
      {
        id: "step-003",
        prompt: "What is the vertical velocity component (vᵧ) just before impact?",
        type: "numeric",
        correctAnswer: 29.7,
        tolerance: 0.5,
        unit: "m/s",
        hint: "Use vᵧ = g × t",
        explanation: "vᵧ = g × t = 9.8 × 3.03 ≈ 29.7 m/s",
      },
      {
        id: "step-004",
        prompt: "Which component of velocity remains constant throughout the flight?",
        type: "multiple_choice",
        correctAnswer: "Horizontal velocity",
        options: [
          "Vertical velocity",
          "Horizontal velocity",
          "Both components",
          "Neither component",
        ],
        explanation:
          "In projectile motion (ignoring air resistance), the horizontal velocity remains constant because no horizontal force acts on the projectile.",
      },
    ],
  },
  {
    id: "prob-002",
    slug: "ohms-law-circuit",
    title: "Ohm's Law: Series Circuit Analysis",
    difficulty: "easy",
    description:
      "A series circuit consists of a 12V battery and three resistors: R₁ = 2Ω, R₂ = 4Ω, and R₃ = 6Ω. Analyze the circuit.",
    topic: "Circuits",
    estimatedTime: 10,
    steps: [
      {
        id: "step-001",
        prompt: "What is the total resistance in the circuit?",
        type: "numeric",
        correctAnswer: 12,
        tolerance: 0,
        unit: "Ω",
        hint: "For resistors in series, R_total = R₁ + R₂ + R₃",
        explanation: "R_total = 2 + 4 + 6 = 12 Ω",
      },
      {
        id: "step-002",
        prompt: "What is the current flowing through the circuit?",
        type: "numeric",
        correctAnswer: 1,
        tolerance: 0.05,
        unit: "A",
        hint: "Use Ohm's Law: I = V/R",
        explanation: "I = V/R = 12V / 12Ω = 1 A",
      },
      {
        id: "step-003",
        prompt: "What is the voltage drop across R₂ (4Ω)?",
        type: "numeric",
        correctAnswer: 4,
        tolerance: 0.1,
        unit: "V",
        hint: "Use V = I × R for the individual resistor",
        explanation: "V₂ = I × R₂ = 1A × 4Ω = 4 V",
      },
    ],
  },
  {
    id: "prob-003",
    slug: "beam-bending-moment",
    title: "Simply Supported Beam: Bending Moment",
    difficulty: "medium",
    description:
      "A simply supported beam of length 6m has a point load of 12 kN applied at its midpoint. Calculate key structural values.",
    topic: "Structural Engineering",
    estimatedTime: 20,
    steps: [
      {
        id: "step-001",
        prompt: "Calculate the reaction force at each support (Ra and Rb). They should be equal due to symmetry. Enter the value for Ra.",
        type: "numeric",
        correctAnswer: 6,
        tolerance: 0.1,
        unit: "kN",
        hint: "For a symmetric load on a simply supported beam, each reaction = P/2",
        explanation: "By symmetry and equilibrium: Ra = Rb = P/2 = 12/2 = 6 kN",
      },
      {
        id: "step-002",
        prompt: "What is the maximum bending moment in the beam?",
        type: "numeric",
        correctAnswer: 18,
        tolerance: 0.5,
        unit: "kN·m",
        hint: "For a mid-span point load: M_max = P×L/4",
        explanation: "M_max = P×L/4 = 12 × 6 / 4 = 18 kN·m (occurs at midspan)",
      },
      {
        id: "step-003",
        prompt: "Where does the maximum bending moment occur?",
        type: "multiple_choice",
        correctAnswer: "At the midspan (3m from either support)",
        options: [
          "At the supports",
          "At the midspan (3m from either support)",
          "At the quarter points",
          "It is constant throughout",
        ],
        explanation:
          "For a simply supported beam with a central point load, the maximum bending moment occurs at the point of load application — the midspan.",
      },
    ],
  },
];

export const mockTopics = [
  { id: "topic-001", name: "Mechanics", slug: "mechanics", description: "Classical mechanics, kinematics, and dynamics" },
  { id: "topic-002", name: "Circuits", slug: "circuits", description: "Electrical circuits and Ohm's Law" },
  { id: "topic-003", name: "Structural Engineering", slug: "structural", description: "Beams, loads, and structural analysis" },
  { id: "topic-004", name: "Thermodynamics", slug: "thermodynamics", description: "Heat, work, and energy systems" },
  { id: "topic-005", name: "Fluid Mechanics", slug: "fluid-mechanics", description: "Fluid flow and pressure" },
];
