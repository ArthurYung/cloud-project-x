#!/usr/bin/env node
import { program } from 'commander';
import { initConfig } from '../lib/local';
import * as packageJson from '../package.json';
import { commandAdd } from './commands/add';
import commandStart from './commands/start';

initConfig();

program.version(packageJson.version);

program
  .command('start')
  .description('start development cloud manager server')
  .action(commandStart);
program
  .command('stop')
  .description('stop development cloud manager server')
  .action((p) => console.log('2', p));
program
  .command('add <host> [script]')
  .description('add a project with proxy hostname and usaged script name')
  .action(commandAdd);
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
