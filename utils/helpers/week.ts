/**
 * Helpers de Semana — TechService
 * Semana: Lunes 00:00 a Domingo 23:59 (docs/rendiciones.md)
 */

export interface WeekInfo {
  weekNumber: number;
  year: number;
  startDate: Date;
  endDate: Date;
}

/**
 * Devuelve el número de semana ISO y el año para una fecha dada.
 */
export function getISOWeekNumber(date: Date): { week: number; year: number } {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7; // make Sunday = 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return { week, year: d.getUTCFullYear() };
}

/**
 * Calcula el inicio (lunes 00:00) y fin (domingo 23:59:59) de una semana ISO.
 */
export function getWeekBounds(
  weekNumber: number,
  year: number,
): { startDate: Date; endDate: Date } {
  // 4 Jan is always in ISO week 1
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  // Monday of week 1
  const week1Monday = new Date(jan4.getTime() - (jan4Day - 1) * 86400000);
  // Monday of requested week
  const startDate = new Date(
    week1Monday.getTime() + (weekNumber - 1) * 7 * 86400000,
  );
  const endDate = new Date(startDate.getTime() + 7 * 86400000 - 1); // Sunday 23:59:59.999

  return { startDate, endDate };
}

/**
 * Devuelve info completa de la semana actual.
 */
export function getCurrentWeekInfo(): WeekInfo {
  const now = new Date();
  const { week, year } = getISOWeekNumber(now);
  const { startDate, endDate } = getWeekBounds(week, year);
  return { weekNumber: week, year, startDate, endDate };
}

/**
 * Devuelve info completa de una semana dado número + año.
 */
export function getWeekInfo(weekNumber: number, year: number): WeekInfo {
  const { startDate, endDate } = getWeekBounds(weekNumber, year);
  return { weekNumber, year, startDate, endDate };
}
