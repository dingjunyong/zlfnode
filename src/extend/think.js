const lodash = require('lodash');
const path = require('path');
module.exports = {
  _: lodash,
  resource: path.join(think.ROOT_PATH, 'www'),
  website: {
    info: require(path.join(think.ROOT_PATH, 'package.json')),
    admin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'admin')),
    home: require(path.join(think.ROOT_PATH, 'src', 'controller', 'home')),
    rest: require(path.join(think.ROOT_PATH, 'src', 'controller', 'rest'))
  }
};
