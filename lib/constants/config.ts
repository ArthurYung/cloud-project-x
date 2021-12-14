export const defaultOptions: LocalJsonInstant = {
  liveTime: 1000 * 60 * 60 * 3,
  projects: {},
};

export interface LocalJsonInstant {
  liveTime: number;
  projects: {[x: string]: LocalProjectConfig};
}

export interface LocalProjectConfig {
  host: string;
  cwd: string;
  script: string;
}