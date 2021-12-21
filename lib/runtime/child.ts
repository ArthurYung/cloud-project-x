import { ChildProcess, spawn, execSync } from 'child_process';
import { getProject } from '../local';
import { connections, CONNECTION_STATUS } from './connect';

export function childProject(host: string) {
  const projectConfig = getProject(host);
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
    console.log(execSync(`ps -ef | grep ${childProcess.pid}`).toString())
  });


  childProcess.stderr.on('data', (e: Buffer)=> {
    connection.error += e.toString();
    console.log(connection.error)
    connection.status = CONNECTION_STATUS.ERROR;
  })

  childProcess.on('error', (e) => {
    console.log('error', e)
  })

  childProcess.on('exit', e => {
    connection.status = CONNECTION_STATUS.STOP;
  })

  connections.set(host, connection)

}
