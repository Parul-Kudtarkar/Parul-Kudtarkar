import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { formatBlogMarkdown } from "@/lib/format-blog-markdown"
import { AiAugmentationArticleBody } from "@/components/blog/ai-augmentation-article-body"
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
        <div
          className={
            post.slug === "ai-task-augmentation"
              ? "max-w-none"
              : "prose prose-lg dark:prose-invert max-w-none"
          }
        >
          {post.slug === "ai-task-augmentation" ? (
            <AiAugmentationArticleBody content={post.content} />
          ) : (
            <BlogCodeBlockWrapper html={await formatBlogMarkdown(post.content)} />
          )}
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

