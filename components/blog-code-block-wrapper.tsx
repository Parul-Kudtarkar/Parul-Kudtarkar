"use client"

import { useEffect, useRef } from "react"

const COPY_DURATION_MS = 2000

const copyIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
const checkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`

export function BlogCodeBlockWrapper({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pres = container.querySelectorAll<HTMLPreElement>("pre")
    pres.forEach((pre) => {
      if (pre.closest("[data-copy-wrapper]")) return

      const wrapper = document.createElement("div")
      wrapper.setAttribute("data-copy-wrapper", "true")
      wrapper.className = "blog-code-block group relative"

      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const button = document.createElement("button")
      button.type = "button"
      button.setAttribute("aria-label", "Copy code")
      button.className =
        "absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/90 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary group-hover:opacity-100"
      button.innerHTML = copyIconSVG

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText ?? pre.innerText
        try {
          await navigator.clipboard.writeText(code)
          button.innerHTML = checkIconSVG
          button.classList.add("text-green-600", "dark:text-green-400")
          setTimeout(() => {
            button.innerHTML = copyIconSVG
            button.classList.remove("text-green-600", "dark:text-green-400")
          }, COPY_DURATION_MS)
        } catch {
          // ignore
        }
      })

      wrapper.appendChild(button)
    })
  }, [html])

  return (
    <div
      ref={containerRef}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
