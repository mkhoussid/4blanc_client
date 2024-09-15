export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('ru-RU', {
		timeZone: 'Europe/Moscow',
		day: '2-digit',
		month: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		year: (() => {
			if (date.getFullYear() !== new Date().getFullYear()) {
				return 'numeric';
			}
		})(),
		hour12: false,
	}).format(date);
