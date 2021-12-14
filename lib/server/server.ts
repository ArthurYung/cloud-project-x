import { createServer } from 'http';
import { requestProxy } from '../proxy';

export function serverStart() {
  const httpProxy = createServer(requestProxy)
  // httpProxy.on('upgrade', )
  console.log('http start')
  httpProxy.listen(8010);
}