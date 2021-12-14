import { ProxyLifecycle } from '../runtime/control';
import { apiRouter } from './api';

export function dispatchApiRouter(context: ProxyLifecycle) {
  apiRouter[context.req.url]?.(context);
}