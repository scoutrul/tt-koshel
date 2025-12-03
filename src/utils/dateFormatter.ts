export const formatDate = (date: Date | null, locale = 'ru-RU') => {
  if (!date) return '—'

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}


