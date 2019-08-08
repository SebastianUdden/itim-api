"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockModel = void 0;

var _models = _interopRequireDefault(require("../models"));

var _uuid = require("../utils/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMockModel = async model => {
  // USERS
  const user0 = new _models.default.User({
    username: "Default",
    tims: 0,
    createdAt: new Date()
  }); // SWITCH

  switch (model) {
    case "User":
      await user0.save();
      break;

    default:
      return;
  }
};

exports.createMockModel = createMockModel;
//# sourceMappingURL=index.js.map