import { CONNECTION_STATUS } from "../../runtime/connect";
import { ProxyLifecycle } from "../../runtime/control";

export function renderStarting (context: ProxyLifecycle, next: () => void) {
  const connection = context.getConnection();
  if (connection.status === CONNECTION_STATUS.STARTING) {
    console.log('is starting')
    context.stdoutRender();
    return;
  }

  next()
}