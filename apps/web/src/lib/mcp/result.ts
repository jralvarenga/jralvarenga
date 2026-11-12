import type {
  CallToolResult,
  ReadResourceResult,
} from '@modelcontextprotocol/server';

/**
 * Returns tool output as pretty-printed JSON. Assistants parse the text
 * content; keeping one serializer avoids drifting shapes per tool.
 */
export function jsonToolResult(data: unknown): CallToolResult {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}

/** Marks a tool call as failed without throwing out of the handler. */
export function jsonToolError(message: string): CallToolResult {
  return {
    isError: true,
    content: [{ type: 'text', text: message }],
  };
}

/** Returns a resource body as JSON at the requested URI. */
export function jsonResource(uri: URL, data: unknown): ReadResourceResult {
  return {
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}
