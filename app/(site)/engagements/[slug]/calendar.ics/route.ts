import { createEngagementCalendar } from '@/lib/engagement-calendar';
import { getEngagement } from '@/lib/site';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const engagement = await getEngagement(slug);

  if (!engagement?.date) {
    return new Response('Engagement not found.', { status: 404 });
  }

  const calendar = createEngagementCalendar({
    ...engagement,
    date: engagement.date,
  });

  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.ics"`,
      'Cache-Control': 'public, max-age=300',
    },
  });
}
