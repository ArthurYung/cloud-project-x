// 检查是否是ip地址
export function isIpHost(host: string) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host);
}

export function isLocalhost(host: string) {
  const [realhost] = host.split(':');
  return ['localhost', '0.0.0.0', '127.0.0.1'].includes(realhost);
}

export function checkCompiled(str: string) {
  return /compiled successfully/i.test(str);
}

export function parseApplicationData(str: string) {
  return str.split('&').reduce((data, item) => {
    const [key, value] = item.split('=');
    return {
      ...data,
      [key]: value,
    };
  }, {});
}
