import { setProject } from "../../lib/local";

export function commandAdd(host: string, script = 'dev') {
  if (!host) {
    console.error('host is not find')
    return;
  }
  
  setProject({ host, script, cwd: process.cwd() })
  console.log(`Add Project [${host}] Success`)
}