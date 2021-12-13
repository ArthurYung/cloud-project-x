import { default as AnsiUp } from 'ansi_up';
import { ChildProcess } from 'child_process';
import { checkCompiled } from '.';
import { ERROR_STDOUT_STYLE, RELOAD_SCRIPT } from '../constants/str';
import { HackedResponse } from './server';

const ansiUp = new AnsiUp()



function parseStdoutHtml(buf: Buffer|string) {
  return ansiUp
    .ansi_to_html(buf.toString('utf-8')) // 将buffer转换成html
    .replace(/\n/g, '<br/>') // 替换\n为br
}

export function stdoutPipeRender(
  childProcess: ChildProcess,
  response: HackedResponse,
) {
  function render(buf: Buffer) {
    const stdoutHtml = parseStdoutHtml(buf);
    response.send(stdoutHtml);

    // 如果有webpack构建完成的输出日志，reload页面
    if (checkCompiled(stdoutHtml)) {
      response.send(RELOAD_SCRIPT)
    }
  }

  response.writeHtml('')
  
  response.on('close', () => {
    childProcess.stdout.off('data', render);
  });

  childProcess.stdout.on('data', render);

  childProcess.stdout.on('end', () => {
    response.end()
  });

  childProcess.stderr.on('data', (buf: Buffer) => {
    response.send(ERROR_STDOUT_STYLE)
    response.send(parseStdoutHtml(buf.toString()))
  })
}

export function stderrPipeRender(
  childProcess: ChildProcess,
  response: HackedResponse,
  defaultStr?: string
) {

  function render(buf: Buffer) {
    response.send(parseStdoutHtml(buf))
  }

  response.writeHtml(ERROR_STDOUT_STYLE)

  response.send(parseStdoutHtml(defaultStr))

  childProcess.stdout.on('end', () => {
    console.log('process data end')
  })

  childProcess.on('exit', () => {
    console.log('exit this')
  })

  childProcess.stderr.on('data', render);

  childProcess.stderr.on('end', () => {
    console.log('error end')
    response.end()
  });
  
  response.on('close', () => {
    childProcess.stderr.off('data', render);
  });
}
