import Link from "next/link"
import type { Post } from "@/lib/posts"

interface PostListProps {
  posts: Post[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="empty">
        <p>No posts yet.</p>
        <p>
          Add markdown files to the <code>content/posts</code> folder.
        </p>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link href={`/posts/${post.slug}`} className="post-item">
            <time>{formatDate(post.date)}</time>
            <h2>{post.title}</h2>
            {post.excerpt && <p>{post.excerpt}</p>}
          </Link>
        </article>
      ))}
    </div>
  )
}
