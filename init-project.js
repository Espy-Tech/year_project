const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// File templates object with paths and content
const files = {
  // lib files
  'lib/constants.ts': `/**
 * Configuration constants and color palette for the Numerical Integration Platform
 */

export const APP_CONFIG = {
  name: "Numerical Integration Platform",
  version: "1.0.0",
  description: "Premium Scientific Platform for Numerical Integration Analysis",
  author: "Scientific Computing Team",
  year: new Date().getFullYear(),
};

/**
 * Color Palette - Premium Blue & Tech Theme
 */
export const COLORS = {
  // Primary colors
  primary: "#0066FF",
  primaryLight: "#E6F0FF",
  primaryDark: "#0052CC",

  // Secondary colors
  secondary: "#00D9FF",
  secondaryLight: "#E0F7FF",
  secondaryDark: "#00A8CC",

  // Accent colors
  accent: "#FF6B35",
  accentLight: "#FFE5D9",
  accentDark: "#CC5428",

  // Neutral colors
  background: "#FFFFFF",
  surface: "#F5F7FA",
  surfaceAlt: "#EBF0F7",
  border: "#D4DFE8",
  text: "#1A1F3A",
  textSecondary: "#6B7A8F",
  textTertiary: "#9BA8B8",

  // Status colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Gradients
  gradientPrimary: "linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)",
  gradientAccent: "linear-gradient(135deg, #FF6B35 0%, #FF9F43 100%)",
  gradientDark: "linear-gradient(135deg, #1A1F3A 0%, #0052CC 100%)",
};

/**
 * Typography scale
 */
export const TYPOGRAPHY = {
  h1: "3.5rem", // 56px
  h2: "2.75rem", // 44px
  h3: "2.25rem", // 36px
  h4: "1.875rem", // 30px
  h5: "1.5rem", // 24px
  h6: "1.25rem", // 20px
  body: "1rem", // 16px
  small: "0.875rem", // 14px
  xs: "0.75rem", // 12px
};

/**
 * Spacing scale
 */
export const SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
  "4xl": "4rem", // 64px
};

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "1rem",
  xl: "1.5rem",
  full: "9999px",
};

/**
 * Shadow definitions
 */
export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Animation durations
 */
export const ANIMATIONS = {
  fast: "150ms",
  base: "250ms",
  slow: "350ms",
  slower: "500ms",
};

/**
 * Easing functions
 */
export const EASING = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
};

/**
 * Z-index scale for layering
 */
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};

/**
 * Numerical Integration Methods Configuration
 */
export const INTEGRATION_CONFIG = {
  DEFAULT_INTERVALS: 1000,
  MIN_INTERVALS: 10,
  MAX_INTERVALS: 10000,
  STEP_INTERVALS: 10,
  
  DEFAULT_A: 0,
  DEFAULT_B: Math.PI,
  MIN_BOUND: -100,
  MAX_BOUND: 100,
  
  DEFAULT_METHOD: "rectangle",
  
  PRECISION_DECIMALS: 6,
};

/**
 * Chart configuration
 */
export const CHART_CONFIG = {
  colors: [COLORS.primary, COLORS.secondary, COLORS.accent],
  height: 400,
  margin: { top: 20, right: 30, left: 20, bottom: 20 },
};

/**
 * API Response messages
 */
export const MESSAGES = {
  success: "Operation completed successfully",
  error: "An error occurred. Please try again.",
  loading: "Loading...",
  empty: "No data available",
};`,
};

// Create directories and files
function createDirectoryStructure() {
  // Get unique directories
  const dirs = new Set();
  Object.keys(files).forEach(filePath => {
    const dir = path.dirname(filePath);
    if (dir !== '.') dirs.add(dir);
  });

  // Create all directories
  dirs.forEach(dir => {
    const dirPath = path.join(baseDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(\`✓ Created directory: \${dir}\`);
    }
  });

  // Create all files
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(baseDir, filePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(\`✓ Created file: \${filePath}\`);
    } else {
      console.log(\`⊘ File already exists: \${filePath}\`);
    }
  });
}

try {
  createDirectoryStructure();
  console.log('\\n✓ Setup completed successfully!');
} catch (error) {
  console.error('Error during setup:', error.message);
  process.exit(1);
}
`,
  'lib/utils.ts': `/**
 * Utility functions for formatting and calculations
 */

/**
 * Formats a number to a specified number of decimal places
 */
export const formatNumber = (value: number, decimals: number = 6): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Formats a number for display with comma separators
 */
export const formatDisplay = (value: number, decimals: number = 6): string => {
  const formatted = formatNumber(value, decimals);
  return formatted.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Calculates the percentage error between approximate and exact values
 */
export const calculateError = (approximate: number, exact: number): number => {
  if (exact === 0) return 0;
  return Math.abs((approximate - exact) / exact) * 100;
};

/**
 * Generates an array of numbers within a range
 */
export const generateRange = (start: number, end: number, step: number): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(parseFloat(i.toFixed(10)));
  }
  return result;
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Validates numerical input
 */
export const isValidNumber = (value: any): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

/**
 * Converts degrees to radians
 */
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Converts radians to degrees
 */
export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

/**
 * Calculates mean of an array of numbers
 */
export const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

/**
 * Calculates standard deviation
 */
export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length < 2) return 0;
  const mean = calculateMean(values);
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / (values.length - 1);
  return Math.sqrt(variance);
};

/**
 * Rounds a number to nearest n
 */
export const roundToNearest = (value: number, nearest: number): number => {
  return Math.round(value / nearest) * nearest;
};

/**
 * Checks if a number is prime
 */
export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

/**
 * Factorial calculation
 */
export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Combination calculation nCr
 */
export const combination = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

/**
 * Permutation calculation nPr
 */
export const permutation = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  return factorial(n) / factorial(n - r);
};
`,
  'lib/numericalMethods.ts': `/**
 * Rectangle Method implementation for numerical integration
 * Supports left, right, and midpoint variants
 */

export type RectangleMethodType = 'left' | 'right' | 'midpoint';

export interface IntegrationResult {
  value: number;
  intervals: number;
  method: string;
  error?: number;
}

/**
 * Rectangle Method - Left endpoint
 */
export const rectangleMethodLeft = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Left)',
  };
};

/**
 * Rectangle Method - Right endpoint
 */
export const rectangleMethodRight = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Right)',
  };
};

/**
 * Rectangle Method - Midpoint
 */
export const rectangleMethodMidpoint = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + (i + 0.5) * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Rectangle (Midpoint)',
  };
};

/**
 * Trapezoidal Rule
 */
export const trapezoidalRule = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  const h = (b - a) / n;
  let sum = (func(a) + func(b)) / 2;

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  const result = h * sum;

  return {
    value: result,
    intervals: n,
    method: 'Trapezoidal Rule',
  };
};

/**
 * Simpson's 1/3 Rule
 */
export const simpsonsRule = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationResult => {
  // Ensure n is even
  const intervals = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / intervals;
  
  let sum = func(a) + func(b);
  
  // Sum odd indices (coefficient 4)
  for (let i = 1; i < intervals; i += 2) {
    const x = a + i * h;
    sum += 4 * func(x);
  }
  
  // Sum even indices (coefficient 2)
  for (let i = 2; i < intervals; i += 2) {
    const x = a + i * h;
    sum += 2 * func(x);
  }

  const result = (h / 3) * sum;

  return {
    value: result,
    intervals,
    method: "Simpson's 1/3 Rule",
  };
};

/**
 * Generic rectangle method wrapper
 */
export const rectangleMethod = (
  func: (x: number) => number,
  a: number,
  b: number,
  n: number,
  type: RectangleMethodType = 'midpoint'
): IntegrationResult => {
  switch (type) {
    case 'left':
      return rectangleMethodLeft(func, a, b, n);
    case 'right':
      return rectangleMethodRight(func, a, b, n);
    case 'midpoint':
    default:
      return rectangleMethodMidpoint(func, a, b, n);
  }
};

/**
 * Adaptive integration that refines the result
 */
export const adaptiveIntegration = (
  func: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-6,
  maxIterations: number = 50
): IntegrationResult => {
  let n = 10;
  let prevResult = trapezoidalRule(func, a, b, n);
  
  for (let i = 0; i < maxIterations; i++) {
    n *= 2;
    const currentResult = trapezoidalRule(func, a, b, n);
    
    const error = Math.abs(currentResult.value - prevResult.value);
    if (error < tolerance) {
      return { ...currentResult, error };
    }
    
    prevResult = currentResult;
  }

  return { ...prevResult, error: tolerance };
};
`,
  'lib/analyticalSolution.ts': `/**
 * Analytical solutions and exact integration methods
 * Includes Gauss-Legendre quadrature for high-precision calculations
 */

/**
 * Gauss-Legendre quadrature nodes and weights
 * These are pre-calculated for different orders
 */
export const gaussLegendreNodes = {
  1: { nodes: [0.0], weights: [2.0] },
  2: {
    nodes: [-0.5773502691896257, 0.5773502691896257],
    weights: [1.0, 1.0],
  },
  3: {
    nodes: [-0.7745966692414834, 0.0, 0.7745966692414834],
    weights: [0.5555555555555556, 0.8888888888888888, 0.5555555555555556],
  },
  4: {
    nodes: [
      -0.8617953335222007, -0.3399810435848563, 0.3399810435848563,
      0.8617953335222007,
    ],
    weights: [
      0.3478548451374639, 0.6521451548625461, 0.6521451548625461,
      0.3478548451374639,
    ],
  },
  5: {
    nodes: [
      -0.9061798459386640, -0.5384693101056831, 0.0, 0.5384693101056831,
      0.9061798459386640,
    ],
    weights: [
      0.2369268850561891, 0.4786286704993665, 0.5688888888888889,
      0.4786286704993665, 0.2369268850561891,
    ],
  },
};

export interface GaussQuadratureResult {
  value: number;
  order: number;
  method: string;
}

/**
 * Gauss-Legendre Quadrature (transforms [-1,1] interval to [a,b])
 */
export const gaussLegendreQuadrature = (
  func: (x: number) => number,
  a: number,
  b: number,
  order: number = 5
): GaussQuadratureResult => {
  const data = gaussLegendreNodes[order as keyof typeof gaussLegendreNodes];
  
  if (!data) {
    throw new Error(\`Gauss-Legendre order \${order} not supported. Use 1-5.\`);
  }

  // Transform integral from [-1, 1] to [a, b]
  // Integral from a to b = (b-a)/2 * Integral from -1 to 1
  const c = (b - a) / 2;
  const d = (a + b) / 2;

  let result = 0;
  for (let i = 0; i < data.nodes.length; i++) {
    const x = c * data.nodes[i] + d;
    result += data.weights[i] * func(x);
  }

  return {
    value: c * result,
    order,
    method: \`Gauss-Legendre (Order \${order})\`,
  };
};

/**
 * Analytical solution for common integrals
 */
export const analyticalSolutions = {
  /**
   * ∫ x^n from a to b
   */
  powerFunction: (n: number, a: number, b: number): number => {
    if (n === -1) {
      return Math.log(Math.abs(b / a));
    }
    return (Math.pow(b, n + 1) - Math.pow(a, n + 1)) / (n + 1);
  },

  /**
   * ∫ sin(x) from a to b
   */
  sine: (a: number, b: number): number => {
    return -Math.cos(b) + Math.cos(a);
  },

  /**
   * ∫ cos(x) from a to b
   */
  cosine: (a: number, b: number): number => {
    return Math.sin(b) - Math.sin(a);
  },

  /**
   * ∫ e^x from a to b
   */
  exponential: (a: number, b: number): number => {
    return Math.exp(b) - Math.exp(a);
  },

  /**
   * ∫ 1/x from a to b (for a, b > 0)
   */
  reciprocal: (a: number, b: number): number => {
    if (a <= 0 || b <= 0) {
      throw new Error('Arguments must be positive for reciprocal integral');
    }
    return Math.log(b / a);
  },

  /**
   * ∫ sqrt(x) from a to b
   */
  squareRoot: (a: number, b: number): number => {
    return (2 / 3) * (Math.pow(b, 1.5) - Math.pow(a, 1.5));
  },

  /**
   * ∫ 1/(1+x^2) from a to b
   */
  arctangent: (a: number, b: number): number => {
    return Math.atan(b) - Math.atan(a);
  },
};

/**
 * Get analytical solution if available
 */
export const getAnalyticalSolution = (
  functionType: string,
  a: number,
  b: number
): number | null => {
  const solution =
    analyticalSolutions[functionType as keyof typeof analyticalSolutions];
  
  if (solution) {
    try {
      return solution(a, b);
    } catch {
      return null;
    }
  }
  
  return null;
};

/**
 * Common test functions for integration
 */
export const testFunctions = {
  /**
   * f(x) = x^2
   */
  quadratic: (x: number) => x * x,

  /**
   * f(x) = sin(x)
   */
  sine: (x: number) => Math.sin(x),

  /**
   * f(x) = cos(x)
   */
  cosine: (x: number) => Math.cos(x),

  /**
   * f(x) = e^x
   */
  exponential: (x: number) => Math.exp(x),

  /**
   * f(x) = 1/(1+x^2)
   */
  arctangent: (x: number) => 1 / (1 + x * x),

  /**
   * f(x) = sqrt(x)
   */
  squareRoot: (x: number) => Math.sqrt(Math.abs(x)),

  /**
   * f(x) = 1/x
   */
  reciprocal: (x: number) => (x !== 0 ? 1 / x : 0),

  /**
   * f(x) = e^(-x^2) - Gaussian
   */
  gaussian: (x: number) => Math.exp(-(x * x)),
};

/**
 * Calculate relative error
 */
export const calculateRelativeError = (
  approximate: number,
  exact: number
): number => {
  if (exact === 0) return 0;
  return Math.abs((approximate - exact) / exact) * 100;
};
`,
};

// Write to file - simple approach for now
const initContent = Object.entries(files)
  .map(([path, content]) => ({ path, content }))
  .map(f => \`{\n  path: "\${f.path}",\n  content: ...\n}\`)
  .join(',\\n');

module.exports = { files, initContent };
`,
  'lib/index.ts': `export * from './constants';
export * from './utils';
export * from './numericalMethods';
export * from './analyticalSolution';
`,
};

// Execute creation
function createDirectoryStructure() {
  // Get unique directories
  const dirs = new Set();
  Object.keys(files).forEach(filePath => {
    const dir = path.dirname(filePath);
    if (dir !== '.') dirs.add(dir);
  });

  // Create all directories
  dirs.forEach(dir => {
    const dirPath = path.join(baseDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(\`✓ Created directory: \${dir}\`);
    }
  });

  // Create all files
  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(baseDir, filePath);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(\`✓ Created file: \${filePath}\`);
    }
  });
}

try {
  createDirectoryStructure();
  console.log('\\n✅ Setup completed successfully!');
} catch (error) {
  console.error('❌ Error during setup:', error.message);
  process.exit(1);
}
`,
  'components/index.ts': `export { default as Navbar } from './Navbar';
export { default as HeroSection } from './HeroSection';
export { default as FormulaSection } from './FormulaSection';
export { default as InteractiveSimulator } from './InteractiveSimulator';
export { default as ChartsDashboard } from './ChartsDashboard';
export { default as RecruiterSection } from './RecruiterSection';
export { default as DocumentationCenter } from './DocumentationCenter';
export { default as Footer } from './Footer';
`,
  'components/ui/index.ts': `export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Slider } from './Slider';
export { default as Table } from './Table';
`,
};

// Create directories
const dirs = new Set();
Object.keys(files).forEach(filePath => {
  const dir = path.dirname(filePath);
  if (dir !== '.') dirs.add(dir);
});

dirs.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(\`✓ Created directory: \${dir}\`);
  }
});

// Create files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(\`✓ Created file: \${filePath}\`);
  }
});

console.log('\\n✅ Full setup completed successfully!');
`,
  'create-project-files.js': `const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

const files = {
  'lib/utils.ts': \`/**\\n * Utility functions for formatting and calculations\\n */\\n\\nexport const formatNumber = (value: number, decimals: number = 6): number => {\\n  const factor = Math.pow(10, decimals);\\n  return Math.round(value * factor) / factor;\\n};\\n\\nexport const formatDisplay = (value: number, decimals: number = 6): string => {\\n  const formatted = formatNumber(value, decimals);\\n  return formatted.toLocaleString('en-US', {\\n    minimumFractionDigits: decimals,\\n    maximumFractionDigits: decimals,\\n  });\\n};\\n\\nexport const calculateError = (approximate: number, exact: number): number => {\\n  if (exact === 0) return 0;\\n  return Math.abs((approximate - exact) / exact) * 100;\\n};\\n\\nexport const generateRange = (start: number, end: number, step: number): number[] => {\\n  const result: number[] = [];\\n  for (let i = start; i <= end; i += step) {\\n    result.push(parseFloat(i.toFixed(10)));\\n  }\\n  return result;\\n};\\n\`,
};

// Rest of the implementation...`,
};

// Only keep the create file with the main content structure
const mainSetupFile = \`const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// All file contents will be created here
const files = {};

// Create directories
const dirs = ['lib', 'app', 'components/ui', 'public/assets'];
dirs.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  fs.mkdirSync(dirPath, { recursive: true });
});

console.log('Directories created!');
\`;
