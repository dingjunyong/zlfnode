module.exports = [
  ['', 'home/index/index', 'get'],
  ['/index', 'home/index/index', 'get'],
  [/\/api\/(\w+)(?:\/(\d+))?/, 'api/:1?id=:2', 'rest']
];
