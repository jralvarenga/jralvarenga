/** How long the check icon shows after copying. */
const DONE_MS = 1500;

/**
 * Wires every `[data-copy]` button: a click copies its value and swaps the
 * `[data-copy-idle]` icon for `[data-copy-done]` for a moment.
 */
export function bindCopyButtons() {
  for (const button of document.querySelectorAll<HTMLElement>('[data-copy]')) {
    const idle = button.querySelector<HTMLElement>('[data-copy-idle]');
    const done = button.querySelector<HTMLElement>('[data-copy-done]');
    const label = button.getAttribute('aria-label') ?? 'Copy';
    let timer: number | undefined;

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
      } catch {
        button.setAttribute('aria-label', 'Copy failed');
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          button.setAttribute('aria-label', label);
        }, DONE_MS);
        return;
      }

      idle?.setAttribute('hidden', '');
      done?.removeAttribute('hidden');
      button.setAttribute('aria-label', 'Copied');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        done?.setAttribute('hidden', '');
        idle?.removeAttribute('hidden');
        button.setAttribute('aria-label', label);
      }, DONE_MS);
    });
  }
}
