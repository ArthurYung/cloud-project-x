import { IncomingMessage, ServerResponse } from 'http';
import { isIpHost, parseApplicationData } from '.';
import { HTML_HEADER } from '../constants/str';

export function hackResponse(response: ServerResponse) {
  return {
    response,
    writeHtml(html: string) {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.write(HTML_HEADER);
      response.write(html);
    },
    writeJson(data: Object) {
      response.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify(data));
    },
    send(data: string) {
      return response.write(data);
    },
    end: response.end,
    on: response.on
  };
}

export function hackRequest(request: IncomingMessage) {
  return {
    request,
    body(cb: (data: Object | Error) => void) {
      let data = ''
      request.on('data', chunk => data += chunk)
      request.on('end', () => cb(parseApplicationData(data)))
      request.on('error', error => cb(error))
    },
    isIpHost() {
      return isIpHost(request.headers.host)
    },
    host: request.headers.host || '127.0.0.1',
    url: request.url || '/'
  }
}

export type HackedResponse = ReturnType<typeof hackResponse>
export type HackedRequest = ReturnType<typeof hackRequest>
