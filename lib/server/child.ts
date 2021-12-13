import { ChildProcess, spawn } from 'child_process';
import { getLocalConfig } from '../local';
import { connections, CONNECTION_STATUS } from './connect';

export function childProject(host: string) {
  const projectConfig = getLocalConfig().projects[host];
  if (!projectConfig) {
    console.error(`This project [${host}] is not find`);
    return;
  }

  const childProcess = spawn('npm', ['run', projectConfig.script], {
    cwd: projectConfig.cwd,
  });

  const connection = {
    host,
    port: 0,
    process: childProcess,
    status: CONNECTION_STATUS.STARTING,
    stime: 0,
    error: ''
  };

  childProcess.stdout.setEncoding('utf-8');

  childProcess.on('spawn', () => {
    connection.stime = Date.now()
    console.log('Child process start sucecss');
  });


  childProcess.stderr.on('data', (e: Buffer)=> {
    connection.error += e.toString();
    connection.status = CONNECTION_STATUS.ERROR;
  })

  childProcess.on('error', (e) => {
    console.log('error', e)
  })

  childProcess.on('exit', e => {
    connection.status = CONNECTION_STATUS.STOP
  })

  connections.set(host, connection);
}
