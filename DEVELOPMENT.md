# 🔧 Development Guide

## Overview

This guide provides detailed information for developers working on the Numerical Integration Scientific Platform.

---

## Architecture

### Layer Structure

```
┌─────────────────────────────────────┐
│      Pages (app/)                   │ ← User-facing routes
├─────────────────────────────────────┤
│      Components (components/)       │ ← Feature & UI components
├─────────────────────────────────────┤
│      Library (lib/)                 │ ← Business logic
├─────────────────────────────────────┤
│      Next.js / React / TypeScript   │ ← Framework layer
└─────────────────────────────────────┘
```

### Data Flow

```
User Interaction
    ↓
Component Event
    ↓
State Update (hooks)
    ↓
Library Function Call
    ↓
Computation (numerical/analytical)
    ↓
Result Display
    ↓
Chart Visualization
```

---

## Component Patterns

### UI Components (`components/ui/`)

Reusable, controlled components with consistent props:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(/* base styles */, /* variant styles */, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### Feature Components (`components/`)

Complex components combining UI elements and functionality:

```typescript
export function InteractiveSimulator(): JSX.Element {
  const [x, setX] = useState(2);
  const [n, setN] = useState(20);

  const numerical = useMemo(() => {
    return numericalMethods.rectangleRight(x, n);
  }, [x, n]);

  const analytical = useMemo(() => {
    return analyticalSolution(x);
  }, [x]);

  return (
    <section className="space-y-6">
      {/* Controls */}
      {/* Charts */}
      {/* Results Table */}
    </section>
  );
}
```

### Page Components (`app/*/page.tsx`)

Each page follows Next.js conventions:

```typescript
import type { Metadata } from 'next';
import { Component } from '@/components';

export const metadata: Metadata = {
  title: 'Page Title | Platform',
  description: 'Page description',
  keywords: ['numerical', 'integration'],
};

export default function Page(): JSX.Element {
  return (
    <>
      <Component />
    </>
  );
}
```

---

## Using Scientific Modules

### Numerical Methods

```typescript
import {
  rectangleRightMethod,
  trapezoidMethod,
  getConvergenceData,
} from "@/lib/numericalMethods";

// Single computation
const result = rectangleRightMethod(2.0, 20);
console.log(result.value); // Numerical result
console.log(result.n); // Subdivisions used
console.log(result.rectangles); // For visualization

// Compare methods
const methods = {
  rectangle: rectangleRightMethod(2.0, 20).value,
  trapezoid: trapezoidMethod(2.0, 20),
};

// Convergence analysis
const convergence = getConvergenceData(2.0, [10, 20, 50, 100], exact);
convergence.forEach((point) => {
  console.log(`n=${point.n}: error=${point.error}`);
});
```

### Analytical Solution

```typescript
import { analyticalSolution, computeError } from "@/lib/analyticalSolution";

// Get exact value
const exact = analyticalSolution(2.0); // High precision

// Compute error metrics
const numerical = 1.234;
const metrics = computeError(numerical, exact);
console.log(`Absolute: ${metrics.absoluteError}`);
console.log(`Relative: ${metrics.relativeError}`);
console.log(`Percent: ${metrics.percentError}%`);
```

### Constants & Configuration

```typescript
import { INTEGRATION_CONFIG, COLOR_PALETTE, ROUTES } from "@/lib/constants";

// Access configuration
const maxN = INTEGRATION_CONFIG.N_MAX; // 1000
const xMin = INTEGRATION_CONFIG.X_MIN; // 1
const chartColor = COLOR_PALETTE.chart.line1; // #63b3ed

// Build routes programmatically
const links = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Analytics", href: ROUTES.ANALYTICS },
];
```

### Utilities

```typescript
import {
  formatNumber,
  calculateStats,
  exportAsCSV,
  clamp,
  range,
} from "@/lib/utils";

// Format numbers
formatNumber(1.23456789, 3); // "1.235"
formatNumber(0.0001234, 3, true); // "1.234e-4"

// Statistics
const stats = calculateStats([1, 2, 3, 4, 5]);
console.log(stats.mean); // 3
console.log(stats.std); // 1.41

// Generate arrays
const values = range(1, 10, 2); // [1, 3, 5, 7, 9]
const logs = logScale(1, 100, 5); // Logarithmic scale

// Export data
const data = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
];
exportAsCSV(data, "results.csv");
```

---

## State Management

### Using React Hooks

```typescript
// Simple state
const [x, setX] = useState(2);
const [n, setN] = useState(20);

// Computed values
const numerical = useMemo(() => {
  return rectangleRightMethod(x, n).value;
}, [x, n]);

// Side effects
useEffect(() => {
  console.log("x changed:", x);
}, [x]);

// Refs for DOM access
const canvasRef = useRef<HTMLCanvasElement>(null);
```

### State Lifting Pattern

```typescript
// Parent component manages shared state
export function Dashboard(): JSX.Element {
  const [selectedMethod, setSelectedMethod] = useState('rectangle');

  return (
    <>
      <MethodSelector value={selectedMethod} onChange={setSelectedMethod} />
      <ChartView method={selectedMethod} />
      <ResultsTable method={selectedMethod} />
    </>
  );
}

// Child components receive state as props
interface ChartViewProps {
  method: string;
}

function ChartView({ method }: ChartViewProps): JSX.Element {
  return <div>{/* Chart for {method} */}</div>;
}
```

---

## Working with TailwindCSS

### Responsive Design

```typescript
// Mobile-first approach
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Heading
  </h1>
</div>

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### Using Custom Colors

```typescript
// From tailwind.config.ts
<div className="bg-bg-primary text-text-primary border border-border-light">
  <h2 className="text-accent-primary">Title</h2>
</div>
```

### Dark Mode

```typescript
// Dark mode is default, use 'dark:' prefix for dark-specific styles
<div className="bg-white dark:bg-bg-primary">
  <p className="text-gray-900 dark:text-text-primary">Text</p>
</div>
```

---

## Animation with Framer Motion

### Basic Motion

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Staggered Animation

```typescript
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item.label}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Animation

```typescript
import { useInView } from 'react-intersection-observer';

export function ScrollReveal(): JSX.Element {
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      Animates when scrolled into view
    </motion.div>
  );
}
```

---

## Charting with Recharts

### Line Chart

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const data = [
  { x: 1, error: 0.1 },
  { x: 10, error: 0.01 },
  { x: 100, error: 0.001 },
];

<LineChart width={600} height={300} data={data}>
  <CartesianGrid />
  <XAxis dataKey="x" scale="log" />
  <YAxis scale="log" />
  <Line type="monotone" dataKey="error" stroke="#63b3ed" />
</LineChart>
```

### Area Chart

```typescript
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

<AreaChart data={data}>
  <defs>
    <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#63b3ed" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#63b3ed" stopOpacity={0.1} />
    </linearGradient>
  </defs>
  <Area type="monotone" dataKey="error" fill="url(#colorError)" />
</AreaChart>
```

---

## Testing Patterns

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
describe('Analytics Page', () => {
  it('computes numerical integral', async () => {
    render(<Analytics />);
    const slider = screen.getByRole('slider');
    await userEvent.tripleClick(slider);
    // Change x value
    // Verify computation updated
  });
});
```

---

## Performance Tips

### Code Splitting

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});

export function Page(): JSX.Element {
  return <HeavyComponent />;
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from "react";

// Prevent unnecessary re-renders
const MemoizedChart = memo(ChartComponent);

// Prevent expensive recomputations
const memoized = useMemo(() => {
  return computeExpensive(data);
}, [data]);

// Prevent new function reference each render
const handleChange = useCallback((value) => {
  setState(value);
}, []);
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/chart.png"
  alt="Chart"
  width={800}
  height={400}
  priority // Load immediately
/>
```

---

## Debugging

### Console Logging

```typescript
// Development only
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", value);
}

// Using debug library
import debug from "debug";
const log = debug("app:component");
log("Component rendered");
```

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect component hierarchy and props
4. Use "Highlight Updates" to see re-renders

### Network Tab

1. Open DevTools → Network tab
2. Watch API calls and bundle sizes
3. Check waterfall for optimization opportunities

---

## Building & Deployment

### Development Build

```bash
npm run dev
# Runs on http://localhost:3000
# Hot module replacement enabled
```

### Production Build

```bash
npm run build
# Creates optimized bundle
# Type checking and linting

npm run start
# Runs production build
```

### Analytics

```bash
npm run build
# Check .next/static/ for bundle analysis
# Use Next.js analytics tools
```

---

## Common Tasks

### Add New Page

1. Create `app/route-name/page.tsx`
2. Add metadata export
3. Import components
4. Update Navbar links
5. Add route to constants.ts

### Add New Component

1. Create `components/ComponentName.tsx`
2. Export function component
3. Add TypeScript interface for props
4. Use consistent styling with TailwindCSS
5. Export from `components/index.ts` if needed

### Modify Numerical Method

1. Edit `lib/numericalMethods.ts`
2. Update calculations
3. Test with known values
4. Update convergence tests
5. Verify error metrics

### Update Design

1. Modify `tailwind.config.ts` for colors/spacing
2. Update `lib/constants.ts` for theme
3. Apply new classes to components
4. Test responsive design
5. Verify accessibility

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Recharts Docs](https://recharts.org)

---

## Best Practices

✅ **Do:**

- Use TypeScript for type safety
- Write components as functions
- Keep components small and focused
- Use meaningful variable names
- Document complex logic
- Test responsive design
- Optimize images
- Use semantic HTML

❌ **Don't:**

- Use `any` type
- Mix inline styles with classes
- Create deeply nested components
- Ignore accessibility
- Over-engineer solutions
- Hard-code values
- Ignore performance
- Skip testing

---

Last Updated: May 2026
