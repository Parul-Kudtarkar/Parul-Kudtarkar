import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { format } from "date-fns"

export default function HomeBlogPreview() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section className="glass-section">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="typography-section-label mb-0" role="heading" aria-level={2}>
            Latest from the blog
          </p>
          <Link
            href="/blog"
            className="typography-nav-link underline underline-offset-4 hover:opacity-80 w-fit"
          >
            View all
          </Link>
        </div>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[#d2d2d7] pb-6 last:border-0 last:pb-0 dark:border-[#424245]">
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="typography-meta mb-2">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                  {post.readingTime != null ? ` · ${post.readingTime} min read` : ""}
                </p>
                <p className="typography-content-title mb-2 transition-opacity group-hover:opacity-80">
                  {post.title}
                </p>
                <p className="typography-body line-clamp-2">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
