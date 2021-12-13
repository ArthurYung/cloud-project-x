import { HackedRequest, HackedResponse } from "../util/server";
import { stderrPipeRender, stdoutPipeRender } from "../util/stdout";
import { dispatchApiRouter } from "./api";
import { childProject } from "./child";
import { connections, CONNECTION_STATUS } from "./connect";


export function requestProxy(request: HackedRequest, response: HackedResponse) {
  const { host } = request
  const connection = connections.get(host);

  if (!connection) {
    childProject(host);
    process.nextTick(() => {
      stdoutPipeRender(connections.get(host).process, response);
    })
    return;
  }

  // 访问的是内置api
  if (dispatchApiRouter(request, response, connection)) {
    console.log('is api')
    return;
  }

  if (connection.status === CONNECTION_STATUS.STARTING) {
    console.log('is starting')
    stdoutPipeRender(connection.process, response);
    return;
  }

  if (connection.status === CONNECTION_STATUS.ERROR) {
    console.log('is error')
    stderrPipeRender(connection.process, response, connection.error);
    return
  }

  if (connection.status === CONNECTION_STATUS.STOP) {
    response.writeHtml(connection.error || '连接已关闭')
    response.end()
    return;
  }
}