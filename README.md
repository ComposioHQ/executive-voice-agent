# AI Executive Voice Assistant

An intelligent voice-powered executive assistant that integrates with your productivity tools through natural conversation. Built with Next.js, Vapi AI, and Composio.

## Features

**🎤 Voice Interface**
- Real-time voice conversations with AI assistant
- Natural language processing for intuitive interactions
- Visual conversation transcript

**📧 Gmail Integration**
- Fetch and read recent emails
- Send emails to recipients
- Create draft emails for later

**📅 Calendar Management**  
- Schedule new meetings and events
- Search for existing calendar events
- Find available time slots for scheduling

**💬 Slack Integration**
- Send messages to channels or users
- Create new Slack channels
- List available conversations

## Getting Started

### Prerequisites

You'll need API keys for:
- [Vapi AI](https://vapi.ai/) - For voice interface
- [Composio](https://composio.dev/) - For tool integrations
- [OpenAI](https://openai.com/) - For language model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd executive-voice-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file with:
VAPI_API_KEY=your_vapi_api_key
COMPOSIO_API_KEY=your_composio_api_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_NGROK_URL=your_ngrok_url # For local development
```

4. Connect your accounts through Composio:
- Gmail/Google Calendar
- Slack

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the voice assistant.

## Usage

1. Click "Talk to Assistant" to start a voice conversation
2. Ask the assistant to help with:
   - "Check my latest emails"
   - "Schedule a meeting for tomorrow at 2 PM"
   - "Send a Slack message to the team"
   - "Find my free time slots this week"

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Voice AI**: Vapi AI with OpenAI GPT-4
- **Integrations**: Composio for Gmail, Calendar, Slack
- **Styling**: Tailwind CSS

## Project Structure

```
├── app/
│   ├── api/tools/          # API endpoints for tool integrations
│   │   ├── calendar/       # Calendar tool routes
│   │   ├── gmail/          # Gmail tool routes
│   │   └── slack/          # Slack tool routes
│   └── page.tsx           # Main application page
├── components/
│   └── VoiceAgent.tsx     # Voice assistant component
└── lib/
    ├── composio.ts        # Composio client setup
    ├── vapi-tools.ts      # Vapi tool configurations
    └── route-helpers.ts   # API route utilities
```

## References

- [Composio Documentation](https://docs.composio.dev) - Integration platform for connecting AI agents with external tools
- [Vapi Custom Tools Documentation](https://docs.vapi.ai/tools/custom-tools) - Guide for creating custom tools in Vapi AI
