import { createServer, IncomingMessage, ServerResponse } from 'http';
import { hackRequest, hackResponse } from '../util/server';
import { requestProxy } from './proxy';

function serverListener(request: IncomingMessage, response:ServerResponse) {
  const req = hackRequest(request)
  const res = hackResponse(response)
  
  if (req.isIpHost()) {
    res.writeHtml('<center>不支持IP访问</center>')
    res.end();
    return
  }

  return requestProxy(req, res)
}

export function serverStart() {
  const httpProxy = createServer(serverListener)
  // httpProxy.on('upgrade', )
  console.log('http start')
  httpProxy.listen(8010);
}