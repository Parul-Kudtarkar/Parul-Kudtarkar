"use client"

import { Chart as ChartJS, registerables } from "chart.js"
import type { ChartData, ChartOptions, TooltipItem } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(...registerables)

const LABELS = ["Big Pharma", "Biotech Startup", "Health Tech", "Academia"]

const HOURS = [
  { sector: "Big Pharma", hrs: 13.9 },
  { sector: "Biotech Startup", hrs: 13.3 },
  { sector: "Health Tech", hrs: 14.1 },
  { sector: "Academia", hrs: 13.0 },
]

const MAX_H = 14.1

export function SectorDashboard() {
  const data: ChartData<"bar"> = {
    labels: LABELS,
    datasets: [
      {
        label: "Automate",
        data: [9.5, 6.6, 12.2, 8.9],
        backgroundColor: "#EC4899",
        stack: "s",
        borderRadius: 3,
        borderSkipped: false,
      },
      {
        label: "Augment",
        data: [29.8, 24.7, 29.3, 23.4],
        backgroundColor: "#8B5CF6",
        stack: "s",
        borderRadius: 3,
        borderSkipped: false,
      },
      {
        label: "Human-led",
        data: [60.7, 68.6, 58.3, 67.8],
        backgroundColor: "#4A90D9",
        stack: "s",
        borderRadius: 3,
        borderSkipped: false,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => {
            const v = ctx.parsed.x
            if (v == null) return ""
            return `${ctx.dataset.label ?? ""}: ${v}%`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        ticks: {
          callback: (v) => `${v}%`,
          color: "#6e6e73",
        },
        grid: { color: "#f0f0f0" },
        border: { display: false },
      },
      y: {
        stacked: true,
        ticks: { color: "#1d1d1f", font: { size: 11 } },
        grid: { display: false },
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
      <div className="relative w-full" style={{ height: "240px" }}>
        <Bar data={data} options={options} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid #f0f0f0",
          marginTop: "16px",
          color: "#8e8e93",
          fontSize: "11px",
          width: "100%",
        }}
      >
        <span>parulkudtarkar.com</span>
        <span>176 job descriptions · March 2026</span>
      </div>

      <div
        className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        style={{ fontSize: "12px", color: "#1d1d1f" }}
      >
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3 border-t border-[#f0f0f0] pt-6">
        {HOURS.map((row) => (
          <div
            key={row.sector}
            className="flex items-center gap-3 text-[14px]"
          >
            <span className="w-[120px] shrink-0 text-[#3d3d3f] sm:w-[140px]">
              {row.sector}
            </span>
            <div
              className="h-2.5 min-w-0 flex-1 overflow-hidden rounded"
              style={{ background: "#FFF4ED" }}
            >
              <div
                className="h-full rounded"
                style={{
                  width: `${(row.hrs / MAX_H) * 100}%`,
                  backgroundColor: "#F97316",
                }}
              />
            </div>
            <span className="w-16 shrink-0 text-right font-medium tabular-nums text-[#1d1d1f]">
              {row.hrs} hrs
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
