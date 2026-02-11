import { NewsletterForm } from '@/components/newsletter-form';
import { PostFilters } from '@/components/post-filters';
import { getAllCategories, getAllPosts, getAllTags } from '@/lib/posts';

export const revalidate = false;

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);
  const categories = getAllCategories(posts);
  const featured = posts.find((post) => post.featured);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Minimalist writing platform</p>
        <h1>Thoughtful writing with modern performance.</h1>
        <p>
          Static-first, markdown-powered, and designed for clarity. Add weekly posts in
          <code>content/posts</code> and publish.
        </p>
      </section>

      {featured ? (
        <section className="featured">
          <h2>Featured Post</h2>
          <article>
            <a href={`/blog/${featured.slug}`}>{featured.title}</a>
            <p>{featured.excerpt}</p>
          </article>
        </section>
      ) : null}

      <PostFilters posts={posts} tags={tags} categories={categories} />
      <NewsletterForm />
    </>
  );
}
