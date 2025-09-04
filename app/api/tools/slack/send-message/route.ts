import { NextRequest } from 'next/server';
import { slackTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, channel, text, threadTs } = args as {
      userId?: string;
      channel: string;
      text: string;
      threadTs?: string;
    };
    const composioUserId = userId || 'default';
    return slackTools.sendMessage(composioUserId, channel, text, threadTs);
  }, 'send_slack_message');
}