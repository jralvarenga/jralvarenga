import { currentLocale } from './i18n/locale';

/** How long the check icon shows after copying. */
const DONE_MS = 1500;

/**
 * Wires every `[data-copy]` button: a click copies its value and swaps the
 * `[data-copy-idle]` icon for `[data-copy-done]` for a moment. The button's
 * label changes to `data-copied-<locale>` or `data-copy-failed-<locale>`
 * for the language on screen, then back.
 */
export function bindCopyButtons() {
  for (const button of document.querySelectorAll<HTMLElement>('[data-copy]')) {
    const idle = button.querySelector<HTMLElement>('[data-copy-idle]');
    const done = button.querySelector<HTMLElement>('[data-copy-done]');
    let timer: number | undefined;
    let restore: string | undefined;

    /** Shows `status` as the label, then puts the resting label back. */
    function announce(status: 'copied' | 'copy-failed') {
      const locale = currentLocale();
      restore ??= button.getAttribute('aria-label') ?? '';
      const label = button.getAttribute(`data-${status}-${locale}`);
      if (label) button.setAttribute('aria-label', label);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        done?.setAttribute('hidden', '');
        idle?.removeAttribute('hidden');
        // The resting label for the language on screen now, in case it
        // changed while the status showed.
        const resting =
          button.getAttribute(`data-i18n-${currentLocale()}`) ?? restore;
        button.setAttribute('aria-label', resting ?? '');
        restore = undefined;
      }, DONE_MS);
    }

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
      } catch {
        announce('copy-failed');
        return;
      }

      idle?.setAttribute('hidden', '');
      done?.removeAttribute('hidden');
      announce('copied');
    });
  }
}
