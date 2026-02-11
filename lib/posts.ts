import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  coverImage: string;
  featured?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostSummary & {
  contentHtml: string;
};

function normalizeFrontmatter(data: Partial<PostFrontmatter>): PostFrontmatter {
  return {
    title: data.title ?? 'Untitled',
    excerpt: data.excerpt ?? '',
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    category: data.category ?? 'General',
    coverImage: data.coverImage ?? '/images/cover-1.svg',
    featured: data.featured ?? false
  };
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'));
}

export function getAllPosts(): PostSummary[] {
  const posts = getPostSlugs()
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = normalizeFrontmatter(data);
      const stats = readingTime(content);

      return {
        slug,
        ...frontmatter,
        readingMinutes: Math.max(1, Math.ceil(stats.minutes))
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = normalizeFrontmatter(data);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const stats = readingTime(content);

  return {
    slug,
    ...frontmatter,
    contentHtml,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes))
  };
}

export function getAllTags(posts: PostSummary[]) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

export function getAllCategories(posts: PostSummary[]) {
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}
