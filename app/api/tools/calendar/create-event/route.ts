import { NextRequest } from 'next/server';
import { calendarTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, summary, startDateTime, endDateTime, attendees, location } = args as {
      userId?: string;
      summary: string;
      startDateTime: string;
      endDateTime: string;
      attendees?: string[];
      location?: string;
    };
    const composioUserId = userId || 'default';
    return calendarTools.createEvent(composioUserId, summary, startDateTime, endDateTime, attendees, location);
  });
}