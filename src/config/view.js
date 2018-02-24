const nunjucks = require('think-view-nunjucks');
const path = require('path');
module.exports = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks,
    beforeRender: (env, nunjucks, config) => {
      // env.addGlobal('config', think.config());
      // env.addGlobal('JSON', JSON);
      /**
             * 格式化字节大小
             * @param  number size      字节数
             * @param  string delimiter 数字和单位分隔符
             * @return string            格式化后的带单位的大小
             */
      env.addFilter('format_bytes', function(size, delimiter = '') {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        for (var i = 0; size >= 1024 && i < 5; i++) size /= 1024;
        return Math.round(size * 100) / 100 + delimiter + units[i];
      });

      /**
             * 格式化时间
             */
      env.addFilter('format_time', function(D, sec) {
        let time;
        const date = new Date(D);
        const y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? '0' + M : M;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        let h = date.getHours();
        h = h < 10 ? '0' + h : h;
        let m = date.getMinutes();
        m = m < 10 ? '0' + m : m;
        let s = date.getSeconds();
        s = s < 10 ? '0' + s : s;
        if (sec) {
          time = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
        } else {
          time = y + '-' + M + '-' + d + ' ' + h + ':' + m;
        }
        return time;
      });
      /**
             * moment
             * YYYY-MM-DD HH:mm:ss
             * lll
             */
      env.addFilter('moment', function(time, config) {
        const moment = require('moment');
        moment.locale('zh-cn');
        if (think.isEmpty(config)) {
          return moment(time).fromNow();
        } else {
          return moment(time).format(config);
        }
      });
    }
  }
};
