export type AugmentationSlotId =
  | "headline-numbers-table"
  | "headline-stats"
  | "methodology-callout"
  | "sector-dashboard"
  | "risk-moat-quadrant"
  | "personal-task-dashboard"
  | "occupation-risk-table"
  | "framework-step-cards"
  | "weekly-checklist"

export type BlogContentSegment =
  | { kind: "markdown"; text: string }
  | { kind: "slot"; id: AugmentationSlotId }

const SLOT_RE = /<<<SLOT:([a-z-]+)>>>/g

const VALID_SLOTS = new Set<AugmentationSlotId>([
  "headline-numbers-table",
  "headline-stats",
  "methodology-callout",
  "sector-dashboard",
  "risk-moat-quadrant",
  "personal-task-dashboard",
  "occupation-risk-table",
  "framework-step-cards",
  "weekly-checklist",
])

function assertSlot(id: string): AugmentationSlotId {
  if (!VALID_SLOTS.has(id as AugmentationSlotId)) {
    throw new Error(`Unknown blog content slot: ${id}`)
  }
  return id as AugmentationSlotId
}

/** Split markdown on <<<SLOT:...>>> markers for the AI augmentation post. */
export function splitBlogContentWithSlots(content: string): BlogContentSegment[] {
  const segments: BlogContentSegment[] = []
  let lastIndex = 0
  let m: RegExpExecArray | null
  const re = new RegExp(SLOT_RE.source, "g")
  while ((m = re.exec(content)) !== null) {
    if (m.index > lastIndex) {
      segments.push({ kind: "markdown", text: content.slice(lastIndex, m.index) })
    }
    segments.push({ kind: "slot", id: assertSlot(m[1]) })
    lastIndex = m.index + m[0].length
  }
  if (lastIndex < content.length) {
    segments.push({ kind: "markdown", text: content.slice(lastIndex) })
  }
  return segments
}
