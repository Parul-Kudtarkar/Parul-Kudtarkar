type QuadrantCell = {
  pill: string
  pillBg: string
  pillColor: string
  borderTop: string
  body: string
}

const CELLS: QuadrantCell[] = [
  {
    pill: "AUTOMATE",
    pillBg: "#FEF0F7",
    pillColor: "#EC4899",
    borderTop: "#EC4899",
    body: "Reporting, lit review, QC pipelines, data formatting, NGS preprocessing. Do this first.",
  },
  {
    pill: "AUGMENT",
    pillBg: "#F3EFFE",
    pillColor: "#8B5CF6",
    borderTop: "#8B5CF6",
    body: "Variant interpretation, ML modeling with biological validation, biomarker analysis. AI as co-pilot.",
  },
  {
    pill: "WATCH",
    pillBg: "#f5f5f7",
    pillColor: "#6e6e73",
    borderTop: "#e5e5e5",
    body: "Manual tasks not yet AI-ready. Shrinking.",
  },
  {
    pill: "HUMAN-LED",
    pillBg: "#EEF3FB",
    pillColor: "#4A90D9",
    borderTop: "#4A90D9",
    body: "Hypothesis generation, experimental design, deep understanding of ML/AI models and how they work, regulatory judgment. Protect these.",
  },
]

function QuadrantCard({ cell }: { cell: QuadrantCell }) {
  return (
    <div
      className="border border-[#e5e5e5] bg-white"
      style={{
        borderRadius: "12px",
        borderTopWidth: "3px",
        borderTopColor: cell.borderTop,
        padding: "16px",
        fontSize: "14px",
        lineHeight: 1.6,
        color: "#3d3d3f",
      }}
    >
      <span
        className="mb-2.5 inline-block font-medium uppercase tracking-[0.05em]"
        style={{
          borderRadius: "20px",
          padding: "3px 12px",
          fontSize: "11px",
          backgroundColor: cell.pillBg,
          color: cell.pillColor,
        }}
      >
        {cell.pill}
      </span>
      <p className="m-0">{cell.body}</p>
    </div>
  )
}

export function RiskMoatQuadrant() {
  return (
    <div className="not-prose my-8">
      <div className="mb-2 text-center text-[11px] text-[#8e8e93]">High Moat →</div>
      <div className="flex gap-3">
        <div
          className="flex w-8 shrink-0 items-center justify-center sm:w-10"
          style={{ alignSelf: "stretch" }}
        >
          <span
            className="text-[11px] text-[#8e8e93]"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            High Risk →
          </span>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          <QuadrantCard cell={CELLS[0]} />
          <QuadrantCard cell={CELLS[1]} />
          <QuadrantCard cell={CELLS[2]} />
          <QuadrantCard cell={CELLS[3]} />
        </div>
      </div>
    </div>
  )
}
