'use client';

import { useMemo, useState } from 'react';
import type { PostSummary } from '@/lib/posts';
import { PostCard } from './post-card';

type Props = {
  posts: PostSummary[];
  tags: string[];
  categories: string[];
};

export function PostFilters({ posts, tags, categories }: Props) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        normalized.length === 0 ||
        post.title.toLowerCase().includes(normalized) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalized));
      const matchesTag = activeTag === 'all' || post.tags.includes(activeTag);
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;

      return matchesQuery && matchesTag && matchesCategory;
    });
  }, [posts, query, activeTag, activeCategory]);

  return (
    <section>
      <div className="filter-grid">
        <label>
          Search
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or tag"
          />
        </label>
        <label>
          Category
          <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tag
          <select value={activeTag} onChange={(event) => setActiveTag(event.target.value)}>
            <option value="all">All</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="empty">No posts match your current filters.</p>
      )}
    </section>
  );
}
