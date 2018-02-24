// 管理员控制器基类

module.exports = class extends think.Controller {
  async __before() {
    // 登陆验证
    const islogin = await this.islogin();
    if (!islogin) {
      return this.redirect('/admin/public/signin');
    }
  }

  /**
     * 判断是否登录
     * @returns {boolean}
     */
  async islogin() {
    // 判断是否登录
    const user = await this.session('userInfo');
    const res = think.isEmpty(user) ? false : user.uid;
    return res;
  }
};
