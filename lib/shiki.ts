import { codeToHtml } from "shiki"

export async function highlightCode(code: string, lang: string): Promise<string> {
  const langId = lang?.trim() || "text"
  try {
    return await codeToHtml(code, {
      lang: langId,
      theme: "github-light",
    })
  } catch {
    return await codeToHtml(code, { lang: "text", theme: "github-light" })
  }
}
