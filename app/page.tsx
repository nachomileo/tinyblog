import { getAllPosts } from "@/lib/posts"
import { PostList } from "@/components/post-list"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <main className="container">
      <header className="site-header">
        <div>
          <h1 className="site-title">nachomileo/blog</h1>
          <p className="site-subtitle">AI-free brain dump</p>
        </div>
        <ThemeToggle />
      </header>
      <PostList posts={posts} />
    </main>
  )
}
