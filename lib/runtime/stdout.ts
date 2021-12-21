import { ChildProcess } from 'child_process';
import { checkCompiled } from '../util';
import { ERROR_STDOUT_STYLE, RELOAD_SCRIPT } from '../constants/str';
import { Outgoing } from '../server/outgoing';
import { parseStdoutHtml } from '../util/ansi';

export function stdoutPipeRender(
  childProcess: ChildProcess,
  response: Outgoing
) {
  function render(buf: Buffer) {
    const stdoutHtml = parseStdoutHtml(buf);
    response.send(stdoutHtml);

    // 如果有webpack构建完成的输出日志，reload页面
    if (checkCompiled(stdoutHtml)) {
      response.send(RELOAD_SCRIPT);
    }
  }

  response.writeHtml('');

  response.on('close', () => {
    childProcess.stdout.off('data', render);
  });

  childProcess.stdout.on('data', render);

  childProcess.stdout.on('end', () => {
    response.end();
  });

  childProcess.stderr.on('data', (buf: Buffer) => {
    console.log('test buffer error data')
    response.send(ERROR_STDOUT_STYLE);
    response.send(parseStdoutHtml(buf.toString()));
  });
}
