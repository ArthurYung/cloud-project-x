import * as path from 'path';
export const HOME_DIR = process.env.HOME || process.env.USERPROFILE;

export const HOME_DPX_DIR = path.resolve(HOME_DIR, '_dpx');
export const LOCA_CONFIG_FILENAME = 'config.json';
export const LOCAL_CONFIG = path.resolve(HOME_DPX_DIR, LOCA_CONFIG_FILENAME);
