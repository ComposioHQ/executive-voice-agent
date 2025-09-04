import { NextRequest } from 'next/server';
import { slackTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId } = args as {
      userId?: string;
    };
    const composioUserId = userId || 'default';
    return slackTools.listConversations(composioUserId);
  });
}