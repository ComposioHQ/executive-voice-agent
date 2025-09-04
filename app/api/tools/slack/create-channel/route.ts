import { NextRequest } from 'next/server';
import { slackTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, name, isPrivate = false } = args as {
      userId?: string;
      name: string;
      isPrivate?: boolean;
    };
    const composioUserId = userId || 'default';
    return slackTools.createChannel(composioUserId, name, isPrivate);
  }, 'create_slack_channel');
}