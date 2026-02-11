import Image from 'next/image';
import Link from 'next/link';
import type { PostSummary } from '@/lib/posts';

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="card">
      <Link href={`/blog/${post.slug}`} className="card-image-wrap">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={960}
          height={640}
          className="card-image"
          loading="lazy"
        />
      </Link>
      <div className="card-content">
        <p className="eyebrow">
          {new Date(post.date).toLocaleDateString()} · {post.readingMinutes} min read
        </p>
        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <div className="meta-row">
          <span className="tag category">{post.category}</span>
          <div className="tag-list">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
