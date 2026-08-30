import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sg-yellow': '#FFCD11',
        'sg-yellow-dark': '#C99A00',
        'sg-yellow-pale': '#FFF2CC',
        'sg-charcoal': '#2D2D2D',
        'sg-dark-gray': '#4A4A4A',
        'sg-gray': '#767676',
        'sg-pale-gray': '#E8E8E8',
        'sg-cream': '#FAF8F3',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.sg-charcoal'),
            '--tw-prose-headings': theme('colors.sg-charcoal'),
            '--tw-prose-lead': theme('colors.sg-dark-gray'),
            '--tw-prose-links': theme('colors.sg-yellow-dark'),
            '--tw-prose-bold': theme('colors.sg-charcoal'),
            '--tw-prose-counters': theme('colors.sg-yellow-dark'),
            '--tw-prose-bullets': theme('colors.sg-yellow'),
            '--tw-prose-quote-borders': theme('colors.sg-yellow'),
            '--tw-prose-quotes': theme('colors.sg-charcoal'),
            '--tw-prose-hr': theme('colors.sg-pale-gray'),
            '--tw-prose-th-borders': theme('colors.sg-charcoal'),
            '--tw-prose-td-borders': theme('colors.sg-pale-gray'),
            lineHeight: '1.9',
            p: { lineHeight: '1.9', marginTop: '1.25em', marginBottom: '1.5em' },
            'h2': {
              marginTop: '3em',
              marginBottom: '1em',
              lineHeight: '1.4',
              paddingBottom: '0.5em',
              borderBottomWidth: '3px',
              borderBottomColor: theme('colors.sg-yellow'),
            },
            'h3': {
              marginTop: '2.25em',
              marginBottom: '0.75em',
              lineHeight: '1.4',
            },
            'ul > li, ol > li': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '0.25em',
            },
            'ul > li::marker': { color: theme('colors.sg-yellow-dark') },
            'ol > li::marker': { color: theme('colors.sg-yellow-dark'), fontWeight: '700' },
            strong: { color: theme('colors.sg-charcoal'), fontWeight: '700' },
            a: { fontWeight: '600', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '2px' },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '500',
              borderLeftWidth: '4px',
              paddingLeft: '1.25em',
              backgroundColor: theme('colors.sg-cream'),
              padding: '1em 1.25em',
              borderRadius: '0.5rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            table: {
              fontSize: '0.95em',
              lineHeight: '1.6',
            },
            'thead th': {
              backgroundColor: theme('colors.sg-cream'),
              padding: '0.75em 1em',
              fontWeight: '700',
            },
            'tbody td': {
              padding: '0.75em 1em',
            },
            'code': {
              backgroundColor: theme('colors.sg-cream'),
              padding: '0.125em 0.375em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
        lg: {
          css: {
            p: { lineHeight: '1.9' },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
export default config
