# GC Design System Tokens Documentation

This document outlines the official design tokens from the Government of Canada Design System that should be used in our application to ensure consistency, accessibility, and compliance with GC standards.

## Table of Contents
- [Colors](#colors)
  - [Base Colors](#base-colors)
  - [Text Colors](#text-colors)
  - [Background Colors](#background-colors)
  - [Border Colors](#border-colors)
  - [Interactive Element Colors](#interactive-element-colors)
- [Spacing](#spacing)
  - [Spacing Scale](#spacing-scale)
  - [Usage Guidelines](#usage-guidelines)
- [Typography](#typography)
  - [Font Family](#font-family)
  - [Font Sizes](#font-sizes)
  - [Font Weights](#font-weights)
  - [Line Heights](#line-heights)
  - [Text Styles](#text-styles)
- [Implementation](#implementation)
  - [CSS Custom Properties](#css-custom-properties)
  - [Tailwind Configuration](#tailwind-configuration)

## Colors

The GC Design System provides a standardized color palette that ensures consistency across government applications and compliance with accessibility standards.

### Base Colors

These core colors form the foundation of the Government of Canada's visual identity:

| Token | Hex Value | Description |
|-------|-----------|-------------|
| `--gc-blue` | `#26374A` | The primary blue used across Government of Canada websites |
| `--gc-red` | `#B10E1E` | The red used for the Canadian flag and error states |
| `--gc-white` | `#FFFFFF` | White background used throughout |
| `--gc-black` | `#000000` | Used for primary text |
| `--gc-nav-blue` | `#1C578A` | Used for navigation elements |
| `--gc-accent-blue` | `#2B8CC4` | Used for interactive elements and accents |
| `--gc-dark-blue` | `#1C3150` | Darker blue for contrast elements |

### Text Colors

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--text-primary` | `#333333` | Primary text color |
| `--text-secondary` | `#5C5C5C` | Secondary, less emphasized text |
| `--text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--text-link` | `#2B8CC4` | Link text in default state |
| `--text-link-visited` | `#7834BC` | Visited link text |
| `--text-link-hover` | `#0535D2` | Link text on hover |
| `--text-error` | `#D3080C` | Error text |

### Background Colors

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--bg-primary` | `#FFFFFF` | Primary background color |
| `--bg-secondary` | `#F5F5F5` | Secondary background, used for alternating sections |
| `--bg-accent` | `#EEE7E3` | Light accent background |
| `--bg-dark` | `#26374A` | Dark background for contrast sections |
| `--bg-footer` | `#26374A` | Footer background |
| `--bg-header` | `#FFFFFF` | Header background |
| `--bg-error` | `#F8D7DA` | Error message background |
| `--bg-success` | `#DFF0D8` | Success message background |
| `--bg-warning` | `#FCF8E3` | Warning message background |
| `--bg-info` | `#D9EDF7` | Information message background |

### Border Colors

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--border-primary` | `#CCCCCC` | Primary border color |
| `--border-accent` | `#26374A` | Accent/emphasized border |
| `--border-light` | `#E5E5E5` | Light, subtle borders |
| `--border-error` | `#D3080C` | Error state borders |

### Interactive Element Colors

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--btn-primary-bg` | `#26374A` | Primary button background |
| `--btn-primary-text` | `#FFFFFF` | Primary button text |
| `--btn-primary-hover` | `#1C578A` | Primary button hover state |
| `--btn-secondary-bg` | `#FFFFFF` | Secondary button background |
| `--btn-secondary-text` | `#26374A` | Secondary button text |
| `--btn-secondary-border` | `#26374A` | Secondary button border |
| `--focus-outline` | `#FFBF47` | Focus state outline |

## Spacing

The GC Design System uses a consistent spacing scale to maintain visual rhythm throughout interfaces.

### Spacing Scale

| Token | Value (rem) | Value (px) | Description |
|-------|-------------|------------|-------------|
| `--space-none` | `0` | `0px` | No spacing |
| `--space-1` | `0.25rem` | `4px` | Extra small spacing |
| `--space-2` | `0.5rem` | `8px` | Small spacing |
| `--space-3` | `0.75rem` | `12px` | Small-medium spacing |
| `--space-4` | `1rem` | `16px` | Base spacing unit |
| `--space-5` | `1.5rem` | `24px` | Medium spacing |
| `--space-6` | `2rem` | `32px` | Medium-large spacing |
| `--space-7` | `2.5rem` | `40px` | Large spacing |
| `--space-8` | `3rem` | `48px` | Extra large spacing |
| `--space-9` | `4rem` | `64px` | 2x large spacing |
| `--space-10` | `5rem` | `80px` | 3x large spacing |
| `--space-11` | `6rem` | `96px` | 4x large spacing |
| `--space-12` | `8rem` | `128px` | Maximum spacing |

### Usage Guidelines

- Use `--space-4` (1rem/16px) as the base unit for most spacing concerns
- Maintain consistent vertical rhythm with predictable spacing between elements
- Use smaller spacing values (`--space-1` to `--space-3`) for related elements
- Use larger spacing values (`--space-5` to `--space-8`) between distinct sections
- Ensure adequate whitespace around interactive elements for improved usability
- Maintain consistent spacing in responsive layouts, adjusting as needed for smaller screens

## Typography

The GC Design System uses a carefully selected typography system to ensure readability, accessibility, and consistency.

### Font Family

| Token | Value | Usage |
|-------|-------|-------|
| `--font-primary` | `'Noto Sans', Helvetica, Arial, sans-serif` | Primary font for all text |
| `--font-mono` | `'Noto Mono', monospace` | Monospace font for code snippets |

### Font Sizes

| Token | Value (rem) | Value (px) | Usage |
|-------|-------------|------------|-------|
| `--text-xs` | `0.75rem` | `12px` | Extra small text (use sparingly) |
| `--text-sm` | `0.875rem` | `14px` | Small text, footnotes, captions |
| `--text-base` | `1rem` | `16px` | Base body text size |
| `--text-lg` | `1.125rem` | `18px` | Large body text |
| `--text-xl` | `1.25rem` | `20px` | Extra large body text |
| `--text-2xl` | `1.5rem` | `24px` | Small headings |
| `--text-3xl` | `1.875rem` | `30px` | Medium headings |
| `--text-4xl` | `2.25rem` | `36px` | Large headings |
| `--text-5xl` | `3rem` | `48px` | Extra large headings |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-normal` | `400` | Regular text |
| `--font-medium` | `500` | Slightly emphasized text |
| `--font-semibold` | `600` | Semi-bold text for subheadings |
| `--font-bold` | `700` | Bold text for headings |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-none` | `1` | No leading, used for display text |
| `--leading-tight` | `1.25` | Tight leading, used for headings |
| `--leading-snug` | `1.375` | Slightly tighter than normal |
| `--leading-normal` | `1.5` | Normal leading for body text |
| `--leading-relaxed` | `1.625` | Slightly more relaxed leading |
| `--leading-loose` | `2` | Very relaxed leading |

### Text Styles

#### Headings

| Element | Font Size | Font Weight | Line Height | Margin |
|---------|-----------|-------------|------------|--------|
| `h1` | `--text-4xl` or `--text-5xl` | `--font-bold` | `--leading-tight` | `--space-6` bottom |
| `h2` | `--text-3xl` | `--font-bold` | `--leading-tight` | `--space-5` bottom |
| `h3` | `--text-2xl` | `--font-semibold` | `--leading-tight` | `--space-4` bottom |
| `h4` | `--text-xl` | `--font-semibold` | `--leading-tight` | `--space-3` bottom |
| `h5` | `--text-lg` | `--font-semibold` | `--leading-tight` | `--space-2` bottom |
| `h6` | `--text-base` | `--font-semibold` | `--leading-tight` | `--space-2` bottom |

#### Body Text

| Element | Font Size | Font Weight | Line Height | Margin |
|---------|-----------|-------------|------------|--------|
| `p` | `--text-base` | `--font-normal` | `--leading-normal` | `--space-4` bottom |
| `li` | `--text-base` | `--font-normal` | `--leading-normal` | `--space-2` bottom |
| `small` | `--text-sm` | `--font-normal` | `--leading-normal` | - |

## Implementation

### CSS Custom Properties

To implement these design tokens in your project, you can define CSS custom properties (variables) in your root stylesheet:

```css
:root {
  /* Colors */
  --gc-blue: #26374A;
  --gc-red: #B10E1E;
  --gc-white: #FFFFFF;
  --gc-black: #000000;
  --gc-nav-blue: #1C578A;
  --gc-accent-blue: #2B8CC4;
  --gc-dark-blue: #1C3150;
  
  /* Text colors */
  --text-primary: #333333;
  --text-secondary: #5C5C5C;
  --text-inverse: #FFFFFF;
  --text-link: #2B8CC4;
  --text-link-visited: #7834BC;
  --text-link-hover: #0535D2;
  --text-error: #D3080C;
  
  /* Background colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --bg-accent: #EEE7E3;
  --bg-dark: #26374A;
  --bg-footer: #26374A;
  --bg-header: #FFFFFF;
  
  /* Border colors */
  --border-primary: #CCCCCC;
  --border-accent: #26374A;
  --border-light: #E5E5E5;
  --border-error: #D3080C;
  
  /* Spacing */
  --space-none: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 2.5rem;
  --space-8: 3rem;
  --space-9: 4rem;
  --space-10: 5rem;
  --space-11: 6rem;
  --space-12: 8rem;
  
  /* Typography */
  --font-primary: 'Noto Sans', Helvetica, Arial, sans-serif;
  --font-mono: 'Noto Mono', monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Tailwind Configuration

If you're using Tailwind CSS, here's how to configure your `tailwind.config.js` file to incorporate these design tokens:

```js
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'gc-blue': '#26374A',
      'gc-red': '#B10E1E',
      'gc-white': '#FFFFFF',
      'gc-black': '#000000',
      'gc-nav-blue': '#1C578A',
      'gc-accent-blue': '#2B8CC4',
      'gc-dark-blue': '#1C3150',
      // Text colors
      text: {
        primary: '#333333',
        secondary: '#5C5C5C',
        inverse: '#FFFFFF',
        link: '#2B8CC4',
        'link-visited': '#7834BC',
        'link-hover': '#0535D2',
        error: '#D3080C',
      },
      // Background colors
      bg: {
        primary: '#FFFFFF',
        secondary: '#F5F5F5',
        accent: '#EEE7E3',
        dark: '#26374A',
        footer: '#26374A',
        header: '#FFFFFF',
        error: '#F8D7DA',
        success: '#DFF0D8',
        warning: '#FCF8E3',
        info: '#D9EDF7',
      },
      // Border colors
      border: {
        primary: '#CCCCCC',
        accent: '#26374A',
        light: '#E5E5E5',
        error: '#D3080C',
      },
    },
    spacing: {
      none: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.5rem',
      6: '2rem',
      7: '2.5rem',
      8: '3rem',
      9: '4rem',
      10: '5rem',
      11: '6rem',
      12: '8rem',
    },
    fontFamily: {
      primary: ['Noto Sans', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['Noto Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
};
```

## Accessibility Considerations

Always ensure that the use of these design tokens results in UI that meets or exceeds WCAG 2.1 AA standards:

1. Text and background color combinations must maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text
2. Interactive elements must have a visible focus state using the `--focus-outline` token
3. Use adequate spacing around interactive elements to ensure they are easy to target (minimum 44x44px touch target size)
4. Do not rely on color alone to convey information
5. Maintain consistent styling for similar elements to aid in user comprehension

## References

- [GC Design System - Color](https://design-system.alpha.canada.ca/en/styles/colour/)
- [GC Design System - Spacing](https://design-system.alpha.canada.ca/en/styles/spacing/)
- [GC Design System - Typography](https://design-system.alpha.canada.ca/en/styles/typography/)
