import { NextRequest } from 'next/server';
import { calendarTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, timeMin, timeMax, query } = args as {
      userId?: string;
      timeMin?: string;
      timeMax?: string;
      query?: string;
    };
    const composioUserId = userId || 'default';
    return calendarTools.findEvents(composioUserId, timeMin, timeMax, query);
  });
}