import type { ReactNode } from "react"
import { BlogCodeBlockWrapper } from "@/components/blog-code-block-wrapper"
import { formatBlogMarkdown } from "@/lib/format-blog-markdown"
import { splitBlogContentWithSlots, type AugmentationSlotId } from "@/lib/blog-slots"
import { HeadlineFindingStats } from "@/components/blog/headline-finding-stats"
import { HeadlineNumbersTable } from "@/components/blog/headline-numbers-table"
import { MethodologyCallout } from "@/components/blog/methodology-callout"
import { SectorDashboard } from "@/components/blog/sector-dashboard"
import { RiskMoatQuadrant } from "@/components/blog/risk-moat-quadrant"
import { PersonalTaskDashboard } from "@/components/blog/personal-task-dashboard"
import { OccupationRiskTable } from "@/components/blog/occupation-risk-table"
import { FrameworkStepCards } from "@/components/blog/framework-step-cards"
import { WeeklyChecklist } from "@/components/blog/weekly-checklist"

function augmentationSlotNode(id: AugmentationSlotId): ReactNode {
  switch (id) {
    case "headline-numbers-table":
      return <HeadlineNumbersTable />
    case "headline-stats":
      return <HeadlineFindingStats />
    case "methodology-callout":
      return <MethodologyCallout />
    case "sector-dashboard":
      return <SectorDashboard />
    case "risk-moat-quadrant":
      return <RiskMoatQuadrant />
    case "personal-task-dashboard":
      return <PersonalTaskDashboard />
    case "occupation-risk-table":
      return <OccupationRiskTable />
    case "framework-step-cards":
      return <FrameworkStepCards />
    case "weekly-checklist":
      return <WeeklyChecklist />
    default: {
      const _exhaustive: never = id
      return _exhaustive
    }
  }
}

export async function AiAugmentationArticleBody({ content }: { content: string }) {
  const segments = splitBlogContentWithSlots(content)
  const nodes: ReactNode[] = []

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    if (seg.kind === "markdown") {
      if (seg.text.trim()) {
        const html = await formatBlogMarkdown(seg.text)
        nodes.push(
          <div key={i} className="blog-apple-markdown">
            <BlogCodeBlockWrapper html={html} />
          </div>
        )
      }
    } else {
      nodes.push(
        <div key={i} className="blog-apple-slot">
          {augmentationSlotNode(seg.id)}
        </div>
      )
    }
  }

  return <div className="blog-apple-article">{nodes}</div>
}
