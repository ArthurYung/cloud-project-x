import { ServerResponse } from 'http';
import { HTML_HEADER } from '../constants/str';

export function outgoing(response: ServerResponse) {
  function writeHtml(html: string) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.write(HTML_HEADER);
    response.write(html);
  }

  function writeJson(data: Object) {
    response.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify(data));
  }

  function send(data: string) {
    return response.write(data);
  }

  return {
    response,
    writeHtml,
    writeJson,
    send,
    end: response.end,
    on: response.on,
  };
}

export type Outgoing = ReturnType<typeof outgoing>;
