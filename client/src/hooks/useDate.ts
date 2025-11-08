import { monthNames } from '@/const/months';

export function getMonthYear(time: Date) {
  const day = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  return `${monthNames[month]} ${day}, ${year}`;
}

export function getHoursMinutes(time: string) {
  const data = new Date(time);
  const year = data.getFullYear();
  const month = data.getMonth();
  const day = data.getDate();
  const hours = data.getHours().toString().padStart(2, '0');
  const minutes = data.getMinutes().toString().padStart(2, '0');

  const yyyyy_mm = `${monthNames[month]} ${day}, ${year}`;
  const hh_mm = `${hours}:${minutes}`;

  return { yyyyy_mm, hh_mm };
}
