-- ============================================================
-- EngX v2 — Starter Seed Data
-- ============================================================
-- Paste this entire file into the Supabase SQL Editor and click
-- "Run" to populate your database with starter topics, problems,
-- and problem steps.
--
-- The script is idempotent:
--   • CREATE TABLE IF NOT EXISTS — safe to re-run on an existing DB.
--   • ON CONFLICT DO NOTHING    — safe to re-run without duplicates.
-- ============================================================

-- ---------------------------------------------------------------------------
-- Schema (tables)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS profiles (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     text        NOT NULL UNIQUE,
  display_name text       NOT NULL,
  email       text        NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS topics (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  slug        text        NOT NULL UNIQUE,
  description text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS problems (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text        NOT NULL UNIQUE,
  title          text        NOT NULL,
  description    text        NOT NULL,
  difficulty     text        NOT NULL,
  topic_id       uuid        REFERENCES topics (id),
  estimated_time integer     NOT NULL DEFAULT 15,
  published      boolean     NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS problem_steps (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id     uuid        NOT NULL REFERENCES problems (id) ON DELETE CASCADE,
  step_order     integer     NOT NULL,
  prompt         text        NOT NULL,
  type           text        NOT NULL,
  correct_answer text        NOT NULL,
  tolerance      real,
  unit           text,
  hint           text,
  explanation    text,
  options        json,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attempts (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      text        NOT NULL,
  problem_id   uuid        NOT NULL REFERENCES problems (id),
  completed    boolean     NOT NULL DEFAULT false,
  score        integer     NOT NULL DEFAULT 0,
  started_at   timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS step_attempts (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id   uuid        NOT NULL REFERENCES attempts (id) ON DELETE CASCADE,
  step_id      uuid        NOT NULL REFERENCES problem_steps (id),
  answer       text        NOT NULL,
  correct      boolean     NOT NULL DEFAULT false,
  hints_used   integer     NOT NULL DEFAULT 0,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Topics
-- ---------------------------------------------------------------------------

INSERT INTO topics (id, name, slug, description)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Statics',
    'statics',
    'Equilibrium of rigid bodies, trusses, beams, and distributed loads'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Dynamics',
    'dynamics',
    'Kinematics and kinetics of particles and rigid bodies'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Circuits',
    'circuits',
    'DC and AC electrical circuits, Ohm''s Law, and network analysis'
  )
ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- Problems
-- ---------------------------------------------------------------------------

INSERT INTO problems (id, slug, title, description, difficulty, topic_id, estimated_time, published)
VALUES
  -- ── Statics ──────────────────────────────────────────────────────────────
  (
    'aaaaaaaa-0001-0001-0001-000000000001',
    'concurrent-forces-equilibrium',
    'Concurrent Forces: Particle Equilibrium',
    'Three forces act on a small ring at point A. Force F₁ = 200 N acts horizontally to the right. Force F₂ = 150 N acts vertically upward. Find the magnitude and direction of the third force F₃ required to keep the ring in equilibrium.',
    'easy',
    '11111111-1111-1111-1111-111111111111',
    12,
    true
  ),
  (
    'aaaaaaaa-0001-0001-0001-000000000002',
    'simply-supported-beam-udl',
    'Simply Supported Beam with Uniform Distributed Load',
    'A simply supported beam AB has a span of L = 8 m. It carries a uniformly distributed load (UDL) of w = 5 kN/m over its entire length. In addition, a point load P = 20 kN is applied at x = 3 m from support A. Determine the support reactions, maximum bending moment, and its location.',
    'medium',
    '11111111-1111-1111-1111-111111111111',
    25,
    true
  ),
  (
    'aaaaaaaa-0001-0001-0001-000000000003',
    'truss-method-of-joints',
    'Simple Truss: Method of Joints',
    'A simple pin-jointed truss has three members (AB, BC, AC) forming a triangle. Support A is a pin and support C is a roller. The span AC = 4 m. Joint B is at the apex, 3 m directly above the midpoint of AC. A vertical load P = 30 kN is applied at joint B downward. Determine the support reactions and member forces.',
    'hard',
    '11111111-1111-1111-1111-111111111111',
    30,
    true
  ),
  -- ── Dynamics ─────────────────────────────────────────────────────────────
  (
    'aaaaaaaa-0001-0001-0001-000000000004',
    'projectile-cliff-launch',
    'Projectile Motion: Horizontal Launch from a Cliff',
    'A ball is launched horizontally from the edge of a cliff with an initial velocity of 20 m/s. The cliff is 45 m high. Analyze the projectile motion. Use g = 9.8 m/s².',
    'easy',
    '22222222-2222-2222-2222-222222222222',
    15,
    true
  ),
  (
    'aaaaaaaa-0001-0001-0001-000000000005',
    'newtons-second-law-incline',
    'Newton''s Second Law: Block on a Frictionless Incline',
    'A 10 kg block is placed on a frictionless inclined plane at θ = 30° to the horizontal. Find the acceleration of the block and the normal force. Use g = 9.81 m/s².',
    'easy',
    '22222222-2222-2222-2222-222222222222',
    10,
    true
  ),
  -- ── Circuits ─────────────────────────────────────────────────────────────
  (
    'aaaaaaaa-0001-0001-0001-000000000006',
    'ohms-law-series-circuit',
    'Ohm''s Law: Series Circuit Analysis',
    'A series circuit consists of a 12 V battery and three resistors: R₁ = 2 Ω, R₂ = 4 Ω, and R₃ = 6 Ω. Analyze the circuit using Ohm''s Law.',
    'easy',
    '33333333-3333-3333-3333-333333333333',
    10,
    true
  ),
  (
    'aaaaaaaa-0001-0001-0001-000000000007',
    'rc-circuit-charging',
    'RC Circuit: Capacitor Charging',
    'A series RC circuit has a resistor R = 10 kΩ and a capacitor C = 100 μF connected to a 5 V DC source. The capacitor is initially uncharged. Analyze the charging behavior.',
    'medium',
    '33333333-3333-3333-3333-333333333333',
    18,
    true
  )
ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- Problem Steps
-- ---------------------------------------------------------------------------

-- ── concurrent-forces-equilibrium (4 steps) ──────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    1,
    'For the ring to be in equilibrium, what must be the x-component (horizontal) of F₃? (Positive = right)',
    'numeric',
    '-200',
    0.5,
    'N',
    'Sum of x-forces = 0. F₁ acts in the +x direction, so F₃ must balance it.',
    'ΣFₓ = 0 → F₁ + F₃ₓ = 0 → 200 + F₃ₓ = 0 → F₃ₓ = −200 N',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0001-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000001',
    2,
    'What must be the y-component (vertical) of F₃? (Positive = up)',
    'numeric',
    '-150',
    0.5,
    'N',
    'Sum of y-forces = 0. F₂ acts in the +y direction.',
    'ΣFᵧ = 0 → F₂ + F₃ᵧ = 0 → 150 + F₃ᵧ = 0 → F₃ᵧ = −150 N',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0001-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000001',
    3,
    'Calculate the magnitude of F₃.',
    'numeric',
    '250',
    1,
    'N',
    '|F₃| = √(F₃ₓ² + F₃ᵧ²)',
    '|F₃| = √(200² + 150²) = √(40000 + 22500) = √62500 = 250 N',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0001-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000001',
    4,
    'What is the angle θ that F₃ makes below the negative x-axis (measured from the negative x-axis toward the negative y-axis)?',
    'numeric',
    '36.87',
    0.5,
    '°',
    'θ = arctan(|F₃ᵧ| / |F₃ₓ|) = arctan(150/200)',
    'θ = arctan(150/200) = arctan(0.75) ≈ 36.87°. F₃ points into the third quadrant (down-left).',
    NULL
  )
ON CONFLICT DO NOTHING;

-- ── simply-supported-beam-udl (8 steps) ──────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0002-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000002',
    1,
    'Calculate the total resultant of the distributed load acting on the beam.',
    'numeric',
    '40',
    0.5,
    'kN',
    'Resultant of UDL = w × L (acts at midspan).',
    'W_total = w × L = 5 kN/m × 8 m = 40 kN. This resultant acts at x = 4 m from A.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000002',
    2,
    'Take moments about support A to find the vertical reaction Rʙ at support B.',
    'numeric',
    '27.5',
    0.5,
    'kN',
    'ΣM_A = 0 → Rʙ × 8 = W_total × 4 + P × 3. Solve for Rʙ.',
    'ΣM_A = 0: Rʙ(8) = 40(4) + 20(3) = 160 + 60 = 220 → Rʙ = 220 / 8 = 27.5 kN.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000002',
    3,
    'Using vertical equilibrium (ΣFᵧ = 0), find the reaction Rₐ at support A.',
    'numeric',
    '32.5',
    0.5,
    'kN',
    'ΣFᵧ = 0 → Rₐ + Rʙ = W_total + P. You found Rʙ in the previous step.',
    'Rₐ + Rʙ = 40 + 20 = 60 kN. Rʙ = 27.5 kN (from moments). Therefore Rₐ = 60 − 27.5 = 32.5 kN.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000002',
    4,
    'Write the shear-force expression V(x) for the region 0 ≤ x < 3 m (before the point load). Enter the shear force at x = 2 m.',
    'numeric',
    '22.5',
    0.5,
    'kN',
    'V(x) = Rₐ − w·x for the first segment. Substitute x = 2.',
    'V(x) = Rₐ − w·x = 32.5 − 5(2) = 32.5 − 10 = 22.5 kN',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000005',
    'aaaaaaaa-0001-0001-0001-000000000002',
    5,
    'At x = 3 m (just to the right of the point load P), what is the signed shear force? Use the convention: V is positive when the left-face resultant acts upward.',
    'numeric',
    '-2.5',
    0.5,
    'kN',
    'V(3⁺) = Rₐ − w(3) − P. The point load acts downward.',
    'V(3⁺) = 32.5 − 5(3) − 20 = 32.5 − 15 − 20 = −2.5 kN. The shear is positive to the left of the load and negative to the right — it changes sign at x = 3 m.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000006',
    'aaaaaaaa-0001-0001-0001-000000000002',
    6,
    'Using the shear-force expression for 3 m < x ≤ 8 m, calculate V at x = 5 m.',
    'numeric',
    '-12.5',
    0.5,
    'kN',
    'V(x) = Rₐ − P − w·x for this segment. Substitute x = 5.',
    'V(5) = 32.5 − 20 − 5(5) = 32.5 − 20 − 25 = −12.5 kN. The shear is negative throughout the region x > 3 m, confirming the maximum moment is at x = 3 m.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000007',
    'aaaaaaaa-0001-0001-0001-000000000002',
    7,
    'Calculate the maximum bending moment M_max using M(x) = Rₐ·x − (w·x²)/2 evaluated at x = 3 m (where shear crosses zero).',
    'numeric',
    '75',
    1,
    'kN·m',
    'M(3) = Rₐ(3) − w(3²)/2. Substitute Rₐ = 32.5, w = 5.',
    'M(3) = 32.5 × 3 − 5 × 9 / 2 = 97.5 − 22.5 = 75 kN·m. This is the maximum bending moment in the beam.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0002-000000000008',
    'aaaaaaaa-0001-0001-0001-000000000002',
    8,
    'Where does the maximum bending moment occur?',
    'multiple_choice',
    'At x = 3 m from support A (point of load application)',
    NULL,
    NULL,
    'Maximum bending moment occurs where shear force = 0.',
    'The shear force changes sign at x = 3 m (the location of the point load P). Where V = 0, the bending moment is at its maximum. M_max = 75 kN·m at x = 3 m.',
    '["At midspan (x = 4 m)", "At x = 3 m from support A (point of load application)", "At support A", "At support B"]'::json
  )
ON CONFLICT DO NOTHING;

-- ── truss-method-of-joints (6 steps) ─────────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0003-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000003',
    1,
    'Find the vertical reaction Rₐᵧ at pin support A.',
    'numeric',
    '15',
    0.5,
    'kN',
    'By symmetry (load at midspan), each vertical reaction = P/2.',
    'The truss is symmetric about the vertical through B. ΣM_C = 0 → Rₐᵧ(4) = 30(2) → Rₐᵧ = 60/4 = 15 kN. Rᴄᵧ = 15 kN by symmetry.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0003-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000003',
    2,
    'Find the horizontal reaction Rₐₓ at pin support A.',
    'numeric',
    '0',
    0.1,
    'kN',
    'ΣFₓ = 0. No horizontal external loads are applied.',
    'ΣFₓ = 0 → Rₐₓ = 0 (the roller at C provides no horizontal force, and no horizontal loads exist).',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0003-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000003',
    3,
    'Calculate the length of member AB. (A is at origin, B is at (2, 3).)',
    'numeric',
    '3.606',
    0.01,
    'm',
    'Use the distance formula: |AB| = √((2−0)² + (3−0)²).',
    '|AB| = √(4 + 9) = √13 ≈ 3.606 m',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0003-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000003',
    4,
    'Applying the method of joints at joint A, find the force in member AB. State the magnitude (compression is positive here).',
    'numeric',
    '18.03',
    0.1,
    'kN',
    'At joint A: ΣFᵧ = 0 → Rₐᵧ + F_AB·sinθ = 0 (θ = angle of AB above horizontal). sinθ = 3/√13.',
    'θ = arctan(3/2) ≈ 56.31°. sinθ = 3/√13, cosθ = 2/√13. ΣFᵧ = 0 at A: Rₐᵧ − F_AB·sinθ = 0 (if AB is in compression pointing away from A). 15 = F_AB × (3/√13) → F_AB = 15√13/3 = 5√13 ≈ 18.03 kN (compression).',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0003-000000000005',
    'aaaaaaaa-0001-0001-0001-000000000003',
    5,
    'Is member AB in tension or compression?',
    'multiple_choice',
    'Compression',
    NULL,
    NULL,
    'If the member pushes outward on the joint, it is in compression.',
    'Both slant members AB and BC carry the vertical load to the supports. They are squeezed between the apex load and the supports — they are in compression.',
    '["Tension", "Compression", "Zero force", "Cannot be determined"]'::json
  ),
  (
    'bbbbbbbb-0001-0001-0003-000000000006',
    'aaaaaaaa-0001-0001-0001-000000000003',
    6,
    'Find the force in member AC (the bottom chord). Use equilibrium at joint A in the x-direction.',
    'numeric',
    '10',
    0.1,
    'kN',
    'ΣFₓ = 0 at A: F_AC − F_AB·cosθ = 0. Use F_AB from the previous step.',
    'ΣFₓ = 0 at A: F_AC = F_AB·cosθ = 5√13 × (2/√13) = 10 kN. The positive result confirms AC is in tension (it pulls joint A to the right, preventing the supports from spreading apart).',
    NULL
  )
ON CONFLICT DO NOTHING;

-- ── projectile-cliff-launch (4 steps) ────────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0004-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000004',
    1,
    'Calculate the time (in seconds) it takes for the ball to reach the ground.',
    'numeric',
    '3.03',
    0.05,
    's',
    'Use the kinematic equation h = ½gt². Solve for t.',
    'Since the ball is launched horizontally, the initial vertical velocity is 0. h = ½gt² → 45 = ½(9.8)t² → t² = 9.18 → t ≈ 3.03 s',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0004-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000004',
    2,
    'What is the horizontal distance (range) traveled before the ball hits the ground?',
    'numeric',
    '60.6',
    1,
    'm',
    'x = v₀ₓ × t. You already found t.',
    'x = v₀ₓ × t = 20 m/s × 3.03 s ≈ 60.6 m',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0004-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000004',
    3,
    'What is the vertical velocity component vᵧ just before impact?',
    'numeric',
    '29.7',
    0.5,
    'm/s',
    'Use vᵧ = g × t.',
    'vᵧ = 9.8 × 3.03 ≈ 29.7 m/s (downward)',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0004-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000004',
    4,
    'Which velocity component remains constant throughout the flight?',
    'multiple_choice',
    'Horizontal velocity',
    NULL,
    NULL,
    NULL,
    'In projectile motion (no air resistance), no horizontal force acts on the projectile, so the horizontal velocity stays constant at 20 m/s.',
    '["Vertical velocity", "Horizontal velocity", "Both components", "Neither component"]'::json
  )
ON CONFLICT DO NOTHING;

-- ── newtons-second-law-incline (3 steps) ─────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0005-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000005',
    1,
    'What is the component of gravity acting parallel to (along) the incline surface?',
    'numeric',
    '49.05',
    0.5,
    'N',
    'F_parallel = m·g·sin(θ)',
    'F_parallel = 10 × 9.81 × sin(30°) = 10 × 9.81 × 0.5 = 49.05 N',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0005-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000005',
    2,
    'Applying Newton''s Second Law along the incline, find the acceleration of the block.',
    'numeric',
    '4.905',
    0.05,
    'm/s²',
    'F = ma along the incline. The only force along the incline is the gravity component.',
    'a = F_parallel / m = 49.05 / 10 = 4.905 m/s² (down the slope)',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0005-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000005',
    3,
    'What is the normal force N exerted by the incline on the block?',
    'numeric',
    '84.96',
    0.5,
    'N',
    'N = m·g·cos(θ). There is no acceleration perpendicular to the surface.',
    'N = m·g·cos(30°) = 10 × 9.81 × (√3/2) ≈ 10 × 9.81 × 0.866 ≈ 84.96 N',
    NULL
  )
ON CONFLICT DO NOTHING;

-- ── ohms-law-series-circuit (4 steps) ────────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0006-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000006',
    1,
    'What is the total resistance in the circuit?',
    'numeric',
    '12',
    0,
    'Ω',
    'For series resistors: R_total = R₁ + R₂ + R₃',
    'R_total = 2 + 4 + 6 = 12 Ω',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0006-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000006',
    2,
    'What is the current flowing through the circuit?',
    'numeric',
    '1',
    0.05,
    'A',
    'Use Ohm''s Law: I = V / R_total',
    'I = 12 V / 12 Ω = 1 A',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0006-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000006',
    3,
    'What is the voltage drop across R₂ (4 Ω)?',
    'numeric',
    '4',
    0.1,
    'V',
    'Use V = I × R for the individual resistor.',
    'V₂ = I × R₂ = 1 A × 4 Ω = 4 V',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0006-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000006',
    4,
    'Do the voltage drops across the three resistors sum to the source voltage?',
    'multiple_choice',
    'Yes — this is Kirchhoff''s Voltage Law (KVL)',
    NULL,
    NULL,
    NULL,
    'V₁ + V₂ + V₃ = 2 + 4 + 6 = 12 V = source. KVL states that the sum of voltage drops around any closed loop equals zero, which means drops equal the source.',
    '["Yes — this is Kirchhoff''s Voltage Law (KVL)", "No — only the largest resistor accounts for the voltage", "No — voltage is the same across each resistor", "Only if the resistors are identical"]'::json
  )
ON CONFLICT DO NOTHING;

-- ── rc-circuit-charging (4 steps) ────────────────────────────────────────

INSERT INTO problem_steps (id, problem_id, step_order, prompt, type, correct_answer, tolerance, unit, hint, explanation, options)
VALUES
  (
    'bbbbbbbb-0001-0001-0007-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000007',
    1,
    'Calculate the time constant τ of the circuit.',
    'numeric',
    '1',
    0.01,
    's',
    'τ = R × C. Convert units: 10 kΩ = 10,000 Ω; 100 μF = 100×10⁻⁶ F.',
    'τ = R × C = 10,000 × 100×10⁻⁶ = 1 s',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0007-000000000002',
    'aaaaaaaa-0001-0001-0001-000000000007',
    2,
    'What is the voltage across the capacitor after one time constant (t = τ)?',
    'numeric',
    '3.16',
    0.05,
    'V',
    'Vᴄ(t) = V_s(1 − e^(−t/τ)). At t = τ, e^(−1) ≈ 0.368.',
    'Vᴄ(τ) = 5(1 − e⁻¹) = 5(1 − 0.368) = 5 × 0.632 ≈ 3.16 V',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0007-000000000003',
    'aaaaaaaa-0001-0001-0001-000000000007',
    3,
    'What percentage of the final voltage does the capacitor reach after one time constant?',
    'numeric',
    '63.2',
    0.5,
    '%',
    'Percentage = (1 − e⁻¹) × 100 %',
    '(1 − e⁻¹) × 100 % ≈ 63.2 %. This is a universal result — after one time constant, any RC or RL circuit reaches 63.2 % of its final value.',
    NULL
  ),
  (
    'bbbbbbbb-0001-0001-0007-000000000004',
    'aaaaaaaa-0001-0001-0001-000000000007',
    4,
    'After how many time constants is the capacitor considered ''fully charged'' (≥ 99%)?',
    'multiple_choice',
    '5τ',
    NULL,
    NULL,
    'At 5τ, Vᴄ = V_s(1 − e⁻⁵) ≈ 0.993 V_s.',
    'At 5τ the capacitor is at 99.3 % of V_s. Engineers use 5τ as the practical ''fully charged'' threshold.',
    '["1τ", "2τ", "3τ", "5τ"]'::json
  )
ON CONFLICT DO NOTHING;
