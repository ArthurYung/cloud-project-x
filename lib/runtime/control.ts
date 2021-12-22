import { IncomingMessage, ServerResponse } from 'http';
import { Incomming, incomming } from '../server/incomming';
import { Outgoing, outgoing } from '../server/outgoing';
import { Connection, connections } from './connect';
import { stderrPipeRender } from './stderr';
import { stdoutPipeRender } from './stdout';

export type LifecycleAction = (proxy: ProxyLifecycle, next: () => void) => void;

export interface ProxyLifecycle {
  actions: LifecycleAction[];
  req: Incomming;
  res: Outgoing;
  use: (action: LifecycleAction) => void;
  end: () => void;
  stderrRender: () => void;
  stdoutRender: () => void;
  getConnection: () => Connection;
  context?: any;
}

export function proxyControl(
  request: IncomingMessage,
  response: ServerResponse
) {
  let closed = false;

  const actions: LifecycleAction[] = [];
  const req = incomming(request);
  const res = outgoing(response);

  const context = {
    actions,
    req,
    res,
    use,
    end,
    stderrRender,
    stdoutRender,
    getConnection,
    context: {},
  };

  function use(action: LifecycleAction) {
    actions.push(action);
  }

  function end() {
    res.end();
    closed = true;
  }

  function getConnection() {
    return connections.get(req.host);
  }

  function stderrRender() {
    const connection = getConnection();
    if (!connection) {
      console.error('not find xxx');
      res.end();
      return;
    }

    stderrPipeRender(connection.process, res, connection.error);
  }

  function stdoutRender() {
    const connection = getConnection();
    if (!connection) {
      res.end();
      return;
    }

    stdoutPipeRender(connection.process, res);
  }

  function next() {
    if (closed) {
      return;
    }

    actions.shift()?.(context, next);
  }

  return { use, next };
}
