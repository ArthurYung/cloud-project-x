import { ProxyLifecycle } from "../../runtime/control";

export function validateHost (context: ProxyLifecycle, next: () => void) {
  if (context.req.isIp()) {
    context.res.writeHtml('<center>不支持IP访问</center>')
    context.end();
    return;
  }

  next()
}