import { IncomingMessage } from 'http';
import { isIpHost, isLocalhost, parseApplicationData } from '../util';

export function incomming(request: IncomingMessage) {
  function body(cb: (data: Object | Error) => void) {
    let data = '';
    request.on('data', (chunk) => (data += chunk));
    request.on('end', () => cb(parseApplicationData(data)));
    request.on('error', (error) => cb(error));
  }

  function isIp() {
    return isIpHost(request.headers.host);
  }

  function isLocal() {
    return isLocalhost(request.headers.host)
  }

  return {
    request,
    body,
    isIp,
    isLocal,
    host: request.headers.host || '127.0.0.1',
    url: request.url || '/',
  };
}

export type Incomming = ReturnType<typeof incomming>;
