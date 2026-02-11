import { getAllPosts } from '@/lib/posts';

export function GET() {
  const posts = getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<title>Minimal Journal</title>
<link>https://example.com</link>
<description>Minimal Journal RSS feed</description>
${posts
  .map(
    (post) => `<item>
<title><![CDATA[${post.title}]]></title>
<link>https://example.com/blog/${post.slug}</link>
<guid>https://example.com/blog/${post.slug}</guid>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
<description><![CDATA[${post.excerpt}]]></description>
</item>`
  )
  .join('\n')}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
