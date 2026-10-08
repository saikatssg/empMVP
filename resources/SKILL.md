---
name: design-system-apple-in
description: >
  Apply the Apple (IN) design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for e-commerce interfaces.
---

# Apple (IN) — Design System Skill

## When to Use

- Building new UI components for Apple (IN).
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for e-commerce pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Apple (IN) — https://www.apple.com/in/store?afid=p240%7Cgo~cmp-11116556120~adg-109516736379~ad-824318968708_kwd-10778630~dev-c~ext-~prd-~mca-~nt-search&cid=aos-in-kwgo-txt-brand-brand--
- **Surface:** e-commerce
- **Audience:** Consumers and shoppers
- **Character:** Product-focused shopping experience with a rich, diverse color palette and a complementary two-font typographic system.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-6 | `#D2D2D7` | Surface |
| color-1 | `#1D1D1F` | Text Primary |
| color-4 | `#6E6E73` | Text Secondary |
| color-2 | `#0066CC` | Accent |
| color-3 | `#B64400` | Accent |
| color-5 | `#FF791B` | Accent |
| color-7 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** SF Pro Display, SF Pro Text

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 8px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 14px | Body text (default) |
| text-lg | 17px | Subheadings, emphasis |
| text-xl | 20px | Section headings |
| text-2xl | 28px | Section headings |
| text-3xl | 44px | Section headings |
| text-4xl | 80px | Section headings |

**Weight scale:** 400 · 600
**Line heights:** 84px · 32px · 16.0005px · 29.25px · 25px · 21.0012px · 12px · 20.0003px · 17px · 18.0008px · 44px · 10.8005px · 12.0002px

### Spacing

**Base unit:** 4px

`space-1: 2px` · `space-2: 3px` · `space-3: 4px` · `space-4: 6px` · `space-5: 7px` · `space-6: 8px` · `space-7: 10px` · `space-8: 14px` · `space-9: 16px` · `space-10: 18px` · `space-11: 19px` · `space-12: 20px` · `space-13: 22px` · `space-14: 24px` · `space-15: 28px` · `space-16: 38px` · `space-17: 40px` · `space-18: 41px` · `space-19: 48px` · `space-20: 62px` · `space-21: 140px`

### Shapes

**Border radius:** `radius-sm: 18px` · `radius-md: 56px`

### Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0.08) 2px 4px 12px 0px`

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `fill 0.1s linear`
- **duration-base:** `0.3s cubic-bezier(0, 0, 0.5, 1)`
- **duration-slow:** `color 0.32s cubic-bezier(0.4, 0, 0.6, 1)`
- **duration-slow:** `transform 0.5s ease-in, opacity 0.5s cubic-bezier(0.15, 0, 0.2, 1) 0.1s`

## Component Inventory

- **Buttons:** 54 detected
- **Links:** 329 detected
- **Inputs:** 1 detected
- **Navigation:** 4 elements
- **Lists:** 68 detected
- **Forms:** 1 detected
- **Images:** 179 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (18px, 56px).
- Do not stack more than one primary CTA per viewport.
- Do not use red for non-error UI — reserve it for destructive actions and warnings.
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Persuasive, benefit-driven, trustworthy. Active voice, urgency without pressure.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
