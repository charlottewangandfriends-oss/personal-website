type CalendarEngagement = {
  slug: string;
  title: string;
  date: string;
  endDate?: string | null;
  time?: string | null;
  timezone?: string | null;
  venue?: string | null;
  location?: string | null;
  description?: string | null;
  detailsUrl?: string | null;
};

const CLOCK_PATTERN = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/gi;

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

function compactDate(value: string) {
  return value.replaceAll('-', '');
}

function nextDay(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function parseClock(value: string) {
  const match = CLOCK_PATTERN.exec(value);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2] || '0');
  const meridiem = match[3].toLowerCase();

  if (meridiem === 'pm' && hour !== 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;

  return { hour, minute };
}

function localDateTime(date: string, hour: number, minute: number) {
  return `${compactDate(date)}T${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}00`;
}

function resolveTimeZone(value?: string | null) {
  const fallback = 'America/Detroit';
  if (!value) return fallback;

  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value }).format();
    return value;
  } catch {
    return fallback;
  }
}

function addHours(hour: number, minute: number, hours: number) {
  const totalMinutes = hour * 60 + minute + hours * 60;
  return {
    dayOffset: Math.floor(totalMinutes / (24 * 60)),
    hour: Math.floor((totalMinutes % (24 * 60)) / 60),
    minute: totalMinutes % 60,
  };
}

export function createEngagementCalendar(entry: CalendarEngagement) {
  CLOCK_PATTERN.lastIndex = 0;
  const startClock = parseClock(entry.time || '');
  const endClock = parseClock(entry.time || '');
  const timeZone = resolveTimeZone(entry.timezone);
  const location = [entry.venue, entry.location].filter(Boolean).join(', ');
  const description = [entry.description, entry.detailsUrl]
    .filter(Boolean)
    .join('\n\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Charlotte Wang Music//Engagements//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcs(entry.slug)}@charlottewangmusic.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    `SUMMARY:${escapeIcs(entry.title)}`,
  ];

  if (startClock) {
    const startDate = entry.date;
    const fallbackEnd = addHours(startClock.hour, startClock.minute, 2);
    const endDate =
      entry.endDate ||
      (fallbackEnd.dayOffset ? nextDay(startDate) : startDate);
    const resolvedEnd = endClock || fallbackEnd;

    lines.push(
      `DTSTART;TZID=${timeZone}:${localDateTime(
        startDate,
        startClock.hour,
        startClock.minute,
      )}`,
      `DTEND;TZID=${timeZone}:${localDateTime(
        endDate,
        resolvedEnd.hour,
        resolvedEnd.minute,
      )}`,
    );
  } else {
    lines.push(
      `DTSTART;VALUE=DATE:${compactDate(entry.date)}`,
      `DTEND;VALUE=DATE:${compactDate(nextDay(entry.endDate || entry.date))}`,
    );
  }

  if (location) lines.push(`LOCATION:${escapeIcs(location)}`);
  if (description) lines.push(`DESCRIPTION:${escapeIcs(description)}`);
  if (entry.detailsUrl) lines.push(`URL:${entry.detailsUrl}`);

  lines.push('END:VEVENT', 'END:VCALENDAR', '');
  return lines.join('\r\n');
}
