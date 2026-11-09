import { useSyncExternalStore } from 'react';

// Theme preference: 'light' | 'dark' | null (null = follow the system).
// index.html applies the saved choice before first paint to avoid a flash.
const KEY = 'theme';
const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
const listeners = new Set();

function readSaved() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

let saved = typeof window !== 'undefined' ? readSaved() : null;

const resolved = () => saved || (mq?.matches ? 'dark' : 'light');
const emit = () => listeners.forEach((l) => l());

mq?.addEventListener('change', () => {
  if (!saved) emit();
});

export function setTheme(theme) {
  saved = theme;
  try {
    if (theme) localStorage.setItem(KEY, theme);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  if (theme) document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
  emit();
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

// Returns the theme actually shown ('light' | 'dark').
export const useTheme = () => useSyncExternalStore(subscribe, resolved, () => 'dark');
