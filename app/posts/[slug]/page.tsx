import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { Markdown } from "@/components/markdown"
import { ThemeToggle } from "@/components/theme-toggle"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container">
      <article>
        <nav className="post-nav">
          <Link href="/" className="back-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to all posts
          </Link>
          <ThemeToggle />
        </nav>

        <header className="post-header">
          <time>{formatDate(post.date)}</time>
          <h1>{post.title}</h1>
        </header>

        <div className="markdown">
          <Markdown content={post.content} />
        </div>
      </article>
    </main>
  )
}
