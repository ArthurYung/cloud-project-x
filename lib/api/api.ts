import { ProxyLifecycle } from '../runtime/control';


function stdoutCommand(
  context: ProxyLifecycle
) {
  // connection.process.kill();
  // childProject(connection.host);
  // console.log(request.)
  // response.writeJson({ code: 0, message: 'success' });
  context.req.body(data => {
    console.log(data)
  })
}

export const apiRouter = {
  '/dpx_stdout_command': stdoutCommand,
};
