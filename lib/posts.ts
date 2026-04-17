import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      // Get file creation time as fallback for date
      const stats = fs.statSync(fullPath)
      const fileDate = data.date || stats.birthtime.toISOString().split("T")[0]

      return {
        slug,
        title: data.title || slug,
        date: fileDate,
        content,
        excerpt: data.excerpt || content.slice(0, 160).trim() + "...",
      }
    })

  // Sort by date (newest first)
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const stats = fs.statSync(fullPath)
  const fileDate = data.date || stats.birthtime.toISOString().split("T")[0]

  return {
    slug,
    title: data.title || slug,
    date: fileDate,
    content,
    excerpt: data.excerpt,
  }
}
