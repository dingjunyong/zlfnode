const path = require('path');
module.exports = class extends think.website.admin {
  async indexAction() {
    // 服务器信息
    this.meta_title = '首页';
    // console.log(111)
    // 钩子
    await this.hook('AdminIndex');
    return this.display();
  }
  async unallcacheAction() {
    // const model = ['category', 'channel', 'model','ext','hooks'];
    // for (const m of model){
    //  await update_cache(m)
    // }
    think.rmdir(path.join(think.ROOT_PATH, 'runtime/cache'), true).then(() => {
      console.log('删除完成');
    });
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name: '更新全站缓存成功!'});
  }
};
