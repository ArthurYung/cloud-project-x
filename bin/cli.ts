#!/usr/bin/env node
import { program } from 'commander';
import * as packageJson from '../package.json';

program.version(packageJson.version);

program
  .command('start')
  .description('start development cloud manager server')
  .action((p) => console.log('1', p));
program
  .command('stop')
  .description('stop development cloud manager server')
  .action((p) => console.log('2', p));
program
  .command('set <host> [script]')
  .description('set a projects with proxy hostname and usaged script name')
  .action((p) => console.log('2', p));
program
  .command('del <host>')
  .description('stop development cloud manager server')
  .action((p) => console.log('2', p));
program
  .command('restart <host>')
  .description('stop development cloud manager server')
  .action((p) => console.log('2', p));
program
  .command('list')
  .description('display all projects')
  .action((p) => console.log('2', p));

program.parse();
