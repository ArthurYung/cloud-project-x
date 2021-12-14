import * as fs from 'fs';
import { initConfig, watchConfigJson, stopWatcher, getConfig, updateConfig, getProject, addProject, delProject } from '../index';
import { LOCAL_CONFIG } from '../../constants/path'
import { defaultOptions, LocalJsonInstant } from '../../constants/config';
import * as mock from 'mock-fs';

function mockLocalFile() {
  mock({
    [LOCAL_CONFIG]: JSON.stringify(defaultOptions)
  })
  initConfig();
  watchConfigJson()
}

function clearLocalFile() {
  mock.restore();
  stopWatcher()
}


function getLocalJson(): LocalJsonInstant {
  return JSON.parse(fs.readFileSync(LOCAL_CONFIG, 'utf-8'))
}


describe("init config file", () => {
  beforeAll(mockLocalFile)
  afterAll(clearLocalFile)

  test("get default config json", () => {
    const config = getConfig();
    expect(config).toMatchObject(defaultOptions);
  });

  test("match local json", () => {
    const localJson = getLocalJson();
    expect(localJson).toMatchObject(defaultOptions)
  })
});

describe("set config option", () => {
  beforeAll(mockLocalFile)
  afterAll(clearLocalFile)

  test("set liveTime", () => {
    const config = getConfig();
    expect(config.liveTime).toBe(1000 * 60 * 60 * 3);
    updateConfig((config) => {
      config.liveTime = 30;
      return config;
    });

    // local config json is modified
    expect(getLocalJson().liveTime).toBe(30);
  });
});

describe("change project settings", () => {
  const project1 = { host: 'test.qq.com', script: 'dev', cwd: '/test' }
  const project2 = { host: 'test2.qq.com', script: 'dev', cwd: '/test' }

  beforeAll(mockLocalFile)
  afterAll(clearLocalFile)

  test("get project", () => {
    const p1 = getProject(project1.host);
    const p2 = getProject(project2.host);
    expect(p1).toBeUndefined()
    expect(p2).toBeUndefined()
  });

  test("set project", () => {
    addProject(project1)
    addProject(project2)
    // local config json is modified
    expect(getLocalJson().projects['test.qq.com']).toMatchObject(project1)
    expect(getLocalJson().projects['test2.qq.com']).toMatchObject(project2)
  })

  test("delete project", () => {
    delProject('test.qq.com')
    // local config json is modified
    expect(getLocalJson().projects['test.qq.com']).toBeUndefined()
    expect(getLocalJson().projects['test2.qq.com']).toMatchObject(project2)
  })
});