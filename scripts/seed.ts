/**
 * Seed script — populates the database with realistic starter data.
 *
 * Run:  npm run db:seed
 *
 * The script is idempotent: existing rows whose slug/id matches a seed value
 * are left untouched (ON CONFLICT DO NOTHING), so it is safe to re-run.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { topics, problems, problemSteps } from "../src/lib/db/schema/index";

const POSTGRES_URL = process.env.POSTGRES_URL;
if (!POSTGRES_URL) {
  console.error("ERROR: POSTGRES_URL environment variable is not set.");
  console.error("Copy .env.example to .env.local and fill in your Supabase/Postgres credentials.");
  process.exit(1);
}

const client = postgres(POSTGRES_URL, { max: 1 });
const db = drizzle(client);

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

const seedTopics = [
  {
    name: "Statics",
    slug: "statics",
    description: "Equilibrium of rigid bodies, trusses, beams, and distributed loads",
  },
  {
    name: "Dynamics",
    slug: "dynamics",
    description: "Kinematics and kinetics of particles and rigid bodies",
  },
  {
    name: "Circuits",
    slug: "circuits",
    description: "DC and AC electrical circuits, Ohm's Law, and network analysis",
  },
] as const;

// ---------------------------------------------------------------------------
// Helper type
// ---------------------------------------------------------------------------

interface SeedStep {
  stepOrder: number;
  prompt: string;
  type: "numeric" | "multiple_choice" | "text";
  correctAnswer: string;
  tolerance?: number;
  unit?: string;
  hint?: string;
  explanation?: string;
  options?: string[];
}

interface SeedProblem {
  slug: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topicSlug: string;
  estimatedTime: number;
  steps: SeedStep[];
}

// ---------------------------------------------------------------------------
// Problems
// ---------------------------------------------------------------------------

const seedProblems: SeedProblem[] = [
  // ── STATICS ──────────────────────────────────────────────────────────────

  {
    slug: "concurrent-forces-equilibrium",
    title: "Concurrent Forces: Particle Equilibrium",
    description:
      "Three forces act on a small ring at point A. Force F₁ = 200 N acts horizontally to the right. Force F₂ = 150 N acts vertically upward. Find the magnitude and direction of the third force F₃ required to keep the ring in equilibrium.",
    difficulty: "easy",
    topicSlug: "statics",
    estimatedTime: 12,
    steps: [
      {
        stepOrder: 1,
        prompt:
          "For the ring to be in equilibrium, what must be the x-component (horizontal) of F₃? (Positive = right)",
        type: "numeric",
        correctAnswer: "-200",
        tolerance: 0.5,
        unit: "N",
        hint: "Sum of x-forces = 0. F₁ acts in the +x direction, so F₃ must balance it.",
        explanation:
          "ΣFₓ = 0 → F₁ + F₃ₓ = 0 → 200 + F₃ₓ = 0 → F₃ₓ = −200 N",
      },
      {
        stepOrder: 2,
        prompt:
          "What must be the y-component (vertical) of F₃? (Positive = up)",
        type: "numeric",
        correctAnswer: "-150",
        tolerance: 0.5,
        unit: "N",
        hint: "Sum of y-forces = 0. F₂ acts in the +y direction.",
        explanation:
          "ΣFᵧ = 0 → F₂ + F₃ᵧ = 0 → 150 + F₃ᵧ = 0 → F₃ᵧ = −150 N",
      },
      {
        stepOrder: 3,
        prompt: "Calculate the magnitude of F₃.",
        type: "numeric",
        correctAnswer: "250",
        tolerance: 1,
        unit: "N",
        hint: "|F₃| = √(F₃ₓ² + F₃ᵧ²)",
        explanation:
          "|F₃| = √(200² + 150²) = √(40000 + 22500) = √62500 = 250 N",
      },
      {
        stepOrder: 4,
        prompt:
          "What is the angle θ that F₃ makes below the negative x-axis (measured from the negative x-axis toward the negative y-axis)?",
        type: "numeric",
        correctAnswer: "36.87",
        tolerance: 0.5,
        unit: "°",
        hint: "θ = arctan(|F₃ᵧ| / |F₃ₓ|) = arctan(150/200)",
        explanation:
          "θ = arctan(150/200) = arctan(0.75) ≈ 36.87°. F₃ points into the third quadrant (down-left).",
      },
    ],
  },

  // ── Fully detailed statics problem ───────────────────────────────────────
  {
    slug: "simply-supported-beam-udl",
    title: "Simply Supported Beam with Uniform Distributed Load",
    description:
      "A simply supported beam AB has a span of L = 8 m. It carries a uniformly distributed load (UDL) of w = 5 kN/m over its entire length. " +
      "In addition, a point load P = 20 kN is applied at x = 3 m from support A. " +
      "Determine the support reactions, maximum bending moment, and its location.",
    difficulty: "medium",
    topicSlug: "statics",
    estimatedTime: 25,
    steps: [
      {
        stepOrder: 1,
        prompt:
          "Calculate the total resultant of the distributed load acting on the beam.",
        type: "numeric",
        correctAnswer: "40",
        tolerance: 0.5,
        unit: "kN",
        hint: "Resultant of UDL = w × L (acts at midspan).",
        explanation:
          "W_total = w × L = 5 kN/m × 8 m = 40 kN. This resultant acts at x = 4 m from A.",
      },
      {
        stepOrder: 2,
        prompt:
          "Take moments about support A to find the vertical reaction Rʙ at support B.",
        type: "numeric",
        correctAnswer: "27.5",
        tolerance: 0.5,
        unit: "kN",
        hint: "ΣM_A = 0 → Rʙ × 8 = W_total × 4 + P × 3. Solve for Rʙ.",
        explanation:
          "ΣM_A = 0: Rʙ(8) = 40(4) + 20(3) = 160 + 60 = 220 → Rʙ = 220 / 8 = 27.5 kN.",
      },
      {
        stepOrder: 3,
        prompt:
          "Using vertical equilibrium (ΣFᵧ = 0), find the reaction Rₐ at support A.",
        type: "numeric",
        correctAnswer: "32.5",
        tolerance: 0.5,
        unit: "kN",
        hint: "ΣFᵧ = 0 → Rₐ + Rʙ = W_total + P. You found Rʙ in the previous step.",
        explanation:
          "Rₐ + Rʙ = 40 + 20 = 60 kN. Rʙ = 27.5 kN (from moments). Therefore Rₐ = 60 − 27.5 = 32.5 kN.",
      },
      {
        stepOrder: 4,
        prompt:
          "Write the shear-force expression V(x) for the region 0 ≤ x < 3 m (before the point load). " +
          "Enter the shear force at x = 2 m.",
        type: "numeric",
        correctAnswer: "22.5",
        tolerance: 0.5,
        unit: "kN",
        hint: "V(x) = Rₐ − w·x for the first segment. Substitute x = 2.",
        explanation:
          "V(x) = Rₐ − w·x = 32.5 − 5(2) = 32.5 − 10 = 22.5 kN",
      },
      {
        stepOrder: 5,
        prompt:
          "At x = 3 m (just to the right of the point load P), what is the signed shear force? " +
          "Use the convention: V is positive when the left-face resultant acts upward.",
        type: "numeric",
        correctAnswer: "-2.5",
        tolerance: 0.5,
        unit: "kN",
        hint: "V(3⁺) = Rₐ − w(3) − P. The point load acts downward.",
        explanation:
          "V(3⁺) = 32.5 − 5(3) − 20 = 32.5 − 15 − 20 = −2.5 kN. " +
          "The shear is positive to the left of the load and negative to the right — it changes sign at x = 3 m.",
      },
      {
        stepOrder: 6,
        prompt:
          "Using the shear-force expression for 3 m < x ≤ 8 m, calculate V at x = 5 m.",
        type: "numeric",
        correctAnswer: "-12.5",
        tolerance: 0.5,
        unit: "kN",
        hint: "V(x) = Rₐ − P − w·x for this segment. Substitute x = 5.",
        explanation:
          "V(5) = 32.5 − 20 − 5(5) = 32.5 − 20 − 25 = −12.5 kN. " +
          "The shear is negative throughout the region x > 3 m, confirming the maximum moment is at x = 3 m.",
      },
      {
        stepOrder: 7,
        prompt:
          "Calculate the maximum bending moment M_max using M(x) = Rₐ·x − (w·x²)/2 evaluated at x = 3 m (where shear crosses zero).",
        type: "numeric",
        correctAnswer: "75",
        tolerance: 1,
        unit: "kN·m",
        hint: "M(3) = Rₐ(3) − w(3²)/2. Substitute Rₐ = 32.5, w = 5.",
        explanation:
          "M(3) = 32.5 × 3 − 5 × 9 / 2 = 97.5 − 22.5 = 75 kN·m. " +
          "This is the maximum bending moment in the beam.",
      },
      {
        stepOrder: 8,
        prompt: "Where does the maximum bending moment occur?",
        type: "multiple_choice",
        correctAnswer: "At x = 3 m from support A (point of load application)",
        options: [
          "At midspan (x = 4 m)",
          "At x = 3 m from support A (point of load application)",
          "At support A",
          "At support B",
        ],
        hint: "Maximum bending moment occurs where shear force = 0.",
        explanation:
          "The shear force changes sign at x = 3 m (the location of the point load P). " +
          "Where V = 0, the bending moment is at its maximum. M_max = 75 kN·m at x = 3 m.",
      },
    ],
  },

  {
    slug: "truss-method-of-joints",
    title: "Simple Truss: Method of Joints",
    description:
      "A simple pin-jointed truss has three members (AB, BC, AC) forming a triangle. " +
      "Support A is a pin and support C is a roller. The span AC = 4 m. " +
      "Joint B is at the apex, 3 m directly above the midpoint of AC. " +
      "A vertical load P = 30 kN is applied at joint B downward. " +
      "Determine the support reactions and member forces.",
    difficulty: "hard",
    topicSlug: "statics",
    estimatedTime: 30,
    steps: [
      {
        stepOrder: 1,
        prompt: "Find the vertical reaction Rₐᵧ at pin support A.",
        type: "numeric",
        correctAnswer: "15",
        tolerance: 0.5,
        unit: "kN",
        hint: "By symmetry (load at midspan), each vertical reaction = P/2.",
        explanation:
          "The truss is symmetric about the vertical through B. " +
          "ΣM_C = 0 → Rₐᵧ(4) = 30(2) → Rₐᵧ = 60/4 = 15 kN. Rᴄᵧ = 15 kN by symmetry.",
      },
      {
        stepOrder: 2,
        prompt: "Find the horizontal reaction Rₐₓ at pin support A.",
        type: "numeric",
        correctAnswer: "0",
        tolerance: 0.1,
        unit: "kN",
        hint: "ΣFₓ = 0. No horizontal external loads are applied.",
        explanation:
          "ΣFₓ = 0 → Rₐₓ = 0 (the roller at C provides no horizontal force, and no horizontal loads exist).",
      },
      {
        stepOrder: 3,
        prompt:
          "Calculate the length of member AB. (A is at origin, B is at (2, 3).)",
        type: "numeric",
        correctAnswer: "3.606",
        tolerance: 0.01,
        unit: "m",
        hint: "Use the distance formula: |AB| = √((2−0)² + (3−0)²).",
        explanation: "|AB| = √(4 + 9) = √13 ≈ 3.606 m",
      },
      {
        stepOrder: 4,
        prompt:
          "Applying the method of joints at joint A, find the force in member AB. " +
          "State the magnitude (compression is positive here).",
        type: "numeric",
        correctAnswer: "18.03",
        tolerance: 0.1,
        unit: "kN",
        hint:
          "At joint A: ΣFᵧ = 0 → Rₐᵧ + F_AB·sinθ = 0 (θ = angle of AB above horizontal). " +
          "sinθ = 3/√13.",
        explanation:
          "θ = arctan(3/2) ≈ 56.31°. sinθ = 3/√13, cosθ = 2/√13. " +
          "ΣFᵧ = 0 at A: Rₐᵧ − F_AB·sinθ = 0 (if AB is in compression pointing away from A). " +
          "15 = F_AB × (3/√13) → F_AB = 15√13/3 = 5√13 ≈ 18.03 kN (compression).",
      },
      {
        stepOrder: 5,
        prompt: "Is member AB in tension or compression?",
        type: "multiple_choice",
        correctAnswer: "Compression",
        options: ["Tension", "Compression", "Zero force", "Cannot be determined"],
        hint: "If the member pushes outward on the joint, it is in compression.",
        explanation:
          "Both slant members AB and BC carry the vertical load to the supports. " +
          "They are squeezed between the apex load and the supports — they are in compression.",
      },
      {
        stepOrder: 6,
        prompt:
          "Find the force in member AC (the bottom chord). " +
          "Use equilibrium at joint A in the x-direction.",
        type: "numeric",
        correctAnswer: "10",
        tolerance: 0.1,
        unit: "kN",
        hint: "ΣFₓ = 0 at A: F_AC − F_AB·cosθ = 0. Use F_AB from the previous step.",
        explanation:
          "ΣFₓ = 0 at A: F_AC = F_AB·cosθ = 5√13 × (2/√13) = 10 kN. " +
          "The positive result confirms AC is in tension (it pulls joint A to the right, " +
          "preventing the supports from spreading apart).",
      },
    ],
  },

  // ── DYNAMICS ─────────────────────────────────────────────────────────────

  {
    slug: "projectile-cliff-launch",
    title: "Projectile Motion: Horizontal Launch from a Cliff",
    description:
      "A ball is launched horizontally from the edge of a cliff with an initial velocity of 20 m/s. " +
      "The cliff is 45 m high. Analyze the projectile motion. Use g = 9.8 m/s².",
    difficulty: "easy",
    topicSlug: "dynamics",
    estimatedTime: 15,
    steps: [
      {
        stepOrder: 1,
        prompt:
          "Calculate the time (in seconds) it takes for the ball to reach the ground.",
        type: "numeric",
        correctAnswer: "3.03",
        tolerance: 0.05,
        unit: "s",
        hint: "Use the kinematic equation h = ½gt². Solve for t.",
        explanation:
          "Since the ball is launched horizontally, the initial vertical velocity is 0. " +
          "h = ½gt² → 45 = ½(9.8)t² → t² = 9.18 → t ≈ 3.03 s",
      },
      {
        stepOrder: 2,
        prompt:
          "What is the horizontal distance (range) traveled before the ball hits the ground?",
        type: "numeric",
        correctAnswer: "60.6",
        tolerance: 1,
        unit: "m",
        hint: "x = v₀ₓ × t. You already found t.",
        explanation:
          "x = v₀ₓ × t = 20 m/s × 3.03 s ≈ 60.6 m",
      },
      {
        stepOrder: 3,
        prompt: "What is the vertical velocity component vᵧ just before impact?",
        type: "numeric",
        correctAnswer: "29.7",
        tolerance: 0.5,
        unit: "m/s",
        hint: "Use vᵧ = g × t.",
        explanation: "vᵧ = 9.8 × 3.03 ≈ 29.7 m/s (downward)",
      },
      {
        stepOrder: 4,
        prompt: "Which velocity component remains constant throughout the flight?",
        type: "multiple_choice",
        correctAnswer: "Horizontal velocity",
        options: [
          "Vertical velocity",
          "Horizontal velocity",
          "Both components",
          "Neither component",
        ],
        explanation:
          "In projectile motion (no air resistance), no horizontal force acts on the projectile, " +
          "so the horizontal velocity stays constant at 20 m/s.",
      },
    ],
  },

  {
    slug: "newtons-second-law-incline",
    title: "Newton's Second Law: Block on a Frictionless Incline",
    description:
      "A 10 kg block is placed on a frictionless inclined plane at θ = 30° to the horizontal. " +
      "Find the acceleration of the block and the normal force. Use g = 9.81 m/s².",
    difficulty: "easy",
    topicSlug: "dynamics",
    estimatedTime: 10,
    steps: [
      {
        stepOrder: 1,
        prompt:
          "What is the component of gravity acting parallel to (along) the incline surface?",
        type: "numeric",
        correctAnswer: "49.05",
        tolerance: 0.5,
        unit: "N",
        hint: "F_parallel = m·g·sin(θ)",
        explanation:
          "F_parallel = 10 × 9.81 × sin(30°) = 10 × 9.81 × 0.5 = 49.05 N",
      },
      {
        stepOrder: 2,
        prompt:
          "Applying Newton's Second Law along the incline, find the acceleration of the block.",
        type: "numeric",
        correctAnswer: "4.905",
        tolerance: 0.05,
        unit: "m/s²",
        hint: "F = ma along the incline. The only force along the incline is the gravity component.",
        explanation:
          "a = F_parallel / m = 49.05 / 10 = 4.905 m/s² (down the slope)",
      },
      {
        stepOrder: 3,
        prompt: "What is the normal force N exerted by the incline on the block?",
        type: "numeric",
        correctAnswer: "84.96",
        tolerance: 0.5,
        unit: "N",
        hint: "N = m·g·cos(θ). There is no acceleration perpendicular to the surface.",
        explanation:
          "N = m·g·cos(30°) = 10 × 9.81 × (√3/2) ≈ 10 × 9.81 × 0.866 ≈ 84.96 N",
      },
    ],
  },

  // ── CIRCUITS ─────────────────────────────────────────────────────────────

  {
    slug: "ohms-law-series-circuit",
    title: "Ohm's Law: Series Circuit Analysis",
    description:
      "A series circuit consists of a 12 V battery and three resistors: R₁ = 2 Ω, R₂ = 4 Ω, and R₃ = 6 Ω. " +
      "Analyze the circuit using Ohm's Law.",
    difficulty: "easy",
    topicSlug: "circuits",
    estimatedTime: 10,
    steps: [
      {
        stepOrder: 1,
        prompt: "What is the total resistance in the circuit?",
        type: "numeric",
        correctAnswer: "12",
        tolerance: 0,
        unit: "Ω",
        hint: "For series resistors: R_total = R₁ + R₂ + R₃",
        explanation: "R_total = 2 + 4 + 6 = 12 Ω",
      },
      {
        stepOrder: 2,
        prompt: "What is the current flowing through the circuit?",
        type: "numeric",
        correctAnswer: "1",
        tolerance: 0.05,
        unit: "A",
        hint: "Use Ohm's Law: I = V / R_total",
        explanation: "I = 12 V / 12 Ω = 1 A",
      },
      {
        stepOrder: 3,
        prompt: "What is the voltage drop across R₂ (4 Ω)?",
        type: "numeric",
        correctAnswer: "4",
        tolerance: 0.1,
        unit: "V",
        hint: "Use V = I × R for the individual resistor.",
        explanation: "V₂ = I × R₂ = 1 A × 4 Ω = 4 V",
      },
      {
        stepOrder: 4,
        prompt: "Do the voltage drops across the three resistors sum to the source voltage?",
        type: "multiple_choice",
        correctAnswer: "Yes — this is Kirchhoff's Voltage Law (KVL)",
        options: [
          "Yes — this is Kirchhoff's Voltage Law (KVL)",
          "No — only the largest resistor accounts for the voltage",
          "No — voltage is the same across each resistor",
          "Only if the resistors are identical",
        ],
        explanation:
          "V₁ + V₂ + V₃ = 2 + 4 + 6 = 12 V = source. KVL states that the sum of voltage drops " +
          "around any closed loop equals zero, which means drops equal the source.",
      },
    ],
  },

  {
    slug: "rc-circuit-charging",
    title: "RC Circuit: Capacitor Charging",
    description:
      "A series RC circuit has a resistor R = 10 kΩ and a capacitor C = 100 μF connected to a 5 V DC source. " +
      "The capacitor is initially uncharged. Analyze the charging behavior.",
    difficulty: "medium",
    topicSlug: "circuits",
    estimatedTime: 18,
    steps: [
      {
        stepOrder: 1,
        prompt: "Calculate the time constant τ of the circuit.",
        type: "numeric",
        correctAnswer: "1",
        tolerance: 0.01,
        unit: "s",
        hint: "τ = R × C. Convert units: 10 kΩ = 10,000 Ω; 100 μF = 100×10⁻⁶ F.",
        explanation:
          "τ = R × C = 10,000 × 100×10⁻⁶ = 1 s",
      },
      {
        stepOrder: 2,
        prompt:
          "What is the voltage across the capacitor after one time constant (t = τ)?",
        type: "numeric",
        correctAnswer: "3.16",
        tolerance: 0.05,
        unit: "V",
        hint: "Vᴄ(t) = V_s(1 − e^(−t/τ)). At t = τ, e^(−1) ≈ 0.368.",
        explanation:
          "Vᴄ(τ) = 5(1 − e⁻¹) = 5(1 − 0.368) = 5 × 0.632 ≈ 3.16 V",
      },
      {
        stepOrder: 3,
        prompt:
          "What percentage of the final voltage does the capacitor reach after one time constant?",
        type: "numeric",
        correctAnswer: "63.2",
        tolerance: 0.5,
        unit: "%",
        hint: "Percentage = (1 − e⁻¹) × 100 %",
        explanation:
          "(1 − e⁻¹) × 100 % ≈ 63.2 %. This is a universal result — after one time constant, " +
          "any RC or RL circuit reaches 63.2 % of its final value.",
      },
      {
        stepOrder: 4,
        prompt: "After how many time constants is the capacitor considered 'fully charged' (≥ 99%)?",
        type: "multiple_choice",
        correctAnswer: "5τ",
        options: ["1τ", "2τ", "3τ", "5τ"],
        hint: "At 5τ, Vᴄ = V_s(1 − e⁻⁵) ≈ 0.993 V_s.",
        explanation:
          "At 5τ the capacitor is at 99.3 % of V_s. Engineers use 5τ as the practical 'fully charged' threshold.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log("🌱 Seeding database...\n");

  // 1. Insert topics
  console.log("  → Inserting topics...");
  const insertedTopics = await db
    .insert(topics)
    .values(seedTopics.map((t) => ({ name: t.name, slug: t.slug, description: t.description })))
    .onConflictDoNothing()
    .returning({ id: topics.id, slug: topics.slug });

  // Build a slug → id map (merges newly inserted + already-existing rows)
  const allTopics = await db.select({ id: topics.id, slug: topics.slug }).from(topics);
  const topicMap = new Map(allTopics.map((t) => [t.slug, t.id]));

  const newTopics = insertedTopics.length;
  console.log(`     ${newTopics} new topic(s) inserted (${allTopics.length} total).`);

  // 2. Insert problems + steps
  console.log("  → Inserting problems and steps...");
  let newProblems = 0;
  let newSteps = 0;

  for (const p of seedProblems) {
    const topicId = topicMap.get(p.topicSlug);
    if (!topicId) {
      console.warn(`     ⚠ Topic not found for slug "${p.topicSlug}" — skipping problem "${p.slug}".`);
      continue;
    }

    const [inserted] = await db
      .insert(problems)
      .values({
        slug: p.slug,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        topicId,
        estimatedTime: p.estimatedTime,
        published: true,
      })
      .onConflictDoNothing()
      .returning({ id: problems.id });

    if (!inserted) {
      // Already exists — skip its steps too
      continue;
    }

    newProblems++;

    const stepValues = p.steps.map((s) => ({
      problemId: inserted.id,
      stepOrder: s.stepOrder,
      prompt: s.prompt,
      type: s.type,
      correctAnswer: s.correctAnswer,
      tolerance: s.tolerance ?? null,
      unit: s.unit ?? null,
      hint: s.hint ?? null,
      explanation: s.explanation ?? null,
      options: s.options ?? null,
    }));

    await db.insert(problemSteps).values(stepValues);
    newSteps += stepValues.length;
  }

  console.log(`     ${newProblems} new problem(s) inserted.`);
  console.log(`     ${newSteps} new step(s) inserted.\n`);
  console.log("✅  Seed complete.");
}

seed()
  .catch((err) => {
    console.error("❌  Seed failed:", err);
    process.exit(1);
  })
  .finally(() => client.end());
