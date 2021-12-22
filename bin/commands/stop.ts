import { request } from "http";

import * as chalk from 'chalk';

export default function commandStop() {
  const req = request({
    hostname: 'localhost',
    port: 8010,
    path: '/dpx_system_stop',
    method: 'GET',
  }, (res) => {
    res.on('data', (chunk) => {
      console.log(`${chunk}`);
    });
    res.on('end', () => {
      console.log(chalk.bgGrey('server is closed'));
    });
  });

  req.end();
}