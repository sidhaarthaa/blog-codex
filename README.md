# Minimal Journal

A minimalist blog built with **Next.js 14 + Markdown content**.

## Features

- Static generation for homepage and blog post routes
- Markdown-based CMS: add files to `content/posts/*.md`
- Search and filters by title, tags, and category
- Reading time estimates
- Social sharing links
- Newsletter subscription UI block
- Dark mode toggle
- RSS feed at `/rss.xml`
- SEO metadata + Open Graph metadata
- Optimized images via `next/image`

## Add a new post (weekly workflow)

1. Create a file in `content/posts/` named like `my-post-title.md`.
2. Add frontmatter:

```md
---
title: "My Post"
excerpt: "One-sentence summary"
date: "2026-01-01"
tags:
  - tag-one
  - tag-two
category: "Category"
coverImage: "/images/cover-1.svg"
featured: false
---

Markdown content goes here.
```

3. Run `npm run dev` and preview at `http://localhost:3000`.

Posts are automatically sorted newest-first by `date`.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
