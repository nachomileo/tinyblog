# tinyblog

A minimalistic blog powered by Markdown.

## Stack

- **Next.js** 16 + React 19 + TypeScript
- **Tailwind CSS** (dark / light mode)
- **Font**: Gilda Display (serif)
- **Content**: Markdown with frontmatter (`gray-matter`)

## Structure

```
content/posts/     ← Markdown posts
app/               ← Next.js routes
components/        ← UI (theme toggle, markdown, post list)
lib/posts.ts       ← Post reading logic
```

## Getting started

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build
```

## Adding posts

Create a `.md` file in `content/posts/` with frontmatter:

```yaml
---
title: "Post title"
date: "2026-04-17"
---

Markdown content goes here...
```
