import { ChildProcess } from "child_process"
import { ERROR_STDOUT_STYLE } from "../constants/str"
import { Outgoing } from "../server/outgoing"
import { parseStdoutHtml } from "../util/ansi"

export function stderrPipeRender(
  childProcess: ChildProcess,
  response: Outgoing,
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
