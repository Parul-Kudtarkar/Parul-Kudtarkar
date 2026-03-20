import type { ReactNode } from "react"

function Pill({
  children,
  bg,
  color,
}: {
  children: ReactNode
  bg: string
  color: string
}) {
  return (
    <span
      className="mx-0.5 inline-flex items-center font-medium"
      style={{
        backgroundColor: bg,
        color,
        borderRadius: "20px",
        padding: "2px 10px",
        fontSize: "13px",
      }}
    >
      {children}
    </span>
  )
}

export function MethodologyCallout() {
  return (
    <div
      className="not-prose my-6 border-l-[3px] border-[#4A90D9] py-5 pl-6 pr-6"
      style={{
        background: "#f5f5f7",
        borderRadius: "12px",
        padding: "20px 24px",
        fontSize: "15px",
        color: "#3d3d3f",
        margin: "24px 0",
      }}
    >
      <p className="m-0 leading-relaxed">
        Each JD was parsed into individual tasks. Each task was then scored on three
        dimensions: <strong>Automation Risk</strong> (0–1),{" "}
        <strong>Strategic Moat</strong> (0–1), and{" "}
        <strong>AI Augmentation Potential</strong> (0–1). Every task was classified
        into one of three categories:{" "}
        <Pill bg="#FEF0F7" color="#EC4899">
          Automate
        </Pill>
        ,{" "}
        <Pill bg="#F3EFFE" color="#8B5CF6">
          Augment
        </Pill>
        , or{" "}
        <Pill bg="#EEF3FB" color="#4A90D9">
          Human-led
        </Pill>
        .
      </p>
    </div>
  )
}
