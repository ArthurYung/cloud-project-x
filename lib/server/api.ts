import { HackedRequest, HackedResponse } from '../util/server';
import { childProject } from './child';
import { Connection } from './connect';

function stdoutCommand(
  request: HackedRequest,
  response: HackedResponse,
  connection: Connection
) {
  // connection.process.kill();
  // childProject(connection.host);
  // console.log(request.)
  // response.writeJson({ code: 0, message: 'success' });
  request.body(data => {
    console.log(data)
  })
}

export const apiRouter = {
  '/dpx_stdout_command': stdoutCommand,
};

export function dispatchApiRouter(
  request: HackedRequest,
  response: HackedResponse,
  connection: Connection
) {
  const api = apiRouter[request.url];
  api(request, response, connection);
  return !!api;
}
