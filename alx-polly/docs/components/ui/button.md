## Button

Reusable button component with variant and size options, built with class-variance-authority and Radix Slot for `asChild` composition.

- **Exports**: `Button`, `buttonVariants`, `ButtonProps`
- **Source**: `components/ui/button.tsx`

### Import
```tsx
import { Button } from "@/components/ui/button";
```

### Props
- **variant**: "default" | "secondary" | "outline" | "ghost" | "link" (default: "default")
- **size**: "default" | "sm" | "lg" | "icon" (default: "default")
- **asChild**: boolean; when true, renders the child component instead of a `<button>` while preserving styles
- All standard `React.ButtonHTMLAttributes<HTMLButtonElement>` are supported

### Examples

Basic usage:
```tsx
<Button>Click me</Button>
```

Variants and sizes:
```tsx
<div className="flex gap-2 flex-wrap">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>

  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>
  <Button size="icon" aria-label="Settings">
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" fill="currentColor" />
    </svg>
  </Button>
  
  <Button disabled>Disabled</Button>
  <Button type="submit">Submit</Button>
  <Button type="button">Button</Button>
  <Button type="reset">Reset</Button>
  <Button className="w-full">Full width</Button>
</div>
```

Using `asChild` with `next/link`:
```tsx
import Link from "next/link";

<Button asChild>
  <Link href="/polls/new">Create a poll</Link>
  {/* Renders an anchor element styled like a button */}
</Button>
```

Programmatic click handlers:
```tsx
<Button onClick={() => console.log("clicked")}>Log</Button>
```

Accessing styles directly with `buttonVariants` (advanced):
```tsx
import { buttonVariants } from "@/components/ui/button";

<a className={buttonVariants({ variant: "outline", size: "sm" })} href="#">
  Styled link
</a>
```

### Accessibility
- Keyboard focus styles are enabled via `focus-visible` ring utilities
- Provide `aria-label` for icon-only buttons (size `icon`)

