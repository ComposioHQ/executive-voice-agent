'use client';

import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { vapiToolsConfig } from '@/lib/vapi-tools';

interface VapiWidgetProps {
  apiKey: string;
}

const VapiWidget: React.FC<VapiWidgetProps> = ({ 
  apiKey
}) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });

    vapiInstance.on('message', (message) => {
      console.log('Received message:', message);
      
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript(prev => {
          // Check if this is a duplicate message
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && 
              lastMessage.role === message.role && 
              lastMessage.text === message.transcript) {
            return prev; // Don't add duplicate
          }
          
          return [...prev, {
            role: message.role,
            text: message.transcript
          }];
        });
      }
      
      // Log tool-related messages
      if (message.type === 'tool-calls' || message.type === 'function-call') {
        console.log('Tool call initiated:', message);
      }
      
      if (message.type === 'tool-call-result' || message.type === 'function-call-result') {
        console.log('Tool call result:', message);
      }
      
      // Check for conversation updates that include tool results
      if (message.type === 'conversation-update' && message.messages) {
        const lastMessage = message.messages[message.messages.length - 1];
        if (lastMessage && lastMessage.role === 'tool_call_result') {
          console.log('Tool call completed successfully!');
        }
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const startCall = async () => {
    if (!vapi) {
      console.error('Vapi instance not available');
      return;
    }

    if (!apiKey) {
      console.error('API key not provided');
      return;
    }

    try {
      const assistant = {
        name: "AI Executive Assistant",
        model: {
          provider: "openai" as const,
          model: "gpt-4.1" as const,
          messages: [
            {
              role: "system" as const,
              content: `You are an AI executive assistant with full access to Gmail, Google Calendar, and Slack tools. You are friendly, conversational, and always keep the user engaged.

📧 GMAIL TOOLS:
- fetch_emails: Get recent emails from inbox
- send_email: Send new emails to recipients  
- create_email_draft: Create draft emails for later

📅 CALENDAR TOOLS:
- create_calendar_event: Schedule new meetings and events
- find_calendar_events: Search for existing events
- find_free_time_slots: Find available time slots for scheduling

💬 SLACK TOOLS:
- send_slack_message: Send messages to channels or users
- create_slack_channel: Create new Slack channels
- list_slack_conversations: List available channels

CONVERSATION STYLE:
- When you need to use a tool, immediately acknowledge the request and let the user know you're working on it
- ALWAYS end your acknowledgment with an engaging question to keep the conversation flowing
- Examples:
  * "Let me fetch your latest emails for you. This will just take a moment - how has your day been going so far?"
  * "I'll create that calendar event right now. While I'm setting that up, what's the most important thing on your agenda this week?"
  * "I'm sending that Slack message for you. By the way, are you working on any exciting projects lately?"
- Keep the user engaged with friendly small talk while tools execute
- When you get the tool results, respond naturally and provide the information clearly
- Always be conversational and personable, not robotic`
            }
          ],
          tools: vapiToolsConfig.map(tool => ({
            ...tool,
            server: {
              url: `${process.env.NEXT_PUBLIC_NGROK_URL || 'http://localhost:3000'}${tool.server.url}`,
              timeoutSeconds: 30
            }
          }))
        },
        voice: {
          provider: "openai" as const,
          voiceId: "alloy"
        },
        firstMessage: "Hello! I'm your AI executive assistant. I can help you manage your Gmail, Google Calendar, and Slack. How can I assist you today?"
      };
      
      console.log('Starting call with assistant:', assistant);
      await vapi.start(assistant);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      width: '100%'
    }}>
      {!isConnected ? (
        <button
          onClick={startCall}
          style={{
            background: '#12A594',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
          }}
        >
          🎤 Talk to Assistant
        </button>
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '20px',
          width: '480px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e1e5e9'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isSpeaking ? '#ff4444' : '#12A594',
                animation: isSpeaking ? 'pulse 1s infinite' : 'none'
              }}></div>
              <span style={{ fontWeight: 'bold', color: '#333' }}>
                {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
              </span>
            </div>
            <button
              onClick={endCall}
              style={{
                background: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              End Call
            </button>
          </div>
          
          <div style={{
            maxHeight: '800px',
            overflowY: 'auto',
            marginBottom: '12px',
            padding: '8px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            {transcript.length === 0 ? (
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                Conversation will appear here...
              </p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: '8px',
                    textAlign: msg.role === 'user' ? 'right' : 'left'
                  }}
                >
                  <span style={{
                    background: msg.role === 'user' ? '#12A594' : '#333',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    fontSize: '14px',
                    maxWidth: '80%'
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;