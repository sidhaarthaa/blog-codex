'use client';

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const encodedTitle = encodeURIComponent(title);
  const url = encodeURIComponent(`https://example.com/blog/${slug}`);

  const links = [
    { name: 'X', href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${url}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` }
  ];

  return (
    <div className="share-row" aria-label="Share this post">
      {links.map((link) => (
        <a key={link.name} href={link.href} target="_blank" rel="noreferrer">
          {link.name}
        </a>
      ))}
    </div>
  );
}
