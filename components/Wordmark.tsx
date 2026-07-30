type WordmarkProps = {
  variant?: 'dark' | 'light'
  className?: string
}

const palettes = {
  // used on light backgrounds
  dark: {
    main: '#1A1F35',
    accent: '#2E3A7E',
    rule: '#D2D6E2',
    sub: '#5D6478',
  },
  // used on dark backgrounds (e.g. cover)
  light: {
    main: '#FCFCFD',
    accent: '#C6CCF5',
    rule: '#3C4570',
    sub: '#8F9BD8',
  },
} as const

export default function Wordmark({ variant = 'light', className }: WordmarkProps) {
  const { main, accent, rule, sub } = palettes[variant]

  return (
    <svg
      viewBox="0 0 320 92"
      width={320}
      height={92}
      className={className}
      role="img"
      aria-label="RRW Research"
    >
      <text
        x={0}
        y={46}
        fontFamily="'TeX Gyre Heros', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight={700}
        fontSize={46}
        letterSpacing="-1.2"
        fill={main}
      >
        RRW
      </text>

      <rect x={112} y={18} width={9} height={9} fill={accent} />

      <rect x={0} y={58} width={128} height={1.6} fill={rule} />

      <text
        x={0}
        y={80}
        fontFamily="'TeX Gyre Heros', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight={700}
        fontSize={14.5}
        letterSpacing="6.4"
        fill={sub}
      >
        RESEARCH
      </text>
    </svg>
  )
}
