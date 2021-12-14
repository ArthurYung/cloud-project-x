import { addProject } from "../../lib/local";

export function commandAdd(host: string, script = 'dev') {
  if (!host) {
    console.error('host is not find')
    return;
  }
  
  addProject({ host, script, cwd: process.cwd() })
  console.log(`Add Project [${host}] Success`)
}