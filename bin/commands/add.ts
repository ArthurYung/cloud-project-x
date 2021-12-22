import { addProject } from "../../lib/local";
import * as chalk from 'chalk';

export default function commandAdd(host: string, script = 'dev') {
  if (!host) {
    console.error('host is not find')
    return;
  }
  
  addProject({ host, script, cwd: process.cwd() })
  console.log(chalk.green(`Add Project [${host}] Success`));
}