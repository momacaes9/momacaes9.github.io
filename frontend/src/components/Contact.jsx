import { useState } from 'react';
import { links, sectionIds } from '../data/site';
import { useLang } from '../lib/i18n';
import { Item, Section } from './ui';

// Read at build time from frontend/.env locally, or the FORMSPREE_ID secret in
// GitHub Actions. This ID is public in the built site; protect the form in the
// Formspree dashboard (allowed domains + spam filtering).
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const { c } = useLang();
  const f = c.ui.form;
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const contactLinks = [
    { label: c.ui.contactLinks.email, value: links.email, href: `mailto:${links.email}` },
    { label: c.ui.contactLinks.linkedin, value: 'in/monicamacaes', href: links.linkedin },
    { label: c.ui.contactLinks.github, value: 'momacaes9', href: links.github },
    { label: c.ui.contactLinks.resume, href: links.resume },
  ];

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
          subject: `${f.subject} — ${data.name}`,
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
    <Section id="contact" take={sectionIds.indexOf('contact') + 1} title={c.sections.contact} className="contact">
      <Item className="lede">
        <p>{c.ui.contactLede}</p>
      </Item>
      <div className="contact-grid">
        <Item as="form" className="contact-form card" onSubmit={onSubmit}>
          <label>
            <span>{f.name}</span>
            <input name="name" type="text" required maxLength={80} autoComplete="name" placeholder={f.namePh} />
          </label>
          <label>
            <span>{f.email}</span>
            <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder={f.emailPh} />
          </label>
          <label>
            <span>{f.message}</span>
            <textarea name="message" required maxLength={2000} rows={5} placeholder={f.messagePh} />
          </label>
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? f.sending : f.send}
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status === 'sent' && f.sent}
            {status === 'error' && (
              <>
                {f.error} <a href={`mailto:${links.email}`}>{links.email}</a>.
              </>
            )}
          </p>
        </Item>
        <Item as="ul" className="contact-links">
          {contactLinks.map((l) => (
            <li key={l.href}>
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
