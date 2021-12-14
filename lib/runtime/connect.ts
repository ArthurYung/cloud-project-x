import { ChildProcess } from "child_process";

export const connections = new Map<string, Connection>();

export interface Connection {
  host: string;
  // local: string;
  port: number;
  stime: number;
  status: CONNECTION_STATUS;
  process: ChildProcess;
  error: string
}

export enum CONNECTION_STATUS {
  // READY = 'ready',
  STARTING = 'starting',
  OPENING = 'opening',
  STOP = 'stop',
  ERROR = 'error',
}
