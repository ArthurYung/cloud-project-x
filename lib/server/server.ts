import * as http from 'http';
import * as https from 'https';
import { requestProxy } from '../proxy';
const originHttpCreateServer = http.createServer;
const originHttpsCreateServer = https.createServer;



export function serverStart() {
  const httpProxy = http.createServer(requestProxy)
  // httpProxy.on('upgrade', )
  console.log('http start')
  httpProxy.listen(8010);

  // @ts-ignore
http.createServer = (...args) => {
  console.log('hark ennenenen http >>>>');
  return originHttpCreateServer(...args);
}

// @ts-ignore
https.createServer = (...args) => {
  console.log('hark ennenenen https >>>>');
  return originHttpsCreateServer(...args);
}
}