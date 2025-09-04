import { NextRequest, NextResponse } from 'next/server';
import { ComposioToolResult } from './composio';

interface ToolCallMessage {
  toolCallList?: Array<{
    id: string;
    arguments: Record<string, unknown>;
  }>;
}

export function extractToolCallData(body: any): {
  toolCallId: string;
  toolCallArguments: Record<string, unknown>;
} {
  // Handle VAPI request structure
  const message = body.message;
  
  // Extract tool call ID from the message structure
  const toolCallId = message?.toolCallList?.[0]?.id || 'unknown';
  
  // Extract arguments from the tool call
  const toolCallArguments = message?.toolCallList?.[0]?.arguments || {};
  
  console.log('Extracted toolCallId:', toolCallId);
  console.log('Extracted arguments:', toolCallArguments);
  
  return { toolCallId, toolCallArguments };
}

export function createErrorResponse(toolCallId: string, error: string, status = 500) {
  return NextResponse.json({
    results: [{
      toolCallId,
      result: `Error: ${error}`
    }]
  }, { status });
}

export function createSuccessResponse(toolCallId: string, result: ComposioToolResult) {
  const response = {
    results: [{
      toolCallId,
      result: result.successful 
        ? JSON.stringify(result.data)
        : `Error: ${result.error}`
    }]
  };
  
  console.log('Sending response to Vapi:', JSON.stringify(response, null, 2));
  return NextResponse.json(response);
}

export async function handleToolRequest(
  request: NextRequest,
  toolFunction: (args: Record<string, unknown>) => Promise<ComposioToolResult>
) {
  try {
    const body = await request.json();
    console.log('Received request from Vapi:', JSON.stringify(body, null, 2));
    
    const { toolCallId, toolCallArguments } = extractToolCallData(body);
    
    if (toolCallId === 'unknown') {
      return createErrorResponse('unknown', 'No toolCallId provided', 400);
    }
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), 30000);
    });
    
    const result = await Promise.race([
      toolFunction(toolCallArguments),
      timeoutPromise
    ]);
    
    return createSuccessResponse(toolCallId, result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return createErrorResponse('error', errorMessage);
  }
}