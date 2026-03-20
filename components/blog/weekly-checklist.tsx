"use client"

import { useMemo, useState } from "react"

const ITEMS = [
  {
    accent: "#4A90D9",
    title: "Run the audit.",
    desc: "List your 10 most common tasks. Sort them into Automate / Augment / Human-led. Do it with data, not intuition.",
  },
  {
    accent: "#EC4899",
    title: "Automate one thing.",
    desc: "Pick the highest-risk task on your list. Find the AI tool that handles it. Spend 2 hours setting it up this week.",
  },
  {
    accent: "#8B5CF6",
    title: "Protect your moat.",
    desc: "Schedule time for your highest-moat activities. Most people undersell these.",
  },
  {
    accent: "#F97316",
    title: "Use the template.",
    desc: "The AI Task Augmentation template lets you run this entire analysis on any job description in under 20 minutes.",
  },
]

export function WeeklyChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false))

  const completed = useMemo(() => checked.filter(Boolean).length, [checked])

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const pct = (completed / ITEMS.length) * 100

  return (
    <div
      className="not-prose my-8 overflow-hidden bg-white"
      style={{
        borderRadius: "16px",
        border: "1px solid #e5e5e5",
        padding: "8px 0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="px-5 pb-3 pt-4">
        <p className="m-0 text-[13px] text-[#6e6e73]">
          {completed} of {ITEMS.length} completed
        </p>
        <div
          className="mt-2 h-[3px] w-full overflow-hidden rounded-full"
          style={{ background: "#f0f0f0" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${pct}%`,
              backgroundColor: "#34c759",
            }}
          />
        </div>
      </div>

      {ITEMS.map((item, i) => {
        const isChecked = checked[i]
        return (
          <button
            key={item.title}
            type="button"
            className="flex w-full cursor-pointer items-start border-0 bg-transparent text-left transition-colors duration-200 last:border-b-0 hover:bg-[#fafafa]"
            style={{
              padding: "16px 20px",
              borderBottom: i === ITEMS.length - 1 ? undefined : "1px solid #f5f5f5",
              opacity: isChecked ? 0.5 : 1,
            }}
            onClick={() => toggle(i)}
          >
            <span
               className="relative mt-0.5 mr-3.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full transition-all duration-200"
               style={{
                 border: isChecked ? "2px solid #34c759" : "2px solid #d1d1d6",
                 background: isChecked ? "#34c759" : "transparent",
               }}
             >
              {isChecked && (
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 5l3.5 3.5L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="min-w-0 flex-1" style={{ borderLeft: `3px solid ${item.accent}`, paddingLeft: "12px" }}>
              <span
                className="block font-semibold text-[#1d1d1f] transition-all duration-200"
                style={{ textDecoration: isChecked ? "line-through" : undefined }}
              >
                {item.title}
              </span>
              <span className="mt-1 block text-[14px] leading-relaxed text-[#3d3d3f]">
                {item.desc}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
