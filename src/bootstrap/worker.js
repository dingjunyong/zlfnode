// invoked in worker
require('./global');
require('./model');

think.beforeStartServer(async() => {
  // 加载网站配置
  const webconfig = await think.model('setup').getset();
  console.log(webconfig);
  think.config('setup', webconfig);
});
