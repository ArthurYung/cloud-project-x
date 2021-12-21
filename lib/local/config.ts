import * as fs from 'fs';
import {
  defaultOptions,
  LocalJsonInstant,
  LocalProjectConfig,
} from '../constants/config';
import { HOME_DPX_DIR, LOCAL_CONFIG, LOCA_CONFIG_FILENAME } from '../constants/path';

let localConfig = defaultOptions;
let configWatcher: fs.FSWatcher;

function writeConfigJson(data: LocalJsonInstant) {
  if (!fs.existsSync(HOME_DPX_DIR)) {
    fs.mkdirSync(HOME_DPX_DIR)
  }

  fs.writeFileSync(LOCAL_CONFIG, JSON.stringify(data));
}

function readConfigJson() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_CONFIG, 'utf-8'));
  } catch (e) {
    console.warn(e);
    return {};
  }
}

export function watchConfigJson() {
  stopWatcher();
  
  configWatcher = fs.watch(LOCAL_CONFIG, (_, filename) => {
    if (filename === LOCA_CONFIG_FILENAME) {
      Object.assign(localConfig, readConfigJson());
    } 
  });
}

export function stopWatcher() {
  configWatcher?.close();
}

export function updateConfig(
  update: (config: LocalJsonInstant) => LocalJsonInstant
) {
  writeConfigJson(update(localConfig));
}

export function initConfig() {
  if (!fs.existsSync(LOCAL_CONFIG)) {
    updateConfig((config) => config);
  } else {
    localConfig = readConfigJson()
  }

  console.log(localConfig)
}

export function getConfig() {
  return localConfig;
}

export function getProject(host: string) {
  return localConfig.projects[host];
}


export function addProject(project: LocalProjectConfig) {
  updateConfig((config) => {
    config.projects[project.host] = project;
    return config;
  });
}

export function delProject(host: string) {
  updateConfig((config) => {
    delete config.projects[host];
    return config;
  });
}
