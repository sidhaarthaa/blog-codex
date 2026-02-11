'use client';

import { FormEvent, useState } from 'react';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter">
      <h2>Weekly notes, delivered simply.</h2>
      <p>Get one thoughtful email every week with new posts and curated links.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input type="email" required placeholder="you@example.com" aria-label="Email address" />
        <button type="submit">Subscribe</button>
      </form>
      {submitted ? <p className="success">Thanks for subscribing.</p> : null}
    </section>
  );
}
