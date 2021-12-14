import { childProject } from "../../runtime/child";
import { ProxyLifecycle } from "../../runtime/control";

export function initConnection(context: ProxyLifecycle, next: () => void) {
  const { host } = context.req;
  const connection = context.getConnection()
  if (!connection) {
    childProject(host);
    process.nextTick(() => {
      context.stdoutRender()
    })
    return;
  }

  next()
}