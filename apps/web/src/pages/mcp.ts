import type { APIRoute } from 'astro';
import { handleMcpRequest } from '../lib/mcp/server';

export const prerender = false;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Session-Id, Mcp-Method, Mcp-Name, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, MCP-Protocol-Version',
  'Access-Control-Max-Age': '86400',
  // An API, not a page.
  'X-Robots-Tag': 'noindex, nofollow',
};

/**
 * Copies CORS headers onto an MCP response without buffering the body, so
 * Streamable HTTP streams still flush.
 */
function withCors(response: Response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** CORS preflight for browser MCP clients. */
export const OPTIONS: APIRoute = () =>
  new Response(null, { status: 204, headers: CORS });

/**
 * Stateless Streamable HTTP is POST-only. GET is forwarded so the handler
 * can answer 405 instead of Astro's 404.
 */
export const GET: APIRoute = async ({ request }) =>
  withCors(await handleMcpRequest(request));

/** Streamable HTTP: every JSON-RPC message is a POST. */
export const POST: APIRoute = async ({ request }) =>
  withCors(await handleMcpRequest(request));

/**
 * Stateless serving has no sessions to delete. DELETE is forwarded so the
 * handler can answer 405.
 */
export const DELETE: APIRoute = async ({ request }) =>
  withCors(await handleMcpRequest(request));
