module.exports = class extends think.website.rest {
  /**
     * 测试
     */
  async getAction() {
    const webconfig = await think.model('setup').getset();
    return this.success(webconfig);
  }
  async postAction() {
    return this.success(this.post());
  }
};
