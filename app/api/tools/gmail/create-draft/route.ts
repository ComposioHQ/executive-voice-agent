import { NextRequest } from 'next/server';
import { gmailTools } from '@/lib/composio';
import { handleToolRequest } from '@/lib/route-helpers';

export async function POST(request: NextRequest) {
  return handleToolRequest(request, async (args) => {
    const { userId, to, subject, body: emailBody } = args as {
      userId?: string;
      to: string;
      subject: string;
      body: string;
    };
    const composioUserId = userId || 'default';
    return gmailTools.createDraft(composioUserId, to, subject, emailBody);
  });
}