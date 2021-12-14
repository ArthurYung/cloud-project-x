import { apiRouter } from "../../api/api";
import { dispatchApiRouter } from "../../api/dispathcer";
import { ProxyLifecycle } from "../../runtime/control";

export function routeApi (context: ProxyLifecycle, next: () => void) {
  if (apiRouter[context.req.url]) {
    dispatchApiRouter(context);
    return;
  }

  next()
}