export function AiAutomationRiskThumbnail() {
  // Static poster-style SVG matching the thumbnail export dimensions exactly.
  // Export is handled separately by the thumbnail generator (SVG -> WebP).
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1200}
      height={675}
      viewBox="0 0 1200 675"
    >
      <rect width="1200" height="675" rx="20" fill="#f2f2f7" />

      {/* Top title + subtitle */}
      <g
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Arial, sans-serif"
        textAnchor="middle"
      >
        <text
          x={600}
          y={78}
          fontSize={36}
          fontWeight={700}
          fill="#1d1d1f"
          dominantBaseline="middle"
        >
          AI Automation Risk in Life Sciences
        </text>
        <text
          x={600}
          y={113}
          fontSize={18}
          fontWeight={400}
          fill="#8e8e93"
          dominantBaseline="middle"
        >
          176 job descriptions · March 2026
        </text>
      </g>

      {/* Progress bar */}
      <g>
        {/* padding: 48px => progress bar x=48..1152 (width 1104) */}
        <rect x={48} y={154} width={115.92} height={6} rx={3} fill="#EC4899" />
        <rect x={48 + 115.92} y={154} width={301.392} height={6} fill="#8B5CF6" />
        <rect x={48 + 115.92 + 301.392} y={154} width={686.688} height={6} rx={3} fill="#4A90D9" />
      </g>

      {/* Three circles */}
      <g
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Arial, sans-serif"
        textAnchor="middle"
      >
        {/* Circle 1 */}
        <circle cx={118} cy={270} r={70} fill="#ffffff" stroke="#EC4899" strokeWidth={2} />
        <text x={118} y={270} fontSize={26} fontWeight={700} fill="#EC4899" dominantBaseline="middle">
          10.5%
        </text>
        <text x={118} y={360} fontSize={16} fontWeight={600} fill="#1d1d1f" dominantBaseline="middle">
          Automate
        </text>

        {/* Circle 2 */}
        <circle cx={600} cy={270} r={70} fill="#ffffff" stroke="#8B5CF6" strokeWidth={2} />
        <text x={600} y={270} fontSize={26} fontWeight={700} fill="#8B5CF6" dominantBaseline="middle">
          27.3%
        </text>
        <text x={600} y={360} fontSize={16} fontWeight={600} fill="#1d1d1f" dominantBaseline="middle">
          Augment
        </text>

        {/* Circle 3 */}
        <circle cx={1082} cy={270} r={70} fill="#ffffff" stroke="#4A90D9" strokeWidth={2} />
        <text x={1082} y={270} fontSize={26} fontWeight={700} fill="#4A90D9" dominantBaseline="middle">
          62.2%
        </text>
        <text x={1082} y={360} fontSize={16} fontWeight={600} fill="#1d1d1f" dominantBaseline="middle">
          Human-led
        </text>
      </g>

      {/* Footer */}
      <g
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Arial, sans-serif"
        fontSize={13}
        fill="#8e8e93"
        fontWeight={400}
      >
        <text x={48} y={621} dominantBaseline="middle">
          big pharma · biotech startups · health tech · academia
        </text>
        <text x={1152} y={621} dominantBaseline="middle" textAnchor="end">
          parulkudtarkar.com
        </text>
      </g>
    </svg>
  )
}
