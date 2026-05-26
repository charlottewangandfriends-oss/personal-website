'use client';

import { useState } from 'react';

export default function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? ` (${from})` : ''}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const field =
    'w-full rounded-sm border border-line bg-paper px-4 py-3 text-brown placeholder:text-brown-soft/50 outline-none transition-colors focus:border-olive';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={field}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={field}
          type="email"
          placeholder="Your email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>
      <textarea
        className={`${field} min-h-40 resize-y`}
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-fit rounded-full bg-brown px-8 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-brown-soft"
      >
        Send message
      </button>
      <p className="text-xs text-brown-soft/70">
        This opens your email app pre-filled. Prefer to write directly? Email{' '}
        <a className="link-underline" href={`mailto:${email}`}>
          {email}
        </a>
        .
      </p>
    </form>
  );
}
