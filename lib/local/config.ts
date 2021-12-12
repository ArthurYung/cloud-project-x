import * as fs from 'fs';
import {
  defaultOptions,
  LocalJsonInterface,
  LocalProjectConfig,
} from '../constants/config';
import { LOCAL_CONFIG } from '../constants/path';

let localConfig: LocalJsonInterface;

function writeConfigJson(data: LocalJsonInterface) {
  try {
    fs.writeFileSync(LOCAL_CONFIG, JSON.stringify(data));
  } catch (e) {
    console.error(e, data);
  }
}

function readConfigJson() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_CONFIG, 'utf-8'));
  } catch (e) {
    console.warn(e);
    return {};
  }
}

function setOption<T extends keyof Omit<LocalJsonInterface, 'projects'>>(
  key: T,
  value: LocalJsonInterface[T]
) {
  localConfig[key] = value;
  writeConfigJson(localConfig);
}

function setProject(project: LocalProjectConfig) {
  localConfig.projects[project.host] = project;
  writeConfigJson(localConfig);
}

function removeProject(host: string) {
  delete localConfig.projects[host];
  writeConfigJson(localConfig);
}

function getLocalConfig() {
  return localConfig;
}

function initLocalConfig() {
  if (!fs.existsSync(LOCAL_CONFIG)) {
    writeConfigJson(defaultOptions);
  }

  localConfig = readConfigJson();
}

export { initLocalConfig, getLocalConfig, setOption, setProject, removeProject };
