import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShareButtons } from '@/components/share-buttons';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post not found'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://example.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="post-page">
      <p className="eyebrow">
        {new Date(post.date).toLocaleDateString()} · {post.readingMinutes} min read · {post.category}
      </p>
      <h1>{post.title}</h1>
      <Image src={post.coverImage} alt={post.title} width={1200} height={630} className="post-cover" priority />
      <div className="tag-list">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} className="post-content" />
      <ShareButtons title={post.title} slug={post.slug} />
    </article>
  );
}
