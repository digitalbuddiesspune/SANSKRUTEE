import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'sanskrutee_welcome_dismissed';

/**
 * Welcome popup shown once per browser session when the user enters the site.
 */
export default function WelcomeModal({ enabled = true }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // sessionStorage unavailable
    }
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [enabled]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [visible, dismiss]);

  if (!enabled || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      aria-describedby="welcome-modal-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0F1012]/55 backdrop-blur-[2px]"
        aria-label="Close welcome dialog"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl border border-[#FE1157] bg-[#FFFFFF] shadow-2xl overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FE1157] via-[#FE1157] to-[#FE1157]" />

        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full text-[#0F1012] hover:bg-[#FE1157]/60 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 sm:px-8 pt-10 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774001804/copy_of_0bfce75b-bbe6-4982-bc33-57feb8587b8c_531e09.png"
              alt="Sanskrutee"
              className="h-14 sm:h-16 w-auto object-contain"
              draggable={false}
            />
          </div>

          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#0F1012] mb-2">
            Welcome
          </p>
          <h2
            id="welcome-modal-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1012] tracking-tight mb-3"
          >
            You&apos;re at Sanskrutee
          </h2>
          <p
            id="welcome-modal-desc"
            className="text-sm sm:text-base text-[#0F1012]/80 leading-relaxed mb-8"
          >
            Discover curated ethnic fashion, new arrivals, and offers crafted for you. Happy shopping!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/new-arrival"
              onClick={dismiss}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-[#FFFFFF] bg-[#FE1157] hover:bg-[#0F1012] border border-[#0F1012]/30 transition-colors"
            >
              Shop new arrivals
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-[#0F1012] bg-white border border-[#FE1157] hover:border-[#FE1157] hover:bg-[#FFFFFF] transition-colors"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
