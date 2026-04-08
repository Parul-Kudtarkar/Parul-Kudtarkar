"use client"

import { useMemo } from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import type { ChartOptions, TooltipItem } from "chart.js"
import { Bubble } from "react-chartjs-2"

ChartJS.register(...registerables)

type BubblePoint = {
  x: number
  y: number
  r: number
  taskName: string
}

const COLORS = {
  automate: "rgba(236, 72, 153, 0.8)",
  augment: "rgba(139, 92, 246, 0.8)",
  human: "rgba(74, 144, 217, 0.8)",
} as const

const BORDER = {
  automate: "#EC4899",
  augment: "#8B5CF6",
  human: "#4A90D9",
} as const

const quadrantLinesPlugin = {
  id: "quadrantLines",
  afterDraw(chart: ChartJS) {
    const { ctx, chartArea, scales } = chart
    const x = scales.x
    const y = scales.y
    if (!chartArea || !x || !y) return

    ctx.save()
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = "rgba(0,0,0,0.12)"
    ctx.lineWidth = 1

    const xPx = x.getPixelForValue(5)
    if (typeof xPx === "number" && Number.isFinite(xPx)) {
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(xPx, chartArea.top)
      ctx.lineTo(xPx, chartArea.bottom)
      ctx.stroke()
    }

    const yPx = y.getPixelForValue(5)
    if (typeof yPx === "number" && Number.isFinite(yPx)) {
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(chartArea.left, yPx)
      ctx.lineTo(chartArea.right, yPx)
      ctx.stroke()
    }

    ctx.restore()
  },
}

const STATS = [
  { value: "1 task", label: "to automate", accentBg: "#FEF0F7", valueColor: "#EC4899" },
  { value: "8 tasks", label: "to augment", accentBg: "#F3EFFE", valueColor: "#8B5CF6" },
  { value: "1 task", label: "human-led", accentBg: "#EEF3FB", valueColor: "#4A90D9" },
]

export function PersonalTaskDashboard() {
  const { datasets } = useMemo(() => {
    const automate: BubblePoint[] = [
      { x: 8, y: 2, r: 8, taskName: "Reporting & Comms" },
    ]
    const augment: BubblePoint[] = [
      { x: 7.2, y: 6, r: 7.5, taskName: "PubMed & Biomarker" },
      { x: 7, y: 4.3, r: 7.5, taskName: "Code Gen & Debug" },
      { x: 6.8, y: 3.7, r: 7, taskName: "NGS QC & Preprocessing" },
      { x: 7.3, y: 4, r: 6.5, taskName: "Scientific Writing" },
      { x: 5, y: 5.3, r: 5, taskName: "Cross-Org Strategy" },
      { x: 5.2, y: 7, r: 5.5, taskName: "Single-Cell Omics" },
      { x: 4.8, y: 7.2, r: 5, taskName: "ML Model Dev" },
      { x: 4, y: 8, r: 4.5, taskName: "LLM/RAG/KG Dev" },
    ]
    const human: BubblePoint[] = [
      { x: 3, y: 8, r: 3, taskName: "Cloud Architecture" },
    ]

    return {
      datasets: [
        {
          label: "Automate",
          data: automate,
          backgroundColor: COLORS.automate,
          borderColor: BORDER.automate,
          borderWidth: 1,
        },
        {
          label: "Augment",
          data: augment,
          backgroundColor: COLORS.augment,
          borderColor: BORDER.augment,
          borderWidth: 1,
        },
        {
          label: "Human-led",
          data: human,
          backgroundColor: COLORS.human,
          borderColor: BORDER.human,
          borderWidth: 1,
        },
      ],
    }
  }, [])

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (ctx: TooltipItem<"bubble">) => {
            const raw = ctx.raw as BubblePoint
            return raw?.taskName ?? ""
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: "Automation risk →",
          color: "#6e6e73",
          font: { size: 12 },
        },
        ticks: { stepSize: 1, color: "#6e6e73" },
        grid: { color: "#f0f0f0" },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: "Strategic moat →",
          color: "#6e6e73",
          font: { size: 12 },
        },
        ticks: { stepSize: 1, color: "#6e6e73" },
        grid: { color: "#f0f0f0" },
        border: { display: false },
      },
    },
  }

  const legendItems = [
    { label: "Automate", color: "#EC4899" },
    { label: "Augment", color: "#8B5CF6" },
    { label: "Human-led", color: "#4A90D9" },
  ]

  return (
    <div
      className="not-prose my-8 w-full bg-white"
      style={{
        borderRadius: "20px",
        border: "1px solid #e5e5e5",
        padding: "24px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="min-w-0 flex-1 rounded-xl border border-[#e5e5e5] bg-white"
            style={{ padding: "16px" }}
          >
            <div
              className="text-[17px] font-medium leading-none"
              style={{ color: s.valueColor }}
            >
              {s.value}
            </div>
            <div className="mt-2 text-[12px] text-[#6e6e73]">{s.label}</div>
            <div
              className="mt-3 h-1 rounded-full"
              style={{ backgroundColor: s.accentBg }}
            />
          </div>
        ))}
      </div>

      <div className="relative w-full" style={{ height: "300px" }}>
        <Bubble
          data={{ datasets }}
          options={options}
          plugins={[quadrantLinesPlugin]}
        />
      </div>

      <div
        className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        style={{ fontSize: "12px", color: "#1d1d1f" }}
      >
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm opacity-80"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
