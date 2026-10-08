# Apple (IN)

## Overview

**Product:** Apple (IN)
**URL:** https://www.apple.com/in/store?afid=p240%7Cgo~cmp-11116556120~adg-109516736379~ad-824318968708_kwd-10778630~dev-c~ext-~prd-~mca-~nt-search&cid=aos-in-kwgo-txt-brand-brand--
**Surface type:** e-commerce
**Audience:** Consumers and shoppers
**Brand character:** Product-focused shopping experience with a rich, diverse color palette and a complementary two-font typographic system.

### Design Principles

- Trust signals first — credibility reduces friction more than clever copy.
- Clear path to action — one primary CTA per view, never stacked.
- Speed over polish — perceived performance is part of the design system.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-6 | `#D2D2D7` | Surface |
| color-1 | `#1D1D1F` | Text Primary |
| color-4 | `#6E6E73` | Text Secondary |
| color-2 | `#0066CC` | Accent |
| color-3 | `#B64400` | Accent |
| color-5 | `#FF791B` | Accent |
| color-7 | `#FFFFFF` | Text Light |

## Typography

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

## Spacing

**Base unit:** 4px

`space-1: 2px` · `space-2: 3px` · `space-3: 4px` · `space-4: 6px` · `space-5: 7px` · `space-6: 8px` · `space-7: 10px` · `space-8: 14px` · `space-9: 16px` · `space-10: 18px` · `space-11: 19px` · `space-12: 20px` · `space-13: 22px` · `space-14: 24px` · `space-15: 28px` · `space-16: 38px` · `space-17: 40px` · `space-18: 41px` · `space-19: 48px` · `space-20: 62px` · `space-21: 140px`

## Shapes

**Border radius:** `radius-sm: 18px` · `radius-md: 56px`

## Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0.08) 2px 4px 12px 0px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `fill 0.1s linear`
- **duration-base:** `0.3s cubic-bezier(0, 0, 0.5, 1)`
- **duration-slow:** `color 0.32s cubic-bezier(0.4, 0, 0.6, 1)`
- **duration-slow:** `transform 0.5s ease-in, opacity 0.5s cubic-bezier(0.15, 0, 0.2, 1) 0.1s`

## Components

- **Buttons:** 54 detected
- **Links:** 329 detected
- **Inputs:** 1 detected
- **Navigation:** 4 elements
- **Lists:** 68 detected
- **Forms:** 1 detected
- **Images:** 179 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (18px, 56px).
- Do not stack more than one primary CTA per viewport.
- Do not use red for non-error UI — reserve it for destructive actions and warnings.
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Persuasive, benefit-driven, trustworthy. Active voice, urgency without pressure.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 54 detected
- **Links:** 329 detected
- **Inputs:** 1 detected
- **Navigation:** 4 elements
- **Lists:** 68 detected
- **Forms:** 1 detected
- **Images:** 179 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
