import { NextRequest } from 'next/server';
import { calendarTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, timeMin, timeMax, duration = 60 } = args as {
      userId?: string;
      timeMin: string;
      timeMax: string;
      duration?: number;
    };
    const composioUserId = userId || 'default';
    return calendarTools.findFreeSlots(composioUserId, timeMin, timeMax, duration);
  }, 'find_free_time_slots');
}