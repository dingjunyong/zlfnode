module.exports = class extends think.Controller {
  /**
     * public action
     * @return {Promise} []
     */
  async signinAction() {
    // 用户登录
    const islogin = await this.islogin();
    if (this.isAjax()) {
      // 验证码 钩子
      const signinBefore = await this.hook('signinBefore');
      if (signinBefore === 'no') {
        const error = this.controller('error');
        return error.noAction('验证码不正确');
      }

      const username = this.post('username');
      let password = this.post('password');
      password = encryptPassword(password);
      const res = await this.model('member').signin(username, password, this.ip, 1, 1);
      if (res.uid > 0) {
        // 记录用户登录行为
        // await this.model("cmswing/action").log("user_login","member",res.uid,res.uid,this.ip,this.ctx.url);
        // console.log(11111111111111);
        await this.session('userInfo', res);
        // TODO 用户密钥
        // this.redirect('/admin/index');
        return this.success({name: '登陆成功!', url: '/admin/index'});
      } else { // 登录失败
        let fail;
        switch (res) {
          case -1:
            fail = '用户不存在或被禁用';
            break; // 系统级别禁用
          case -2:
            fail = '密码错误';
            break;
          case -3:
            fail = '您无权登陆后台！';
            break;
          default:
            fail = '未知错误'; // 0-接口参数错误（调试阶段使用）
        }
        const error = this.controller('error');
        return error.noAction(fail);
      }
    } else {
      if (islogin) {
        return this.redirect('/admin/index');
      } else {
        return this.display();
      }
    }
  }

  /**
     * 退出登陆
     * @returns {Promise.<void>}
     */
  async logoutAction() {
    // 退出登录
    const islogin = await this.islogin();
    if (islogin) {
      await this.session('userInfo', null);
      this.redirect('/admin/public/signin');
    } else {
      this.redirect('/admin/public/signin');
    }
  }

  async islogin() {
    const user = await this.session('userInfo');
    const res = !think.isEmpty(user);
    return res;
  }

  verAction() {
    this.end('df11df');
  }
};
