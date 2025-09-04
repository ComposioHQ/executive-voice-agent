import { NextRequest } from 'next/server';
import { gmailTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, maxResults = 10 } = args as {
      userId?: string;
      maxResults?: number;
    };
    const composioUserId = userId || 'default';
    return gmailTools.fetchEmails(composioUserId, maxResults);
  }, 'fetch_emails');
}