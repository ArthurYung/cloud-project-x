import { default as AnsiUp } from 'ansi_up';

const ansiUp = new AnsiUp()

export function parseStdoutHtml(buf: Buffer|string) {
  return ansiUp
    .ansi_to_html(buf.toString('utf-8')) // 将buffer转换成html
    .replace(/\n/g, '<br/>') // 替换\n为br
}