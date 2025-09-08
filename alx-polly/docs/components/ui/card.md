## Card

Composable primitives for building card UIs.

- **Exports**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- **Source**: `components/ui/card.tsx`

### Import
```tsx
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
```

### Elements
- **Card**: Container element. Accepts `React.HTMLAttributes<HTMLDivElement>`
- **CardHeader**: Top section; typically includes `CardTitle` and `CardDescription`
- **CardTitle**: Heading element
- **CardDescription**: Subtext description
- **CardContent**: Main content area
- **CardFooter**: Actions or metadata area

All components accept `className` for custom styling and spread remaining props to their underlying elements.

### Examples

Basic card:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Poll results</CardTitle>
    <CardDescription>Live updates as votes come in</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="text-sm text-muted-foreground">No results yet.</div>
  </CardContent>
  <CardFooter>
    <span className="text-xs text-muted-foreground">Updated just now</span>
  </CardFooter>
  
</Card>
```

With actions:
```tsx
import { Button } from "@/components/ui/button";

<Card className="max-w-md">
  <CardHeader>
    <CardTitle>Create a new poll</CardTitle>
    <CardDescription>Add a question and options</CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-3">
      <input className="w-full h-10 rounded-md border px-3 text-sm" placeholder="Question" />
      <input className="w-full h-10 rounded-md border px-3 text-sm" placeholder="Option 1" />
      <input className="w-full h-10 rounded-md border px-3 text-sm" placeholder="Option 2" />
    </form>
  </CardContent>
  <CardFooter>
    <Button>Create</Button>
  </CardFooter>
  
</Card>
```

### Accessibility
- Semantic elements: `CardTitle` uses `h3`, descriptions use `p`
- Provide higher-level heading context when multiple cards appear on a page

