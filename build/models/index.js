"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  return _mongoose.default.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
};

exports.connectDb = connectDb;
const models = {
  User: _user.default
};
var _default = models;
exports.default = _default;
//# sourceMappingURL=index.js.map