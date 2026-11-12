const monthFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formats a `YYYY-MM` month as "Jun 2026". */
export function formatMonth(month: string) {
  return monthFormat.format(new Date(`${month}-01T00:00:00Z`));
}
