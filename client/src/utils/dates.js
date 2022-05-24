export function fancyMonth(item) {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  return months[item];
}

/**
 *
 * @param {number} item the day of the week returned by Date.getDay()
 * @returns {string} the day (if today or tomorrow) or the name of the day if otherwise
 */
export function fancyDay(item) {
  const d = new Date();
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  if (today.getTime() - 86400000 === item.getTime()) return 'yesterday';
  if (today.getTime() === item.getTime()) return 'today';
  if (today.getTime() + 86400000 === item.getTime()) return 'tomorrow';
  return days[item.getDay()];
}
