import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { highlightCode } from "@/lib/shiki"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogCodeBlockWrapper } from "@/components/blog-code-block-wrapper"
import { Calendar, Clock, ArrowLeft, Tag, Headphones } from "lucide-react"
import { format } from "date-fns"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog | Parul Kudtarkar`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image && {
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.category && (
              <Badge variant="secondary">
                {post.category}
              </Badge>
            )}
            {post.featured && (
              <Badge variant="default">
                Featured
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
            <div>
              <span>By {post.author}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Audio Player — listen to the article */}
        {post.audioUrl && (
          <div className="mb-8 p-5 bg-muted/80 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Listen to this article</h3>
                <p className="text-sm text-muted-foreground">
                  Play the audio version while you read or on the go.
                </p>
              </div>
            </div>
            <audio
              controls
              className="w-full h-12 audio-player"
              preload="metadata"
              aria-label="Audio version of this article"
            >
              <source src={post.audioUrl} type="audio/mpeg" />
              <source src={post.audioUrl} type="audio/mp3" />
              <source src={post.audioUrl} type="audio/wav" />
              <source src={post.audioUrl} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <BlogCodeBlockWrapper html={await formatContent(post.content)} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Posts
            </Button>
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  )
}

// Allow only safe URL schemes to prevent XSS
function isSafeHref(url: string): boolean {
  const t = url.trim().toLowerCase()
  return (
    t.startsWith('https://') ||
    t.startsWith('http://') ||
    t.startsWith('mailto:') ||
    t.startsWith('/') ||
    t.startsWith('#')
  )
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Markdown-like formatting with Shiki syntax highlighting for code blocks
async function formatContent(content: string): Promise<string> {
  // Helper function to process inline markdown formatting
  function processInlineMarkdown(text: string): string {
    let processed = text
    // Remove escaped markdown first (e.g., \*\* becomes **)
    processed = processed.replace(/\\\*/g, '*')
    processed = processed.replace(/\\\[/g, '[')
    processed = processed.replace(/\\\]/g, ']')
    processed = processed.replace(/\\\(/g, '(')
    processed = processed.replace(/\\\)/g, ')')
    processed = processed.replace(/\\`/g, '`')
    
    // Process bold (**text**)
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Process italic (*text* or _text_) - but not if it's part of bold
    processed = processed.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
    processed = processed.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>')
    // Process links [text](url) - only allow safe hrefs to prevent XSS
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, linkText: string, href: string) => {
        const safeHref = isSafeHref(href) ? href : '#'
        const safeText = escapeHtml(linkText)
        return `<a href="${escapeHtml(safeHref)}" class="text-primary hover:underline" rel="noopener noreferrer">${safeText}</a>`
      }
    )
    // Process inline code `code` (escape to prevent XSS)
    processed = processed.replace(/`([^`]+)`/g, (_, code: string) => `<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">${escapeHtml(code)}</code>`)
    
    return processed
  }

  const lines = content.split('\n')
  const result: string[] = []
  let inCodeBlock = false
  let codeBlockLanguage = ''
  let codeBlockContent: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Handle code blocks (syntax highlighting via Shiki at build/render time)
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const code = codeBlockContent.join('\n')
        const highlighted = await highlightCode(code, codeBlockLanguage || 'text')
        result.push(highlighted)
        codeBlockContent = []
        inCodeBlock = false
        codeBlockLanguage = ''
      } else {
        inCodeBlock = true
        codeBlockLanguage = line.substring(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // Headers - process markdown inside headers too
    if (line.startsWith('# ')) {
      const headerText = processInlineMarkdown(line.substring(2))
      result.push(`<h1 class="text-3xl font-bold mt-6 mb-3">${headerText}</h1>`)
      continue
    }
    if (line.startsWith('## ')) {
      const headerText = processInlineMarkdown(line.substring(3))
      result.push(`<h2 class="text-2xl font-semibold mt-5 mb-2">${headerText}</h2>`)
      continue
    }
    if (line.startsWith('### ')) {
      const headerText = processInlineMarkdown(line.substring(4))
      result.push(`<h3 class="text-xl font-semibold mt-4 mb-2">${headerText}</h3>`)
      continue
    }
    if (line.startsWith('#### ')) {
      const headerText = processInlineMarkdown(line.substring(5))
      result.push(`<h4 class="text-lg font-semibold mt-3 mb-1">${headerText}</h4>`)
      continue
    }
    
    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listText = processInlineMarkdown(line.trim().substring(2))
      result.push(`<li class="mb-1">${listText}</li>`)
      continue
    }
    
    // Empty lines - skip them to reduce spacing
    if (line.trim() === '') {
      continue
    }

    // Regular paragraphs - process inline markdown
    const processedLine = processInlineMarkdown(line)
    result.push(`<p class="mb-2 leading-7">${processedLine}</p>`)
  }

  // Wrap consecutive list items in <ul> tags
  let finalResult: string[] = []
  let inList = false
  
  for (let i = 0; i < result.length; i++) {
    if (result[i].startsWith('<li')) {
      if (!inList) {
        finalResult.push('<ul class="mb-3 ml-6 list-disc">')
        inList = true
      }
      finalResult.push(result[i])
    } else {
      if (inList) {
        finalResult.push('</ul>')
        inList = false
      }
      finalResult.push(result[i])
    }
  }
  
  if (inList) {
    finalResult.push('</ul>')
  }

  return finalResult.join('\n')
}

