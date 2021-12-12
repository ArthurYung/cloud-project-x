export const defaultOptions: LocalJsonInterface = {
  liveTime: 1000 * 60 * 60 * 3,
  projects: {},
};

export interface LocalJsonInterface {
  liveTime: number;
  projects: {[x: string]: LocalProjectConfig};
}

export interface LocalProjectConfig {
  host: string;
  path: string;
  script: string;
}