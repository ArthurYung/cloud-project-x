import { IncomingMessage, ServerResponse } from "http";
import { proxyControl } from "../runtime/control";
import { initConnection } from "./actions/connection";
import { validateHost } from "./actions/host";
import { routeApi } from "./actions/route-api";


// export function requestProxy(request: Incomming, response: Outgoing) {
//   const { host } = request
//   const connection = connections.get(host);

//   if (!connection) {
//     childProject(host);
//     process.nextTick(() => {
//       stdoutPipeRender(connections.get(host).process, response);
//     })
//     return;
//   }

//   // 访问的是内置api
//   if (dispatchApiRouter(request, response, connection)) {
//     console.log('is api')
//     return;
//   }

//   if (connection.status === CONNECTION_STATUS.STARTING) {
//     console.log('is starting')
//     stdoutPipeRender(connection.process, response);
//     return;
//   }

//   if (connection.status === CONNECTION_STATUS.ERROR) {
//     console.log('is error')
//     stderrPipeRender(connection.process, response, connection.error);
//     return
//   }

//   if (connection.status === CONNECTION_STATUS.STOP) {
//     response.writeHtml(connection.error || '连接已关闭')
//     response.end()
//     return;
//   }
// }

export function requestProxy(request: IncomingMessage, response: ServerResponse) {
  const { use, next } = proxyControl(request, response);
  use(validateHost);
  use(initConnection);
  use(routeApi);
  next();
}