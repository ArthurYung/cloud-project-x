import * as fs from 'fs';
import * as localConfig from '../index';
import { LOCAL_CONFIG } from '../../constants/path'
import { defaultOptions, LocalJsonInterface } from '../../constants/config';
import { initLocalConfig, removeProject, setOption, setProject } from '../config';
import * as mock from 'mock-fs';

function mockLocalFile() {
  mock({
    [LOCAL_CONFIG]: JSON.stringify(defaultOptions)
  })
  initLocalConfig()
}

function clearLocalFile() {
  mock.restore();
}


function getLocalJson(): LocalJsonInterface {
  return JSON.parse(fs.readFileSync(LOCAL_CONFIG, 'utf-8'))
}


describe("init config file", () => {
  beforeAll(mockLocalFile)
  afterAll(clearLocalFile)

  test("get default config json", () => {
    const config = localConfig.getLocalConfig();
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
    setOption('liveTime', 30)
    const config = localConfig.getLocalConfig();
    expect(config.liveTime).toBe(30);

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
    const config = localConfig.getLocalConfig();
    expect(config.projects).toMatchObject({})
  });

  test("set project", () => {
    setProject(project1)
    setProject(project2)
    expect(localConfig.getLocalConfig().projects['test.qq.com']).toMatchObject(project1)
    expect(localConfig.getLocalConfig().projects['test2.qq.com']).toMatchObject(project2)
    // local config json is modified
    expect(getLocalJson().projects['test.qq.com']).toMatchObject(project1)
    expect(getLocalJson().projects['test2.qq.com']).toMatchObject(project2)
  })

  test("delete project", () => {
    removeProject('test.qq.com')
    expect(localConfig.getLocalConfig().projects['test.qq.com']).toBeUndefined()
    expect(localConfig.getLocalConfig().projects['test2.qq.com']).toMatchObject(project2)

    expect(getLocalJson().projects['test.qq.com']).toBeUndefined()
    expect(getLocalJson().projects['test2.qq.com']).toMatchObject(project2)
  })
});