import { useState } from 'react';
import { links } from '../data/site';
import { Item, Section } from './ui';

// Read at build time from frontend/.env (see .env.example). Note: this ID is
// public in the built site; protect the form in the Formspree dashboard
// (allowed domains + spam filtering).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const contactLinks = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}` },
  { label: 'LinkedIn', value: 'in/monicamacaes', href: links.linkedin },
  { label: 'GitHub', value: 'momacaes9', href: links.github },
  { label: 'Resume', href: links.resume },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    // Honeypot: real people never see or fill this field.
    if (data._gotcha) return;
    if (!FORMSPREE_ID) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio contact — ${data.name}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" eyebrow="07" title="Contact" className="contact">
      <Item className="lede">
        <p>Say hello by email, on LinkedIn, or with the form below.</p>
      </Item>
      <div className="contact-grid">
        <Item as="form" className="contact-form card" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" required maxLength={2000} rows={5} placeholder="Write your message…" />
          </label>
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status === 'sent' && 'Message sent — thank you!'}
            {status === 'error' && (
              <>
                Couldn’t send right now. Please email <a href={`mailto:${links.email}`}>{links.email}</a>.
              </>
            )}
          </p>
        </Item>
        <Item as="ul" className="contact-links">
          {contactLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} target={l.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">
                <span>{l.label}</span>
                <span className="muted">{l.value || '↗'}</span>
              </a>
            </li>
          ))}
        </Item>
      </div>
    </Section>
  );
}
