// Vapi tool configurations (client-side safe)

interface JsonSchemaProperty {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'integer';
  description?: string;
  default?: unknown;
  items?: { type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'integer' };
}

export interface VapiFunctionTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, JsonSchemaProperty>;
      required: string[];
    };
  };
  server: {
    url: string;
  };
}

export const vapiToolsConfig: VapiFunctionTool[] = [
  // Gmail Tools
  {
    type: 'function',
    function: {
      name: 'fetch_emails',
      description: 'Fetch recent emails from Gmail inbox',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          maxResults: {
            type: 'number',
            description: 'Maximum number of emails to fetch (default: 10)',
            default: 10
          }
        },
        required: []
      }
    },
    server: {
      url: '/api/tools/gmail/fetch-emails'
    }
  },
  {
    type: 'function',
    function: {
      name: 'send_email',
      description: 'Send an email via Gmail',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          to: {
            type: 'string',
            description: 'Email recipient address'
          },
          subject: {
            type: 'string',
            description: 'Email subject line'
          },
          body: {
            type: 'string',
            description: 'Email body content'
          },
          cc: {
            type: 'string',
            description: 'CC recipients (optional)'
          },
          bcc: {
            type: 'string',
            description: 'BCC recipients (optional)'
          }
        },
        required: ['to', 'subject', 'body']
      }
    },
    server: {
      url: '/api/tools/gmail/send-email'
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_email_draft',
      description: 'Create a draft email in Gmail',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          to: {
            type: 'string',
            description: 'Email recipient address'
          },
          subject: {
            type: 'string',
            description: 'Email subject line'
          },
          body: {
            type: 'string',
            description: 'Email body content'
          }
        },
        required: ['to', 'subject', 'body']
      }
    },
    server: {
      url: '/api/tools/gmail/create-draft'
    }
  },

  // Google Calendar Tools
  {
    type: 'function',
    function: {
      name: 'create_calendar_event',
      description: 'Create a new event in Google Calendar',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          summary: {
            type: 'string',
            description: 'Event title/summary'
          },
          startDateTime: {
            type: 'string',
            description: 'Event start time (ISO 8601 format)'
          },
          endDateTime: {
            type: 'string',
            description: 'Event end time (ISO 8601 format)'
          },
          attendees: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of attendee email addresses'
          },
          location: {
            type: 'string',
            description: 'Event location'
          }
        },
        required: ['summary', 'startDateTime', 'endDateTime']
      }
    },
    server: {
      url: '/api/tools/calendar/create-event'
    }
  },
  {
    type: 'function',
    function: {
      name: 'find_calendar_events',
      description: 'Search for events in Google Calendar',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          timeMin: {
            type: 'string',
            description: 'Start time for search (ISO 8601 format)'
          },
          timeMax: {
            type: 'string',
            description: 'End time for search (ISO 8601 format)'
          },
          query: {
            type: 'string',
            description: 'Search query for event titles'
          }
        },
        required: []
      }
    },
    server: {
      url: '/api/tools/calendar/find-events'
    }
  },
  {
    type: 'function',
    function: {
      name: 'find_free_time_slots',
      description: 'Find available time slots in Google Calendar',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          timeMin: {
            type: 'string',
            description: 'Start time for search (ISO 8601 format)'
          },
          timeMax: {
            type: 'string',
            description: 'End time for search (ISO 8601 format)'
          },
          duration: {
            type: 'number',
            description: 'Duration in minutes (default: 60)',
            default: 60
          }
        },
        required: ['timeMin', 'timeMax']
      }
    },
    server: {
      url: '/api/tools/calendar/find-free-slots'
    }
  },

  // Slack Tools
  {
    type: 'function',
    function: {
      name: 'send_slack_message',
      description: 'Send a message to a Slack channel or user',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          channel: {
            type: 'string',
            description: 'Slack channel ID or name (e.g., #general, C1234567890, @username)'
          },
          text: {
            type: 'string',
            description: 'Message text to send'
          },
          threadTs: {
            type: 'string',
            description: 'Thread timestamp for replying to a specific message'
          }
        },
        required: ['channel', 'text']
      }
    },
    server: {
      url: '/api/tools/slack/send-message'
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_slack_channel',
      description: 'Create a new Slack channel',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          },
          name: {
            type: 'string',
            description: 'Channel name (without # prefix)'
          },
          isPrivate: {
            type: 'boolean',
            description: 'Whether the channel should be private (default: false)',
            default: false
          }
        },
        required: ['name']
      }
    },
    server: {
      url: '/api/tools/slack/create-channel'
    }
  },
  {
    type: 'function',
    function: {
      name: 'list_slack_conversations',
      description: 'List all accessible Slack conversations/channels',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'User ID (default: "default")',
            default: 'default'
          }
        },
        required: []
      }
    },
    server: {
      url: '/api/tools/slack/list-conversations'
    }
  }
];

// Tools are only available server-side via API routes