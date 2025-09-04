import { Composio } from '@composio/core';

let composioInstance: Composio | null = null;

function getComposio() {
  if (!composioInstance) {
    composioInstance = new Composio({
      apiKey: process.env.COMPOSIO_API_KEY!,
    });
  }
  return composioInstance;
}

export interface ComposioToolResult {
  successful: boolean;
  data?: Record<string, unknown>;
  error?: string | null;
}

// Gmail Tools
export const gmailTools = {
  async fetchEmails(_userId = 'default', maxResults: number = 10): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GMAIL_FETCH_EMAILS', {
        arguments: {
          max_results: maxResults,
          include_payload: true,
          verbose: true
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to fetch emails'
      };
    }
  },

  async sendEmail(
    _userId = 'default',
    to: string,
    subject: string,
    body: string,
    cc?: string,
    bcc?: string
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GMAIL_SEND_EMAIL', {
        arguments: {
          to,
          subject,
          body,
          cc,
          bcc
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to send email'
      };
    }
  },

  async createDraft(
    userId: string = 'default',
    to: string,
    subject: string,
    body: string
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GMAIL_CREATE_EMAIL_DRAFT', {
        userId,
        arguments: {
          to,
          subject,
          body,
          user_id: userId
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to create draft'
      };
    }
  }
};

// Google Calendar Tools
export const calendarTools = {
  async createEvent(
    userId: string = 'default',
    summary: string,
    startDateTime: string,
    endDateTime: string,
    attendees?: string[],
    location?: string
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GOOGLECALENDAR_CREATE_EVENT', {
        userId,
        arguments: {
          summary,
          start: { dateTime: startDateTime },
          end: { dateTime: endDateTime },
          attendees: attendees?.map(email => ({ email })),
          location
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to create calendar event'
      };
    }
  },

  async listCalendars(userId: string = 'default'): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GOOGLECALENDAR_LIST_CALENDARS', {
        userId,
        arguments: {}
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to list calendars'
      };
    }
  },

  async findEvents(
    userId: string = 'default',
    timeMin?: string,
    timeMax?: string,
    query?: string
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GOOGLECALENDAR_FIND_EVENT', {
        userId,
        arguments: {
          timeMin,
          timeMax,
          q: query
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to find events'
      };
    }
  },

  async findFreeSlots(
    userId: string = 'default',
    timeMin: string,
    timeMax: string,
    duration: number = 60
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('GOOGLECALENDAR_FIND_FREE_SLOTS', {
        userId,
        arguments: {
          timeMin,
          timeMax,
          duration
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to find free slots'
      };
    }
  }
};

// Slack Tools
export const slackTools = {
  async sendMessage(
    userId: string = 'default',
    channel: string,
    text: string,
    threadTs?: string
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('SLACK_SEND_MESSAGE', {
        userId,
        arguments: {
          channel,
          text,
          thread_ts: threadTs
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to send Slack message'
      };
    }
  },

  async createChannel(
    userId: string = 'default',
    name: string,
    isPrivate: boolean = false
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('SLACK_CREATE_CHANNEL', {
        userId,
        arguments: {
          name,
          is_private: isPrivate
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to create Slack channel'
      };
    }
  },

  async listConversations(userId: string = 'default'): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('SLACK_LIST_CONVERSATIONS', {
        userId,
        arguments: {}
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to list Slack conversations'
      };
    }
  },

  async inviteToChannel(
    userId: string = 'default',
    channel: string,
    users: string[]
  ): Promise<ComposioToolResult> {
    try {
      const composio = getComposio();
      const result = await composio.tools.execute('SLACK_INVITE_TO_CHANNEL', {
        userId,
        arguments: {
          channel,
          users: users.join(',')
        }
      });
      return result;
    } catch (error) {
      return {
        successful: false,
        error: error instanceof Error ? error.message : 'Failed to invite users to Slack channel'
      };
    }
  }
};